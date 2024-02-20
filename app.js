const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let hotkeyControl = true
let level = 0

$(".btn").click((evt) => {
    const userChosenColor = evt.target.id
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

$(document).keydown((evt) => {
    if (hotkeyControl) {
        hotkeyControl = false
        $('#level-title').text(`Level ${level}`)
        nextSequence()

    }
})

function nextSequence() {
    userClickedPattern = [];
    level++
    $('#level-title').text(`Level ${level}`)
    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    let audio = new Audio(`sounds/${randomChosenColor}.mp3`)
    playSound(randomChosenColor)


}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed')
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed')
    }, 100)
}

function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        gameOver()
        startOver()
    }

}

function gameOver() {
    playSound('wrong')
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200)
    $('#level-title').text(`Game Over, Press Any Key to Restart`)
}

function startOver() {
    gamePattern = []
    userClickedPattern = []
    hotkeyControl = true
    level = 0

}