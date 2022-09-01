const User = require("../models/user");
const Holding = require("../models/holding");
const Portfolio = require("../models/portfolio");

module.exports = {
  index,
  new: newPortfolio,
  show,
};

function index(req, res, next) {
  let loggedInUser = req.user.googleId;
  User.find({ googleId: loggedInUser }, function (err, user) {
    Portfolio.find({ user: user._id }, function (err, portfolios) {
      res.render("portfolios/index", {
        portfolios,
        user,
      });
    });
  });
}

function newPortfolio(req, res) {
  const newPortfolio = new Portfolio();
  Portfolio.count({}, function (err, count) {
    newPortfolio.portfolioID = count + 1;
    newPortfolio.save(function (err) {
      res.redirect("/portfolios/");
    });
  });
}

function show(req, res, next) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    Holding.find({ portfolio: portfolio._id }, function (err, holdings) {
      res.render("portfolios/show", {
        title: "Dashboard",
        portfolio,
        holdings,
      });
    });
  });
}
