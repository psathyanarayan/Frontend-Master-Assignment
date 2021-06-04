let runningTotal = 0;
let buffer = "0"
let prev = null;
const screen = document.querySelector('.display');


function handleMath(value)
{
    if (buffer === "0") {
        // do nothing
        return;
      }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0)
        runningTotal = intBuffer
    else {
        flushOperation(intBuffer)
    }
    prev = value;
    buffer = "0"
}

function flushOperation(intBuffer) {
    if (prev === "+")
        runningTotal += intBuffer;
    if (prev === "-")
        runningTotal -= intBuffer;
    if (prev === "x")
        runningTotal *= intBuffer;
    if (prev === "/")
        runningTotal /= intBuffer;


}

function handleNum(value) {
    if (buffer === "0")
        buffer = value;
    else
        buffer += value
}

function handleSymbol(value) {
    switch (value) {
        case "AC":
            buffer = "0"
            runningTotal = 0;
            break
        case "=":
            if (prev === null)
                return
            flushOperation(parseInt(buffer))
            prev = null
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case "←": if (buffer.length === 1)
            buffer = "0";
        else {
            buffer = buffer.substring(0, buffer.length - 1)
        }
            break;
        case "+":
        case "-":
        case "x":
        case "/":   
        handleMath(value)
            break;
    }
}
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value)
    }
    else {
        handleNum(value)
    }
    rerenderer()
}
function rerenderer() {
    screen.innerText = buffer;
}
function init() {
    document.querySelector('.calBody').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}
init();