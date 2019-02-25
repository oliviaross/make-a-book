//https://github.com/MrRio/jsPDF

var lines, markov, data1, data2;
var cx, cy, r, button, doc;

function preload() {
  data1 = loadStrings('data/genesis.txt');
  data2 = loadStrings('data/neruda.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  doc = new jsPDF();
  doc.setFontSize(16);

  // create a markov model w' n=4
  markov = new RiMarkov(3);

  // load text into the model
  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));

  // empty poem
  lines = [];

  cx = width/2;
  cy = height/2;
  r = width/2;

  button = createButton("Add poem");
  button.position(cx - 20, (cy + r/1.5));
  button.mousePressed(generate);
}

function draw() {
  fill(150);
  ellipse(cx, cy, width/2);

  fill(255);
  textAlign(CENTER);
  textFont('helvetica', 32);
  text("Generate book!", width/2, height/2);
}

function generate(){
  lines = markov.generateSentences(10);
  var textLines = doc.setFont('times').splitTextToSize(lines.join('\n'), 130);
  doc.text(textLines, 20, 20);

  doc.addPage(1, 'a6');
}


function mouseClicked() {
  if (abs(cx - mouseX) < width/4 && abs(cy - mouseY) < width/4 ){
    doc.save('book.pdf');
    console.log("Pressed!");
  }
}

