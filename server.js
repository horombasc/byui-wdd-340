const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const path = require("path")
const fs = require("fs")
const app = express()

const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")

// View Engine
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use(static)
app.get("/", utilities.handleErrors(baseController.buildHome))
app.use("/inv", inventoryRoute)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  const message =
    err.status === 404
      ? err.message
      : "Oh no! There was a crash. Maybe try a different route?"

  const errorViewPath = path.join(__dirname, "views", "errors", "error.ejs")
  const viewExists = fs.existsSync(errorViewPath)

  if (viewExists) {
    res.status(err.status || 500).render("errors/error", {
      title: err.status || "Server Error",
      message,
      nav,
    })
  } else {
    res.status(err.status || 500).send(`
      <h1>${err.status || "Server Error"}</h1>
      <p>${message}</p>
      <a href="/">Return Home</a>
    `)
  }
})

// Local Server Information
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

// 404 handler for unmatched routes (optional)
app.use((req, res, next) => {
    res.status(404).render("error", { message: "Page not found" });
});

// General error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // For debugging
    res.status(err.status || 500).render("error", { message: err.message });
});


module.exports = app


