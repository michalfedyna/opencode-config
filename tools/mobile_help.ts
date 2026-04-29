import { tool } from "@opencode-ai/plugin"

const topicSchema = tool.schema.enum(["overview", "loop", "targeting", "input", "inspection", "verification", "react"])

const guide = `# Mobile tools guide

Use these focused mobile tools only from the mobile-tester subagent.

Important: call mobile_help before starting a mobile workflow or before the first mobile_* call.

- Discovery/lifecycle/navigation: mobile_devices, mobile_start, mobile_end, mobile_nav.
- Inspection/evidence: mobile_snapshot, mobile_screenshot, mobile_read.
- Input/movement: mobile_tap, mobile_fill, mobile_tap_coordinates, mobile_fill_coordinates, mobile_type, mobile_scroll, mobile_swipe, mobile_keyboard.
- Verification: mobile_wait, mobile_assert.
- React Native internals/profiling: mobile_react_help, mobile_react_status, mobile_react_wait, mobile_react_tree, mobile_react_find, mobile_react_component, mobile_react_errors, mobile_react_profile_*.

Default loop:
1. Discover with mobile_devices when the target is unknown.
2. Start the workflow with mobile_start. This opens the app or URL and enables replay recording.
3. Inspect with mobile_snapshot. Use interactive: true when you need @refs.
4. Act with mobile_tap/mobile_fill by element, mobile_type, mobile_scroll, or mobile_nav. Use mobile_tap_coordinates/mobile_fill_coordinates or mobile_swipe only for coordinate fallback gestures.
5. Verify with mobile_wait, mobile_assert, mobile_read, mobile_snapshot, or mobile_screenshot.
6. End with mobile_end. This closes the session and writes the .ad replay script.

Rules:
- Use platform/udid/serial only on mobile_start for initial targeting. Post-start tools intentionally do not expose session, udid, or serial.
- Use mobile_devices only for discovery before mobile_start.
- Prefer selectors or @refs over raw coordinates. mobile_tap/mobile_fill are element-only; coordinate fallback requires mobile_tap_coordinates/mobile_fill_coordinates with coordinateReason.
- Re-run mobile_snapshot with interactive: true after mutations before reusing refs.
- Use mobile_fill to replace targeted text; use mobile_type to append to the focused field.
- Use mobile_scroll for lists; use mobile_swipe only for coordinate gestures and carousels.
- Use mobile_snapshot diff for structural changes between mutations.
- Use mobile_screenshot path for image output, and overlayRefs for visual ref evidence.
- Use mobile_wait durationMs only for explicit sleeps; prefer text or element waits.
- Use focused mobile_react_* tools only when component tree, props/state/hooks, warnings, slow renders, or rerender causes are needed. They use the active mobile workflow session.
- Only one active mobile workflow is supported in this simplified API. Do not parallelize mutating mobile commands.`

export default tool({
  description: "Return guidance for choosing and sequencing the mobile_* tools.",
  args: {
    topic: topicSchema.optional().describe("Optional guide topic to focus on"),
  },
  async execute(args) {
    if (!args.topic || args.topic === "overview") return guide
    if (args.topic === "loop") {
      return `Default mobile loop:\n1. mobile_devices if discovery is needed.\n2. mobile_start target=<app|url|deeplink> to open and enable replay recording.\n3. mobile_snapshot with interactive: true for @refs.\n4. Act with mobile_tap/mobile_fill by element, mobile_type, mobile_scroll, or mobile_nav. Use mobile_tap_coordinates/mobile_fill_coordinates or mobile_swipe only for coordinate fallback gestures.\n5. Verify with mobile_wait/mobile_assert/mobile_read or another snapshot.\n6. mobile_end when done to close and write the .ad replay.`
    }
    if (args.topic === "targeting") {
      return "Call mobile_start first. Prefer selectors or @refs over raw coordinates. Use mobile_snapshot with interactive: true to get fresh refs, and re-snapshot after mutations before reusing refs. mobile_tap/mobile_fill are element-only. If coordinates are unavoidable, use mobile_tap_coordinates/mobile_fill_coordinates with coordinateReason explaining why selector/ref targeting was unavailable or unreliable. Post-start tools do not accept session/udid/serial."
    }
    if (args.topic === "input") {
      return "Use mobile_tap for tapping/pressing by element, mobile_fill to replace targeted text by element, mobile_type to append to the focused field, mobile_scroll for lists, and mobile_keyboard dismiss before system back when dismissing keyboards. Use mobile_tap_coordinates/mobile_fill_coordinates only when element targeting is unavailable; coordinate tools require coordinateReason. Use mobile_swipe only for coordinate gestures."
    }
    if (args.topic === "verification") {
      return "Prefer mobile_wait text/element and mobile_assert over sleeps. Use mobile_read for one element's text/attrs. Use durationMs only for explicit sleeps."
    }
    if (args.topic === "react") {
      return "React tools use the active mobile workflow session. Loop: mobile_react_status, mobile_react_wait connected if needed, mobile_react_tree/mobile_react_find/mobile_react_component for props/state/hooks, mobile_react_errors for warnings/errors. For profiling, use mobile_react_profile_start, perform the mobile interaction, mobile_react_profile_stop, then mobile_react_profile_slow/mobile_react_profile_rerenders/mobile_react_profile_report/mobile_react_profile_timeline."
    }
    return "Use mobile_snapshot for structured state, diff snapshots for structural changes, mobile_read for element text/attrs, and mobile_screenshot with overlayRefs when visual evidence is needed."
  },
})
