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
    createdAt: Number,
    htmlContent: {
      type: String,
      default: `<div class="kanban-item" data-block="customtext-1">
      <div class="card kanban-item-card hover-actions-trigger" data-toggle="modal" data-target="#kanban-modal-1">
        <div class="card-body position-relative">
          <p class="mb-0 font-weight-medium text-sans-serif">This is a Custom Text Block<br>Try dragging it around</p>
        </div>
      </div>
    </div>`,
    },
    block: { type: String, default: "customtext" },
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
