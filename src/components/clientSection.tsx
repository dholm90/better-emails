"use client";

import { FormEvent, MouseEvent, useState } from "react";

export default function ClientSection() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")

  const [response, setResponse] = useState<String>("");
  const prompt = `Rewrite this email using a happy, friendly business tone: ${email}`

  // const prompt = `Create an explainer video script and storyboard for ${name} using this procedure: Generate a script about how using ${name}, which is ${description}, can help with ${pain} and benefit the customer by ${benefit}. The target market is ${target}. The tone of the explainer video script is ${tone}.`

  const generateResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-2 max-w-xl" >
      <form className="flex flex-col gap-2" onSubmit={(e) => generateResponse(e)}>


        <div className="flex flex-col items-center gap-2 font-mono md:flex-row">
          <div className="bg-neuborder-neutral-900 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
            <div className="text-2xl text-neutral-50 dark:text-neutral-900">
              1
            </div>
          </div>
          <p className="font-bold">
            Paste or type the email you want to rewrite here.
          </p>
        </div>
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rows={12}
          maxLength={1000}
          className="focus:ring-neu w-full rounded-md border border-neutral-400
         p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
          placeholder={"e.g. Dear Lucy, This project you just did is horrendous, could you try to get better and do it again?"}
          required
        />

        {
          !loading ? (
            <button
              className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
              // onClick={(e) => generateResponse(e)}
              type="submit"
            >

              Generate Response &rarr;
            </button>

          ) : (
            <button
              disabled
              className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
            >
              <div className="animate-pulse font-bold tracking-widest">...</div>
            </button>
          )
        }
        {
          response && (
            <pre className="text-left mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100">
              {response}
            </pre>
          )
        }
      </form >
    </div >
  );
}