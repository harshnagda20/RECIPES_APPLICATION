let form = document.querySelector("form");
let container = document.getElementById("container");

// Default message when the page loads
container.innerHTML = `<h2 style="text-align:center; color:black; font-family: 'Montserrat'; font-weight:700; font-size: 28px;  text-decoration: solid;  text-shadow:2px 5px 30px red;   position: absolute; top: 400px;    font-style: italic;">CRAVING SOMETHING TASTY? SEARCH NOW AND UNLOCK A WORLD OF MOUTHWATERING RECIPES!</h2>`;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let recipe_name = document.getElementById("searchRecipes").value;
    let fetchRecipes = async () => {
        let recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name}`);
        let finalRecipeData = await recipes.json();
        container.innerHTML = ``; // Clear the container for new results

        if (finalRecipeData.meals) {
            finalRecipeData.meals.forEach((ele) => {
                let recipe_item = document.createElement("div");
                recipe_item.setAttribute("id", "recipe_item");
                container.appendChild(recipe_item);

                let food_img = document.createElement("img");
                food_img.src = `${ele.strMealThumb}`;
                food_img.setAttribute("id", "food_img");

                let recipe_name = document.createElement("h2");
                recipe_name.innerHTML = `${ele.strMeal}`;
                recipe_name.setAttribute("id", "recipe_name");

                let view_recipe = document.createElement("button");
                view_recipe.setAttribute("id", "view_recipe");
                view_recipe.innerHTML = "View Recipe";

                recipe_item.append(food_img, recipe_name, view_recipe);

                let ing_ins = document.querySelector("#ing_ins");
                view_recipe.addEventListener("click", () => {
                    ing_ins.style.display = "block";
                    let ing_info = document.getElementById("ing_info");
                    ing_info.innerHTML = "";
                    let ul = document.createElement("ul");
                    for (let i = 1; i <= 20; i++) {
                        let ingredient = ele[`strIngredient${i}`];
                        let measure = ele[`strMeasure${i}`];
                        if (ingredient && ingredient.trim() !== "") {
                            let li = document.createElement("li");
                            li.innerHTML = `${ingredient} - ${measure}`;
                            ul.appendChild(li);
                        }
                    }
                    let h1 = document.createElement("h1");
                    h1.innerHTML = "INGREDIENTS";
                    ing_info.append(h1, ul);
                    let ins_info = document.getElementById("ins_info");
                    ins_info.innerHTML = `
                        <h1>INSTRUCTIONS</h1>
                        <p>${ele.strInstructions}</p>
                    `;
                });
                let close = document.querySelector("#close");
                close.addEventListener("click", () => {
                    ing_ins.style.display = "none";
                });
            });
        } else {
            container.innerHTML = `<h2 style="text-align:center; color:black; font-family: 'Montserrat'; font-weight:700; font-size: 25px;  text-decoration: solid;  text-shadow:2px 5px 35px red;  position: relative; top: -90px;    font-style: italic;">Hmm, looks like we couldn't find that dish. Try searching for something else!</h2>`;
        }
    };
    fetchRecipes();
});
