const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
    validateReview,
    isLoggedIn,
    isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Reviews
// POST review Route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

// Delete review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyreview)
);

module.exports = router;
