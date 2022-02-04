const router = require("express").Router();
const Recipes = require("../recipes/recipes-model");
const { authorize } = require("../auth/auth-middleware");

// [POST] /api/recipes - Recieve token and return user info and recipes
router.post("/", authorize, async (req, res, next) => {
  try {
    const { username } = req.decodedJWT;
    const returned = await Recipes.findRecipesByUser(username);

    res.status(200).json(returned);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/recipes/create - Creates recipe
router.post("/create", authorize, async (req, res, next) => {
  try {
    const userID = req.decodedJWT.id;
    const { title, source, pic_url, category, ingredients } = req.body;

    const createdRecipe = await Recipes.createRecipe(
      {
        title,
        source,
        pic_url,
        category,
        user_id: userID,
      },
      ingredients
    );
    res.status(200).json(createdRecipe);
  } catch (err) {
    next(err);
  }
});

// [PUT] /api/recipes/edit/:id - Edits recipe
router.put("/edit/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userID = req.decodedJWT.id;
    const { title, source, pic_url, category, ingredients } = req.body;

    const editedRecipe = await Recipes.updateRecipe(
      id,
      { title, source, pic_url, category, user_id: userID },
      ingredients
    );
    res.status(200).json(editedRecipe);
  } catch (err) {
    next(err);
  }
});

// [DELETE] /api/recipes/delete/:id - Delete recipe
router.delete("/delete/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;

    await Recipes.deleteRecipe(id);

    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
