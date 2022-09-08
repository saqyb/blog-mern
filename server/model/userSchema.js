const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  Name: { type: String, required: true },
  email: { type: String, required: true },
  DP: { type: String, required: false },
  BIO: { type: String, required: false },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  blogsID: [{ type: String, required: false }],
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("Hashed");
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
    next();
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
