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

var col1 = [];
var col2 = [];
var col3 = [];
exports.updateCanvas = catchAsync(async (req, res, next) => {
  const { c1, c2, c3 } = req.body;
  // drag start here
  setTimeout(() => {
    c1.forEach(async (c) => {
      const { block } = c;
      // console.log(block, "blk");
      if (block == "sociallinks") {
        this.createSocialLink(req, 1, Date.now());
      } else if (block == "customlink") {
        this.createCustomLink(req, 1, Date.now());
      } else if (block == "customtext") {
        this.createCustomText(req, 1, Date.now());
      } else if (block == "videopreview") {
        this.createVideoPreview(req, 1, Date.now());
      } else if (block == "newsletter") {
        this.createNewsLetter(req, 1, Date.now());
      }
    });
  }, 500);
  setTimeout(() => {
    c2.forEach(async (c) => {
      const { block } = c;

      if (block == "sociallinks") {
        this.createSocialLink(req, 2, Date.now());
      } else if (block == "customlink") {
        await this.createCustomLink(req, 2, Date.now());
      } else if (block == "customtext") {
        this.createCustomText(req, 2, Date.now());
      } else if (block == "videopreview") {
        this.createVideoPreview(req, 2, Date.now());
      } else if (block == "newsletter") {
        this.createNewsLetter(req, 2, Date.now());
      }
    });
  }, 1000);

  setTimeout(() => {
    c3.forEach(async (c) => {
      const { block } = c;

      if (block == "sociallinks") {
        this.createSocialLink(req, 3, Date.now());
      } else if (block == "customlink") {
        await this.createCustomLink(req, 3, Date.now());
      } else if (block == "customtext") {
        this.createCustomText(req, 3, Date.now());
      } else if (block == "videopreview") {
        this.createVideoPreview(req, 3, Date.now());
      } else if (block == "newsletter") {
        this.createNewsLetter(req, 3, Date.now());
      }
    });
  }, 1500);
  setTimeout(() => {
    col1 = [];
    col2 = [];
    col3 = [];

    res.status(200).json({ status: "success" });

    console.log(col1, col2, col3, "check empty");
  }, 2000);

  console.log(col1, col2, col3, "check empty");
});

exports.createSocialLink = catchAsync(async (req, col, createdAt) => {
  console.log(createdAt);
  const socialLinkDoc = await SocialLink.create({
    createdAt: createdAt,
  });

  if (col == 1) {
    col1.push(socialLinkDoc);
  }
  if (col == 2) {
    col2.push(socialLinkDoc);
  }
  if (col == 3) {
    col3.push(socialLinkDoc);
  }

  // console.log(col1, "col1_slink");
  console.log(col2, "col2_slink");
  // console.log(col3, "col3_slink");
  const doc = await User.findByIdAndUpdate(
    req.logged.id,
    { $push: { social_links: socialLinkDoc.id }, c1: col1, c2: col2, c3: col3 },

    {
      new: true,
      runValidators: true,
    }
  );

  // if (!doc) {
  //   return next(new appError("No Document With That Id", 404));
  // }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createCustomText = catchAsync(async (req, col, createdAt) => {
  console.log(createdAt);
  const customTextDoc = await CustomText.create({ createdAt: createdAt });

  if (col == 1) {
    col1.push(customTextDoc);
  }
  if (col == 2) {
    col2.push(customTextDoc);
  }
  if (col == 3) {
    col3.push(customTextDoc);
  }
  console.log(col2, "colllllllllllnjjlll");
  const doc = await User.findByIdAndUpdate(
    req.logged.id,
    { $push: { custom_text: customTextDoc.id }, c1: col1, c2: col2, c3: col3 },
    {
      new: true,
      runValidators: true,
    }
  );

  // if (!doc) {
  //   return next(new appError("No Document With That Id", 404));
  // }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createCustomLink = catchAsync(async (req, col, createdAt) => {
  // console.log(createdAt);
  const customLinkDoc = await CustomLink.create({ createdAt: createdAt });
  if (col == 1) {
    col1.push(customLinkDoc);
  }
  if (col == 2) {
    col2.push(customLinkDoc);
  }
  if (col == 3) {
    col3.push(customLinkDoc);
  }
  // console.log(col1, "col1_clink");
  // console.log(col2, "col2_clink");
  // console.log(col3, "col3_clink");
  const doc = await User.findByIdAndUpdate(
    req.logged.id,
    { $push: { custom_link: customLinkDoc.id }, c1: col1, c2: col2, c3: col3 },
    {
      new: true,
      runValidators: true,
    }
  );

  // if (!doc) {
  //   return next(new appError("No Document With That Id", 404));
  // }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createVideoPreview = catchAsync(async (req, col, createdAt) => {
  const videoPreviewDoc = await VideoPreview.create({ createdAt: createdAt });
  if (col == 1) {
    col1.push(videoPreviewDoc);
  }
  if (col == 2) {
    col2.push(videoPreviewDoc);
  }
  if (col == 3) {
    col3.push(videoPreviewDoc);
  }
  const doc = await User.findByIdAndUpdate(
    req.logged.id,
    {
      $push: { video_preview: videoPreviewDoc.id },
      c1: col1,
      c2: col2,
      c3: col3,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // if (!doc) {
  //   return next(new appError("No Document With That Id", 404));
  // }

  // res.status(200).json({ status: "success", data: { data: doc } });
});

exports.createNewsLetter = catchAsync(async (req, col, createdAt) => {
  const newsLetterDoc = await NewsLetter.create({ createdAt: createdAt });
  if (col == 1) {
    col1.push(newsLetterDoc);
  }
  if (col == 2) {
    col2.push(newsLetterDoc);
  }
  if (col == 3) {
    col3.push(newsLetterDoc);
  }
  const doc = await User.findByIdAndUpdate(
    req.logged.id,
    { $push: { newsletter: newsLetterDoc.id }, c1: col1, c2: col2, c3: col3 },
    {
      new: true,
      runValidators: true,
    }
  );

  // if (!doc) {
  //   return next(new appError("No Document With That Id", 404));
  // }

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
