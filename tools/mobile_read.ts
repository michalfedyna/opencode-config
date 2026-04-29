import { tool } from "@opencode-ai/plugin"
import { addSelectorSnapshotFlags, requireString, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Read exposed text or attributes from one UI element by selector or @ref.",
  args: {
    element: tool.schema.string().describe("Selector or @ref target"),
    attrs: tool.schema.boolean().optional().describe("Read attributes instead of text"),
    depth: tool.schema.number().int().optional().describe("Selector snapshot depth"),
    scope: tool.schema.string().optional().describe("Selector snapshot scope"),
    raw: tool.schema.boolean().optional().describe("Raw selector snapshot output"),
  },
  async execute(args, context) {
    try {
      const argv = ["get", args.attrs ? "attrs" : "text", requireString(args.element, "element")]
      addSelectorSnapshotFlags(argv, args)
      return runAgentDevice(argv, context.directory, "mobile_read")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
