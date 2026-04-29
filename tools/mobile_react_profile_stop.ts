import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Stop React render profiling for the active mobile workflow session.",
  args: {},
  async execute(_args, context) {
    return runReactDevtools(["profile", "stop"], context.directory, "mobile_react_profile_stop")
  },
})
