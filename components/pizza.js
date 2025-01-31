import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { CartContext } from "../context/cartContext"; // Import Cart Context
import "bootstrap/dist/css/bootstrap.min.css";

export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("small");
  const [show, setShow] = useState(false);
  const { addToCart } = useContext(CartContext); // Use Cart Context

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{ margin: "70px" }}>
        <div onClick={handleShow} style={{ cursor: "pointer" }}>
          <h1>{pizza.name}</h1>
          <img src={pizza.image} alt="Pizza" className="img-fluid" style={{ height: "200px", width: "200px" }} />
        </div>

        <div className="flex-container">
          <div className="w-100 m-1">
            <p>Variants</p>
            <select className="form-control" value={variant} onChange={(e) => setVariant(e.target.value)}>
              {pizza.varients.map((varient) => (
                <option key={varient} value={varient}>{varient}</option>
              ))}
            </select>
          </div>
          <div className="w-100 m-1">
            <p>Quantity</p>
            <select className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(10).keys()].map((x, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-container">
          <div className="m-1 w-100">
            <h1 className="mt-1">Price: {pizza.prices[0][variant] * quantity} Rs/-</h1>
          </div>
          <div className="m-1 w-100">
            <button className="btn btn-primary" onClick={() => addToCart(pizza, variant, quantity)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pizza.image ? <img src={pizza.image} alt="Pizza" className="img-fluid" style={{ height: "400px" }} /> : <p>No Image Available</p>}
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>CLOSE</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
