const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
const PORT = process.env.PORT;

app.use(express.json());
app.use(require("./router/auth"));
app.use(require("./router/blog"));

app.listen(PORT, () => {
  console.log("Server is listening @ PORT " + PORT);
});
