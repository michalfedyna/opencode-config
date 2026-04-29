import { tool } from "@opencode-ai/plugin"
import { runAgentDevice } from "./mobile/_agent_device"

export default tool({
  description: "Capture a visual screenshot artifact, optionally annotated with current refs.",
  args: {
    path: tool.schema.string().optional().describe("Optional output path, prefer temporary locations"),
    overlayRefs: tool.schema.boolean().optional().describe("Overlay current @refs on the screenshot"),
  },
  async execute(args, context) {
    try {
      const argv = ["screenshot"]
      if (args.path) argv.push(args.path)
      if (args.overlayRefs) argv.push("--overlay-refs")
      return runAgentDevice(argv, context.directory, "mobile_screenshot")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
