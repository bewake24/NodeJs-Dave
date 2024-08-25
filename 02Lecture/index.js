const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");



// With the help of callback (Creating Callback hell Here)

// fs.readFile(
//     path.join(__dirname, "files", "starter.txt"), //path.join used here to remove directory problem in various os, some os have forward slash some have backward
//     "utf-8",
//     (err, data) => {
//       if (err) throw err;
//       console.log(data);
//     }
//   );

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "I'm Fine,\nNice to meet You",
//   (err) => {
//     if (err) throw err;
//     console.log("Write opration successful");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nThis is awesome\n",
//       (err) => {
//         if (err) throw err;
//         console.log("Append operation successful");

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename operation sucessful");
//           }
//         );
//       }
//     );
//   }
// );

// process.on("uncaughtException", (err) => {
//   console.log("Unknown error Occured: " + err);
//   process.exit();
// });

console.log("Hello file system")


// With the help of async await. (No callback Hell)

// const fileOps = async () => {
//   try{
//     const data = await fsPromises.readFile(path.join(__dirname, "files", "starter.txt"), "utf-8");
//     console.log(data)
//     await fsPromises.unlink(path.join(__dirname, "files", "starter.txt")); //unlink deletes the file
//     await fsPromises.writeFile(path.join(__dirname, "files", 'promiseWrite.txt'), data)
//     await fsPromises.appendFile(path.join(__dirname, "files", 'promiseWrite.txt'), "\n\n\tNice to meet you!\n\tI'm fine")
//     await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"))
//     const newData = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf-8");
//     console.log(newData)
//   } catch (err) {
//     console.log(err)
//   }
// }

// fileOps()














// console.log("Hello")



// toString() vs toLocaleString()
// utf8 vs utf-8

// path.join why to use
// Async behaviour in fs
