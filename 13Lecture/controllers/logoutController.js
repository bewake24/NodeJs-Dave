const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //Delete cookie on the client side as well
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content to send back
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  //Is refresh tokwn in DB?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  console.log(foundUser)
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'none'});
    return res.sendStatus(204); //No content to send back
  }
  // Delete refresh token from database.
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: 'none' });
  res.sendStatus(204);
};

module.exports = { handleLogout };
