import { tool } from "@opencode-ai/plugin"
import { runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "End the active mobile workflow, close the Agent Device session, and write the recorded replay script.",
  args: {
    shutdown: tool.schema.boolean().optional().describe("Shut down simulator/emulator after closing when supported"),
  },
  async execute(args, context) {
    try {
      const argv = ["close"]
      if (args.shutdown) argv.push("--shutdown")
      return runAgentDevice(argv, context.directory, "mobile_end")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
