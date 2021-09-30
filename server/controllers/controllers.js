const db = require("../models");

const todo = db.model;

exports.create = (req, res) => {
  const todos = new todo({
    todo: req.body.todo,
  });
  todos
    .save(todos)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.findAll = (req, res) => {
  const mytodo = req.query.todo;
  var condition = mytodo
    ? { todo: { $regex: new RegExp(mytodo), $options: "i" } }
    : {};

  todo
    .find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "not found",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params._id;

  todo
    .findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "todo not found" });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(401)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;
  todo
    .updateOne(id, { todo: req.body.todo }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(401).send({ message: `cannot update todo with this ${id}` });
      } else {
        res.send({ message: "todo updated successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  todo
    .deleteOne(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `cannot delete todo with this ${id}` });
      } else {
        res.send({ message: "todo deleted successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
};
