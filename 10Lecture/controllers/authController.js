const bcrypt = require("bcrypt");
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.sendStatus(400);
  }
  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) {
    return res.sendStatus(401);
  }

  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // Create JWTs for authorisation here
    res.status(200).json({ success: `User ${user} successfully logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
