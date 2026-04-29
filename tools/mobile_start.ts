import { tool } from "@opencode-ai/plugin"
import { addCommonFlags, platformSchema, requireString, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Start a mobile workflow: open an app, URL, or deep link and enable replay recording. Call mobile_end when finished.",
  args: {
    target: tool.schema.string().describe("App id/name, URL, or deep link to open"),
    url: tool.schema.string().optional().describe("Optional secondary URL for app deep links"),
    relaunch: tool.schema.boolean().optional().describe("Terminate before opening"),
    saveScript: tool.schema.string().optional().describe("Optional .ad replay output path. Omit for Agent Device's default sessions path. Prefer working directory."),
    platform: platformSchema.optional().describe("Target platform"),
    udid: tool.schema.string().optional().describe("iOS device UDID for initial targeting"),
    serial: tool.schema.string().optional().describe("Android device serial for initial targeting"),
  },
  async execute(args, context) {
    try {
      const argv = ["open", requireString(args.target, "target")]
      if (args.url) argv.push(args.url)
      if (args.relaunch) argv.push("--relaunch")
      if (args.saveScript) argv.push("--save-script", args.saveScript)
      else argv.push("--save-script")
      addCommonFlags(argv, args)
      const output = await runAgentDevice(argv, context.directory, "mobile_start")
      return `${output}\n\nMobile workflow started with replay recording enabled. Call mobile_end when finished to close the session and write the .ad replay script.`.trim()
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
