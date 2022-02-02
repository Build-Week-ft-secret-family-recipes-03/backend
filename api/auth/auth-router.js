const router = require("express").Router();
const Users = require("./../users/users-model");
const bcrypt = require("bcrypt");
const tokenBuilder = require("./auth-token-builder");

// [POST] /api/register - Register New User
router.post("/register", async (req, res, next) => {
  try {
    const { first_name, last_name, username, password } = req.body;

    if (!username || !password) {
      res.json({ message: "Please fill both username and password." });
    } else {
      const hashPassword = bcrypt.hashSync(password, 8);
      const insertedUser = await Users.insertUser({
        first_name,
        last_name,
        username,
        password: hashPassword,
      });

      res.json(insertedUser[0]);
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
      res.json({ message: "Username or password empty." });
    } else if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenBuilder(user);

      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    next(err);
  }

  // [GET] /api
});

module.exports = router;
