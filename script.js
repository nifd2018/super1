// script.js
class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand === '0' && number !== '.' 
            ? number.toString() 
            : this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        document.querySelector('.previous-operand').textContent = this.previousOperand + 
            (this.operation ? ` ${this.operation}` : '');
    }
}

const calculator = new Calculator();

document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('[data-operation]').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '=') {
            calculator.compute();
        } else {
            calculator.chooseOperation(button.textContent);
        }
        calculator.updateDisplay();
    });
});

document.querySelector('.span-two').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelectorAll('button')[1].addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});