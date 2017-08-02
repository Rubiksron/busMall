'use strict';

Product.names = ['bag.jpg', 'banana.jpg', 'boots.jpg', 'chair.jpg', 'cthulhu.jpg', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

Product.all = [];
Product.justViewed = [];
Product.buttonEl = document.getElementById('clear-local-storage');
Product.container = document.getElementById('image-container');
Product.tableDynamicEl = document.getElementById('table-dynamic');
Product.pics = [document.getElementById('left'),
                document.getElementById('center'),
                document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;

function Product(name) {
  this.name = name;
  this.path = 'images/' + name;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
for( var i = 0; i < Product.names.length; i++ ) {
  new Product(Product.names[i]);
}

Product.prototype.makeRandomNumber = function() {
  return Math.floor(Math.random() * Product.names.length);
};

Product.prototype.displayPics = function() {
  var randomImages = [];

  randomImages[0] = Product.prototype.makeRandomNumber();
  randomImages[1] = Product.prototype.makeRandomNumber();

  while(randomImages[0] === randomImages[1]){
    console.log('Duplicate Found');
    randomImages[1] = Product.prototype.makeRandomNumber();
  }
  randomImages[2] = Product.prototype.makeRandomNumber();
  while(randomImages[2] === randomImages[1] || randomImages[2] === randomImages[0]){
    console.log('Duplicate Found');
    randomImages[2] = Product.prototype.makeRandomNumber();
  }

  for( var i = 0; i < 3; i++ ) {
    Product.pics[i].src = Product.all[randomImages[i]].path;
    Product.pics[i].id = Product.all[randomImages[i]].name;
    Product.all[randomImages[i]].views += 1;
    Product.justViewed[i] = randomImages[i];

  }
};

Product.prototype.handleClick = function(event) {
  console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks > 2) {
    Product.container.removeEventListener('click', Product.prototype.handleClick);
    Product.container.setAttribute('hidden', true);
    localStorage.setItem('totalClicks', JSON.stringify(Product.all));
    console.log('data transfering to local storage');
    Product.buttonEl.removeAttribute('hidden');
    canvas.removeAttribute('hidden');
    Product.prototype.makeTable();
    Product.prototype.makeChart();
  }
  if (event.target.id === 'image-container') {
    return alert('Click on an image!');
  }
  Product.totalClicks += 1;
  for(var i = 0; i < Product.names.length; i++){
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views');
    }
  }
  Product.prototype.displayPics();
};

Product.prototype.handleLocalStorage = function() {
  localStorage.clear();
  console.log('local storage has been cleared.');
}

Product.prototype.makeTable = function() {
  for(var i = 0; i < Product.all.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views';
    Product.tableDynamicEl.appendChild(thEl);
  }
};

Product.namesData = [];
Product.votesData = [];
Product.viewsData = [];

Product.prototype.makeChart = function() {
  for (var i = 0; i < Product.all.length; i++) {
    Product.namesData.push(Product.all[i].name);
    Product.votesData.push(Product.all[i].votes);
    Product.viewsData.push(Product.all[i].views);
  }

  Product.getChart = document.getElementById('canvas').getContext('2d');
  new Chart(Product.getChart).Bar(Product.data);
};

Product.data = {
  labels: Product.namesData,
  datasets: [
    {
      fillColor: 'rgba(220,220,220,0.75)',
      strokeColor: 'rgba(220,220,220,1)',
      data: Product.viewsData
    },
    {
      fillColor: 'rgba(151,187,205,0.75)',
      strokeColor: 'rgba(151,187,205,1)',
      data: Product.votesData
    }
  ]
};

if(localStorage.totalClicks) {
  Product.all = JSON.parse(localStorage.totalClicks);
  console.log('data received from local storage.');
}

Product.container.addEventListener('click', Product.prototype.handleClick);
Product.buttonEl.addEventListener('click', Product.prototype.handleLocalStorage)
Product.prototype.displayPics();
