const mongoose = require("mongoose");
const validator = require("validator");
const catchAsync = require("./../utils/appError");
const User = require("./userModel");

const newsLetterSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      trim: true,
    },
    btnText: {
      type: String,
      trim: true,
    },
    columnNo: Number,
    rowNo: Number,
    createdAt: Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

newsLetterSchema.post("save", async function (req, res) {
  // this.timeStamp = Date.now();
});

// socialLinkSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema);
module.exports = NewsLetter;
