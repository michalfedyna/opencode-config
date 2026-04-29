import { tool } from "@opencode-ai/plugin"
import { runAgentDevice } from "./mobile/_agent_device"

const topicSchema = tool.schema.enum(["overview", "loop", "inspect", "errors", "profiling", "cli"])

const guide = `# Mobile React DevTools guide

Use these tools only inside an active mobile workflow started with mobile_start. They use the active/default Agent Device session; do not pass session, platform, udid, serial, or stateDir.

Inspection loop:
1. mobile_react_status to check connection state.
2. mobile_react_wait connected if the app is not connected yet.
3. mobile_react_tree to inspect the component tree.
4. mobile_react_find to locate a component, then mobile_react_component for props/state/hooks.
5. mobile_react_errors for React warnings and errors.

Profiling loop:
1. mobile_react_profile_start.
2. Perform the smallest relevant mobile interaction.
3. mobile_react_profile_stop.
4. Inspect with mobile_react_profile_slow, mobile_react_profile_rerenders, mobile_react_profile_report, or mobile_react_profile_timeline.`

export default tool({
  description: "Return guidance for focused mobile_react_* tools and their active-session usage loop.",
  args: {
    topic: topicSchema.optional().describe("Optional React DevTools guide topic"),
  },
  async execute(args, context) {
    if (args.topic === "cli") return runAgentDevice(["help", "react-devtools"], context.directory, "mobile_react_help")
    if (!args.topic || args.topic === "overview") return guide
    if (args.topic === "loop") return "Start with mobile_start, inspect status/wait, use tree/find/component/errors for internals, profile narrowly with profile_start -> mobile interaction -> profile_stop -> profile summaries, then mobile_end."
    if (args.topic === "inspect") return "Use mobile_react_tree for structure, mobile_react_find to locate components, mobile_react_component for props/state/hooks, and mobile_react_count for component counts."
    if (args.topic === "errors") return "Use mobile_react_errors when React warnings or runtime errors are relevant. Pair with mobile UI evidence when diagnosing visible failures."
    return "Profile narrowly: mobile_react_profile_start, perform one focused mobile interaction, mobile_react_profile_stop, then inspect slow components, rerenders, reports, timeline, export, or diff."
  },
})
