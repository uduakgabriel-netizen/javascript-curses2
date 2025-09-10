const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipesDiv = document.getElementById("recipes");

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Async function to fetch recipes
async function fetchRecipes(query) {
  try {
    const response = await fetch(API_URL + query);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    recipesDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
} 

// Display recipes in cards
function displayRecipes(meals) {
  recipesDiv.innerHTML = "";

  if (!meals) {
    recipesDiv.innerHTML = "<p>No recipes found. Try again!</p>";
    return;
  }

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("recipe-card"); 

    card.innerHTML = ` 
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <a href="${meal.strSource}" target="_blank">View Recipe</a>
    `;

    recipesDiv.appendChild(card);
  });
} 

// Event listener
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});
