'use strict'

const carrot_size = 80;
const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const startBtn = document.querySelector('.game_button')
const game_header = document.querySelector('.game_header');
var count = 5;


function initGame(){
// 벌레와 당근을 생성한뒤 field에 추가
    
    addItem('carrot',5,'img/carrot.png');
    addItem('bug',5,'img/bug.png');
    startTimer();
    setScore();
    chaneButton();
    
}

function addItem(className,count,imgPath){
    const x1=0;
    const y1=0;
    const x2 = fieldRect.width - carrot_size;
    const y2 = fieldRect.height - carrot_size;

    for(let i=0; i< count; i++)
    {
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        item.style.position  = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);

    }

}



function startTimer(){
  
  const timer = document.createElement('span');
  timer.setAttribute('class','game_timer');
  timer.innerText='0:10';
  setTimeout(()=>timer.innerText='0:1',9000);
  setTimeout(()=>timer.innerText ='0:2',8000);
  setTimeout(()=>timer.innerText = '0:3',7000);
  setTimeout(()=>timer.innerText = '0:4',6000);
  setTimeout(()=>timer.innerText = '0:5',5000);
  setTimeout(()=>timer.innerText = '0:6',4000);
  setTimeout(()=>timer.innerText = '0:7',3000);
  setTimeout(()=>timer.innerText = '0:8',2000);
  setTimeout(()=>timer.innerText = '0:9',1000);
  setTimeout(()=>timer.innerText = '0:10',0);
  game_header.appendChild(timer);
}



function setScore(){
  const score = document.createElement('span');
  score.innerText = count;
  score.setAttribute('class','game_score');
  game_header.appendChild(score);
}

function randomNumber(min,max){
    return Math.random() * (max - min) + min;
}


startBtn.addEventListener('click',()=>{
  startBtn.remove();
  const changeBtn = document.createElement('button');
  changeBtn.setAttribute('class','changeBtn');
  changeBtn.innerHTML=`
  <i class="fa-solid fa-stop"></i>`;
  game_header.appendChild(changeBtn);
  initGame();
})