require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3000;

//Connect to mongoDB
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check - before cors
//and fetch cookies credetials requirements
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//builtin middleware to process urlencoded data in other words form data, content type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// BuiltIn middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Serve static files to the web. i.e files in /public folder
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//routes below verifyJWT will require users to login before accessing it.
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

//Don't send rest of the requests if connection with MongoDB is note established.
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server Listening successfully on port: ${PORT}`);
  });
});
