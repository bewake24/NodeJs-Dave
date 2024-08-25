const dateFns = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const logEvents = async (message, logName) => {
  const date = dateFns.format(new Date(), "dd/MM/yyyy\tHH:mm:ss");

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
      console.log("Log folder created successfully");
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      `${date}\t ${uuid()}\t ${message}\n`
    );
  } catch (error) {
    console.log(error)
  }
};

const logger = (req, res, next)=>{
  logEvents(`${req.method} \t ${req.headers.origin} \t ${req.url}`, 'reqLog.txt')
  next();
}

module.exports = { logger, logEvents };
