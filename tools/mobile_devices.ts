import { tool } from "@opencode-ai/plugin"
import { addCommonFlags, platformSchema, runAgentDevice } from "./mobile/_agent_device"

const actionSchema = tool.schema.enum(["devices", "apps", "apps_user_installed", "appstate"])

export default tool({
  description: "Discover devices, installed apps, and foreground app state for Agent Device.",
  args: {
    action: actionSchema.optional().describe("Discovery action; defaults to devices"),
    platform: platformSchema.optional().describe("Target platform"),
  },
  async execute(args, context) {
    try {
      const argv: string[] = []
      switch (args.action ?? "devices") {
        case "devices":
          argv.push("devices")
          break
        case "apps":
          argv.push("apps")
          break
        case "apps_user_installed":
          argv.push("apps", "--user-installed")
          break
        case "appstate":
          argv.push("appstate")
          break
      }
      addCommonFlags(argv, args)
      return runAgentDevice(argv, context.directory, "mobile_devices")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
