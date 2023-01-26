const mongoose = require("mongoose");
const validator = require("validator");
const catchAsync = require("./../utils/appError");
const User = require("./userModel");

const videoPreviewSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    vidLink: String,
    columnNo: Number,
    rowNo: Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

videoPreviewSchema.post("save", async function (req, res) {
  // this.timeStamp = Date.now();
});

// socialLinkSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

const VideoPreview = mongoose.model("VideoPreview", videoPreviewSchema);
module.exports = VideoPreview;
