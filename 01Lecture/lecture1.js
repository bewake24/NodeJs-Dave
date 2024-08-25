const os = require("os");
const osu = require("node-os-utils");
const path = require('path')





console.log("Hello Node");
console.log(os.type())
console.log(os.version())
console.log(os.homedir())
console.log(os.uptime())
console.log(os.machine())
console.log(os.hostname())
console.log(os.userInfo())
console.log(os.tmpdir())
console.log(os.platform())
console.log(os.release())
console.log(os.getPriority())
console.log(os.freemem()/(1024*1024) +"MB of RAM available")
console.log(os.totalmem()/(1024*1024*1024) +"GB of total RAM in this device")
console.log(os.cpus())

const cpu = osu.cpu;
console.log(cpu)
console.log(cpu.count())
console.log(cpu.average().totalIdle)

cpu.usage().then(cpuPercentage => {console.log(cpuPercentage)})

const drive = osu.drive;
drive.info()
  .then(info => {
    console.log(info)
  })

const mem = osu.mem;

mem.info().then((info) => {
  console.log(info);
});

const osuOs = osu.os;
osuOs.oos().then(oos => {
    console.log(oos)
})

 const openedFiles = osu.openfiles;
openedFiles.openFd().then((files) => {
  console.log(files);
});

console.log(__dirname);
console.log(__filename);


console.log(path.extname("server.js"))
console.log(path.dirname(__dirname))
console.log(path.dirname(__filename))
console.log(path.basename(__dirname))
console.log(path.basename(__filename))
console.log(path.parse(__filename))
console.log(path.parse(__dirname))