const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  requests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Request"
  }],
  carts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Service"
  }],
  accepted:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Request"
    }],
  requestHistory:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Request"
    }],
  taskHistory:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Request"
  }],
  totalCredit:{
    type: Number,
  }
});



userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  let hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;
  next();
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
