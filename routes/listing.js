const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig");
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

// Index route
router.get("/", wrapAsync(listingController.index));

// Merged Index route and create new listing route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    // CREATE Route
    // Using ValidateListing as a Middleware(To validate the new listing data)
    .post(
        // validateListing,
        isLoggedIn,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );
// .post(upload.single("listing[image]"), (req, res) => {
//     res.send(req.file);
// });

// New Listing route
// When this route is placed under get(/listings/:id) then it is giving error
// Since if this route is placed after /listings/:id then in /new route new will be interpreted as id
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    // Show route
    .get(wrapAsync(listingController.showListing))
    // Update route
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    // Delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;
