
import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

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
    if (!this.modified('password')) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.method.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User", userSchema)
