var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Stock Portfolio" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/portfolios",
    failureRedirect: "/portfolios",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    console.log("logged out");
    res.redirect("/"); // would send user to logout page or home
  });
});

// router.get("/portfolios", function (req, res, next) {
//   res.render("portfolios/index", { title: "Dashboard" });
// });

module.exports = router;
