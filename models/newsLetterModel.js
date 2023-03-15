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
      <div
        class="card kanban-item-card hover-actions-trigger"
        data-toggle="modal"
        data-target="#kanban-modal-1"
      >
        <div class="card-body position-relative">
          <div class="container-12">
            <img
              class="img-head"
              src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/LYJWgdK/LYJWgdK.mail.jpg"
              alt="subscribe to email"
            />
            <h1 class="title-12">subscribe</h1>
            <p class="description-12">
              subscribe to our newsletter & stay updated
            </p>
            <div class="form-box">
              <div class="input-main">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                />
              </div>
              <button class="submit" type="submit">
                Submit
              </button>
            </div>
          </div>
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
