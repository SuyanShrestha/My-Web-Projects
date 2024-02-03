const inputBox = document.querySelector("#input-box");
const addButton = document.querySelector('#add-button');
const listContainer = document.querySelector("#list-container");

// console.log(listContainer)

const addList = () => {
    if(inputBox.value === ''){
        alert('Task Empty! Write something to add');
    }
    else{
        // console.log(listContainer);
        let li = document.createElement('li');
        // li.classList.add('unchecked');
        li.innerText = inputBox.value;
        listContainer.appendChild(li);
        // console.log(li);

        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

const removeItem = (e) => {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
}

addButton.addEventListener('click', addList);

listContainer.addEventListener('click', removeItem, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  console.log(localStorage.data);
}

function showList() {
  listContainer.innerHTML = localStorage.getItem("data");
//   console.log(`The saved data is ${localStorage.data}`)
}
showList();



// DARK THEME
let icon = document.getElementById('icon');
icon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        icon.src = 'images/sun.png';
    }
    else{
        icon.src = 'images/moon.png';
    }
});