const router = require("express").Router();
const Users = require("./../users/users-model");
const bcrypt = require("bcrypt");
const tokenBuilder = require("./auth-token-builder");

// [POST] /api/register - Register New User
router.post("/register", async (req, res, next) => {
  try {
    const { first_name, last_name, username, password } = req.body;

    if (!first_name || !last_name || !username || !password) {
      next({ status: 400, message: "Please make sure all inputs are filled." });
    } else {
      const hashPassword = bcrypt.hashSync(password, 8);
      const insertedUser = await Users.insertUser({
        first_name,
        last_name,
        username,
        password: hashPassword,
      });

      res.status(200).json(insertedUser[0]);
    }
  } catch (err) {
    next(err);
  }
});

// [POST] /api/login - Register New User
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [user] = await Users.findBy({ username });

    if (!username || !password) {
      next({ status: 400, message: "Please make sure all inputs are filled." });
    } else if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenBuilder(user);

      res.status(200).json({ user, token });
    } else {
      next({ status: 400, message: "Invalid Credentials." });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
