module.exports = app => {
  const todo = require("../controllers/controllers");
  var router = require("express").Router();

  router.post("/", todo.create);
  router.get("/", todo.findAll);
  router.get("/:_id", todo.findOne);
  router.put("/:_id", todo.update);
  router.delete("/:_id", todo.delete);
  app.use("/api", router);
};
