const router = require("express").Router();
const controller = require("../controllers/metadata");
const { upload } = require("../utils/upload");

module.exports = (app) => {
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", upload.single("file"), controller.addOne);
  app.use("/api/metadata", router);
};
