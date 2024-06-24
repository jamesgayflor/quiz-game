// Variable Delclaration Section
const start_btn = document.querySelector('#start-game');
const landing_section = document.querySelector('#landing_page');
const categories_section = document.querySelector('#category_page');
// Variable Delclaration Section Closed

fetch('./questions.json')
.then(response => response.json())
.then (data => {
    console.log(data)
})
.catch (err => console);

// Functions Declaration
const showCategorySection = () => {
    landing_section.style.display = "none";
    category_page.style.display = "block";
}

// tasks Implementation Section
start_btn.addEventListener('click', showCategorySection)