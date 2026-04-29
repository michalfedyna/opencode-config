import { tool } from "@opencode-ai/plugin"
import { requireString, runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Find React components by name in the active mobile workflow session.",
  args: {
    component: tool.schema.string().describe("Component name to find"),
    exact: tool.schema.boolean().optional().describe("Use exact component name matching"),
  },
  async execute(args, context) {
    try {
      const argv = ["find", requireString(args.component, "component")]
      if (args.exact) argv.push("--exact")
      return runReactDevtools(argv, context.directory, "mobile_react_find")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
