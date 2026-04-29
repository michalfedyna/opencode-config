import { tool } from "@opencode-ai/plugin"
import { requireString, runAgentDevice } from "./mobile/_agent_device"

const directionSchema = tool.schema.enum(["up", "down", "left", "right"])

export default tool({
  description: "Scroll a list or page in one direction. Prefer this over coordinate swipes for lists.",
  args: {
    direction: directionSchema.describe("Scroll direction"),
    amount: tool.schema.number().positive().optional().describe("Relative scroll amount"),
    pixels: tool.schema.number().int().positive().optional().describe("Explicit scroll distance in pixels"),
  },
  async execute(args, context) {
    try {
      const argv = ["scroll", requireString(args.direction, "direction")]
      if (args.amount !== undefined) argv.push(String(args.amount))
      if (args.pixels !== undefined) argv.push("--pixels", String(args.pixels))
      return runAgentDevice(argv, context.directory, "mobile_scroll")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
