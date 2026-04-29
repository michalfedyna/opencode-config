import { tool } from "@opencode-ai/plugin";
import { requireString, runAgentDevice } from "./mobile/_agent_device";

export default tool({
  description:
    "Tap/click or press one UI target by selector or fresh @ref. Use mobile_tap_coordinates only as coordinate fallback.",
  args: {
    element: tool.schema
      .string()
      .describe(
        "Selector or fresh @ref from mobile_snapshot interactive:true.",
      ),
    press: tool.schema
      .boolean()
      .optional()
      .describe("Use agent-device press instead of click"),
  },
  async execute(args, context) {
    try {
      const argv = [args.press ? "press" : "click"];
      argv.push(requireString(args.element, "element"));
      return runAgentDevice(argv, context.directory, "mobile_tap");
    } catch (err) {
      return err instanceof Error ? err.message : String(err);
    }
  },
});
