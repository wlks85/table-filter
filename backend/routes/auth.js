const router = require("express").Router();
const controller = require("../controllers/auth");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
  router.post("/signin", controller.signIn);
  router.post("/signup", controller.signUp);
  router.post("/me", [authJwt.verifyToken], controller.me);
  router.post("/forgot-password", controller.forgotPassword);
  router.post("/reset-password", controller.resetPassword);
  router.post("/refresh-token", controller.refreshToken);
  app.use("/api/account", router);
};
