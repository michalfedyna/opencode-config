import { tool } from "@opencode-ai/plugin"
import { requireNumber, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Perform a coordinate swipe gesture. Use only when selector/ref actions or mobile_scroll are insufficient.",
  args: {
    x1: tool.schema.number().describe("Swipe start X coordinate"),
    y1: tool.schema.number().describe("Swipe start Y coordinate"),
    x2: tool.schema.number().describe("Swipe end X coordinate"),
    y2: tool.schema.number().describe("Swipe end Y coordinate"),
    durationMs: tool.schema.number().int().positive().optional().describe("Swipe duration in milliseconds"),
  },
  async execute(args, context) {
    try {
      const argv = [
        "swipe",
        String(requireNumber(args.x1, "x1")),
        String(requireNumber(args.y1, "y1")),
        String(requireNumber(args.x2, "x2")),
        String(requireNumber(args.y2, "y2")),
      ]
      if (args.durationMs !== undefined) argv.push(String(args.durationMs))
      return runAgentDevice(argv, context.directory, "mobile_swipe")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
