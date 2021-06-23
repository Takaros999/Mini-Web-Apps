const searchBtn = document.getElementById('search-btn');
const searchTerm = document.getElementById('search-term');
const meals = document.getElementById('meals');
const favUL = document.getElementById('fav-meals');

let favoriteList = [];


getRandomMeal();

searchTerm.addEventListener("keyup", function (event) {
	if (event.code === 'Enter') {
		getMealbySearch();
	}
});

async function getRandomMeal() {
	const resp = await fetch('https:/www.themealdb.com/api/json/v1/1/random.php');
	const respData = await resp.json();
	const randomMeal = respData.meals[0];

	clearList();
	addMeal(randomMeal, true);
}

async function getMealbySearch() {
	let term = searchTerm.value;

	const resp = await fetch('https:/www.themealdb.com/api/json/v1/1/search.php?s=' + term);
	const respData = await resp.json();

	clearList();

	if (respData.meals == null) {
		searchError();
	} else {
		respData.meals.forEach(meal => addMeal(meal, false));
	}
}

async function getMealbyId(id) {
	const resp = await fetch('https:/www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
	const respData = await resp.json();
	const meal = respData.meals[0];

	return meal;
}

function addMeal(mealData, random) { //!
	const meal = document.createElement('div');
	meal.classList.add('meal');

	meal.innerHTML = `
	<div class="meal-header">
		${random ? ' <span class="random cursor" onclick="getRandomMeal()"> Random Recipe </span>' : ''}
		<img class="cursor" onclick="togglePopup(${mealData.idMeal})" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
	</div>
	<div class="meal-body">
		<h4 class="cursor" onclick="togglePopup(${mealData.idMeal})">${mealData.strMeal}</h4>
		<span class="cursor" onclick="addFavorite(${mealData.idMeal})" 
		id="${mealData.idMeal}" ${indexFavorite(mealData.idMeal) != -1 ? 'style="color:red;"' : 'style="color:grey;"'}>
		<i class="fas fa-heart"></i></span>
	</div>`;

	meals.appendChild(meal);
}

function clearList() {
	meals.innerHTML = '';
}

function searchError() {
	meals.innerHTML = `<h4 style='color:red; text-align:center;'>Recipe not found. Try again!</h4>`;
}

function indexFavorite(id) {
	let index = -1;
	favoriteList.forEach((meal, i) => {
		if (meal.idMeal == id) index = i;
	});

	return index;
}

function addFavorite(id) {
	const heartBtn = document.getElementById(id);

	getMealbyId(id)
		.then(meal => {

			console.log(meal);
			const index = indexFavorite(id);

			if (index == -1) {
				favoriteList.push(meal);
				heartBtn.style.color = 'red';

				const favMeal = document.createElement('li');
				favMeal.id = favoriteList.length - 1;	//give li an id that matches the fav-list.indexOf(meal)

				favMeal.innerHTML = `
					<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
					<span>${meal.strMeal}</span>`;

				favUL.appendChild(favMeal);
			} else {
				favoriteList.splice(index);
				heartBtn.style.color = 'grey';

				document.getElementById(index).remove(); // delete <li> from html
			}
		})
		.catch(err => console.error(err));

}

function togglePopup(id) {
	//if we want to just close popup we call with id=-1
	if (id == -1) {
		document.getElementById("pop-up").classList.toggle("active");
		return;
	}

	//else display popup

	const popupContent = document.getElementById('popup-content');
	let meal
	//make ul
	const ingredientList = document.createElement('ul');

	getMealbyId(id)
		.then(meal => {

			let i = 1;
			let ingredient = meal['strIngredient' + i];
			let measurement = meal['strMeasure' + i];

			while (ingredient != '') {
				const ing_mes = document.createElement('li');

				ing_mes.innerHTML = `${ingredient} - ${measurement}`;
				ingredientList.appendChild(ing_mes);

				console.log(ing_mes);

				i++;
				ingredient = meal['strIngredient' + i];
				measurement = meal['strMeasure' + i];
			}

			popupContent.innerHTML = `
				<button class="close-btn" onclick="togglePopup(-1)">&times;</button>
				<h2>${meal.strMeal}</h2>
				<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
				<p>${meal.strInstructions}</p>
				<h4>Ingredients:</h4>`;
			popupContent.appendChild(ingredientList);

		})
		.catch(err => console.error(err));

	document.getElementById("pop-up").classList.toggle("active");
}