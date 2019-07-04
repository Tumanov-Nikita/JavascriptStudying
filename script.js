alert('Результат: ' + Parser());


function Parser() {
    let str = prompt('Введите выражение', '');
    let answer;
    const notCorrect = 'по крайней мере один из операндов или оператор введены некорректно';
    if (~str.indexOf('/')) {
        let expression = str.split('/');
        if (CheckingVars(expression)) {
            answer = +expression[0] / +expression[1];
        } else {
            answer = notCorrect;
        }
        return answer;
    }
    else if (~str.indexOf('*')) {
        let expression = str.split('*');
        if (CheckingVars(expression)) {
            answer = +expression[0] * +expression[1];
        } else {
            answer = notCorrect;
        }
        return answer;
    }
    else if (~str.indexOf('+')) {
        let expression = str.split('+');
        if (CheckingVars(expression)) {
            answer = +expression[0] + +expression[1];
        } else {
            answer = notCorrect;
        }
        return answer;
    }
    else if (~str.indexOf('-')) {
        let temp = str.match(/.+?-/);
        temp = String(temp);
        let var1 = temp.slice(0,-1);
        let var2 = str.slice(var1.length+1);
        let expression = new Array();
        expression[0]=var1;
        expression[1]=var2;
        if (CheckingVars(expression)) {
            answer = +expression[0] - +expression[1];
        } else {
            answer = notCorrect;
        }
        return answer;
    } else {
        answer = 'выражение введено неверно. Допускаются операции сложения, вычитания, умножения и деления между двумя операндами';
        return answer;
    }
}

function CheckingVars(variables){
    return (!isNaN(+variables[0]) && !isNaN(+variables[1])) ? true : false;
}
