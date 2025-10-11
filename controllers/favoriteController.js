const favoriteModel = require("../models/favoriteModel")

const favoriteController = {}

/* Add a vehicle to favorites */
favoriteController.addFavorite = async (req, res) => {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  await favoriteModel.addFavorite(account_id, inv_id)
  req.flash("notice", "Vehicle added to your favorites!")
  res.redirect(`/inv/detail/${inv_id}`)
}

/* Remove a favorite */
favoriteController.removeFavorite = async (req, res) => {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  await favoriteModel.removeFavorite(account_id, inv_id)
  req.flash("notice", "Vehicle removed from your favorites.")
  res.redirect(`/account/favorites`)
}

/* View all favorites */
favoriteController.viewFavorites = async (req, res) => {
  const account_id = res.locals.accountData.account_id
  const favorites = await favoriteModel.getUserFavorites(account_id)
  res.render("account/favorites", {
    title: "My Favorites",
    favorites,
  })
}

module.exports = favoriteController

