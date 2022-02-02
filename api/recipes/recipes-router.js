const router = require("express").Router();
const recipeResource = require("./recipes-model");

router.get("/", async (req, res) => {
  try {
    const data = await recipeResource.get(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {});

module.exports = router;
