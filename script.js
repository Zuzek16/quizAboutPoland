let points = 0;
let questionCounter = 0;
let jsonData = [];
var gotData = false;
let hidden = "none";
let shown = "block";

let question = "";
let options = {};
let values = [];

let hardMode = false;

let longestWordID = 0;
//fix percent whrn 100 it shows 1
let anwsersOut = [];

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
  printQuestion(questionCounter);
  //still not perfect
})
}

function start() {
    console.log("start");
    document.getElementById("menu").style.display = hidden;

    document.getElementById("quiz").style.display = shown;

 
    let widestEl = document.getElementById(longestWordID).clientWidth;
    console.log(widestEl);
    
    for (let i = 0; i <= 3; i++) {
      console.log(document.getElementById(i));
      
      document.getElementById(i).style.setProperty("width", ((widestEl+(widestEl/2)) + "px"));
    }

    
}

function anwser(isRight) {
  if (isRight) {
    points ++;    
  } else if (hardMode){
    //UPDATE?
      console.log("SHOULDNT RUN YET");
      
      points --;
    
  }

  console.log(points);
  
  questionCounter ++;
  printQuestion(questionCounter);

}

function checkAnwser(optionId) {
  if (values[optionId]) {
    anwser(true);
  } else {
    anwser(false);
  }
}

function resultsScreen() {
  loadAnwsers();
  let percent = (points/jsonData.length)*100;
  document.getElementById("quiz").style.setProperty("display", hidden);
  document.getElementById("result").style.setProperty("display", shown);

  document.getElementById("points").innerText = points + "/" + jsonData.length;
  document.getElementById("percent").innerText = percent + " %"
}

function loadAnwsers() {
  const htmlEl = document.getElementById("anwsersOut");

  anwsersOut.forEach(q => {
    let correctAnw = "";

    console.log(q[1]);
    q[1].forEach((anw, id)=>{

 

      correctAnw += "<p class='" ;

      if (q[2][id]) {
        correctAnw += "r";
      } else {
        correctAnw += "w";
      }
      
      correctAnw += "'>" + anw + "</p>"

        })

    htmlEl.innerHTML += `
    <div>

    <p class='bold text'>${q[0]}</p>
    `+correctAnw+`</div>`;

  })
}

function rewealAnwsers() {
document.getElementById("anwsersOut").classList.toggle("reweal");
  
}

function printQuestion(id) {
  if (jsonData[id] != null) {

    question = jsonData[id].text; 
   options = (Object.keys(jsonData[id].options));

   values = [];
  options.forEach(el => {
   values.push(jsonData[id].options[el]);
  });

  console.log(question);
  console.log(options);
  console.log(values);

  anwsersOut.push([question, options, values]);

  document.getElementById("question").innerText = question;

  options.forEach((el, id) => {
    if(el.length > options[longestWordID].length) {
      longestWordID = id;
    }
  });

  var element = document.getElementById(longestWordID),
    style = window.getComputedStyle(element),
    width = style.getPropertyValue("width");

  options.forEach((op, index) => {
    document.getElementById(`${index}`).innerText = op;     
  });

  } else {
    resultsScreen();
  }
   
}

getJSONData();