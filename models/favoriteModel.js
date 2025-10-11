const pool = require("../database/")

/* Add a favorite */
async function addFavorite(account_id, inv_id) {
  const sql = `INSERT INTO favorites (account_id, inv_id)
               VALUES ($1, $2)
               RETURNING *`
  return pool.query(sql, [account_id, inv_id])
}

/* Remove a favorite */
async function removeFavorite(account_id, inv_id) {
  const sql = `DELETE FROM favorites
               WHERE account_id = $1 AND inv_id = $2`
  return pool.query(sql, [account_id, inv_id])
}

/* Get user favorites */
async function getUserFavorites(account_id) {
  const sql = `
    SELECT i.*
    FROM favorites f
    JOIN inventory i ON f.inv_id = i.inv_id
    WHERE f.account_id = $1
  `
  const result = await pool.query(sql, [account_id])
  return result.rows
}

/* Check if item is already a favorite */
async function isFavorite(account_id, inv_id) {
  const sql = `SELECT * FROM favorites WHERE account_id = $1 AND inv_id = $2`
  const result = await pool.query(sql, [account_id, inv_id])
  return result.rowCount > 0
}

module.exports = { addFavorite, removeFavorite, getUserFavorites, isFavorite }

