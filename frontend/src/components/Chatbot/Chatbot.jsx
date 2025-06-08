import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      if (user && user._id) {
        try {
          const res = await api.get(`/chatlogs/${user._id}`);
          setMessages(res.data.messages || []);
        } catch (err) {
          console.error("Error fetching chatlogs:", err);
          setMessages([]);
        }
      }
    };
    fetchChat();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user && user._id && messages.length > 0) {
      api.post("/chatlogs", { userId: user._id, messages }).catch((err) =>
        console.error(err)
      );
    }
  }, [messages, user]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      message: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await api.get("/products", { params: { search: input } });
      const productResults = res.data;

      setFilteredProducts(productResults);
      let botMessage = "No products found for your search.";
      if (productResults.length) {
        botMessage = `I found ${productResults.length} product(s). See the list on the right.`;
      }

      const botMsgObj = {
        sender: "bot",
        message: botMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsgObj]);
    } catch (err) {
      console.error("Product search failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message: "Sorry, something went wrong.",
          timestamp: new Date(),
        },
      ]);
      setFilteredProducts([]);
    }
  };

  const handlePurchase = async (productId) => {
    const quantity = 1; 

    try {
      const res = await api.post("/products/purchase", { productId, quantity });
      alert(res.data.message);

      setProducts((prev) =>
        prev.map((prod) =>
          prod._id === productId
            ? { ...prod, stockQuantity: prod.stockQuantity - quantity }
            : prod
        )
      );
      setFilteredProducts((prev) =>
        prev.map((prod) =>
          prod._id === productId
            ? { ...prod, stockQuantity: prod.stockQuantity - quantity }
            : prod
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const resetChat = () => {
    setMessages([]);
    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 sm:p-4">
      <div className="bg-white w-full max-w-7xl rounded-xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex flex-col w-full md:w-2/3 max-h-[80vh]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600 text-center flex justify-center items-center gap-2">
            🛍️ Sales Chatbot
          </h2>

          <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-3 border rounded-lg bg-gray-50">
            {messages.length === 0 && (
              <p className="text-gray-400 italic text-center mt-10">
                Start by typing something to search products! Example: "Samsung phone"
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[85%] text-sm sm:text-base ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-600 text-white text-right"
                    : "mr-auto bg-gray-200 text-gray-800 text-left"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.message}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              placeholder='Type product name, e.g. "Samsung phone"'
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>

          <button
            onClick={resetChat}
            className="mt-3 text-sm bg-red-500 rounded-2xl cursor-pointer py-2 px-4 text-white self-center"
          >
            Reset Chat
          </button>
        </div>

        <div className="w-full md:w-1/3 max-h-[80vh] overflow-y-auto border rounded-lg p-4 bg-white shadow-inner">
          <h3 className="font-semibold text-lg mb-3 border-b pb-1">Products</h3>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-400 italic">No products to display.</h2>
              <p className="text-base font-medium">You can search by Typing these categories:</p>
              <section className="text-sm text-purple-600 font-semibold space-y-1">
                <p>Electronics</p>
                <p>Fashion</p>
                <p>Home</p>
                <p>Beauty</p>
                <p>Grocery</p>
                <p>Books</p>
                <p>Jewelry</p>
                <p>Toys</p>
              </section>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="mb-4 p-3 border rounded hover:shadow cursor-pointer transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="font-bold mt-1">₹{product.price}</p>
                <p className="text-xs text-gray-500 mt-1">Stock: {product.stockQuantity}</p>

                <button
                  onClick={() => handlePurchase(product._id)}
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                  disabled={product.stockQuantity === 0}
                >
                  {product.stockQuantity === 0 ? "Out of Stock" : "Buy Now"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
