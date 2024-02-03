function Solve(val) {
    var v = document.getElementById('result');
    v.value += val;
 }

 function Result(){
    var num1 = document.getElementById('result').value;
    var num2 = eval(num1);
    document.getElementById('result').value = num2;
 }

 function Clear() {
    var v = document.getElementById('result');
    v.value = '';
 }

