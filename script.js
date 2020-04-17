const socialOpen = document.querySelector('.open');
const socialContainer = document.querySelector('.social-container');

socialOpen.addEventListener('click', showSocial);

function showSocial() {
  socialOpen.classList.toggle('active');
  socialContainer.classList.toggle('open');
}

//main code
const URL = 'https://www.themealdb.com/api/json/v1/1/random.php'
const BUTTON = document.querySelector('.button');
const MEAL = document.querySelector('.meal');
const CONTAINER = document.querySelector('.container');

BUTTON.addEventListener('click', showMeal);

function showMeal() {
  fetch(URL)
    .then(res => res.json())
    .then(data => makeMeal(data.meals[0]))
}

function makeMeal(meal) {
  CONTAINER.style.minHeight = '90vh';
  console.log(meal)
  let ingredients = [];
  let tags = meal.strTags === null ? ['No Tag'] : meal.strTags.split(',');
  console.log(tags);
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    }else {
      break;
    }
  }
  // console.log(ingredients);
  let render =
    `<div class="meal__property">
        <img src="${meal.strMealThumb}" alt="img" class="meal__image">
        <div class="meal__info">
          <p class="meal__name"><strong>Name: </strong>${meal.strMeal}</p>
          <span class="meal__area">
            <strong>Area: </strong>${meal.strArea}
          </span>
          <span class="meal__category">
            <strong>Category: </strong>${meal.strCategory}
          </span>
          <span class="meal__tags">
            <strong>Tags: </strong>${ tags.map(value => `<span class="meal__tag">${value}</span>`).join(' | ') }
          </span>
        </div>
      </div>
      <strong class="meal__label">📜 Ingredients:</strong>
      <ul class="meal__ingredients">
        ${ingredients.map(value => `<li>${value}</li>`).join('')}
      </ul>
      <strong class="meal__label">🔪 Instructions:</strong>
      <p class="meal__instruction">${meal.strInstructions}</p>
      <strong class="meal__label">Video Tutorial:</strong>
      <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
              frameborder="0"
              class="meal__video"
              width="310"
              height="180">
      </iframe>`

  MEAL.innerHTML = render;
}
