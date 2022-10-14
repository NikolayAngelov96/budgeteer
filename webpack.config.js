const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    dashboard: "./src/dashboard.js",
    summary: "./src/summary.js",
    budget: "./src/budget.js",
    expenses: "./src/expenses.js",
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
