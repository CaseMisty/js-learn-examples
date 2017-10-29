/**
 * @Created by Liuziao on 2015/11/5.
 */
function $(id) {
    return document.getElementById(id);
}
var str = $('screen').value;
var opertion = function(a, b, oper) {
    switch(oper) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return a / b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}
var getLevel = function(a) {
    switch(a) {
        case '+':
            return 1;
        case '-':
            return 1;
        case '÷':
            return 2;
        case '×':
            return 2;
        case '(':
            return 0;
        case '*':
            return 2;
        case '/':
            return 2;
    }
}
Array.prototype.last = function() {
    return this.slice(this.length - 1)[0];
}
Array.prototype.getResultOfPostfix = function() {
    var postfix = this.slice(0);
    var temp_oper_arr = new Array();
    var temp;
    while(postfix.length) {
        temp = postfix.shift()
        if(typeof(temp) == 'number') temp_oper_arr.push(temp);
        else {
            var a, b;
            b = tempOperArrPop();
            a = tempOperArrPop();
            temp_oper_arr.push(opertion(a, b, temp));
        }
    }
    return temp_oper_arr.last();

    function tempOperArrPop() {
        var res = temp_oper_arr.pop()
        if(isNaN(res)) {
            return 0;
        } else {
            return res;
        }
    }
}
Array.prototype.changeNifixToPostfix = function() {
    var postfix_expression = new Array();
    var temp;
    var operator_steak = new Array();
    var nifix_expression = this.slice(0);
    while(nifix_expression.length) {
        temp = nifix_expression.shift();
        if(typeof(temp) == 'number') {
        	postfix_expression.push(temp);
        }
        else if(temp == '(') {
        	operator_steak.push(temp);
        }
        else if(temp == ')'){
            for(var judge = operator_steak.pop(); judge != '('; judge = operator_steak.pop()) {
            	postfix_expression.push(judge);
            }
        }
        else if(getLevel(temp) > getLevel(operator_steak.last())) {
            operator_steak.push(temp);
        } else {
            /** 临时添加的部分开始 */
            var tempOper = [];
            for(var lastoper = operator_steak.last(); getLevel(temp) <= getLevel(lastoper); ) {
                lastoper = operator_steak.pop();
                if (operator_steak.last() == '(') {
                    tempOper.unshift(lastoper);
                	break;
                }
                if (lastoper) {
                	postfix_expression.push(lastoper);
                }
            }
            operator_steak.push(temp);
            if (tempOper.length) 
            postfix_expression.push(...tempOper);
        }
    }
    while(operator_steak.length) {
        postfix_expression.push(operator_steak.pop());
    }
    return postfix_expression;
}
String.prototype.first = function() {
    return this.substr(0, 1);
}
String.prototype.toNifixArray = function() {
    var nifix_arr = new Array();
    var nifix_str = this.slice(0);
    for(var temp = nifix_str.first(); nifix_str.length;) {
        if(temp == '+' || temp == '-' || temp == '×' || temp == '÷' || temp == '(' || temp == ')' || temp == '*' || temp == '/') {
            nifix_arr.push(temp);
            nifix_str = nifix_str.slice(1);
            temp = nifix_str.first();
        } else {
            temp = parseFloat(nifix_str);
            nifix_arr.push(temp);
            nifix_str = nifix_str.substr(String(temp).length);
        }
        var temp = nifix_str.first();
    }
    return nifix_arr;
}
String.prototype.getResultByStr = function() {
    return this.toNifixArray().changeNifixToPostfix().getResultOfPostfix();
}

function conscrstr(num) {
    str = $('screen').value;
    str = str + String(num);
    $("screen").value = str;
}
window.addEventListener('load', (e) => $("screen").focus(), false);
const events = function(e) {
    switch(e.target) {
        case $('1'):
            conscrstr(1);
            break;
        case $('2'):
            conscrstr(2);
            break;
        case $('3'):
            conscrstr(3);
            break;
        case $('4'):
            conscrstr(4);
            break;
        case $('5'):
            conscrstr(5);
            break;
        case $('6'):
            conscrstr(6);
            break;
        case $('7'):
            conscrstr(7);
            break;
        case $('8'):
            conscrstr(8);
            break;
        case $('9'):
            conscrstr(9);
            break;
        case $('ling'):
            conscrstr(0);
            break;
        case $('clear'):
            $("screen").value = '';
            str = '';
            break;
        case $('jia'):
            str = $('screen').value;
            if(str.length) {
                conscrstr('+');
            }
            break;
        case $('jian'):
            str = $('screen').value;
            if(str.length) {
                conscrstr('-');
            }
            break;
        case $('cheng'):
            if(str.length) {
                conscrstr("×");
            }
            break;
        case $('chu'):
            if(str.length) {
                conscrstr("÷");
            }
            break;
        case $('dian'):
            if(str.length) {
                conscrstr(".");
            }
            break;
        case $("clear"):
            clearScreen();
            break;
        case $("del"):
            str = str.substr(0, str.length - 1);
            $('screen').value = str;
            break;
        case $("deng"):
            dengyu();
            break;
    }
    $('screen').focus();
};

const isPC = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)? false: true;
if(isPC) window.addEventListener('click', events, false);
else window.addEventListener('touchstart', events, false);
window.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 13:
            dengyu();
            break;
        case 27:
            clearScreen();
            break;
    }
}, false);

function clearScreen() {
    $("screen").value = '';
    str = '';
}

function dengyu() {
    str = $('screen').value;
    var result = str.getResultByStr();
    $("screen").value = String(result);
    str = String(result);
    $('screen').focus();
}
