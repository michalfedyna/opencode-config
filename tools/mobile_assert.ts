import { tool } from "@opencode-ai/plugin"
import { addSelectorSnapshotFlags, requireString, runAgentDevice } from "./mobile/_agent_device"

const predicateSchema = tool.schema.enum(["visible", "hidden", "exists", "editable", "selected", "text"])

export default tool({
  description: "Assert UI state for a selector. Use text predicate with an expected value.",
  args: {
    predicate: predicateSchema.describe("Assertion predicate"),
    selector: tool.schema.string().describe("Selector expression to assert"),
    value: tool.schema.string().optional().describe("Expected value for predicate=text"),
    depth: tool.schema.number().int().optional().describe("Selector snapshot depth"),
    scope: tool.schema.string().optional().describe("Selector snapshot scope"),
    raw: tool.schema.boolean().optional().describe("Raw selector snapshot output"),
  },
  async execute(args, context) {
    try {
      const argv = ["is", args.predicate, requireString(args.selector, "selector")]
      if (args.predicate === "text") argv.push(requireString(args.value, "value"))
      addSelectorSnapshotFlags(argv, args)
      return runAgentDevice(argv, context.directory, "mobile_assert")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
