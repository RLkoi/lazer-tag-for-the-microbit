radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber < input.compassHeading() + 20 && receivedNumber > input.compassHeading() - 20) {
        if (-60 > radio.receivedPacket(RadioPacketProperty.SignalStrength)) {
            if (input.buttonIsPressed(Button.A)) {
                radio.sendString("shoot")
                basic.pause(1000)
            }
        }
    }
})
input.onButtonPressed(Button.A, function () {
    soundExpression.giggle.playUntilDone()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "shoot") {
        Health += -1
    }
})
input.onButtonPressed(Button.B, function () {
    basic.pause(500)
    while (!(input.buttonIsPressed(Button.B))) {
        basic.showString("" + (Health))
    }
})
radio.onReceivedValue(function (name, value) {
    if ("Game over" == name) {
        game.addScore(1)
        basic.pause(100)
        game.gameOver()
    }
})
let Health = 0
input.calibrateCompass()
radio.setGroup(1)
Health = 3
basic.forever(function () {
    radio.sendNumber(input.compassHeading())
    if (Health < 1) {
        radio.sendValue("Game over", 0)
        basic.pause(100)
        game.gameOver()
    }
})
