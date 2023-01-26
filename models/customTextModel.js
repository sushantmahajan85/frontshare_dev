const mongoose = require("mongoose");
const validator = require("validator");
const catchAsync = require("./../utils/appError");
const User = require("./userModel");

const customTextSchema = new mongoose.Schema(
  {
    text: {
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

customTextSchema.post("save", async function (req, res) {
  // this.timeStamp = Date.now();
});

// customTextSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

const CustomText = mongoose.model("CustomText", customTextSchema);
module.exports = CustomText;
