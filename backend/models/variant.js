const {ObjectId} = require('mongoose').Types

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        uid: {
            type: String,
            // required: true,
          },
        variant_1: {
          type: String,
        },
        variant_2: {
          type: String,
        },
        variable: {
          type: ObjectId,
          ref: 'variables',
        },
        filepath: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    );
    const Variant = mongoose.model("variants", schema);
    return Variant;
};
  