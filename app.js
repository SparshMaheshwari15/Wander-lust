if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
main()
    .then((res) => {
        console.log("Connection Successful to DB");
    })
    .catch((e) => {
        console.log(e);
    });

async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}

/*
app.get("/testListening", async (req, res) => {
    let sampleListing = new Listing({
        title: "My Home",
        description: "By the beach",
        price: 1200,
        location: "Delhi",
        country: "India",
    });
    await sampleListing
        .save()
        .then((result) => {
            console.log("Listing added");
            res.send("Success testing");
        })
        .catch((err) => {
            console.log(err);
            res.send("ERROR");
        });
});
*/

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // 7 Days * 24 Hours * 60 Minutes * 60 Seconds * 1000 Milliseconds
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    // res.send(`Root is working <br> <br> <a href="/listings">Here</a> `);
    res.redirect("/listings");
});

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "sparsh@gmail.com",
//         username: "sparsh",
//     });
//     let registeredUser = await User.register(fakeUser, "password");
//     res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error Handling Middleware
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

// Error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err, statusCode, message });

    // res.send("Something went wrong");
});

// app.use((req, res) => {
//     res.status(404).render("error/PageNotFound.ejs");
// });

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});
