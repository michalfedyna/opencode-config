import { tool } from "@opencode-ai/plugin"
import { runAgentDevice } from "./mobile/_agent_device"

const actionSchema = tool.schema.enum(["status", "get", "dismiss"])

export default tool({
  description: "Inspect or dismiss the device keyboard.",
  args: {
    action: actionSchema.describe("Keyboard action"),
  },
  async execute(args, context) {
    try {
      const argv = ["keyboard", args.action]
      return runAgentDevice(argv, context.directory, "mobile_keyboard")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
