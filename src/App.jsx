import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState(()=>{
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : []
  });

  //load favorites from localStorage
  // useEffect(() => {
  //   const saved = JSON.parse(localStorage.getItem("favorites")) || [];
  //   setFavorites(saved);
  // }, []);

  //Save favorites to localStorage
  useEffect(() => {
   
      localStorage.setItem("favorites", JSON.stringify(favorites));
    
  }, [favorites]);

  //fetch a random quote from the API
  const fetchQuote = async () => {
    try {
      setLoading(true);
      setShow(false); //trigger exit animation
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      //wait for animation before showing new quote
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
  //Copied to Clipboard
  const copyQuote = async () => {
    const text = `"${quote.content} - ${quote.author}"`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    // hide toast after 1.5 second
    setTimeout(() => setCopied(false), 1500);
  };
  const addFavorites = () => {
    const exists = favorites.some(
      (q) => q.content === quote.content && q.author === quote.author
    );
    if (!exists) {
      setFavorites([...favorites, quote]);
    }
  };
  const removeFavorites = (index) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);
  };

  return (
    <div className="flex flex-col   items-center min-h-screen py-20 bg-linear-to-r from-indigo-500 to-purple-600 relative">
      {/* toast notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-5  bg-black text-white text-sm rounded-lg shadow-lg px-4 py-2"
          >
            🗒️Copied to Clipboard
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white mb-10 rounded-lg shadow-2xl p-8 max-w-lg w-10/12 h-8/12 max-h-3/4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          Random Quote Generator
        </h1>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 mb-6 italic"
            >
              Loading...
            </motion.p>
          ) : (
            show && (
              <motion.div
                key={quote.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-gray-700 italic mb-3 ">
                  "{quote.content}"
                </p>
                <p className="text-sm text-gray-500 mb-6">-- {quote.author}</p>
              </motion.div>
            )
          )}
        </AnimatePresence>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={fetchQuote}
            className="text-white bg-sky-500 px-5 py-2 rounded-full hover:bg-sky-600 transition"
          >
            New Quote
          </button>
          <button
            onClick={copyQuote}
            className="text-white bg-green-500 px-5 py-2 rounded-full hover:bg-green-600 transition"
          >
            Copy
          </button>
          <button
            onClick={addFavorites}
            className="text-white bg-yellow-500 px-5 py-2 rounded-full hover:bg-yellow-600 transition"
          >
            ⭐ Favorites
          </button>
        </div>
      </div>
      {/* Favorites List */}
      <div className="bg-white max-w-lg w-10/12 shadow-xl rounded-2xl px-6 py-4">
        <h1 className="text-xl font-bold text-gray-700 mb-3">⭐ Favorites</h1>
        {favorites.length === 0 ? (
          <p className="text-sm text-gray-700">No Favorites yet.</p>
        ) : (
          favorites.map((fav, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="text-sm text-gray-700 italic">"{fav.content}"</p>
                <p className="text-xs text-gray-500">--{fav.author}</p>
              </div>
              <button
                onClick={() => removeFavorites(index)}
                className="text-red-500 hover:underline text-sm"
              >
                remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
