const db = require("../models");
const { readCSV } = require("../utils/csv");
const acs = require("../utils/audio_code.json");
const Variable = db.variable;
const Variant = db.variant;

const variantSchema = (data) => {
  const keys = Object.keys(data);
  return {
    uid: data[keys[0]],
    variant_1: data[keys[1]],
    variant_2: data[keys[2]],
    variable: data[keys[3]],
  };
};

exports.addOne = async (req, res) => {
  try {
    let variable_name = decodeURIComponent(escape(req.file.originalname));
    variable_name = variable_name.slice(0, variable_name.length - 4);
    let variable = await Variable.findOne({ name: variable_name });

    if (variable) {
      variable.name = variable_name;
      await variable.save();
    } else {
      variable = await Variable.create({
        name: variable_name,
      });

      let ac = acs.filter(
        (item) => item.VARIABLE.normalize() == variable_name.normalize()
      );
      if (ac.length) {
        ac = ac[0];
      } else ac = null;

      /** CSV File read and store to variant */
      let data = await readCSV(req.file.path, variantSchema);
      data = data.map((item) => {
        let filepath = "#";
        if (ac) filepath = `Audio_${item.uid}/${item.uid}_${ac.AUDIO_CODE}`;
        return Object.assign(item, { variable: variable._id, filepath });
      });
      await Variant.insertMany(data);
    }
    res.send({
      success: true,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.getAll = (req, res) => {
  /** FILTER */
  /** */
  Variable.find({})
    .then((data) => {
      res.send({
        success: true,
        data,
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
