const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// imporing routes
const { UserRoute } = require("./routes/user.route");
const { json } = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

app.get("/", (req, res) => {
  res.send(`Server started on port http://localhost:${PORT}`);
});

// useing routes
app.use(json());
app.use(errorHandler);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use("/api/v1/user", UserRoute);

connectDB();

console.clear();
app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
