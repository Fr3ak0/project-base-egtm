var express = require("express");
var router = express.Router();
const Categories = require("../db/models/Catagories");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/enum");
const e = require("express");
/* GET categories listing. */
router.get("/", async (req, res, next) => {
  try {
    let categories = await Categories.find({});
    res.json(Response.succesResponse(categories));
  } catch (error) {
    res.json(Response.errorResponse(err));
  }
});
router.post("/add", async (req, res) => {
  let body = req.body;
  try {
    if (!body.name)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error",
        "Name is required"
      );
    let category = new Categories({
      name: body.name,
      is_active: true,
      created_by: req.user?.id,
    });
    await category.save();
    res.json(Response.succesResponse({ succes: true }));
  } catch (error) {
    // Burdan devam edeceksin
    res.json(Response.errorResponse(err));
  }
});

module.exports = router;
