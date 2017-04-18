var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Passw0rd",
  database: "Bamazon"
});

inquirer.prompt([
  {
    type: "list",
    name: "option",
    message: "What would you like to do, Manager?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }
]).then(function(answers) {
  if(answers.option === "View Products for Sale") {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      console.log("Available Products:");

      for(var i = 0; i < res.length; i++) {
        if(res[i].stock_quantity > 0) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | In Stock: " + res[i].stock_quantity);
        }
      }
    });
  } else if (answers.option === "View Low Inventory") {

  }  else if (answers.option === "Add to Inventory") {

  }  else if (answers.option === "Add New Product") {

  }
});