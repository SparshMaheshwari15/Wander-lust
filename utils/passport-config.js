const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const users = [{ id: 1, username: "test", password: "test" }]; // Dummy user for demonstration

passport.use(
    new LocalStrategy(function (username, password, done) {
        const user = users.find((u) => u.username === username);
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = users.find((u) => u.id === id);
    done(null, user);
});

module.exports = passport;
