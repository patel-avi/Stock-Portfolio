var express = require("express");
var router = express.Router();
const holdingsCtrl = require("../controllers/holdings");

router.post("/portfolios/:id/holdings", holdingsCtrl.create);
router.get("/portfolios/:id/holdings/:id2/edit", holdingsCtrl.edit);
router.put("/portfolios/:id/holdings/:id2", holdingsCtrl.update);

module.exports = router;
