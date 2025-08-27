const express = require("express");
const router = express.Router();

// Example admin route
router.get("/", (req, res) => {
  res.send("Admin route working!");
});

module.exports = router;
