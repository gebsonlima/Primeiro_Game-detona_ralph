const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timeId: null,
        countDownTimeId: setInterval(countDown, 1000),
    }
};
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu tempo acabou, Segue seu resultado: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("//src/audios/collectcoin-6075.mp3");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();

