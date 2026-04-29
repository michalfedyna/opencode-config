import { tool } from "@opencode-ai/plugin";
import {
  requireNumber,
  requireString,
  runAgentDevice,
} from "./mobile/_agent_device";

export default tool({
  description:
    "Tap/click or press raw coordinates as a last-resort fallback when selector/@ref targeting is unavailable.",
  args: {
    x: tool.schema.number().describe("X coordinate fallback"),
    y: tool.schema.number().describe("Y coordinate fallback"),
    coordinateReason: tool.schema
      .string()
      .describe("Explain why selector/@ref targeting cannot be used"),
    press: tool.schema
      .boolean()
      .optional()
      .describe("Use agent-device press instead of click"),
  },
  async execute(args, context) {
    try {
      requireString(args.coordinateReason, "coordinateReason");
      const argv = [
        args.press ? "press" : "click",
        String(requireNumber(args.x, "x")),
        String(requireNumber(args.y, "y")),
      ];
      return runAgentDevice(argv, context.directory, "mobile_tap_coordinates");
    } catch (err) {
      return err instanceof Error ? err.message : String(err);
    }
  },
});
