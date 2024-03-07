module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        name: {
            type: String,
            required: true,
          }
      },
      { timestamps: true }
    );
    const Variable = mongoose.model("variables", schema);
    return Variable;
};
  