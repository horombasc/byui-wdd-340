const express = require("express")
const router = new express.Router()
const favoriteController = require("../controllers/favoriteController")
const utilities = require("../utilities/")
const auth = utilities.checkLogin

router.post("/add", auth, favoriteController.addFavorite)
router.post("/remove", auth, favoriteController.removeFavorite)
router.get("/", auth, favoriteController.viewFavorites)

module.exports = router

