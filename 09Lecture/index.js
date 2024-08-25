const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const cors = require('cors');
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 3000;


//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//builtin middleware to process urlencoded data in other words form data, content type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}))

// BuiltIn middleware for json
app.use(express.json());

// Serve static files to the web. i.e files in /public folder
app.use(express.static(path.join(__dirname, "/public")))
app.use('/subdir', express.static(path.join(__dirname, "/public"))) //This line is telling to 'Use public folder when in subdir directory'

//routes
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))


app.all("*", (req, res) => {
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
