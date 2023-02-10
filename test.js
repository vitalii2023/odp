// write a contructor function, that accepts 2 parameters:
// name
// src

// this function should represent a product, and also have 2 other properties:
// clicks
// views
// that start at 0

// lastly, the contructor should have a property which is an array
// each time a new instance of the product is created, it should push itself into the array

//call the contructor Product

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];
