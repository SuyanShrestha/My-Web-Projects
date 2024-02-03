const searchBar = document.querySelector(".search-bar");
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
// xa vani dinxa, natra empty array dini vo
console.log(itemsArray);

// Enter button ko lagi
document.querySelector("#enter").addEventListener("click", () => {
  // empty vo vani maandaina
  if (searchBar.value === "") return;           
  const item = document.querySelector("#item");
  createItem(item);
});

// Enter keypress ko lagi
document.querySelector("#item").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // empty vo vani maandaina
    if (searchBar.value === "") return;
    const item = document.querySelector("#item");
    createItem(item);
  }
});

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `	<div class="item">
              <div class="input-controller">
                <textarea disabled>${itemsArray[i]}</textarea>
                <div class="edit-controller">
                  <i class="fa-solid fa-trash deleteBtn"></i>
                  <i class="fa-solid fa-pen-to-square editBtn"></i>
                </div>
              </div>

              <div class="update-controller">
                <button class="saveBtn">Save</button>
                
              </div>
            </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
}

// DELETE BUTTON KO LAGI
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

// EDIT BUTTON KO LAGI
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

// EDIT THICHEXI
// SAVE BUTTON KO LAGI
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function displayDate() {
  let date = new Date();
  console.log(date);
  // date ko tukra tukra vako array dinxa
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
  displayItems();
};
