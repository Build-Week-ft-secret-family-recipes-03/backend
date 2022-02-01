const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const data = await recipeResource.get();
    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
