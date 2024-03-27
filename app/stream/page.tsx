"use client";

import { useCompletion } from "ai/react";

export default function Completion() {
  const {
    completion,
    input,
    handleInputChange,
    stop,
    isLoading,
    handleSubmit,
    error,
  } = useCompletion({
    api: "/api/generate",
    body: {
      systemInput: "you are a sport personal trainer expert",
    },
  });
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <h4 className="text-xl font-bold text-gray-900 md:text-xl pb-4">
        useCompletion Example
      </h4>
      {error && (
        <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
          {error.message}
        </div>
      )}
      <output>{completion}</output>
      <form
        onSubmit={handleSubmit}
        className="fixed w-full max-w-xl bottom-0 mb-8 items-stretch flex"
      >
        <input
          className="border text-black border-gray-300 rounded m-2 shadow-xl p-2 flex-grow"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="inline-block bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded m-2 disabled:opacity-50"
        >
          Send
        </button>
        <button
          disabled={!isLoading}
          type="button"
          onClick={stop}
          className="inline-block bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded m-2 disabled:opacity-50"
        >
          Stop
        </button>
      </form>
    </div>
  );
}
