const fs = require("fs");

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory created Successfully");
  });
}

if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory removed Successfully");
  });
}

process.on("uncaughtException", (err) => {
  console.log("Unknown error Occured: " + err);
  process.exit();
});