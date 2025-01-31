import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Login from "./components/Login";
import Cart from "./screens/Cart";
import { CartProvider } from "./context/cartContext"; // Import Cart Context

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} /> {/* Add Cart Route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
