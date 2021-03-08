import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }
  title = 'simple-Calc';
  inputExpression: string = '';
  result: string = '';
  arguments = [];
  object = {}; 

  operations(firstOperand, secondOperand, operator) {
    if (operator == '+') return firstOperand + secondOperand;
    if (operator == '-') return firstOperand - secondOperand;
    if (operator == '*') return firstOperand * secondOperand;
    if (operator == '/') return firstOperand / secondOperand;
  }

  precedence(operator) {
    if (operator == '+' || operator == '-') return 1
    if (operator == '*' || operator == '/') return 2
    return 0
  }

  // main function
  expressionEvaluation(expression) {
    let i = 0, numbers = [], operations = [];

    while (i < expression.length) {

      // if(expression[i] == ' '){
      //   i += 1;
      //   continue;
      // } 

      if (expression[i] == '(') {
        operations.push(expression[i]);
      }

      else if (expression[i].charCodeAt(0) >= 48 && expression[i].charCodeAt(0) <= 57) {
        let value = 0;
        while (i < expression.length && expression[i].charCodeAt(0) >= 48 && expression[i].charCodeAt(0) <= 57) {
          value = (value * 10) + parseInt(expression[i]);
          i = i + 1;
        }
        numbers.push(value);
        i = i - 1;
      }

      else if (expression[i] == ')') {
        while (operations.length != 0 && operations[operations.length - 1] != '(') {
          let secondOperand = numbers.pop()
          let firstOperand = numbers.pop()
          let operator = operations.pop()

          numbers.push(this.operations(firstOperand, secondOperand, operator));
        }
        operations.pop();
      }

      else {
        while (operations.length != 0 && this.precedence(operations[operations.length - 1]) >= this.precedence(expression[i])) {
          let secondOperand = numbers.pop()
          let firstOperand = numbers.pop()
          let operator = operations.pop()

          numbers.push(this.operations(firstOperand, secondOperand, operator));
        }
        operations.push(expression[i]);
      }
      i = i + 1;
    }
    while (operations.length != 0) {
      let secondOperand = numbers.pop()
      let firstOperand = numbers.pop()
      let operator = operations.pop()

      numbers.push(this.operations(firstOperand, secondOperand, operator))
    }
    return numbers[numbers.length - 1];
  }

  onCalculateExpression() {
    for (let i = 0; i < this.inputExpression.length; i++) {
      if (this.inputExpression.charCodeAt(i) >= 48 && this.inputExpression.charCodeAt(i) <= 57) {
        let value = 0;
        while (i < this.inputExpression.length && this.inputExpression[i].charCodeAt(0) >= 48 && this.inputExpression[i].charCodeAt(0) <= 57) {
          value = (value * 10) + parseInt(this.inputExpression[i]);
          i = i + 1;
        }
        this.arguments.push(value);
        i = i - 1;
      }
    }

    this.object['inputExpression'] = this.inputExpression;
    this.object['inputArguments'] = this.arguments;
    this.object['outputResult'] = this.expressionEvaluation(this.inputExpression);

    this.result = JSON.stringify(this.object);
  }
  ngOnInit(): void {
  }

}
