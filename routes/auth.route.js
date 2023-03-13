const express = require("express"),
  asyncMiddleware = require("express-async-handler"),
  authCtrl = require("../controllers/authController"),
  router = express.Router();

router.post("/account/register", asyncMiddleware(authCtrl.createUser));
router.post("/account/login", asyncMiddleware(authCtrl.login));
router.get("/account/logout/:token", asyncMiddleware(authCtrl.logout));

module.exports = router;
