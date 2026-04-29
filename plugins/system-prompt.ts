import type { Plugin } from "@opencode-ai/plugin"

const GPT_PROMPT_START = "You are OpenCode, You and the user share the same workspace and collaborate to achieve the user's goals."
const DYNAMIC_CONTEXT_START = "\nYou are powered by the model named "

export const SystemPromptPlugin: Plugin = async () => {
  const prompt = await Bun.file(new URL("../new-system-prompt.md", import.meta.url)).text()

  return {
    "experimental.chat.system.transform": async (_input, output) => {
      const current = output.system[0]
      if (!current?.startsWith(GPT_PROMPT_START)) return

      const contextIndex = current.indexOf(DYNAMIC_CONTEXT_START)
      output.system[0] = contextIndex === -1 ? prompt : `${prompt}${current.slice(contextIndex)}`
    },
  }
}
