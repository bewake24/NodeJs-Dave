const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const cors = require('cors');

const PORT = process.env.PORT || 3000;


//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
const whiteList = ['https://valeff.com', 'http://localhost:3000'] //Remove these development websites when going into production
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin){ //remove !origin while going into production
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//builtin middleware to process urlencoded data in other words form data, content type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}))

// BuiltIn middleware for json
app.use(express.json());

// Serve static files to the web. i.e files in /public folder
app.use(express.static(path.join(__dirname, "/public")))

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

app.all("*", (req, res) => {
  // res.redirect("/404.html")
  
  if (req.accepts('html')){
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts('json')){
    res.json({error: '404 Not found'})
  } else {
    res.type('txt').send('404 not found')
  }
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server Listening successfully on port: ${PORT}`);
});
