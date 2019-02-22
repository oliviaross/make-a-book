
//https://github.com/zenozeng/p5.js-pdf

var lines, markov, data1, data2, x = 160, y = 240;

var pdf;

function preload() {

  data1 = loadStrings('data/genesis.txt');
  data2 = loadStrings('data/neruda.txt');
}

function setup() {

  createCanvas(500, 500);
  textFont('times', 16);
  textAlign(LEFT);

  lines = ["click to (re)generate!"];

  // create a markov model w' n=4
  markov = new RiMarkov(3);

  // load text into the model
  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));

  drawText();

  pdf = createPDF();
  pdf.beginRecord();
}

function drawText() {

  background(250);
  text(lines.join('\n'), x, y, 400, 400);
}

function mouseClicked() {

  x = y = 50;
  lines = markov.generateSentences(10);
  drawText();

  pdf.save();
}


// var pdf;

// function setup() {
//     createCanvas(600, 200, P2D);
//     pdf = createPDF();
//     pdf.beginRecord();
// }

// function draw() {
//     background(255);
//     fill('#ED225D');
//     textSize(100);
//     textAlign(CENTER);
//     text(frameCount, width * 0.5, height * 0.5);
//     if (frameCount % 10 == 0) {
//         // noLoop();
//         pdf.save();
//     }
// }