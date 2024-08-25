const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    console.log(req.body)
    data.employees.push({
        id: Math.round(Math.random()*100),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      })
    res.json({
        message: 'New user was added to the list',
      });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

router.route('/:id')
  .get((req, res) => {
    res.json({
        id: req.params.id
    })
  })

module.exports = router;
