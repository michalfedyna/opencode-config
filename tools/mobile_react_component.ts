import { tool } from "@opencode-ai/plugin"
import { requireString, runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Inspect one React component's props/state/hooks by @c ref or id.",
  args: {
    idOrRef: tool.schema.string().describe("Component @c ref or numeric id"),
  },
  async execute(args, context) {
    try {
      return runReactDevtools(["get", "component", requireString(args.idOrRef, "idOrRef")], context.directory, "mobile_react_component")
    } catch (err) {
      return err instanceof Error ? err.message : String(err)
    }
  },
})
