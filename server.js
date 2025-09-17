const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const app = express();

const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");

// View Engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// Routes
app.use(static);
app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute);

// Server Port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

