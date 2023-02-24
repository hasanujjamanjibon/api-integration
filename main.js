const modalTitile = document.getElementById("staticBackdropLabel");
const modalImages = document.getElementById("card-images");
const fishContainer = document.getElementById("fishContainer");

let limit = 8;
let searchTerm = "Chicken";
const baseApiUrl = "https://www.themealdb.com/api/json/v1/1/";

const loadMealData = async (isLoadNext) => {
  const url = `${baseApiUrl}search.php?s=${searchTerm}`;

  const res = await fetch(url);
  let { meals } = await res.json();

  if (isLoadNext) meals = meals.slice(limit, meals.length);
  else meals = meals.slice(0, limit);

  fishDataDetails(meals);
};

function fishDataDetails(data) {
  fishContainer.innerHTML = "";
  data.forEach((mealData) => {
    fishContainer.innerHTML += ` 
      <div class="fishElelement shadow-lg">
        <img class="w-full h-60 rounded-md" src="${
          mealData.strMealThumb ? mealData.strMealThumb : "No Picture"
        }" alt="">
        <h4 class="text-3xl font-semibold py-6">${mealData.strMeal}</h4>
        <button onclick="showData(${mealData.idMeal})"  data-bs-toggle="modal"
        data-bs-target="#staticBackdrop" class="px-4 py-3 bg-slate-600 rounded-md text-white">Show Details</button>
      </div>
    `;
  });
}

async function showData(mealData) {
  const url = `${baseApiUrl}lookup.php?i=${mealData}`;
  const res = await fetch(url);
  const { meals } = await res.json();
  loadModalData(meals[0]);
}

function loadModalData(data) {
  modalTitile.innerHTML = data.strMeal;
  const modalBody = document.getElementById("Modal-body");
  modalBody.innerHTML = `
  <img class="w-full h-72" src='${data.strMealThumb}' alt="" />
 `;
  console.log(data.strMealThumb);
}

document.getElementById("basic-addon2").addEventListener("click", function () {
  const inputElement = document.getElementById("input-field");
  searchTerm = inputElement.value;
  inputElement.value = "";
  loadMealData();
});

loadMealData();
