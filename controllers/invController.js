const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)
    const data = await invModel.getVehicleById(inv_id)
    const nav = await utilities.getNav()

    if (!data || data.length === 0) {
      throw { status: 404, message: "Vehicle not found." }
    }

    res.render("./inventory/detail", {
      title: `${data[0].inv_make} ${data[0].inv_model}`,
      nav,
      vehicle: data[0] // ✅ Pass full vehicle object to the view
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont

