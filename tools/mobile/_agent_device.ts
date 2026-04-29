import { tool } from "@opencode-ai/plugin"

export const AGENT_DEVICE_BIN = "agent-device"

export const platformSchema = tool.schema.enum(["ios", "macos", "android", "linux", "apple"])

export type CommonArgs = {
  session?: string
  platform?: "ios" | "macos" | "android" | "linux" | "apple"
  udid?: string
  serial?: string
}

export type SnapshotArgs = {
  interactive?: boolean
  compact?: boolean
  depth?: number
  scope?: string
  raw?: boolean
}

export function requireString(value: string | undefined, name: string): string {
  if (!value) throw new Error(`Missing required argument: ${name}`)
  return value
}

export function requireNumber(value: number | undefined, name: string): number {
  if (value === undefined) throw new Error(`Missing required argument: ${name}`)
  return value
}

export function requireExactlyOne(args: Record<string, unknown>, names: string[], action: string): string {
  const present = names.filter((name) => args[name] !== undefined && args[name] !== "")
  if (present.length !== 1) throw new Error(`${action} requires exactly one of: ${names.join(", ")}`)
  return present[0]
}

export function addCommonFlags(argv: string[], args: CommonArgs) {
  if (args.session) argv.push("--session", args.session)
  if (args.platform) argv.push("--platform", args.platform)
  if (args.udid) argv.push("--udid", args.udid)
  if (args.serial) argv.push("--serial", args.serial)
}

export function addSnapshotFlags(argv: string[], args: SnapshotArgs) {
  if (args.interactive) argv.push("-i")
  if (args.compact) argv.push("-c")
  if (args.depth !== undefined && args.depth > 0) argv.push("--depth", String(args.depth))
  if (args.scope) argv.push("--scope", args.scope)
  if (args.raw) argv.push("--raw")
}

export function addSelectorSnapshotFlags(argv: string[], args: Pick<SnapshotArgs, "depth" | "scope" | "raw">) {
  if (args.depth !== undefined && args.depth > 0) argv.push("--depth", String(args.depth))
  if (args.scope) argv.push("--scope", args.scope)
  if (args.raw) argv.push("--raw")
}

export function addFindSnapshotFlags(argv: string[], args: Pick<SnapshotArgs, "depth" | "raw">) {
  if (args.depth !== undefined && args.depth > 0) argv.push("--depth", String(args.depth))
  if (args.raw) argv.push("--raw")
}

export async function runAgentDevice(argv: string[], cwd: string, toolName: string) {
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn([AGENT_DEVICE_BIN, ...argv], {
      cwd,
      stdout: "pipe",
      stderr: "pipe",
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return `Missing npm-installed agent-device binary on PATH. Install it with \`npm install -g agent-device\`.\n${message}`
  }
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (exitCode !== 0) return `${toolName} failed (${exitCode}):\n${stderr || stdout}`
  return stdout.trim()
}

export function runReactDevtools(argv: string[], cwd: string, toolName: string) {
  return runAgentDevice(["react-devtools", ...argv], cwd, toolName)
}
