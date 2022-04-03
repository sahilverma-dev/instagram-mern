const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const { json } = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

// imporing routes
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");

app.get("/", (req, res) => {
  res.send(`Server started on port http://localhost:${PORT}`);
});

app.use(json());
app.use(errorHandler);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
connectDB();

// useing routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

console.clear();
app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
