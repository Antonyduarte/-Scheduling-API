const path = require("path");
const response = require("./response");
function notFoundHandler(req, res) { res.status(404).sendFile(path.join(__dirname, "..", "..", "views", "404.html")); }
function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  const statusCode = error.statusCode ?? (error.code === "ER_DUP_ENTRY" ? 409 : 500);
  if (statusCode === 500) console.error(error);
  res.status(statusCode).json(response("Erro", error.message || "Erro interno do servidor"));
}
module.exports = { errorHandler, notFoundHandler };
