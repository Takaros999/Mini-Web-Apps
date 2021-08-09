const express = require("express");
const router = express.Router();
const {
  register_get,
  register_post,
  login_get,
  login_post,
  logout,
} = require("../controllers/authController");

//register
router.get("/register", register_get);

router.post("/register", register_post);

router.get("/login", login_get);

router.post("/login", login_post);

//logout
router.get("/logout", logout);

module.exports = router;
