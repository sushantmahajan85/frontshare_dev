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
    htmlContent: {
      type: String,
      default: `<div class="kanban-item" data-block="sociallinks-1">
      <div class="card kanban-item-card hover-actions-trigger" data-toggle="modal" data-target="#kanban-modal-1">
        <div class="card-body position-relative">
          <p class="mb-0 font-weight-medium text-sans-serif">This is a Social Link Block<br>Try dragging it around</p>
        </div>
      </div>
    </div>`,
    },
    columnNo: Number,
    rowNo: Number,
    createdAt: Number,
    block: { type: String, default: "sociallinks" },
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
