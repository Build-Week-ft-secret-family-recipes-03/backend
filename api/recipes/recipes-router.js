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
      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          next({ status: 401, message: "Token Invalid." });
        } else {
          const returned = await Recipes.findRecipesByUser(decoded.username);
          res.json(returned);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Recipes.get(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {});

module.exports = router;
