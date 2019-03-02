var lines, markov, data1, data2, data3, x = 160, y = 240;
var fileSelect;

const app = new Clarifai.App({
 apiKey: 'f494dd4cc6354d8f8939c9f845f7d809'
});

function preload() {

  data1 = loadStrings('neruda.txt');
  data2 = loadStrings('genesis.txt');
  //data4 = loadStrings('wizardofoz.txt')
  //data5 = "?"
}

function setup() {

  const c = createCanvas(500, 500);
  textFont('times', 16);
  textAlign(LEFT);

  fileSelect = createFileInput(gotFile);
  //c.drop(gotFile);

  lines = ["click to (re)generate!"];

  // create a markov model w' n=4
  markov = new RiMarkov(4);

  // load text into the model
  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));

  app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
        console.log(concepts)
      })

  drawText();
}

function gotFile (file) {


  data3 = loadStrings(file.data);
  markov.loadText(data3.join(' '));
  lines = markov.generateSentences(10);
  console.log("text file!");
  drawText();
}

function drawText() {

  background(250);
  text(lines.join('\n'), x, y, 400, 400);
}

function mouseClicked() {

  x = y = 50;
  lines = markov.generateSentences(10);
  drawText();
}

 
