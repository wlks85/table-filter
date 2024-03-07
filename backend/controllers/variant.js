const db = require("../models");
const Variant = db.variant;

exports.getAll = (req, res) => {
  const { variables } = req.query;
  const query = {};
  query.variable = {
    $in: variables,
  };

  /** FILTER */
  /** */
  Variant.find(query)
    .distinct("variant_1")
    .then((variants) => {
      res.send({
        success: true,
        variants,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong!",
      });
    });
};

exports.getOne = (req, res) => {};

exports.updateOne = (req, res) => {};

exports.deleteAll = (req, res) => {};

exports.deleteOne = (req, res) => {};
