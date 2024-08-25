const express = require("express");
const router = express.Router();

// Chaining route handlers
const one = (req, res, next) => {
  console.log("Function one");
  next();
};
const two = (req, res, next) => {
  console.log("Function two");
  next();
};
const three = (req, res, next) => {
  console.log("Function three");
  next();
};
const four = (req, res, next) => {
  console.log("Function four");
  next();
};
const five = (req, res) => console.log("Function five");

router.get("/", [one, two, three, four, five]);

router.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("First function called succcessfully");
    next();
  },
  (req, res, next) => {
    console.log("Second Function called Successfully");
    next();
  },
  (req, res) => {
    console.log("Last function called successfully");
  }
);

module.exports = router;
