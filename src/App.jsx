import { useEffect, useState } from "react";
import {motion, AnimatePresence} from 'framer-motion'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true)

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setShow(false);
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      setTimeout(() => {
        setQuote({ content: data.quote, author: data.author });
      setShow(true);
      setLoading(false);
      }, 300);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setLoading(false);
    }
  };
  //fetch quote when the app first load
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          Random Quote Generator
        </h1>
        <AnimatePresence mode="wait">
          {loading ? (
          <motion.p 
          key="loading"
          initial={{opacity:0}}
          animate={{opacity: 1}}
          exit={{opacity:0}}
          className="text-gray-500 mb-6 italic">Loading...</motion.p>
        ) : (
          show && ( 
          <motion.div
          key={quote.content}
          initial={{opacity:0,y:20}}
          animate={{opacity:1, y:0}}
          exit={{opacity:0 , y:-20}}
          >
            <p className="text-lg text-gray-700 italic mb-3 ">{quote.content}</p>
            <p className="text-sm text-gray-500 mb-6">{quote.author}</p>
          </motion.div>
            
          
        )
        )}
        </AnimatePresence>
        <button
              onClick={fetchQuote}
              className="text-white bg-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-900 transition"
            >
              New Quote
            </button>
      </div>
    </div>
  );
}

export default App;
