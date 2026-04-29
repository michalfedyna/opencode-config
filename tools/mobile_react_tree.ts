import { tool } from "@opencode-ai/plugin"
import { runReactDevtools } from "./mobile/_agent_device"

export default tool({
  description: "Inspect the React component tree for the active mobile workflow session.",
  args: {
    root: tool.schema.string().optional().describe("Optional component @c ref or root id"),
    depth: tool.schema.number().int().optional().describe("Tree depth"),
    all: tool.schema.boolean().optional().describe("Include host components"),
    maxLines: tool.schema.number().int().positive().optional().describe("Maximum tree lines"),
  },
  async execute(args, context) {
    const argv = ["get", "tree"]
    if (args.root) argv.push(args.root)
    if (args.depth !== undefined) argv.push("--depth", String(args.depth))
    if (args.all) argv.push("--all")
    if (args.maxLines !== undefined) argv.push("--max-lines", String(args.maxLines))
    return runReactDevtools(argv, context.directory, "mobile_react_tree")
  },
})
