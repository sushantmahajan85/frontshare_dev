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
      <div
        class="card kanban-item-card hover-actions-trigger"
        data-toggle="modal"
        data-target="#kanban-modal-1"
      >
        <div class="card-body position-relative">
          <div class="page-item-wrap relative">
            <div
              class="page-item flex-both-center absolute"
            ></div>
            <a
              target="_blank"
              rel="noopener nofollow"
              class="page-item-each"
              href="https://www.pinterest.com/elkadilb"
              data-id="331952"
              data-type="page_item"
            >
              <h5 class="text-center pt-3">
                Custom Link Title
              </h5>
              <p class="text-center pb-3 text-dark">
                Lorem ipsum dolor, sit amet consectetur
                adipisici
              </p>
            </a>
          </div>
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
