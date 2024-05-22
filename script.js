function Calculator(){
    this.operation = {
        "+" : (a,b) => a + b,
        "-" : (a,b) => a-b,
        "*" : (a,b) => a*b,
        "/" : (a,b) => a/b
    }
    this.calculate = function(string) {
        array = string.split(this.operator)       
        first = +array[0]
        sec = +array[1]
        return this.operation[this.operator](first,sec)
    }
    this.lastAns=0;
    this.calculated = false;
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
    return num == +num && !(+num == 0)
}

const display = document.querySelector(".display-container")
const buttons = document.querySelector(".button-container")

buttons.addEventListener("click", (event) => {
    let buttonID = event.target.id
    if (event.target.id == "=") {
     calculator.lastAns = calculator.calculate(display.textContent)
     display.textContent = calculator.lastAns
     calculator.calculated = true
    }
    else if (event.target.id == "clr" || calculator.calculated) {
        display.textContent = ""
        calculator.calculated = false
    }
    else { 
    if (event.target.id == "ans") {
        buttonID = calculator.lastAns
    } 
    else if (!isNumber(event.target.id)) {
        calculator.operator = event.target.id
    }

    display.textContent += buttonID}
})


