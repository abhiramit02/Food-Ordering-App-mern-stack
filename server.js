const express = require('express');
const cors = require('cors');  
const bodyParser = require('body-parser');
const connectDB = require('./backend/configurations/db');
const pizzaRoutes = require('./backend/routes/pizzaroute');  
const userRoutes = require('./backend/routes/userroute');   
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // ✅ This is required for parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors());  
app.use(bodyParser.json());

app.use("/api/pizzas", pizzaRoutes);
app.use("/api/users", userRoutes);  

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
