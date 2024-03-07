const bcrypt = require("bcryptjs");
const config = require("./config");
const db = require("./models");
const User = db.user;

db.mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected mongodb successfully.");
    const credential = {
      firstName: "sdats",
      lastName: "sdats",
      email: "sdats@gmail.com",
      password: "Pw7cmS3p",
    };

    User.findOne({ email: credential.email }).then(async (foundUser) => {
      if (!foundUser) {
        const hashedPass = await bcrypt.hash(credential.password, 10);
        const newUser = new User({
          firstName: credential.firstName,
          lastName: credential.lastName,
          email: credential.email,
          password: hashedPass,
        });
        await User.create(newUser)
          .then((insertedUser) => {
            console.log("User added:", insertedUser);
          })
          .catch((err) => {
            console.error("Error inserting user:", err);
          });
      } else {
        console.log("User already exists in the database.");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
