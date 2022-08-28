var express = require("express");
var router = express.Router();
const portfoliosCtrl = require("../controllers/portfolios");

/* GET users listing. */
router.get("/", portfoliosCtrl.index);

router.get("/chart", function (req, res, next) {
  res.render("portfolios/chart", { title: "Chart" });
});

module.exports = router;
