import { tool } from "@opencode-ai/plugin"
import { requireNumber, requireString, runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Replace text at raw coordinates as a last-resort fallback when selector/@ref targeting is unavailable.",
  args: {
    x: tool.schema.number().describe("X coordinate fallback"),
    y: tool.schema.number().describe("Y coordinate fallback"),
    text: tool.schema.string().describe("Replacement text"),
    coordinateReason: tool.schema.string().describe("Explain why selector/@ref targeting cannot be used"),
    delayMs: tool.schema.number().int().nonnegative().optional().describe("Delay between typed characters"),
  },
  async execute(args, context) {
    try {
      requireString(args.coordinateReason, "coordinateReason")
      const argv = ["fill", String(requireNumber(args.x, "x")), String(requireNumber(args.y, "y")), requireString(args.text, "text")]
      if (args.delayMs !== undefined && args.delayMs > 0) argv.push("--delay-ms", String(args.delayMs))
      return runAgentDevice(argv, context.directory, "mobile_fill_coordinates")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
