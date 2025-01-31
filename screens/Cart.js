import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";

export default function Cart() {
  const { cart, clearCart } = useContext(CartContext); // Use clearCart to clear the cart
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Handle placing the order
  const handlePlaceOrder = () => {
    // Logic to handle placing the order (e.g., send order to backend)
    console.log("Order Placed:", cart);

    // Display order placed message first, then clear cart after a small delay
    setOrderPlaced(true);

    // Clear cart after a slight delay to show the order message
    setTimeout(() => {
      clearCart(); // Clears the cart from the context
    }, 2000); // You can adjust this delay to your preference (2 seconds here)

  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="d-flex justify-content-between border p-3 mb-2">
              <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px" }} />
              <p>{item.name} ({item.variant})</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: {item.price} Rs/-</p>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="mt-3 p-3 border text-end">
            <h4>Total Price: {totalPrice} Rs/-</h4>
          </div>

          {/* Place Order Button */}
          {!orderPlaced ? (
            <div className="mt-3">
              <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          ) : (
            <div className="mt-3 text-center">
              <h4>Order has been placed successfully!</h4>
              <p>Your order will be processed soon. Thank you for shopping with us!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
