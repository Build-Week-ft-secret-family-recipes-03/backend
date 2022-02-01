const router = require("express").Router();
const Users = require("./users-model");

// [GET] /api/users - Get All Users
router.get("/", async (req, res) => {
  try {
    const usersArr = await Users.findAllUsers();
    res.json(usersArr);
  } catch (err) {
    console.log(err);
  }
});

// [GET] /api/users/:id - Get User By ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findUserByID(req.params.id);

    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
