module.exports = app => {
    const env = process.env.NODE_ENV;
    if(env === "test") {
      return require(`./config.test.js`);
    } else {
      return require("./config.development.js");
    }
    
};