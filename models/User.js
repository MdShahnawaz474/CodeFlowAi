    const mongoose = require("mongoose");
    const bcrypt = require("bcrypt");

    const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
    }, { timestamps: true });

  
   userSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

    module.exports = mongoose.model('User', userSchema);
