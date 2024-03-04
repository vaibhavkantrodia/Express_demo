const router = require("express").Router();
const Controller = require("../controller/auth.controller");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/forgotPassword", Controller.forgotPassword);
router.post("/resetPassword", Controller.resetPassword);

module.exports = router;