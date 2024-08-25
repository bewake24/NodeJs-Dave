const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../model/User')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.sendStatus(400);
  }
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles)
    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: { username: foundUser.username, roles: roles  },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "900s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving Refresh token with current user

    // Method-1
    // await User.findOneAndUpdate(foundUser,{ $set:{ refreshToken: refreshToken }}, {new: true});

    // Method-2
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save()
    console.log(result)
    
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
