
function Calculator() {
    this.operation = {
        "+" : (a,b ) => a+b,
        "-" : (a,b ) => a-b,
        "*" : (a,b) => a*b,
        "/" : (a,b) => (!b == 0) ? round3(a/b) : "error",
    }

    this.calculate = function (operator) {
        return this.operation[operator](+this.total,+this.currentValue)
    }
}

let calculator = new Calculator()
const numbContainer = document.querySelector(".numbers")

var count  = 0;
for (var j = 1; j<= 4; j++) {
    const row = document.createElement("div")
    row.classList.add("row")
    for (i = 1; i<=3; i++) {
        count ++
        let countD = count
        if (count == 10) {
            countD = ".";
        }
        if (count == 11) {
            countD =0
        }
        if (countD == 12) {
            break
        }
        const nButton = document.createElement("button")
        nButton.setAttribute("id", `${countD}`)
        nButton.textContent = countD
        row.appendChild(nButton)
    }
    numbContainer.appendChild(row)    
}

function isNumber(num) {
    return num == +num || num == "."
}

function isOperator(str) {
    return "+*/-".includes(str)
}

function round3(num) {
    return Math.round(num*1000)/1000
}

const display = document.querySelector(".display-container")
const buttons = document.querySelector(".button-container")

buttons.addEventListener("click", (event) => {
    let buttonID = event.target.id    
    if (calculator.calculated) {
        calculator.calculated = false
        display.textContent = ""
    } 

    if (isNumber(buttonID)){
        display.textContent += buttonID
    }
    else if (buttonID == "ans") {
        display.textContent += calculator.total
    }
    
    else if (!isNumber(buttonID)) {
        if (!calculator.total) {
            calculator.total = display.textContent
        }
        else {
            calculator.currentValue = display.textContent
        }
        
        display.textContent = ""

        if (isOperator(buttonID)) {
            if (!calculator.operator || !calculator.currentValue) {
                calculator.operator = buttonID
            }
            else {
                calculator.total = calculator.calculate(calculator.operator)
                display.textContent = calculator.total
                calculator.operator = buttonID
                calculator.currentValue = null
                calculator.calculated = true
            }
        }
        
        else if (buttonID == "=") {
            if (!calculator.operator) {
                display.textContent = calculator.total
            }
            else {
            calculator.total = calculator.calculate(calculator.operator)
            display.textContent = calculator.total
            calculator.calculated = true
            calculator.currentValue = null
        }}

        else if (buttonID == "clr") {
            display.textContent = ""
            calculator.total = undefined
            calculator.currentValue = undefined
            calculator.operator = undefined
        }   
    }
})