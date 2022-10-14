const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./app.js",
    dashboard: "./dashboard.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};

/** 
 * 
 * dev server config
 devServer: {
     static: {
         directory: path.join(__dirname, '/')
        },
        compress: true,
        port: 9000
    }
    * 
*/
