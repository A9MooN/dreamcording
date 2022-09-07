'use strict'

const carrot_size = 80;
var carror_count = 5;
const bug_count = 5;
const game_duration_sec = 5;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');




let started = false;
let score =0;
let timer = undefined;

var bug = undefined;
var carrot = undefined;

gameBtn.addEventListener('click',()=>{
    if(started){
        stopGame();
    }
    else{
        startGame();
        
    }
    started =!started;
});


function stopGame(){
    stopGameTimer();
    showPopup('RePlay?');
}

function stopGameTimer(){
    clearInterval(timer);
    timer = null;
    gameBtn.style.visibility = 'hidden';
    
}

function showPopup(text){
    const popup_text = document.querySelector('.pop_up_msg');
    popup_text.innerText = text;
    const popup = document.querySelector('.pop_up');
    popup.classList.remove('pop_up_hide');
    const replayBtn = document.querySelector('.pop_up_refresh');
    replayBtn.addEventListener('click',()=>{
        restartGame();
        hidePopup();
    });
}

function hidePopup(){
    const popup = document.querySelector('.pop_up');
    console.log(popup);
    popup.classList.add('pop_up_hide');
    popup.classList.remove('pop_up');
}


function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function restartGame()
{
    location.reload();
    
}

function loseGame(){
    showPopup('you lose')
    stopGameTimer();
}

function startGameTimer(){
    let remainingTimeSec = game_duration_sec;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <=0){
            clearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}



function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function showStopButton(){
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}



function initGame(){
// 벌레와 당근을 생성한뒤 field에 추가
    field.innerHTML='';
    gameScore.innerText = carror_count;
    addItem('carrot',carror_count,'img/carrot.png');
    addItem('bug',bug_count,'img/bug.png');

    bug = document.getElementsByClassName('bug');
    endgame_lose(bug);
    
    carrot = document.getElementsByClassName('carrot');
    game_play(carrot);
}


function game_play(item){
    for( let i=0; i<item.length;i++){
        item[i].addEventListener('click',()=>{
        catchCarrot();
        item[i].style.visibility = 'hidden';
        });
    }
}

function catchCarrot(){
    gameScore.innerText = --carror_count;
    if(carror_count ===0){
    showPopup('you won')
    stopGameTimer();
    }
}


function endgame_lose(item)
{
    for( let i=0; i<item.length;i++){
        item[i].addEventListener('click',()=>{
            loseGame();
            stopGameTimer();
        });
    }
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


function randomNumber(min,max){
    return Math.random() * (max - min) + min;
}

