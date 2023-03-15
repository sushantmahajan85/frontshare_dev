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
      <div
        class="card kanban-item-card hover-actions-trigger"
        data-toggle="modal"
        data-target="#kanban-modal-1"
      >
        <div class="card-body position-relative">
          <div class="text_area">
            <p
              class="text_paragraph text-center text-break text-capitalize fs-0.25 fw-normal text-gray-800"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Consectetur dignissimos incidunt inventore
              soluta facere neque, enim alias. Ad fugit amet
              culpa dolorum corrupti. Facilis temporesequi
              doloremque soluta sint aliquid
            </p>
          </div>
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
