require("dotenv").config();

const app = require("./src/app");
const { port } = require("./src/config/env");

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
