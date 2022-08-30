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

function show(req, res, next) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    console.log(req.params.id);
    Holding.find({ portfolio: portfolio._id }, function (err, holdings) {
      console.log(portfolio._id);
      res.render("portfolios/show", {
        title: "Dashboard",
        portfolio,
        holdings,
      });
    });
  });
}
