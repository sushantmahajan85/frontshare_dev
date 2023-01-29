const express = require("express");
const blockController = require("../controllers/blockController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.isLoggedIn);

// router
//   .route("/sociallink")
//   .post(authController.protect, blockController.createSocialLink);

// router
//   .route("/sociallink/:id")
//   .patch(blockController.updateSocialLink)
//   .delete(blockController.deleteSocialLink);

router
  .route("/customtext")
  .post(authController.protect, blockController.createCustomText);

router
  .route("/customtext/:id")
  .patch(blockController.updateCustomText)
  .delete(blockController.deleteCustomText);

router
  .route("/newsletter")
  .post(authController.protect, blockController.createNewsLetter);

router
  .route("/newsletter/:id")
  .patch(blockController.updateNewsLetter)
  .delete(blockController.deleteNewsLetter);

router
  .route("/videopreview")
  .post(authController.protect, blockController.createVideoPreview);

router
  .route("/videopreview/:id")
  .patch(blockController.updateVideoPreview)
  .delete(blockController.deleteVideoPreview);

router
  .route("/customlink")
  .post(authController.protect, blockController.createCustomLink);

router
  .route("/customlink/:id")
  .patch(blockController.updateCustomLink)
  .delete(blockController.deleteCustomLink);

router.route("/canvas").post(blockController.updateCanvas);

module.exports = router;
