const express = require("express");
const cors = require("cors");
const path = require("path");
const schedulingRoutes = require("./routes/schedulingRoutes");
const { errorHandler, notFoundHandler } = require("./utils/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "..", "index.html")));
app.use(schedulingRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
