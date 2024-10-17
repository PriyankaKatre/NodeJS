
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //Cloudinary Url
      required: true,
    },
    thumbNail: {
      type: String, //Cloudinary Url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
  },
  {
    timestamps: true,
  },
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
