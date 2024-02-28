import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      uniqe: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamps: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

export default URL;
