const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const { stringify } = require("querystring");
// const SocialLink = require("./socialLinkModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: [20, "Name Too Large"],
      minLength: [0, "Name Too Small"],
    },
    photo: { type: String },
    video: { type: String },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    profilelink: String,
    bio: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: {
      type: String,
      required: [true, "Password is Required"],
      // minLength: [8, "Password Too Small"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Comfirm Password is Required"],
      // minLength: [8, "Password Too Small"],
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords Do Not Match",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: { type: Boolean, default: true, select: false },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verification_token: {
      type: Number,
      select: false,
    },
    verification_token_time: {
      type: Date,
    },
    social_links: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SocialLink",
      },
    ],
    custom_link: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CustomLink",
      },
    ],
    custom_text: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CustomText",
      },
    ],
    video_preview: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "VideoPreview",
      },
    ],
    newsletter: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "NewsLetter",
      },
    ],
    c1: [Object],
    c2: [Object],
    c3: [Object],
    plan: { type: String, default: "basic" },
    referredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", async function (next) {
  this.timeStamp = Date.now();

  next();
});

userSchema.post("save", async function () {
  const message = `Here is your 5 digit OTP : ${this.verification_token}`;

  // await sendEmail({
  //     email: this.email,
  //     subject: 'your 5 digit otp valid for 10 mins only',
  //     message
  // });
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "social_links custom_link custom_text video_preview newsletter",
  });
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.verifyPassword = async function (
  LoginPassword,
  signUpPassword
) {
  return await bcrypt.compare(LoginPassword, signUpPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// userSchema.methods.emailVerify = function () {
//     this.verification_token = random();
//     this.verification_token_time = Date.now() + 10 * 1000 * 60;
// }

const User = mongoose.model("User", userSchema);
module.exports = User;
