const whiteList = ['https://valeff.com', 'http://localhost:3000'] //Remove these development websites when going into production
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin){ //remove !origin while going into production
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;