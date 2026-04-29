import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Start React render profiling for a narrow active-session mobile interaction.",
  args: {},
  async execute(_args, context) {
    return runReactDevtools(["profile", "start"], context.directory, "mobile_react_profile_start")
  },
})
