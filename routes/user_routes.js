const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// const dealRouter = require("../routes/dealRoutes");
// const upload = multer({ dest: "/public/img/users" });
// bring back the user router from appjs
const router = express.Router();
router.use(authController.isLoggedIn);
// router.use("/:userId/deals", dealRouter);

router
  .route("/signup")
  // .delete(authController.resend)
  .post(authController.signUp, userController.createProfileLink);
router.post("/verify", authController.verify);

router.post("/login", authController.login);

// router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

////////////////////////////////////////////////////////////////////////////////////

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);
router.patch("/deletePhoto", userController.deletePhoto);
router.patch("/updatelink", userController.updateLink);

router.post("/resend", authController.resend);
////////////////////////////////////////////////////////////////////////////////////////////////

// router.use(authController.restrictTo('admin'));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post(
  "/uploadVideo",
  userController.uploadVideo,
  userController.addUserVideo
);

module.exports = router;
