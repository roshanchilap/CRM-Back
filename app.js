const express = require("express");
const { config } = require("dotenv").config();

const jwt = require("jsonwebtoken");

const mongo = require("./shared/mongo");

const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");
const middleware = require("./shared/middleware");

const app = express();
//MongoDB connections
async function loadApp() {
  try {
    await mongo.connect();
    app.use(express.json());

    app.use(cors());

    app.use("/users", usersRoutes);

    app.use(middleware.authCheck);
    app.use("/posts", postsRoutes);

    //Logging middleware
    app.use(middleware.loginMiddleware);

    app.listen(process.env.PORT, () => {
      console.log(`Server started At ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Error starting server", err);
  }
}

loadApp();
