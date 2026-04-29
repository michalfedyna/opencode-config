import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Read React warnings and errors for the active mobile workflow session.",
  args: {},
  async execute(_args, context) {
    return runReactDevtools(["errors"], context.directory, "mobile_react_errors")
  },
})
