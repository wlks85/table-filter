module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      uid: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      site_code: {
        type: String,
        required: true,
      },
      sds_code: {
        type: String,
        required: true,
      },
      kanton: {
        type: String,
        required: true,
      },
      age_cohort: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      mobility: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  const Metadata = mongoose.model("metadatas", schema);
  return Metadata;
};
