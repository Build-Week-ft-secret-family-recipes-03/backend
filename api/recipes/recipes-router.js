const router = require("express").Router();
const Recipes = require("../recipes/recipes-model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// [POST] /api/recipes - Recieve token and return user info and recipes
router.post("/", async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      next({ status: 401, message: "Token Required." });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          next({ status: 401, message: "Token Invalid." });
        } else {
          res.json(decoded);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await recipeResource.get();
    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
