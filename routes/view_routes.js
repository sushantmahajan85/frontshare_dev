var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
const catchAsync = require("../utils/catchAsync");
var router = express.Router();
// var Deal = require("../models/dealModel");
var User = require("../models/userModel");
var Booking = require("../models/bookingModel");
const SocialLink = require("../models/socialLinkModel");
const CustomText = require("../models/customTextModel");
const CustomLink = require("../models/customLinkModel");
const VideoPreview = require("../models/videoPreviewModel");
const NewsLetter = require("../models/newsLetterModel");
// var LikedDeal = require("../models/likedDealModel");
var authController = require("../controllers/authController");
var bookingController = require("../controllers/bookingController");
// const recruit = require("../models/recruit");
const { check, validationResult } = require("express-validator");

// router.use(authController.isLoggedIn);
router.post(
  "/recsubmit",
  [
    check("data[phone]", "Must be a length 0f 10").isLength({
      min: 10,
      max: 10,
    }),
  ],
  function (req, res) {
    var errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.render("recruit", { errors: errors.mapped() });
    } else {
      // console.log(req.body.data);
      recruit.create(req.body.data, function (err, newdetails) {
        if (err) {
          console.log(err);
          res.redirect("/recruit");
        } else {
          res.redirect("/");
        }
      });
    }
  }
);

// router.get("/edit", function (req, res) {
//   Team.find({}, function (err, allAttendance) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("edit", { attendance: allAttendance });
//     }
//   });
// });

// router.get("/view", function (req, res) {
//   Team.find({}, function (err, allAttendance) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("view", { attendance: allAttendance });
//     }
//   });
// });

// router.put("/:id", async function (req, res) {
//   console.log(req.params.id);
//   const updated = await Team.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     function (err, updatedatt) {
//       if (!err) {
//         res.redirect("/edit");
//       } else {
//         console.log("error");
//       }
//     }
//   );
//   console.log(updated);
// });
// router.get(
//   "/",
//   catchAsync(async function (req, res) {
//     if (req.query.search) {
//       // console.log(req.query.search);
//       const deals = await Deal.find(
//         { $text: { $search: req.query.search } },
//         { score: { $meta: "textScore" } }
//       ).sort([[{ score: { $meta: "textScore" } }]]);
//       // console.log(deals);
//       res.status(200).render("search", { deals /*recommendedDeals*/ });
//     }
//     const drafters = await Deal.find({ category: "drafters" })
//       .sort([["createdAt", -1]])
//       .limit(10);

//     const books = await Deal.find({ category: "books" })
//       .sort([["createdAt", -1]])
//       .limit(10);
//     const labcoat = await Deal.find({ category: "labcoat" })
//       .sort([["createdAt", -1]])
//       .limit(10);
//     const cycle = await Deal.find({ category: "cycle" })
//       .sort([["createdAt", -1]])
//       .limit(10);
//     const mattress = await Deal.find({ category: "mattress" })
//       .sort([["createdAt", -1]])
//       .limit(10);
//     const others = await Deal.find({ category: "others" })
//       .sort([["createdAt", -1]])
//       .limit(10);
//     // console.log(labcoat);
//     res.render("index", { drafters, books, labcoat, cycle, mattress, others });
//   })
// );

router.get("/signup", function (req, res) {
  console.log(req.query);
  res.render("signup");
});
router.get("/billing", authController.isLoggedIn, async function (req, res) {
  const prousers = await User.find({ referredBy: req.logged, plan: "pro" });
  let ids = [];
  prousers.forEach((prouser) => {
    ids.push(prouser._id);
  });
  const prices = await Booking.find({ user: { $in: ids } });
  let balance = 0;
  prices.forEach((x) => {
    balance += x.price * 0.3;
  });

  console.log(balance);
  res.render("billing", { balance: balance });
});
router.get("/invite", authController.isLoggedIn, function (req, res) {
  res.render("invite");
});
router.get("/analytics", authController.isLoggedIn, async function (req, res) {
  const users = await User.find({ referredBy: req.logged });
  const prousers = await User.find({ referredBy: req.logged, plan: "pro" });
  let ids = [];
  prousers.forEach((prouser) => {
    ids.push(prouser._id);
  });
  const prices = await Booking.find({ user: { $in: ids } });
  let balance = 0;
  prices.forEach((x) => {
    balance += x.price * 0.3;
  });

  console.log(balance);
  await User.findByIdAndUpdate(req.logged, { balance: balance });
  console.log(users);
  res.render("analytics", { users: users, balance: balance });
});
router.get("/", bookingController.createBookingCheckout, function (req, res) {
  res.render("landing");
});
router.get("/pricing", authController.isLoggedIn, function (req, res) {
  res.render("pricing");
});
router.get("/login", function (req, res) {
  res.render("login");
});
router.get("/index", function (req, res) {
  res.render("index");
});

router.get("/profile", authController.isLoggedIn, function (req, res) {
  // console.log(req.logged);

  let c1elements = req.logged.c1;

  c1elements.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  let c2elements = req.logged.c2;

  c2elements.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  let c3elements = req.logged.c3;

  c3elements.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  let pro = false;
  let plan = JSON.stringify(req.logged).split('plan":"')[1];
  plan = plan ? plan.split('"')[0] : plan;

  if (plan == "pro") {
    pro = true;
  }

  res.render("profile", { c1elements, c2elements, c3elements, pro });
});

router.get(
  "/:profilelink",
  catchAsync(async function (req, res) {
    const creator = await User.findOne({ profilelink: req.params.profilelink });
    res.render("preview", { creator });
  })
);

// router.get("/checkout", function (req, res) {
//   res.render("checkout");
// });
// router.get("/contact", function (req, res) {
//   res.render("contact");
// });
// router.get("/help", function (req, res) {
//   res.render("help");
// });
// router.get("/product", function (req, res) {
//   res.render("product");
// });
// router.get("/product2", function (req, res) {
//   res.render("product2");
// });
// router.get(
//   "/deal/:id/postedBy/:userid",
//   catchAsync(async function (req, res) {
//     const seller = await User.findById(req.params.userid);
//     const deal = await Deal.findById(req.params.id);
//     const user = await User.findById(req.logged);
//     res.render("single", { deal, user, seller });
//   })
// );
// router.get("/single2", function (req, res) {
//   res.render("single2");
// });
// router.get("/TFF", function (req, res) {
//   res.render("TFF");
// });
// router.get("/newDeal", function (req, res) {
//   res.render("newDeal");
// });
// router.get(
//   "/wishlist",
//   catchAsync(async function (req, res) {
//     const likedDeals = await LikedDeal.find({ user: req.logged });
//     // console.log(likedDeals);
//     res.render("wishlist", { likedDeals });
//   })
// );
// router.get("/login", function (req, res) {
//   res.render("login");
// });
// router.get("/signup", function (req, res) {
//   res.render("signup");
// });
// router.get(
//   "/search",
//   catchAsync(async function (req, res) {
//     const user = await User.findById(req.logged);
//     res.render("search", { user });
//   })
// );
// router.get("/logout", authController.logout);
module.exports = router;
