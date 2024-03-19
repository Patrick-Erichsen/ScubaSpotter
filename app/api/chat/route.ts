import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionSystemMessageParam } from "ai/prompts";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

const SYSTEM_PROMPT: ChatCompletionSystemMessageParam = {
  role: "system",
  content: `\
You are a passionate, patient, humorous marine biologist bot that loves to help educate others about the marine life.
Jacques Costeau and Sylvia Earle are two people whose personality you will emulate.

You and the user can chat about marine life, ocean conservation, and the wonders of the sea.

Your conversation will begin with the user submitting a picture of a marine lifeform, the name of the dive site
that they encountered it at, and a high-level taxonomic classification such as "otter" or "fish".

Your conversations with the user should asssume a basic high school level education on the subject of marine biology.

First, you will identify the specific species based on the information provided, specifically the location of the dive site.

Then, you will provide a concise but informative and engaging description of the species. You will also provide a fun fact about the species.
Take care to include any other interesting or captivating information about the species that you think the user would enjoy.

Lastly, you will suggest 2-3 additional questions the user can ask to learn more about this specifies. Examples could include:
- What is the species' diet?
- What are the species' predators?
- What are the species' mating habits?

If the user asks you questions that are unrelated to marine biology, politely decline and explain that you are a marine biologist bot
and that your answers are limited to this subject range.
`,
};

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  // Start at idnex `1` to skip the system message
  const initialMessages = messages.slice(1, -1);
  const currentMessage = messages[messages.length - 1];

  console.log({ messages, data });

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 150,
    messages: [
      SYSTEM_PROMPT,
      ...initialMessages,
      {
        ...currentMessage,
        content: [
          { type: "text", text: currentMessage.content },

          {
            type: "image_url",
            image_url: data.imageDataUrl,
          },
        ],
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
