const pool = require("../config/database");

const selectFields = `SELECT id, Cliente AS cliente, DATE_FORMAT(Data, '%Y-%m-%d') AS data, TIME_FORMAT(Horario, '%H:%i') AS horario FROM agendamentos`;

async function findAll() {
  const [rows] = await pool.query(`${selectFields} ORDER BY Data, Horario, id`);
  return rows;
}
async function findById(id) {
  const [rows] = await pool.execute(`${selectFields} WHERE id = ?`, [id]);
  return rows[0] ?? null;
}
async function existsAt(data, horario) {
  const [rows] = await pool.execute("SELECT EXISTS (SELECT 1 FROM agendamentos WHERE Data = ? AND Horario = ?) AS existsAt", [data, horario]);
  return Boolean(rows[0].existsAt);
}
async function create({ cliente, data, horario }) {
  const [result] = await pool.execute("INSERT INTO agendamentos (Cliente, Data, Horario) VALUES (?, ?, ?)", [cliente, data, horario]);
  return result.insertId;
}
async function removeById(id) {
  const [result] = await pool.execute("DELETE FROM agendamentos WHERE id = ?", [id]);
  return result.affectedRows;
}
async function removeAll() {
  const [result] = await pool.query("DELETE FROM agendamentos");
  return result.affectedRows;
}

module.exports = { findAll, findById, existsAt, create, removeById, removeAll };
