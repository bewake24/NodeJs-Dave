const fs = require("fs")
const path = require("path")
const rsFile = path.join(__dirname, "files", "lorem.txt")
console.log(rsFile)
const rs = fs.createReadStream("./files/lorem.txt", {encoding: "utf-8"})

const ws = fs.createWriteStream(path.join(__dirname, "files", "newLorem.txt"));

// rs.on('data', (dataChunk)=>{
//     ws.write(dataChunk)
// })

rs.pipe(ws)