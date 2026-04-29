import { tool } from "@opencode-ai/plugin"
import { requireExactlyOne, requireString, runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Wait for React DevTools connection or a component in the active mobile workflow session.",
  args: {
    connected: tool.schema.boolean().optional().describe("Wait until React DevTools is connected"),
    component: tool.schema.string().optional().describe("Component name to wait for"),
  },
  async execute(args, context) {
    try {
      const mode = requireExactlyOne(args, ["connected", "component"], "mobile_react_wait")
      if (mode === "connected") return runReactDevtools(["wait", "--connected"], context.directory, "mobile_react_wait")
      return runReactDevtools(["wait", "--component", requireString(args.component, "component")], context.directory, "mobile_react_wait")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
