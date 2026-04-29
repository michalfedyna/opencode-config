import { tool } from "@opencode-ai/plugin"
import { addSelectorSnapshotFlags, requireExactlyOne, requireNumber, requireString, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Wait for UI text, a selector/@ref, or an explicit duration. Prefer text/element over sleeps.",
  args: {
    text: tool.schema.string().optional().describe("Text to wait for"),
    element: tool.schema.string().optional().describe("Selector or @ref to wait for"),
    durationMs: tool.schema.number().int().positive().optional().describe("Explicit sleep duration in milliseconds"),
    depth: tool.schema.number().int().optional().describe("Selector snapshot depth"),
    scope: tool.schema.string().optional().describe("Selector snapshot scope"),
    raw: tool.schema.boolean().optional().describe("Raw selector snapshot output"),
  },
  async execute(args, context) {
    try {
      const mode = requireExactlyOne(args, ["text", "element", "durationMs"], "mobile_wait")
      const argv: string[] = ["wait"]
      if (mode === "text") {
        argv.push("text", requireString(args.text, "text"))
        addSelectorSnapshotFlags(argv, args)
      } else if (mode === "element") {
        argv.push(requireString(args.element, "element"))
        addSelectorSnapshotFlags(argv, args)
      } else argv.push(String(requireNumber(args.durationMs, "durationMs")))
      return runAgentDevice(argv, context.directory, "mobile_wait")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
