const mysql = require("mysql2");
const { db } = require("./env");

module.exports = mysql.createPool(db).promise();
