const mongoose = require("mongoose");
const validator = require("validator");
const catchAsync = require("./../utils/appError");
const User = require("./userModel");

const socialLinkSchema = new mongoose.Schema(
  {
    instagram: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    tiktok: {
      type: String,
      trim: true,
    },
    snapchat: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    columnNo: Number,
    rowNo: Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

socialLinkSchema.post("save", async function (req, res) {
  // this.timeStamp = Date.now();
});

// socialLinkSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);
module.exports = SocialLink;
