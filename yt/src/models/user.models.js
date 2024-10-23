
import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, //cloudinary Url
    required: true,
  },
  coverImage: {
    type: String, //cloudinary Url
  },
  watchHistory: {
    type: Schema.Types.ObjectId,
    ref:"Video"
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  refreshToken: {
    type: String,
  },
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access Token has shorter live time
// For each request access token goes to server and gets response
//
userSchema.methods.generateAccesstoken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.Access_TOKEN_SECRET,
    { expiresIn: process.env.Access_TOKEN_EXPIRY },
  );
};

// Refresh Token has longer live time
userSchema.methods.generateRefreshtoken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};
export const User = mongoose.model("User", userSchema)
