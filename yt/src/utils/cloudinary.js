
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) return
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log(`file uploaded on cloudinary ${response}`);
        // once the file is uploaded we would need to delete it from our server

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log("cloudinary Error", error);
        fs.unlinkSync(localFilePath);
        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
  try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("deleted from cloudinary, Public id", publicId);
    //return result;
  } catch (error) {
    console.log("Error deleting from cloudinary", error);
    return null;
  }
};


export { uploadOnCloudinary, deleteFromCloudinary };
