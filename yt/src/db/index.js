import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOBD_URI}/${DB_NAME}`,
    );
    console.log(`Mongo db connected ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(`Mongo DB Connection Error ${err}`);
    process.exit(1);
  }
};

export default connectDB;
