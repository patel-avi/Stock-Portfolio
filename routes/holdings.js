var express = require("express");
var router = express.Router();
const holdingsCtrl = require("../controllers/holdings");

router.post("/portfolios/:id/holdings", holdingsCtrl.create);

module.exports = router;
