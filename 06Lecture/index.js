const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.get("^/$|/index(.html)?", (req, res) => {
  // We can also pass regex in path
  // res.sendFile('./views/index.html', {root: __dirname})
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// Route Handlers

app.get(
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

app.get("/chain(.html)?", [one, two, three, four, five])

app.get("/*", (req, res) => {
  // res.redirect("/404.html")
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server Listening successfully on port: ${PORT}`);
});
