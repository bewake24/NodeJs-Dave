const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const logEvent = require("./logEvents");
const EventEmitter = require("events");
const { ifError } = require("assert");

const PORT = process.env.PORT || 3500;

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on("log", (msg, fileName) => logEvent(msg, fileName));

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t ${req.method}`, "reqLog.txt")

  let filepath;

  //2 Ineffcient approaches
  // Both approaches are too slow, consumes lots of memory and  not dynamic

  // 1.) If else statement
  // if(req.url === '/' || req.url === "index.html"){
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html")
  //     filepath = path.join(__dirname, 'views', 'index.html');
  //     fs.readFile(filepath, "utf-8", (err, data) =>{
  //         if(err) throw err;
  //         res.end(data)
  //     })
  // }

  // 2.) Switch case statement
  // switch(req.url){
  //     case '/' :
  //         res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html")
  //     filepath = path.join(__dirname, 'views', 'index.html');
  //     fs.readFile(filepath, "utf-8", (err, data) =>{
  //         if(err) throw err;
  //         res.end(data)
  //     })
  // }

  const serveFIle = async (filepath, contentType, response) => {
    try {
      const rawData = await fsPromises.readFile(
        filepath,
        !contentType.includes("image") ? "utf-8" : ""
      );
      const data =
        contentType === "application/json" ? JSON.parse(rawData) : rawData;
      response.writeHead(filepath.includes("404.html") ? 404 : 200, {
        "Content-Type": contentType,
      });
      response.end(
        contentType === "application/json" ? JSON.stringify(data) : data
      );
    } catch (error) {
      console.log(error);
      myEmitter.emit("log", `${error.name}\t ${error.message}`, "errLog.txt")
      response.statusCode = 500;
      response.end();
    }
  };

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  filepath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") filepath += ".html"; //makes.html extension not required in the browser.

  const filesExists = fs.existsSync(filepath);
  if (filesExists) {
    // serve the file
    serveFIle(filepath, contentType, res);
  } else {
    switch (path.parse(filepath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;

      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;

      default:
        // serve 404 page
        serveFIle(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server Listening successfully on port: ${PORT}`);
});

// myEmitter.on("log", (msg) => logEvent(msg));
// myEmitter.emit("log", "Log events working successfully.")
