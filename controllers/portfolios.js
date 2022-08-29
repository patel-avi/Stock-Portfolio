"use strict";
var request = require("request");
const User = require("../models/user");
const Holding = require("../models/holding");
const Portfolio = require("../models/portfolio");

module.exports = {
  index,
  new: newPortfolio,
  search,
  show,
};

function index(req, res, next) {
  let loggedInUser = req.user.googleId;
  User.find({ googleId: loggedInUser }, function (err, user) {
    Portfolio.find({ user: user._id }, function (err, portfolios) {
      res.render("portfolios/index", {
        portfolios,
        title: "Dashboard",
      });
    });
  });
}

function newPortfolio(req, res) {
  const newPortfolio = new Portfolio();
  newPortfolio.portfolioID = "5";
  console.log(req.params.id);
  newPortfolio.save(function (err) {
    res.redirect("/portfolios/");
  });
  // res.redirect(`/portfolios/${req.params.id}`);
}

function search(req, res, next) {
  const options = {
    url: `${rootURL}/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.apikey}`,
    json: true,
    headers: { "User-Agent": "request" },
  };
  request.get(options, function (err, res, data) {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  });
}

function show(req, res, next) {
  res.render("portfolios/show", { title: "Dashboard", newPortfolio });
}
