const fs = require("fs");
const User = require("../models/userModel");
const SocialLink = require("../models/socialLinkModel");
const CustomText = require("../models/customTextModel");
const CustomLink = require("../models/customLinkModel");
const VideoPreview = require("../models/videoPreviewModel");
const NewsLetter = require("../models/newsLetterModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const factory = require("./handlerFactory");

exports.updateCanvas = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { c1, c2, c3 } = req.body;

  c1.forEach(() => {
    const { block } = c1;
    if (block == "sociallinks") {
      console.log("in this");
      this.createSocialLink1();
    } else if (block == "customlink") {
    } else if (block == "customtext") {
    } else if (block == "videopreview") {
    } else if (block == "newsletter") {
    }
  });
  c2.forEach((c) => {
    const { block } = c;
    console.log(block);
    if (block == "sociallinks") {
      console.log("in this");
      this.createSocialLink(req);
    } else if (block == "customlink") {
    } else if (block == "customtext") {
    } else if (block == "videopreview") {
    } else if (block == "newsletter") {
    }
  });
  c3.forEach(() => {
    const { block } = c3;
    if (block == "sociallinks") {
      console.log("in this");
      this.createSocialLink1();
    } else if (block == "customlink") {
    } else if (block == "customtext") {
    } else if (block == "videopreview") {
    } else if (block == "newsletter") {
    }
  });
});

exports.createSocialLink1 = catchAsync(async (req, res, next) => {
  console.log("yahan hun");
});

exports.createSocialLink = catchAsync(async (req, res, next) => {
  const socialLinkDoc = await SocialLink.create({
    columnNo: 2,
  });
  console.log(socialLinkDoc);

  const doc = await User.findByIdAndUpdate(
    req.logged.id,
    { $push: { social_links: socialLinkDoc.id } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new appError("No Document With That Id", 404));
  }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createCustomText = catchAsync(async (req, res, next) => {
  const customTextDoc = await CustomText.create(req.body);

  const doc = await User.findByIdAndUpdate(
    req.user.id,
    { custom_text: customTextDoc.id },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new appError("No Document With That Id", 404));
  }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createCustomLink = catchAsync(async (req, res, next) => {
  const customLinkDoc = await CustomLink.create(req.body);

  const doc = await User.findByIdAndUpdate(
    req.user.id,
    { custom_link: customLinkDoc.id },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new appError("No Document With That Id", 404));
  }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createVideoPreview = catchAsync(async (req, res, next) => {
  const videoPreviewDoc = await VideoPreview.create(req.body);

  const doc = await User.findByIdAndUpdate(
    req.user.id,
    { video_preview: videoPreviewDoc.id },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new appError("No Document With That Id", 404));
  }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createNewsLetter = catchAsync(async (req, res, next) => {
  const newsLetterDoc = await NewsLetter.create(req.body);

  const doc = await User.findByIdAndUpdate(
    req.user.id,
    { newsletter: newsLetterDoc.id },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new appError("No Document With That Id", 404));
  }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.updateSocialLink = factory.updateOne(SocialLink);

exports.deleteSocialLink = factory.deleteOne(SocialLink);

exports.updateCustomText = factory.updateOne(CustomText);

exports.deleteCustomText = factory.deleteOne(CustomText);

exports.updateCustomLink = factory.updateOne(CustomLink);

exports.deleteCustomLink = factory.deleteOne(CustomLink);

exports.updateVideoPreview = factory.updateOne(VideoPreview);

exports.deleteVideoPreview = factory.deleteOne(VideoPreview);

exports.updateNewsLetter = factory.updateOne(NewsLetter);

exports.deleteNewsLetter = factory.deleteOne(NewsLetter);
