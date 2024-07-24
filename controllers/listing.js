const Listing = require("../models/listing");
// https://github.com/mapbox/mapbox-sdk-js/
// GitHub link for mapbox code
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let listings = await Listing.find({});
    // console.log(listings);
    res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    // console.log(listing);
    if (!listing) {
        req.flash("error", "Listing doesn't exist!");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    // console.log(response.body.features[0].geometry);

    let listing = req.body.listing;
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "Send valid Data for listing");
    // }
    // console.log(listing);

    const newListing = new Listing(listing);
    newListing.owner = req.user._id;

    // Photo on cloud
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };

    // Mapbox coordinate
    newListing.geometry = response.body.features[0].geometry;

    let saved = await newListing.save();
    console.log(saved);

    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing doesn't exist!");
        res.redirect("/listings");
    }
    let orgImgUrl = listing.image.url;
    orgImgUrl.replace("/upload", "/upload/w_300,h_250");
    res.render("listings/edit.ejs", { listing, orgImgUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let newListing = req.body.listing;
    // let listing = await Listing.findById(id);
    // console.log(newListing);
    let listing = await Listing.findByIdAndUpdate(id, { ...newListing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};
