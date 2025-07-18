const express = require("express");
const router = express.Router();

router.get("/:id", (req, res, next) => {
  res.json({
    body: req.body,
    headers: req.headers,
    params: req.params,
    query: req.query,
  });
});

module.exports = router;
