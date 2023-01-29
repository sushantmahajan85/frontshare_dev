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
    htmlContent: {
      type: String,
      default: `<div class="kanban-item" data-block="newsletter-1">
      <div class="card kanban-item-card hover-actions-trigger" data-toggle="modal" data-target="#kanban-modal-1">
        <div class="card-body position-relative">
          <p class="mb-0 font-weight-medium text-sans-serif">This is a Newsletter Block<br>Try dragging it around</p>
        </div>
      </div>
    </div>`,
    },
    block: { type: String, default: "newsletter" },
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
