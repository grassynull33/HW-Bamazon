// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// MySQL connection set-up
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Passw0rd",
  database: "Bamazon"
});

// Main function
var manageInit = function() {
  // Menu to select from 4 functions
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
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price.toFixed(2) + " | In Stock: " + res[i].stock_quantity);
          }
        }

        // Loops back to the beginning of the app so that user can use again
        manageInit();
      });
    } else if (answers.option === "View Low Inventory") {
      // Only returns products with stock quantity less than 5
      connection.query("SELECT * FROM products WHERE stock_quantity < ?", [5], function(err, res) {
        if (err) throw err;

        console.log("Products with Low Inventory (< 5):");

        for(var i = 0; i < res.length; i++) {
          if(res[i].stock_quantity < 5) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price.toFixed(2) + " | In Stock: " + res[i].stock_quantity);
          }
        }

        manageInit();
      });
    }  else if (answers.option === "Add to Inventory") {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // After getting available products, ask user which product they'd like to add inventory for and how many
        inquirer.prompt([
          {
            type: "input",
            name: "itemId",
            message: "Enter the ID number of the item you'd like to add more of:",
            validate: function(value) {
              if(isNaN(value) === false && value > 0 && value < res.length + 1) {
                return true;
              } else {
                return false;
              }
            }
          },
          {
            type: "input",
            name: "quantityAdded",
            message: "How many would you like to add?",
            validate: function(value) {
              if(isNaN(value) === false && value > 0) {
                return true;
              } else {
                return false;
              }
            }
          }
        ]).then(function(answers) {
          var itemId = parseFloat(answers.itemId);
          var quantityAdded = parseFloat(answers.quantityAdded);

          // Update item with stock quantity specified
          connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [quantityAdded, itemId], function(err, res) {
            if (err) throw err;
          });

          console.log(res[itemId - 1].item_id + " | " + res[itemId - 1].product_name + " | $" + res[itemId - 1].price.toFixed(2) + " | In Stock: " + res[itemId - 1].stock_quantity + " (+" + quantityAdded + ") = " + (res[itemId - 1].stock_quantity + quantityAdded));

          manageInit();
        });
      });
    }  else if (answers.option === "Add New Product") {
      connection.query("SELECT * FROM products", function(err, res) {
        // Prompt user for information for new product
        inquirer.prompt([
          {
            type: "input",
            name: "productName",
            message: "Enter the name of the product:",
          },
          {
            type: "input",
            name: "departmentName",
            message: "Enter the name of the department:",
          },
          {
            type: "input",
            name: "price",
            message: "Enter the unit price:",
            validate: function(value) {
              if(isNaN(value) === false && value > 0) {
                return true;
              } else {
                return false;
              }
            }
          },
          {
            type: "input",
            name: "stockQuantity",
            message: "Enter the stock quantity:",
            validate: function(value) {
              if(isNaN(value) === false && value > 0) {
                return true;
              } else {
                return false;
              }
            }
          }
        ]).then(function(answers) {
          var productName = answers.productName;
          var departmentName = answers.departmentName;
          var price = parseFloat(answers.price).toFixed(2);
          var stockQuantity = answers.stockQuantity;

          // Add new entry into database
          connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [productName, departmentName, price, stockQuantity], function(err, res) {
            if (err) throw err;
          });

          console.log((res.length + 1) + " | " + productName + " | $" + price + " | In Stock: 0 (+" + stockQuantity + ") = " + stockQuantity);

          manageInit();
        });
      });
    }
  });
};

// Initialize
manageInit();