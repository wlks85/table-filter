const router = require("express").Router();
const controller = require("../controllers/variant");

module.exports = (app) => {
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  app.use("/api/variants", router);
};
