import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "It’s not whether you get knocked down, it’s whether you get up.",
    author: "Vince Lombardi",
  },
  {
    text: "If you are working on something exciting, it will keep you motivated.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett",
  },
];

function App() {
  const [quote, setQuote] = useState(quotes[0]);
  const generatQuote = () => {
    const randomQuote = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomQuote]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          Random Quote Generator
        </h1>
        <p className="text-lg text-gray-700 italic mb-3 ">{quote.text}</p>
        <p className="text-sm text-gray-500 mb-6">{quote.author}</p>
        <button
        onClick={generatQuote}
         className="text-white bg-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-900 transition">
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
