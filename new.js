let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let start = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore")||0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
h3.innerText = `Your Highest Score is :  ${highestScore}`;


document.addEventListener("keypress", function(){
    if(start == false){
        console.log("Game is start");
        start = true;
    }

    levelUp();
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);

}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}
function btnPress(){
     let btn = this;
     btnFlash(btn);
     userColor = btn.getAttribute("id");
     userSeq.push(userColor);
     console.log(userSeq);
     checkAns(userSeq.length-1);
}
let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}
function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            // levelUp();
            setTimeout(levelUp, 500);
        }
    } else{
        if(level>highestScore){
            highestScore = level
            localStorage.setItem("highestScore", highestScore);
            h3.innerText = `Your Highest Score is :  ${highestScore}`
        }
        h2.innerHTML = `Game Over! Your Scour was <b>${level}</b> <br>Press any key to start game`;
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(function(){
             document.querySelector("body").style.backgroundColor=" #C7A07A"
        }, 200);
        reset();
    }
}
function reset(){
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}