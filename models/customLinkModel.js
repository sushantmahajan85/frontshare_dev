const mongoose = require("mongoose");
const validator = require("validator");
const catchAsync = require("./../utils/appError");
const User = require("./userModel");

const customLinkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

customLinkSchema.post("save", async function (req, res) {
  // this.timeStamp = Date.now();
});

// customLinkSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

const CustomLink = mongoose.model("CustomLink", customLinkSchema);
module.exports = CustomLink;
