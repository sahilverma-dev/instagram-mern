const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

console.clear();
app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
