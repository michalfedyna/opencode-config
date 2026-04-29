import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Show the React profiling timeline for the latest active-session profile.",
  args: {
    limit: tool.schema.number().int().positive().optional().describe("Maximum timeline rows"),
  },
  async execute(args, context) {
    const argv = ["profile", "timeline"]
    if (args.limit !== undefined) argv.push("--limit", String(args.limit))
    return runReactDevtools(argv, context.directory, "mobile_react_profile_timeline")
  },
})
