const logEvent = require("./logEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg) => logEvent(msg));
myEmitter.emit("log", "Log events working successfully.")
