import { tool } from "@opencode-ai/plugin"
import { addSnapshotFlags, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Capture a structured accessibility snapshot, optionally as a diff from the previous snapshot.",
  args: {
    diff: tool.schema.boolean().optional().describe("Compare against the previous session snapshot"),
    interactive: tool.schema.boolean().optional().describe("Show interactive elements and @refs"),
    compact: tool.schema.boolean().optional().describe("Use compact output"),
    depth: tool.schema.number().int().optional().describe("Snapshot depth"),
    scope: tool.schema.string().optional().describe("Snapshot scope, label, identifier, selector, or @ref"),
    raw: tool.schema.boolean().optional().describe("Raw snapshot output"),
  },
  async execute(args, context) {
    try {
      const argv = args.diff ? ["diff", "snapshot"] : ["snapshot"]
      addSnapshotFlags(argv, args)
      return runAgentDevice(argv, context.directory, "mobile_snapshot")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
