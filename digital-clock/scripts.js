let container = document.querySelector(".container");
// let container2 = container.cloneNode(true);
// container2.classList.add('container2');

// container2.appendChild()
// let gradient = document.createElement('div');
// gradient.className = 'gradient';


// document.querySelector("body").appendChild(container2);
// container2.appendChild(gradient);
// container2.addClassList('container2');

let hours = document.querySelectorAll("#hours");
let mins = document.querySelectorAll("#mins");
let seconds = document.querySelectorAll("#second");
let period = document.querySelectorAll("#period");
let x;

const getTime = () => {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";

  if (h > 12) {
    h = h - 12;
  }
  // function padTime(h){
  if (h < 10) {
    h = "0" + h;
  } else {
    h = h;
  }
  // };
  if (m < 10) {
    m = "0" + m;
  } else {
    m = m;
  }
  s = s < 10 ? "0" + s : s;
  // m = m < 10 ? "0" + m : m;

  // padTime(h);

  hours[0].innerHTML = h;
  mins[0].innerHTML = m;
  seconds[0].innerHTML = s;
  period[0].innerHTML = ampm;
  hours[1].innerHTML = h;
  mins[1].innerHTML = m;
  seconds[1].innerHTML = s;
  period[1].innerHTML = ampm;
};

setInterval(getTime, 1000);
