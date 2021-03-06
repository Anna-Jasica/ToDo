const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const tasks = require("./routes/tasks");
const auth = require("./routes/auth");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));


app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.static("../"));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(express.json());
app.use("/tasks", tasks);
app.use("/users", auth);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}...`);
});
