import { tool } from "@opencode-ai/plugin"
import { requireString, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Replace text in a targeted field by selector or fresh @ref. Use mobile_fill_coordinates only as coordinate fallback.",
  args: {
    text: tool.schema.string().describe("Replacement text"),
    element: tool.schema.string().describe("Selector or fresh @ref from mobile_snapshot interactive:true"),
    delayMs: tool.schema.number().int().nonnegative().optional().describe("Delay between typed characters"),
  },
  async execute(args, context) {
    try {
      const argv = ["fill"]
      argv.push(requireString(args.element, "element"), requireString(args.text, "text"))
      if (args.delayMs !== undefined && args.delayMs > 0) argv.push("--delay-ms", String(args.delayMs))
      return runAgentDevice(argv, context.directory, "mobile_fill")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
