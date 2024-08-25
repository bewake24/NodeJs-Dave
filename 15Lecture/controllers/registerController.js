const bcrypt = require("bcrypt");
const User = require('../model/User')

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required to register user" });
  }

  //Check for duplicates Username in DB
  const dublicate = await User.findOne({ username: user }).exec();
  if (dublicate) return res.sendStatus(409); //conflict

  try {
    //Protect the password
    const hashedpwd = await bcrypt.hash(pwd, 10);

    //Create and Store the new User
    //Method-1
    const result = await User.create({
      username: user,
      password: hashedpwd
    })

    //Method-2 of saving new user
    // const newUser = new User();
    // newUser.username = user;
    // newUser.password = hashedpwd
    // const result = await newUser.save()

    console.log(result)

    res.status(201).json({ success: `New user ${user} added successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
