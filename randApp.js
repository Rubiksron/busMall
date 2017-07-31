'use strict';

Product.names = ['bag.jpg', 'banana.jpg', 'boots.jpg', 'chair.jpg', 'cthulhu.jpg', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

Product.all = [];
Product.container = document.getElementById('image-container');
Product.tableDynamicEl = document.getElementById('tableDynamicEl');
Product.justViewed = [];
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
for(var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

function makeRandomNumber() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics() {
  var numbers = [];

  numbers[0] = makeRandomNumber();
  numbers[1] = makeRandomNumber();

  while(numbers[0] === numbers[1]){
    console.log('Duplicate Found');
    numbers[1] = makeRandomNumber();
  }
  numbers[2] = makeRandomNumber();
  while(numbers[2] === numbers[1] || numbers[2] === numbers[0]){
    console.log('Duplicate Found');
    numbers[2] = makeRandomNumber();

  }
  Product.pics[0].src = Product.all[numbers[0]].path;
  Product.pics[1].src = Product.all[numbers[1]].path;
  Product.pics[2].src = Product.all[numbers[2]].path;
  Product.pics[0].id = Product.all[numbers[0]].name;
  Product.pics[1].id = Product.all[numbers[1]].name;
  Product.pics[2].id = Product.all[numbers[2]].name;
  Product.all[numbers[0]].views += 1;
  Product.all[numbers[1]].views += 1;
  Product.all[numbers[2]].views += 1;
  Product.justViewed[0] = numbers[0];
  Product.justViewed[1] = numbers[1];
  Product.justViewed[2] = numbers[2];

}

function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks > 4) {
    Product.container.removeEventListener('click', handleClick);
    canvas.removeAttribute('hidden');
    showTally();
    // makeChart();
  }
  if (event.target.id === 'image-container') {
    return alert('Click on an image, or else or else/or!');
  }
  Product.totalClicks += 1;
  for(var i = 0; i < Product.names.length; i++){
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views');
    }
  }
  displayPics();
}

function showTally() {
  for(var i = 0; i < Product.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views';
    Product.tally.appendChild(liEl);
  }
}

// function makeChart() {
//   for (var i = 0; i < Product.all.length; i++) {
//     Product.name[i] = Product.all[i].name;
//     Product.votes[i] = Image.all[i].votes;
//     Product.views[i] = Image.all[i].views;
//     console.log('**********Product.votes[i]:**********  ', Product.votes[i]);
//     console.log('++++++++Product.views[i]+++++++++++', Product.views[i]);
//   }
//   var data = {
//     labels: ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'],
//     datasets: [
//       {
//         fillColor: 'rgba(220,220,220,0.75)',
//         strokeColor: 'rgba(220,220,220,1)',
//         data: votes
//       },
//       {
//         fillColor: 'rgba(151,187,205,0.75)',
//         strokeColor: 'rgba(151,187,205,1)',
//         data: views
//       }
//     ]
//   };
//   var getChart = document.getElementById('canvas').getContext('2d');
//   new Chart(getChart).Bar(data);
// }


Product.container.addEventListener('click', handleClick);
displayPics();
