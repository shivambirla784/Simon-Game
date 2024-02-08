let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let highestScore=0;
let level = 0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

document.addEventListener("keypress", function () {
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },200);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },200);
}



function levelUp() {
    //whenever levelup we have to press buttons in correct order of previous gameseq
    userSeq = [];
    level++;
    h2.innerText=`Level ${level}`;
    //Choosing random color btn
    let randIdx=Math.floor(Math.random()*4);
    let randColor= btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        if(level>highestScore){
            highestScore=level;
        }
        h3.innerHTML = `Highest score: <b>${highestScore}</b>`
        document.querySelector("body").classList.add("background-image");
        setTimeout(function(){
            document.querySelector("body").classList.remove("background-image");
        },150);
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn= this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    //we have to only check the last button pressed idx in the user sequence
    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level=0;
}