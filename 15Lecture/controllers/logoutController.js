const User = require('../model/User')

const handleLogout = async (req, res) => {
  //Delete cookie on the client side as well
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content to send back
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  //Is refresh tokwn in DB?
  const foundUser = await User.findOne({refreshToken}).exec();
  console.log(foundUser)
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'none'});
    return res.sendStatus(204); //No content to send back
  }
  // Delete refresh token from database.
  // await User.findOneAndUpdate(foundUser,{ $set:{ refreshToken: "" }}, {new: true});
  foundUser.refreshToken = '';
  const result = foundUser.save();
  console.log(result)
  
  res.clearCookie("jwt", { httpOnly: true, sameSite: 'none' });
  res.sendStatus(204);
};

module.exports = { handleLogout };
