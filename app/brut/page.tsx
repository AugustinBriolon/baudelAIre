"use client";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    try {
      // check if prompt is empty

      e.preventDefault();
      setResponse("");

      // make a POST call to our api route
      let res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userInput: prompt,
          systemInput: "you are a sport personal trainer expert",
        }),
      });

      if (!res.ok || !res.body) return;

      // Read the response as a stream
      // Read the response as a stream
      const reader = res.body.getReader();

      // Create a new TextDecoder instance to decode the stream
      const decoder = new TextDecoder();
      let finalResult = "";

      // Use a loop to read through the stream
      while (true) {
        const { value, done } = await reader.read();

        // Decode the stream's value
        const text = decoder.decode(value);
        finalResult += text;
        setResponse(finalResult);

        // If the stream is finished, break out of the loop
        if (done) {
          console.log("Stream finished");
          break;
        }
      }
    } catch (error) {
      //alert(`error: ${error}`);
    }
  };

  return (
    <main className="text-black">
      <Head>
        <title>DataStream</title>
      </Head>
      <h1
        className={
          "w-full py-4 bg-blue-400 text-center font-semibold text-3xl text-white"
        }
      >
        Data Stream
      </h1>
      <div
        className={
          "px-4 md:px-0 max-w-3xl mx-auto mt-20 flex flex-col justify-center items-center"
        }
      >
        <form
          onSubmit={handleSubmit}
          className={"w-[80%] space-y-2 flex flex-col mr-auto"}
        >
          <label htmlFor={"prompt"}>Enter a prompt</label>
          <input
            id={"prompt"}
            name={"prompt"}
            type={"text"}
            onChange={handleChange}
            className={
              "border border-purple-500 py-2 px-4 rounded-md text-black"
            }
            placeholder={"Type here..."}
            autoComplete={"off"}
          />
          <div className={"text-right"}>
            <button
              type={"submit"}
              className={
                "px-2 py-1 bg-blue-400 rounded-md text-white disabled:bg-blue-300 hover:bg-blue-500 disabled:cursor-not-allowed"
              }
            >
              Submit
            </button>
          </div>
        </form>
        <div
          className={
            "h-48 mt-4 w-full p-4 border border-purple-500 rounded-md overflow-auto"
          }
        >
          {response ? (
            response
          ) : (
            <h2 className={"h-full flex justify-center items-center"}>
              No Response
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}
