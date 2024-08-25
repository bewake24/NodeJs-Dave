const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController')

router.route('/')
    .get(usersController.getAllUser)
    .post(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:id').get(usersController.getAnUser)

module.exports = router;