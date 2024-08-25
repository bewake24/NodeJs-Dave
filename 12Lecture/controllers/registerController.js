const bcrypt = require("bcrypt");
const fsPoromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required to register user" });
  }

  const dublicate = usersDB.users.find((person) => person.username === user);
  if (dublicate) return res.sendStatus(409); //conflict

  try {
    //Protect the password
    const hashedpwd = await bcrypt.hash(pwd, 10);

    //Store new User
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedpwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPoromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);

    res.status(201).json({ success: `New user ${user} added successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
