import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Check React DevTools connection/status for the active mobile workflow session.",
  args: {},
  async execute(_args, context) {
    return runReactDevtools(["status"], context.directory, "mobile_react_status")
  },
})
