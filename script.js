// import data from '../questions.json';
// console.log(String(data));
let points = 0;
let question = 0;//counter
let jsonData = [];
var gotData = false;
let hidden = "none";
let shown = "block";
async function getJSONData() {
  await fetch('./questions.json')
.then(res => res.json())
.then((value) => {
  value.question.forEach(element => {
    jsonData.push(element);
  });
})
.finally(()=>{
  gotData = true;
  printQuestion(question);
  //still not perfect
})
}

function start() {
    console.log("start");
    document.getElementById("menu").style.display = hidden;

    document.getElementById("quiz").style.display = shown;
    
}

function anwser(isRight) {
    
}

function printQuestion(id) {
  let question = jsonData[id].text; 
  let options = (Object.keys(jsonData[id].options));
  let values = [];

  options.forEach(el => {
   values.push(jsonData[id].options[el]);
  });

  console.log(question);
  console.log(options);
  console.log(values);

  document.getElementById("question").innerText = question;

  options.forEach((op, index) => {
    document.getElementById(`${index}`).innerText = op;     
  });

}

//
//HOW TO WAIT FOR PROMISES?!

getJSONData();