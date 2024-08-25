const dateFns = require("date-fns")
const  uuid = require("uuid")


console.log('Hello npmjs')
console.log(dateFns.format(new Date(), "yyy_MM-dd\tHH?mm:ss"))
console.log(uuid.v4())
console.log(uuid.v6())


// "dependencies": {
//      "packagename": "v1.v2.v3",
                // v1 => Represents Major version : Contains major changes, doesnot update v1 without looking at documentation
                // v2 => Represents Minor Version : Contains minor changes, v2 update doensnot change the doumentations much and you should change it if new minor verison exist in this major version
                // V3 => Represent Patch Version  : Bug fixes and refactor of code is done in this version.
//      "uuid": "~10.0.0" => "~" symbol means only update the patch version if new version is available
//      "uuid": "^10.0.0"   => "^" symbol menas update nimor and patch version if available, by default this key is on.
//      "uuid": "*" => Update all  major, minor & patch versions
//      "uuid": "10.0.0" => when no symbol added with varsion it means never update the version.
//   }