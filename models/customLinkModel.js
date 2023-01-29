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
    columnNo: Number,
    rowNo: Number,
    createdAt: Number,
    htmlContent: {
      type: String,
      default: `<div class="kanban-item" data-block="customlink-1">
      <div class="card kanban-item-card hover-actions-trigger" data-toggle="modal" data-target="#kanban-modal-1">
        <div class="card-body position-relative">
          <p class="mb-0 font-weight-medium text-sans-serif">This is a Custom Link Block<br>Try dragging it around</p>
        </div>
      </div>
    </div>`,
    },
    block: { type: String, default: "customlink" },
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
