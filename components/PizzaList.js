import React, { useState, useEffect } from "react";
import axios from "axios";
import Pizza from "./pizza";

export default function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all"); // Default: Show all

  // Pizza Details State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [varients, setVarients] = useState(["small", "medium", "large"]); // ✅ Match schema
  const [prices, setPrices] = useState("");
  const [image, setImage] = useState("");

  const [user, setUser] = useState(null); // Store logged-in user data

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/pizzas")
      .then((response) => {
        console.log("Fetched pizzas:", response.data); // Log the fetched data
        setPizzas(response.data);
        setFilteredPizzas(response.data); // Initially show all
      })
      .catch((error) => console.error("Error fetching pizzas:", error));

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("Logged-in User from localStorage:", loggedInUser);

    if (loggedInUser && loggedInUser.isAdmin !== undefined) {
      console.log("User is admin:", loggedInUser.isAdmin);
      setUser(loggedInUser);
    } else {
      console.log("No admin user or user info missing");
    }
  }, []);

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterCategory(selectedCategory);

    if (selectedCategory === "all") {
      setFilteredPizzas(pizzas);
    } else {
      const filtered = pizzas.filter(
        (pizza) => pizza.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPizzas(filtered);
    }
    console.log("Filtered pizzas:", filteredPizzas);
  };

  const handleAddPizza = async (e) => {
    e.preventDefault();

    let parsedPrices;
    try {
        parsedPrices = JSON.parse(prices);

        // ✅ Ensure prices is formatted correctly (array of objects)
        parsedPrices = [{ ...parsedPrices }];  // Fixes extra array nesting issue

    } catch (error) {
        console.error("Invalid JSON format for prices:", error);
        alert("Enter prices in valid JSON format.");
        return;
    }

    const newPizza = {
        name,
        category,
        description,
        varients, 
        prices: parsedPrices, // ✅ Now correctly formatted
        image,
    };

    console.log("Sending new pizza:", JSON.stringify([newPizza], null, 2)); // Debugging

    try {
        const response = await axios.post("http://localhost:7000/api/pizzas", [newPizza]); // ✅ Send as an array
        alert("Pizza added successfully!");

        // ✅ Ensure correct state update
        setPizzas([...pizzas, response.data]);
        setFilteredPizzas([...filteredPizzas, response.data]);

        // Reset form
        setName("");
        setCategory("");
        setDescription("");
        setVarients(["small", "medium", "large"]);
        setPrices("");
        setImage("");
        setShowForm(false);
    } catch (error) {
        console.error("Error adding pizza:", error.response?.data || error);
        alert("Failed to add pizza. Check console for details.");
    }
};

  return (
    <div className="container mt-4">
      {user?.isAdmin && (
        <>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add New Pizza"}
          </button>

          {showForm && (
            <form onSubmit={handleAddPizza} className="mt-3 p-3 border rounded">
              <div className="mb-3">
                <label className="form-label">Pizza Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pizza Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prices</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter price as JSON (e.g. {"small": 240, "medium": 380, "large": 450})'
                  value={prices}
                  onChange={(e) => setPrices(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Pizza
              </button>
            </form>
          )}
        </>
      )}

      <div className="d-flex justify-content-center align-items-center my-1 gap-2">
        <label htmlFor="categoryFilter" className="fw-bold">Filter by Category:</label>
        <select
          className="form-select"
          id="categoryFilter"
          onChange={handleFilterChange}
          value={filterCategory}
          style={{ width: "150px" }}
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
      </div>

      <div className="row mt-3">
        {filteredPizzas?.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <div className="col-md-4" key={pizza._id}>
              <Pizza pizza={pizza} />
            </div>
          ))
        ) : (
          <p>No pizzas found for the selected category.</p>
        )}
      </div>
    </div>
  );
}
