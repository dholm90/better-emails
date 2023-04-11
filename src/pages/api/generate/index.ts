import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openAIStream";


if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export default async function POST(req: Request): Promise<Response> {


  const { prompt } = (await req.json()) as {
    prompt?: string;
  };
  const systemMessage = 'You are an expert in business communications. You will rewrite the emails recieved according to business communications best practices. Take it step by step.'

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: systemMessage }, { role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}



