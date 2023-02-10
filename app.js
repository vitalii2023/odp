let totalClicks = 0;
let maxClicks = 5;

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

function Product(name, src, clicks, views) {
  this.name = name;
  this.src = src;
  this.clicks = clicks;
  this.views = views;
  Product.allProducts.push(this);
}

Product.allProducts = [];

// Using this array, create a new product for each item
// the name of the product should be the item in the array
// the src of the product should be like so:
// images/ PRODUCTNAME.jpg

// array is in discord chat:
const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

if (localStorage.getItem("productData") === null) {
  for (let i = 0; i < productData.length; i++) {
    new Product(productData[i], `images/${productData[i]}.jpeg`, 0, 0);
  }
} else {
  const productData = localStorage.getItem("productData");

  for (let i = 0; i < productData.length; i++) {
    new Product(
      productData[i].name,
      productData[i].src,
      productData[i].clicks,
      productData[i].views
    );
  }
}

// let myName = "Hannah";
// let sentence = "This sentence tells us your name is " + myName; //concatenation (zcheplennya,zpletennya)
// let sentence2 = `This sentence tells us your name is ${myName}`; //template literals (chrisp literals)

// use Google to help you
// write a function that  returns a random number
// the number will represent an index value for one of the items in the Product.alProducts array

function randomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

// write a function to render our images
// have the images be chosen randomly from our Product.allProducts array
// hint, use randomProductIndex() and bracket notation to acces the item in the array

function renderImages() {
  //get three indexes for my product array
  let index1 = randomProductIndex();
  let index2 = randomProductIndex();
  let index3 = randomProductIndex();

  //make sure none of them are the same
  while (index1 === index2 || index1 === index3 || index2 === index3) {
    index2 = randomProductIndex();
    index3 = randomProductIndex();
  }

  //retrieve our image elements
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  //change the src attribute of image1, image2, image3 to be the src from our random products.
  img1.src = Product.allProducts[index1].src;
  img2.src = Product.allProducts[index2].src;
  img3.src = Product.allProducts[index3].src;

  img1.alt = Product.allProducts[index1].name;
  img2.alt = Product.allProducts[index2].name;
  img3.alt = Product.allProducts[index3].name;

  // increase the views for the three products we are looking at
  Product.allProducts[index1].views++;
  Product.allProducts[index2].views++;
  Product.allProducts[index3].views++;
}
renderImages();

// make sure the user is clicking on one of the images (check the event.target.alt)
// increase the clicks on the clicked Product object (for loop and clicks++)

function handleClick(event) {
  //check if the thing we clicked on is the container (as aposed to an image)
  if (event.target === imgContainer) {
    alert("Please click on an image, not inbetween the images");
    return; // this return stops the function
  }

  let clickedProduct = event.target.alt;

  // check every single products "name" against the alt tag of the target , and increase the clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (clickedProduct === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      console.log(
        Product.allProducts[i].name + " " + Product.allProducts[i].clicks
      );
      break; // stop the loop , because we found our product
    }
  }
  // each time we click we need to increase total clicks
  // we need to check if we've reached the maximum number of clicks allowed
  // if we have, don't render more images, and remove the eventlistener on the image container
  // if we haven't , render more images

  totalClicks++;
  console.log(totalClicks);
  if (totalClicks === maxClicks) {
    alert("Thank you for voting!");
    imgContainer.removeEventListener("click", handleClick);

    const productsStr = JSON.stringify(Product.allProducts);
    localStorage.setItem("productData", productsStr);

    renderChart();
    return; //end the function
  }
  // get three new images
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

// render a chart
// using chartJS
// have a chart display in the section underneath the img-container
// use a canvas tag with an id
// use the demo chart from the chatjs docs
// include the script i sent in your html

function renderChart() {
  const theChart = document.getElementById("chart");
  let labels = [];
  let viewData = [];
  let clickData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewData.push(Product.allProducts[i].views);
    clickData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clickData,
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };

  new Chart(theChart, config);
}

// render the initial images
renderImages;
