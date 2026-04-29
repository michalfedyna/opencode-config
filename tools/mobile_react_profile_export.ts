import { tool } from "@opencode-ai/plugin"
import { requireString, runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Export the latest active-session React profile to a JSON file.",
  args: {
    file: tool.schema.string().describe("Output profile JSON path"),
  },
  async execute(args, context) {
    try {
      return runReactDevtools(["profile", "export", requireString(args.file, "file")], context.directory, "mobile_react_profile_export")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
