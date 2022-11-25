const playButtons = document.getElementsByClassName("playButton");
const playerFrame = document.getElementById("frameLeft");
const botFrame = document.getElementById("frameRight");
const playerScore = document.getElementById("scorePlayer");
const botScore = document.getElementById("scoreBot");


const popup = document.getElementById("popup");
const mark = document.getElementById("mark");
const winnerName = document.getElementById("winner-name");
const restart = document.getElementById("restart");
const backbutton = document.getElementById("backbutton");

let pscore=0;
let bscore=0;

let startGame = () => {
    window.location.href = "game.html";
}

let initialize = () => {
    pscore=0;
    bscore=0;
    playerScore.innerText=0;
    botScore.innerText=0;
    playerFrame.innerHTML="";
    botFrame.innerHTML="";
    addListeners();
}

const playerImages = [
    "./src/ko.png",
    "./src/papir.png",
    "./src/ollo.png"
];

const botImages = [
    "./src/ko_vissza.png",
    "./src/papir_vissza.png",
    "./src/ollo_vissza.png"
];

let addListeners = () => {
    for(let i=0; i<playButtons.length;i++){
        playButtons[i].addEventListener('click',examineRound);
    }
}

let examineRound = (event) => { 
    console.log("hellop");
    let pick = event.target.getAttribute('src');
    console.log(pick);
    let playerPick = getNumberOfPick(pick);
    let botPick = generatePick();
    console.log(playerImages[playerPick]+" "+ botImages[botPick]);
    playerFrame.innerHTML=`<img src=${playerImages[playerPick]}>`;
    botFrame.innerHTML=`<img src=${botImages[botPick]}>`;
    calculateResult(playerPick, botPick);
};

let removeListeners = () => {
    for(let i=0; i<playButtons.length;i++){
        playButtons[i].removeEventListener('click', examineRound);
    }
}


let calculateResult = (playerPick, botPick) => {
    if(playerPick != botPick){
        if((playerPick==0 && botPick==2) || (playerPick==1 && botPick==0) || (playerPick==2 && botPick==1)){
            pscore++;
            playerScore.innerHTML=pscore;
        }else
            bscore++;
            botScore.innerHTML=bscore;
    }
    if(checkPoints(pscore, bscore)){
        if(checkPoints(pscore,bscore)=="Player")
        {
           mark.src="./src/tick.png";
        }else{  
            mark.src="./src/x-mark.png";
        }
        openPopup(checkPoints(pscore, bscore));
    }
};

let getNumberOfPick = (pick) => {
    switch (pick) {
        case "./src/ko_gomb.png":
            return 0;
        case "./src/papir_gomb.png":
            return 1;
        default:
            return 2;
      }
};


let generatePick = () => {
    pick = Math.floor(Math.random() * 3);
    return pick;
};

let fillImageFrameForBot = (pick) => {
    switch(pick) {
        case 0:
            playerFrame.src=".src/"
    };
};

let checkPoints = (szam1, szam2) => {
    if (szam1 == 3)
        return "Player";
    else if (szam2==3)
        return "Bot";
    else
        return "";
};

let openPopup = (name) => {
    removeListeners();
    winnerName.innerText=`${name}`;
    popup.classList.add("open-popup");
};

let restartGame = () => {
    popup.classList.remove("open-popup");
    initialize();
}

let closePopup = () => {
    popup.classList.remove("open-popup");
    window.location.href = "mainpage.html";
};

initialize();