import { tool } from "@opencode-ai/plugin"
import { requireString, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Type text into the currently focused field without clearing it.",
  args: {
    text: tool.schema.string().describe("Text to type into the focused field"),
    delayMs: tool.schema.number().int().nonnegative().optional().describe("Delay between typed characters"),
  },
  async execute(args, context) {
    try {
      const argv = ["type", requireString(args.text, "text")]
      if (args.delayMs !== undefined && args.delayMs > 0) argv.push("--delay-ms", String(args.delayMs))
      return runAgentDevice(argv, context.directory, "mobile_type")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
