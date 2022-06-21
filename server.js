require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const express = require("express");
const path = require("path");

require("./config/database");
const Router = require("./routs/routes");
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api", Router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname + "/client/build/index.html"));
  });
}

///Script de nodemon////
app.listen(PORT,()=>console.log("server all  ready " + PORT))

///SCRIPT DE HEROKU//////

// app.listen(process.env.PORT || 4000, process.env.HOST || "0.0.0.0", () =>
//   console.log("server listening on port ${process.env.PORT || 4000}")
// );
