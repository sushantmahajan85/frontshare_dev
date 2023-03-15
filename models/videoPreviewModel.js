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
    createdAt: Number,
    htmlContent: {
      type: String,
      default: `<div class="kanban-item" data-block="videopreview-1">
      <div
        class="card kanban-item-card hover-actions-trigger"
        data-toggle="modal"
        data-target="#kanban-modal-1"
      >
        <div class="card-body position-relative">
          <div class="ratio ratio-1x1">
            <iframe
              src="https://www.youtube.com/embed/SycDH3NSJUU"
              class="w-100 h-100 rounded-sm"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>`,
    },
    block: { type: String, default: "videopreview" },
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
