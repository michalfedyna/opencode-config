import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Count React components in the active mobile workflow session.",
  args: {},
  async execute(_args, context) {
    return runReactDevtools(["count"], context.directory, "mobile_react_count")
  },
})
