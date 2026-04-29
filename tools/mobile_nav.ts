import { tool } from "@opencode-ai/plugin"
import { runAgentDevice } from "./mobile/_agent_device"

const actionSchema = tool.schema.enum(["back", "back_in_app", "back_system", "home"])

export default tool({
  description: "Navigate within the app or device: back, explicit app/system back, or home.",
  args: {
    action: actionSchema.describe("Navigation action"),
  },
  async execute(args, context) {
    try {
      const argv: string[] = []
      if (args.action === "home") argv.push("home")
      else {
        argv.push("back")
        if (args.action === "back_in_app") argv.push("--in-app")
        if (args.action === "back_system") argv.push("--system")
      }
      return runAgentDevice(argv, context.directory, "mobile_nav")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
