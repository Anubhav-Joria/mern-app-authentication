const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
});

const Users = mongoose.model("Users", userSchema);

module.exports = { Users };
