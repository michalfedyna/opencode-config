import { tool } from "@opencode-ai/plugin"
import { requireString, runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Compare two exported React profiles.",
  args: {
    before: tool.schema.string().describe("Before profile JSON path"),
    after: tool.schema.string().describe("After profile JSON path"),
    limit: tool.schema.number().int().positive().optional().describe("Maximum diff rows"),
    threshold: tool.schema.number().optional().describe("Diff threshold percentage"),
  },
  async execute(args, context) {
    try {
      const argv = ["profile", "diff", requireString(args.before, "before"), requireString(args.after, "after")]
      if (args.limit !== undefined) argv.push("--limit", String(args.limit))
      if (args.threshold !== undefined) argv.push("--threshold", String(args.threshold))
      return runReactDevtools(argv, context.directory, "mobile_react_profile_diff")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
