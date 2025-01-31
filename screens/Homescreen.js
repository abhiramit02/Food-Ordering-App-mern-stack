import React, { useState } from "react";
import PizzaList from "../components/PizzaList";  // Ensure this path is correct

export default function HomeScreen() {
  const [filter, setFilter] = useState("all"); // State for filter selection

  return (
    <div className="container">
      <h1 className="text-center mt-4">Pizza Menu</h1>

      {/* Search Filter Section */}
      {/* <div className="d-flex justify-content-center my-3">
        <select 
          className="form-select w-25" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
      </div> */}

      {/* Pass filter as prop to PizzaList */}
      <PizzaList filter={filter} />
    </div>
  );
}
