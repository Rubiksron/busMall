'use strict';

var imagesArray = [];
var productNames = [];
var numClicks = [];
var timesDisplayed = [];

function Image(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.timesDisplayed = 0;
  imagesArray.push(this);
}

var bagImage = new Image('bag','bag.jpg');
var bananaImage = new Image('banana', 'banana.jpg');
var bootsImage = new Image('boots', 'boots.jpg');
var chairImage = new Image('chair', 'chair.jpg');
var cthulhuImage = new Image('cthulhu', 'cthulhu.jpg');
var dragonImage = new Image('dragon', 'dragon.jpg');
var penImage = new Image('pen', 'pen.jpg');
var scissorsImage = new Image('scissors', 'scissors.jpg');
var sharkImage = new Image('shark', 'shark.jpg');
var sweepImage = new Image('sweep', 'sweep.png');
var unicornImage = new Image('unicorn', 'unicorn.jpg');
var usbImage = new Image('usb', 'usb.gif');
var water_canImage = new Image('water_can', 'water-can.jpg');// BEWARE: underscore vs. dash
var wine_glassImage = new Image('wine_glass', 'wine-glass.jpg');

var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');
var randomNumber1 = 0;
var randomNumber2 = 0;
var randomNumber3 = 0;
var globalClickTracker = 0;
var button = document.getElementById('loadButton');

function getThreeImages() {
  getRandomImage1();
  getRandomImage2();
  getRandomImage3();
  duplicatePreventer();
}
function duplicatePreventer() {
  while (image1.src === image2.src || image1.src === image3.src || image2.src === image3.src){
    getThreeImages();
  }
}

function getRandomImage1() {
  randomNumber1 = Math.floor(Math.random() * imagesArray.length);
  document.getElementById('image1').src= 'images-to-be-used/' +  imagesArray[randomNumber1].filePath;
}
function getRandomImage2() {
  randomNumber2 = Math.floor(Math.random() * imagesArray.length);
  document.getElementById('image2').src= 'images-to-be-used/' +  imagesArray[randomNumber2].filePath;
}
function getRandomImage3() {
  randomNumber3 = Math.floor(Math.random() * imagesArray.length);
  document.getElementById('image3').src= 'images-to-be-used/' +  imagesArray[randomNumber3].filePath;
}
var imageContainer;
function handleClickOnFirst() {
  imagesArray[randomNumber1].timesDisplayed += 1;
  imagesArray[randomNumber1].numClicks += 1;
  globalClickTracker += 1;
  if (globalClickTracker === 15) {
    canvas.removeAttribute('hidden');
    image1.setAttribute('hidden', true);

    image2.style.display = 'none';
    makeChart();
    image3.style.display = 'none';
  }
  getThreeImages();
}

function handleClickOnSecond() {
  imagesArray[randomNumber2].timesDisplayed += 1;
  imagesArray[randomNumber2].numClicks += 1;
  globalClickTracker += 1;
  if (globalClickTracker === 15) {
    canvas.removeAttribute('hidden');

    image1.setAttribute('hidden', true);
    image2.style.display = 'none';
    image3.setAttribute('hidden', true);
    makeChart();
  }
  getThreeImages();
}

function handleClickOnThird() {
  imagesArray[randomNumber3].timesDisplayed += 1;
  imagesArray[randomNumber3].numClicks += 1;
  globalClickTracker += 1;
  if (globalClickTracker === 15) {
    canvas.removeAttribute('hidden');

    image1.setAttribute('hidden', true);
    image2.style.display = 'none';
    image3.setAttribute('hidden', true);
    makeChart();
  }
  getThreeImages();
}

image1.addEventListener('click', handleClickOnFirst);
image2.addEventListener('click', handleClickOnSecond);
image3.addEventListener('click', handleClickOnThird);
getThreeImages();

function makeChart() {
  for (var i = 0; i < imagesArray.length; i++) {
    productNames[i] = imagesArray[i].productName;
    numClicks[i] = imagesArray[i].numClicks;
    timesDisplayed[i] = imagesArray[i].timesDisplayed;
  }
  var data = {
    labels: ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'],
    datasets: [
      {
        fillColor: 'rgba(220,220,220,0.75)',
        strokeColor: 'rgba(220,220,220,1)',
        data: numClicks
      },
      {
        fillColor: 'rgba(151,187,205,0.75)',
        strokeColor: 'rgba(151,187,205,1)',
        data: timesDisplayed
      }
    ]
  };
  var getChart = document.getElementById('canvas').getContext('2d');
  new Chart(getChart).Bar(data);

}
