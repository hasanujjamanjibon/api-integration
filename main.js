const loadFishData = (seartchtext) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seartchtext}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => fishDataDetails(data.meals.slice(0, 8)));
};

const ModalTitile = document.getElementById("staticBackdropLabel");
const modalImages = document.getElementById("card-images");
const showAllData = (seartchtext) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seartchtext}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => fishDataDetails(data.meals));
};
function fishDataDetails(data) {
  const fishContainer = document.getElementById("fishContainer");
  fishContainer.innerHTML = "";
  data.forEach((MealData) => {
    const fishElement = document.createElement("div");
    fishElement.classList.add("fishElelement");
    fishElement.classList.add("shadow-lg");
    fishElement.innerHTML = ` 
        <img class="w-full h-60 rounded-md" src="${
          MealData.strMealThumb ? MealData.strMealThumb : "No Picture"
        }" alt="">
        <h4 class="text-3xl font-semibold py-6">${MealData.strMeal}</h4>
        <button onclick="showData(${MealData.idMeal})"  data-bs-toggle="modal"
        data-bs-target="#staticBackdrop" class="px-4 py-3 bg-slate-600 rounded-md text-white">Show Details</button>
    `;
    fishContainer.appendChild(fishElement);
  });
}

function showData(MealData) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealData}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadModalData(data.meals[0]));
}

function loadModalData(data) {
  ModalTitile.innerHTML = data.strMeal;
  const modalBody = document.getElementById("Modal-body");
  modalBody.innerHTML = `
  <img class="w-full h-72" src='${data.strMealThumb}' alt="" />
 `;
  console.log(data.strMealThumb);
}
document.getElementById("basic-addon2").addEventListener("click", function () {
  const inputElement = document.getElementById("input-field");
  const ValueOfinputElement = inputElement.value;
  inputElement.value = "";
  loadFishData(ValueOfinputElement);
});

loadFishData("Chicken");
