# ![logo](https://cloud.githubusercontent.com/assets/21274043/25304539/fc27df56-271d-11e7-9491-54ee3dea7067.png)

Use the command line to buy from and manage our online store, Bamazon. You can either be a customer and buy goods, or you be the manager and do manager-like things such as viewing inventory or adding new products.

## Usage

If you are the customer, type into the command line:

```
$ node bamazonCustomer.js
```

If you want to be the manager,

```
$ node bamazonManager.js
```

Also, make sure to install `inquirer` and `mysql` packages before executing. You can do this by typing this into the command line before execution;

```
$ npm install
```

After execution, you will prompted by the command line to make your selection!

## Requirements

### bamazonCustomer.js

![screenshot 2017-04-22 05 43 52](https://cloud.githubusercontent.com/assets/21274043/25304576/f6377f24-271e-11e7-9da0-c991dc557c88.png)

- Upon execution, display items available for purchase
- Prompt user for desired item's ID and quantity demanded
- Make transaction if there is sufficient quantity in stock

### bamazonManager.js

![screenshot 2017-04-22 05 45 03](https://cloud.githubusercontent.com/assets/21274043/25304575/f6227fde-271e-11e7-8f27-e344ed0974e9.png)

- Display manager menu upon execution for different functions:
1. View store's products
2. View products with low inventory
3. Add stock to existing products
4. Add new products

## Technologies Used

- JavaScript
- node.js
- MySQL database
- `inquirer` and `mysql` npm packages

## Code Explanation

- Product data is stored in a MySQL database on our localhost server; it is required to start up the server in the command line and also to set up the database either in Sequel Pro or via command line
- To access the database programmatically, we use the `mysql` npm package to query the database from the code itself; that allows us to grab or edit the data and parse through it as we please (run any CRUD operation)

```js
	connection.query("SELECT * FROM products", function(err, res) { ... });
```

- The `inquirer` npm package allows us to prompt the user for input such as item ID and quantity demanded
- Recursion and promises were essential to this program as it required the calling of functions but only after the user had completed certain steps, e.g. wait for user to finish input
- As for the manager app, menu allows user to select from 4 different functions and uses the same logic of prompting user input via `inquirer` and then either displaying database entries or making changes via queries





