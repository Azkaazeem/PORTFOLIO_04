import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AGENT_SYSTEM_PROMPT } from "./agent-knowledge";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(24),
});

// Azka's Agent — chat completion via the Lovable AI gateway (key stays server-side).
export const askAgent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { reply: "The assistant is not connected yet. Please try again later." };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: AGENT_SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        return { reply: "Too many messages right now. Please wait a moment and ask again." };
      }
      return { reply: "Sorry, I could not answer that right now. Please try again." };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    return {
      reply: json.choices?.[0]?.message?.content ?? "Sorry, I did not understand that.",
    };
  });
