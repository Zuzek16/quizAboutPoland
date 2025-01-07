// import data from '../questions.json';
// console.log(String(data));
let points = 0;
let jsonData;

function start() {
    
}

function anwser(isRight) {
    
}


fetch('./questions.json')
.then(res => {
  // res.json();  
  jsonData = res.json();
  console.log(jsonData);

})

// .then(response => response.json())
// .then(users => displayUsers(users))
// .catch(error => console.error('Error fetching users:', error));
// .then(q => console.log(/))

