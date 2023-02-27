const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// dotenv tidak boleh di bawah !process.env
require("dotenv").config();
const port = process.env.PORT || 3000;
require("../api/config/db");
const authApi = require("../api/routes/authRouter");
const userApi = require("../api/routes/userRouter");
const categoryApi = require("../api/routes/categoryRouter");
const blogApi = require("../api/routes/blogRouter");

app.use(cors());
app.use(express.json());

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/pages/_document.js"));
});

// routes
app.use("/api", authApi);
app.use("/api", userApi);
app.use("/api", categoryApi);
app.use("/api", blogApi);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
