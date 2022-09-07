const CARROT_SIZE = 80;
const carrot_count = 5;
const bug_count = 5;
const gametime = 10;

const gamefield = document.querySelector('.game_field');
const fieldRect= gamefield.getBoundingClientRect();
const gamebutton = document.querySelector('.game_button');
const timer = document.querySelector('.game_timer');
const score = document.querySelector('.game_score');
const pop_up = document.querySelector('.pop_up');
const pop_up_msg = document.querySelector('.pop_up_msg');


console.log(pop_up);


let Isstart = true;
let timer2 = undefined;


function init(){
    gamefield.innerHTML='';
    starttimer(gametime);
    startscore();    
    makeitem('bug',5,'img/bug.png');
    makeitem('carrot',5,'img/carrot.png');
    showtimer();
}

gamebutton.addEventListener('click',()=>{
    if(Isstart){
        init();
    }
    else{
        stop();
    }
    Isstart = !Isstart;
})

function stop(){
    stoptimer();
    popup();
}

function stoptimer()
{
    clearInterval(timer2);
    timer2 = null;
}

function popup(){
    pop_up.classList.remove('pop_up_hide');
    pop_up.classList.add('pop_up');
    pop_up_msg.innerText = 'REPLAY?'
}

function starttimer(gametime){
    countdown(gametime);
    timer2 = setInterval(()=>{
        if(gametime <= 0){
            return;
        }
        countdown(gametime--);
    },1000);
}

function countdown(gametime){
    
    const sec = gametime % 60;
    timer.innerText = `0:${sec}`;
}

function startscore(){
    score.innerText = carrot_count;
}


function showtimer(){
    timer.style.visibility = 'visible';
    score.style.visibility = 'visible';
}

function makeitem(className,count,imgPath){
    for(let i=0;i<count;i++){
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);

        const x1 = 0;
        const y1 = 0;
        const x2 = fieldRect.width - CARROT_SIZE;
        const y2 = fieldRect.height - CARROT_SIZE;
        const x = getPos(x1,x2);
        const y = getPos(y1,y2);

        item.style.position = 'absolute';
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        gamefield.appendChild(item);
    }
}

function getPos(min,max){
    return Math.random() * (max - min) + min;
}


