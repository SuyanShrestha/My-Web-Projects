function Solve(val) {
    var v = document.getElementById('result');
    v.value += val;
 }

 function Result() {
    var num1 = document.getElementById('result').value;
    var num2 = eval(num1);
    document.getElementById('result').value = num2;
 }

 function Allclear() {
    var v = document.getElementById('result');
    v.value = '';
 }

function Sqroot(val){
    var num1 = document.getElementById('result');
    Number(num1);
    console.log(num1);
    var num2 = Math.sqrt(num1);
    document.getElementById('result').value = num2;
  }
 
function Erase(){
    var v = document.getElementById('result');
    v.value = v.value.slice(0,-1);
 }