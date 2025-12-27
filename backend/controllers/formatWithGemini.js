
import { ai, MODEL_NAME } from "../chatbotConfig/gemini.js";

export const formatWithGemini = async (tool, toolResult) => {
const prompt = `
You are a UI formatter for a chat application.

Your task:
Generate clean, readable HTML suitable for rendering in a chat UI.

Output rules (VERY IMPORTANT):
- ALWAYS return ONLY valid HTML.
-Price must be in INR.

- NEVER return Markdown or plain text.
- NEVER wrap output in code blocks.
- NEVER include explanations outside HTML.

Two scenarios:

1) When JSON data IS PROVIDED:
- Convert the JSON data into well-structured HTML.
- Use only these safe HTML tags: h2, h3, p, ul, li, strong, b, em, br.
- Use h2 or smaller headings only.
- Use bullet points (<ul><li>) for lists.
- Highlight totals and important values using <strong>.
- Use relevant emojis to improve readability.
- Do NOT invent, modify, or omit any data.

2) When JSON data IS NOT PROVIDED or is empty:
- Respond as a normal conversational assistant.
- Still return the response in HTML format.
- Use <p>, <strong>, and emojis where appropriate.
- Example: food recommendations, greetings, confirmations.

General restrictions:
- Do NOT use HTML attributes.
- Do NOT use inline styles.
- Do NOT use script, iframe, img, link, or anchor tags.
- Do NOT use escape sequences like \\n.
- Keep responses concise and user-friendly.

Context:
Tool name: ${tool}

Input JSON (may be null or empty):
${JSON.stringify(toolResult, null, 2)}

Final instruction:
Return ONLY the final HTML output.
`;



  const result = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return result.candidates[0].content.parts
    .map((p) => p.text || "")
    .join("")
    .trim();
};
