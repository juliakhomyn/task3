const heroesList = document.querySelector("#heroes");
const IMG_BASE_URL = 'https://starwars-visualguide.com/assets/img/characters/${id}.jpg';

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const first = document.querySelector(".first");
const last = document.querySelector(".last");
const page = document.querySelector(".page-num");
const pageTotal = document.querySelector(".page-total");

const maxHeroes = 2;
let index = 1;
let countPage;
let heroesListPagin;

let heroes = [];

prev.addEventListener("click", function () {
    index--;
    check();
    showHeroes();
})
next.addEventListener("click", function () {
    index++;
    check();
    showHeroes();
})
first.addEventListener("click", function () {
    index = 1;
    check();
    showHeroes();
})
last.addEventListener("click", function () {
    index = countPage;
    check();
    showHeroes();
})

function check() {
    console.log(index);
    if (index == countPage) {
        next.classList.add("disabled");
        last.classList.add("disabled");
    } else {
        next.classList.remove("disabled");
        last.classList.remove("disabled");
    }

    if (index == 1) {
        prev.classList.add("disabled");
        first.classList.add("disabled")
    } else {
        prev.classList.remove("disabled");
        first.classList.remove("disabled");
    }
}


const generateHeroLayout = (heroData, index) => {
    const heroUrl = heroData.url
    const splitted = heroUrl.split('/');
    const heroId = splitted[splitted.length - 2];
    const heroImgUrl = IMG_BASE_URL.replace('${id}', heroId);

    return `<li class="hero-element">
        <div>
            <img src="${heroImgUrl}" alt=""/>
        </div>
        <div class="hero-details">
            <span>name: ${heroData.name}</span>
            <span>gender: ${heroData.gender}</span>
            <span>birth: ${heroData.birth_year}</span>
        </div>
        </li>`;
}

const generateList = (heroes) => {
    heroesList.innerHTML = '<ul id = heroes';
    for (let i = 0; i < heroes.length; i++) {
        heroesList.insertAdjacentHTML("beforeend", generateHeroLayout(heroes[i], i));
    }
    heroesListPagin = heroesList.children;
    showHeroes();
};

function showHeroes() {
    countPage = Math.ceil(heroesListPagin.length / maxHeroes);
    for (let i = 0; i < heroesListPagin.length; i++) {
        heroesListPagin[i].classList.remove("show");
        heroesListPagin[i].classList.add("hide");
        if (i >= (index * maxHeroes - maxHeroes) && i < index * maxHeroes) {
            heroesListPagin[i].classList.remove("hide");
            heroesListPagin[i].classList.add("show");
        }
        page.innerHTML = index;
        pageTotal.innerHTML = countPage;
    }
}


fetch("https://swapi.dev/api/people")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    heros = data.results
    generateList(heros);
   // const inputs = document.querySelectorAll('input')

    const listElements = document.querySelectorAll('.list_element') 
    
    for(let i = 0; i < listElements.length; i++) {
        const el = listElements[i];
        const [input, button] = el.children

        button.addEventListener('click', () => handleBtnClick(input.value, i))

       // input.addEventListener('input', handleInputChange);
    }
  });
