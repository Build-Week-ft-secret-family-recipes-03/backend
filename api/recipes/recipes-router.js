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
          res.status(200).json(returned);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

// [POST] /api/recipes/create - Creates recipe
router.post("/create", async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      next({ status: 401, message: "Token Required." });
    } else {
      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          next({ status: 401, message: "Token Invalid." });
        } else {
          const userID = decoded.id;
          const { title, source, pic_url, category, ingredients } = req.body;
          // const returned = await Recipes.findRecipesByID(req.params.id);
          await Recipes.createRecipe({
            title,
            source,
            pic_url,
            category,
            user_id: userID,
          });
          res.status(200).json(req.body);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
