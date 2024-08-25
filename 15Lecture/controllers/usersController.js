const User = require("../model/User");

const getAllUser = async (req, res) => {
    const users = await User.find()
    if(!users) return res.status(204).json({message: "No user found"})
    res.json(users);
}

const updateUser = async (req, res) =>{
    if(!req?.body?.id){
        return res.status(400).json({message: "Paas an userId to upate"})
    }
    const user = await User.findById(req.body.id);
    if(req.body?.username) user.username = req.body.username;
    if(req.body?.roles) user.roles = req.body.roles;

    const result = await user.save();
    res.json(result)
}

const deleteUser = async (req,res) => {
    if(!req?.body?.id) return res.status(400).json({message: "Paas an userId to delete"})
    
    const user = await User.findById(req.body.id).exec();

    if(!user) return res.status(400).json({message: `Employee coudln't be found with id ${req.body.id}`});
    console.log(user)

    const result = await user.deleteOne({_id: req.body.id});
    res.json(result)
    
}

const getAnUser = async (req, res) => {
    console.log(req.params)
    if(!req?.params?.id) return res.status(400).json({message: "Pass an userId to get the user"});

    const user = await User.findById(req.params.id).exec();

    if(!user) return res.status(204).json({message: `User not found with id ${req.params.id}`});

    res.json(user)
}

module.exports = { getAllUser, updateUser, deleteUser, getAnUser }
