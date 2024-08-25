const dateFns = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

console.log("Hello npmjs");

const logEvents = async (message, logName) => {
  const date = dateFns.format(new Date(), "dd/mm/yyyy\tHH:mm:ss");
  const logItem = `${date}\t ${uuid()}\t ${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
      console.log("Log folder created successfully");
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", logName),
      `${date}\t ${uuid()}\t ${message}\n`
    );
  } catch (error) {
    console.log(error)
  }
};

module.exports = logEvents;
