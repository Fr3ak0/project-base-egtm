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
    let errorResponese = Response.errorResponse(error);
    res.status(errorResponese.code).json(errorResponese);
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
    let errorResponese = Response.errorResponse(error);
    res.status(errorResponese.code).json(errorResponese);
  }
});
router.post("/update", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error!",
        "_id field must be filled"
      );

    let updates = {};

    if (body.name) updates.name = body.name;
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Categories.updateOne({ _id: body._id }, updates);

    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});
router.delete("/delete", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error!",
        "_id field must be filled"
      );

    await Categories.deleteOne({ _id: body._id });

    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
