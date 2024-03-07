module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
      },
      role: {
        type: String,
        default: "user",
      },
    },
    { timestamps: true }
  );
  const User = mongoose.model("users", schema);
  return User;
};
