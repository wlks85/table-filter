const db = require("../models");
const { readCSV, readAudioCSV } = require("../utils/csv");
const path = require("path");

const absoluteConsentPath = path.join(
  __dirname,
  "..",
  "utils",
  "consent_audios_all.csv"
);

const Metadata = db.metadata;
const Variant = db.variant;
const ObjectId = db.mongoose.Types.ObjectId;

const variantSchema = (data) => {
  return {
    uid: data.UID || data["UID"],
    place: data.PLACE,
    latitude: Number(data.LAT),
    longitude: Number(data.LONG),
    site_code: data.site_code,
    sds_code: data.SDS_CODE,
    kanton: data.KANTON,
    age_cohort: data.AGE_COHORT,
    gender: data.GENDER,
    mobility: Number(data.MOBILITY),
  };
};
const audioSchema = (data) => {
  return {
    uid: data.UID || data["UID"],
    consent: data.consent,
  };
};

exports.addOne = async (req, res) => {
  try {
    let mdatas = await Metadata.find({}).exec();

    if (mdatas.length > 0) {
      return res.status(400).send({
        status: false,
        message: "Woops!, MetaData Already Uploaded!",
      });
    }

    /** CSV File read and store to variant */
    let data = await readCSV(req.file.path, variantSchema);
    let consentData = await readAudioCSV(absoluteConsentPath, audioSchema);
    const metadata = await Metadata.insertMany(data);

    const updatePromises = consentData.map((item) => {
      return Metadata.findOneAndUpdate(
        { uid: item.uid },
        { $set: { mobility: item.consent } },
        {
          returnNewDocument: true,
        }
        // Changed from returnNewDocument to returnDocument for newer MongoDB drivers
      );
    });

    // Wait for all promises to resolve
    const results = await Promise.all(updatePromises);

    res.send({
      success: true,
      message: "Success",
      metadata,
      results,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const { variants, variables, paginationModel } = req.query;

  const skip = Number(paginationModel.page) * Number(paginationModel.pageSize);

  /** FILTER */
  const filter = [
    {
      $lookup: {
        from: "metadatas", // Note: Mongoose automatically looks for the plural, lowercase version of the model name.
        localField: "uid",
        foreignField: "uid",
        as: "metadata",
      },
    },
    {
      $unwind: "$metadata",
    },
  ];
  //   const filter = {}

  if (variants) {
    filter.push({
      $match: {
        variant_1: {
          $in: variants,
        },
      },
    });
  }
  if (variables) {
    filter.push({
      $match: {
        variable: {
          $in: variables.map((item) => new ObjectId(item._id)),
        },
      },
    });
  }
  if (skip) {
    filter.push({
      $skip: skip,
    });
  }
  filter.push({
    $limit: Number(paginationModel.pageSize),
  });

  const total = await Variant.countDocuments({});

  Variant.aggregate(filter)
    .then((data) => {
      res.send({
        success: true,
        data,
        total,
      });
    })
    .catch((err) => {
      console.log(err);
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
