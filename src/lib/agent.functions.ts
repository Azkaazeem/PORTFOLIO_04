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

// Azka's Agent — chat completion using Gemini API directly
export const askAgent = createServerFn({ method: "POST" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Check .env (Vite server context) or process.env
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return { reply: "The assistant is not connected yet. Please provide a Gemini API key." };
    }

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: AGENT_SYSTEM_PROMPT }]
          },
          contents: data.messages.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }))
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          return { reply: "Too many messages right now. Please wait a moment and ask again." };
        }
        console.error("Gemini API Error:", await res.text());
        return { reply: "Sorry, I could not answer that right now. Please try again." };
      }

      const json = await res.json();
      const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return {
        reply: reply || "Sorry, I did not understand that.",
      };
    } catch (err) {
      console.error(err);
      return { reply: "Sorry, there was a network error. Please try again." };
    }
  });
