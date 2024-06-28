// Variable Delclaration Section
const parent_container = document.getElementById('parent-container');
const start_btn = document.querySelector('#start-game');
const landing_section = document.querySelector('#landing_page');
const categories_section = document.querySelector('#category_page');
const content_section = document.querySelector('#contents_page');
const feedback_section = document.querySelector('.feedback_section');
const back_to_category_btn = document.querySelector('#back-btn');
let question_count = document.querySelector('#q-number');
let current_question_count = document.querySelector('#current-q-count');

// Knowledge Categories variables
const html_category_btn = document.getElementById('html-category');
const css_category_btn = document.getElementById('css-category');
const js_category_btn = document.getElementById('js-category');

// Questions and Answers Variables Section
let post_question = document.getElementById('question');
let answers = [
    document.getElementById('answer1'),
    document.getElementById('answer2'),
    document.getElementById('answer3'),
    document.getElementById('answer4')
];
// -------------
const collective_answer_section = document.querySelectorAll('.answer-section');
let quiz_footer = document.getElementById('quiz-footer');
let question_next_btn = document.createElement('button');
// -------------
let pull_data;

// Feedbacks
let failed1 = document.getElementById('failed1');
let failed2 = document.getElementById('failed2');
const wrong_answers = [];
// Variable Delclaration Section Closed

fetch('./questions.json')
    .then(response => response.json())
    .then(data => {
        pull_data = data;
        console.log(pull_data);
    })
    .catch(err => console.log(err));

// Functions Declaration
// Show category section & hide loadpage section
const showCategorySection = () => {
    landing_section.style.display = "none";
    categories_section.style.display = "block";
}

// Show Q&A section & hide Category section
const show_Q_A_Section = () => {
    categories_section.style.display = "none";
    content_section.style.display = "block";
    parent_container.classList.remove('parent-container');
    parent_container.style.backgroundColor = 'white';
}

// Back to Cateory Section
const returnTOCategorySection = () => {
    content_section.style.display = "none";
    categories_section.style.display = "block";
    parent_container.classList.add('parent-container');
}

// QUestions Manipulation Section
const htmlAction = () => {
    categories_section.style.display = "none";
    content_section.style.display = "block";
    parent_container.classList.remove('parent-container');
    parent_container.style.backgroundColor = 'white';

    startCountDown(9);
    // HTML Question One
    htmlQuestionOne();

}

// tasks Implementation Section
start_btn.addEventListener('click', showCategorySection);
// Categories links
html_category_btn.addEventListener('click', htmlAction);
css_category_btn.addEventListener('click', show_Q_A_Section);
js_category_btn.addEventListener('click', show_Q_A_Section);
// back to category
back_to_category_btn.addEventListener('click', returnTOCategorySection);


// HTML Manipulation Function

let htmlQuestionOne = () => {
    let question_number = 1;
    question_count.innerHTML = `${question_number}. `;
    current_question_count.innerHTML = question_number;
    question_next_btn.classList.add('btn', 'btn-primary', 'btn-sm');
    question_next_btn.setAttribute('id', 'next-question-btn');
    question_next_btn.innerHTML = 'Next Cue';
    question_next_btn.disabled = true;
    quiz_footer.insertAdjacentElement('afterend', question_next_btn);
    question_next_btn.addEventListener('click', htmlQuestionTwo);
    // -----------------------------
    fetch('./questions.json')
        .then(response => response.json())
        .then(data => {

            post_question.innerHTML = data.html.q1.question;
            // ------------------
            let post_question_correct_answer = data.html.q1.choices.a;

            let new_choices = [
                data.html.q1.choices.a,
                data.html.q1.choices.b,
                data.html.q1.choices.c,
                data.html.q1.choices.d
            ];

            // Define function to get a random sort function
            function getRandomSortFunction() {
                const sortFunctions = [
                    (a, b) => a.localeCompare(b), // Ascending alphabetical
                    (a, b) => b.localeCompare(a), // Descending alphabetical
                    () => Math.random() - 0.5 // Random shuffle
                ];

                const randomIndex = Math.floor(Math.random() * sortFunctions.length);
                return sortFunctions[randomIndex];
            }

            // Define function to get the sorted array
            function getSortedArray(array) {
                const sortFunction = getRandomSortFunction();
                return array.slice().sort(sortFunction); // Use slice() to avoid mutating the original array
            }

            let new_choices2 = getSortedArray(new_choices);

            answers[0].innerHTML = new_choices2[0];
            answers[1].innerHTML = new_choices2[1];
            answers[2].innerHTML = new_choices2[2];
            answers[3].innerHTML = new_choices2[3];

            // -------------
            answers.forEach(answer => {
                answer.addEventListener('click', () => {
                    // Check if the clicked p element's innerHTML matches the correct answer
                    if (answer.innerHTML == post_question_correct_answer) {
                        // Change the clicked element's background color to green
                        answer.classList.add('correct');
                        answer.disabled = true;
                        question_next_btn.disabled = false;
                        // Saved The Correct Answer for display
                        document.getElementById('correct1').innerHTML = post_question_correct_answer;

                        // Find and change the wrong answer's background color to red
                        answers.forEach(function (otherAnswer) {
                            if (otherAnswer.innerHTML != post_question_correct_answer) {
                                otherAnswer.disabled = true;
                            }
                        });
                    }
                    else {
                        // Change the clicked element's background color to red
                        answer.classList.add('incorrect');
                        answer.disabled = true;
                        question_next_btn.disabled = false;
                        const display_value = String(answer.innerHTML);
                        // Saved The Failed Answer for display
                        wrong_answers.push(display_value);
                        failed1.innerHTML = wrong_answers[0];
                        failed1.style.display = "block";
                        // console.log(wrong_answers[0]);

                        // Find and change the correct answer's background color to green
                        answers.forEach(function (otherAnswer) {
                            if (otherAnswer.innerHTML == post_question_correct_answer) {
                                otherAnswer.classList.add('correct');
                                otherAnswer.disabled = true;
                                question_next_btn.disabled = false;
                            }
                            else {
                                otherAnswer.disabled = true;
                                question_next_btn.disabled = false;
                            }
                        });
                    }

                });
            });
        })
        .catch(err => console.log(err));
}

let htmlQuestionTwo = () => {
    let question_number = 2;
    question_count.innerHTML = `${question_number}. `;
    current_question_count.innerHTML = question_number;
    // -----------
    question_next_btn.disabled = true;
    question_next_btn.addEventListener('click', htmlFeedback);
    // -----------------------------
    fetch('./questions.json')
        .then(response => response.json())
        .then(data => {

            post_question.innerHTML = data.html.q2.question;
            // ------------------
            let post_question_correct_answer2 = escapeHtml(data.html.q2.choices.b);

            let new_choices = [
                data.html.q2.choices.a,
                data.html.q2.choices.b,
                data.html.q2.choices.c,
                data.html.q2.choices.d
            ];

            // Define function to get a random sort function
            function getRandomSortFunction() {
                const sortFunctions = [
                    (a, b) => a.localeCompare(b), // Ascending alphabetical
                    (a, b) => b.localeCompare(a), // Descending alphabetical
                    () => Math.random() - 0.5 // Random shuffle
                ];

                const randomIndex = Math.floor(Math.random() * sortFunctions.length);
                return sortFunctions[randomIndex];
            }

            // Define function to get the sorted array
            function getSortedArray(array) {
                const sortFunction = getRandomSortFunction();
                return array.slice().sort(sortFunction); // Use slice() to avoid mutating the original array
            }

            // Function to escape HTML characters
            function escapeHtml(unsafe) {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }

            let new_choices2 = getSortedArray(new_choices);

            answers[0].innerHTML = escapeHtml(new_choices2[0]);
            answers[1].innerHTML = escapeHtml(new_choices2[1]);
            answers[2].innerHTML = escapeHtml(new_choices2[2]);
            answers[3].innerHTML = escapeHtml(new_choices2[3]);
            // ----------------
            answers.forEach(element  => {
                element.disabled = false;
                element.classList.remove('incorrect');
                element.classList.remove('correct');
            })

            // -------------
            answers.forEach(answer2 => {
                answer2.addEventListener('click', () => {
                    // Check if the clicked p element's innerHTML matches the correct answer
                    if (answer2.innerHTML == post_question_correct_answer2) {
                        // Change the clicked element's background color to green
                        answer2.classList.remove('incorrect');
                        answer2.classList.add('correct');
                        answer2.disabled = true;
                        question_next_btn.disabled = false;
                        // Saved The Correct Answer for display
                        document.getElementById('correct2').innerHTML = post_question_correct_answer2;

                        // Find and change the wrong answer's disable state to 'true'
                        answers.forEach(function (otherAnswer) {
                            if (otherAnswer.innerHTML != post_question_correct_answer2) {
                                otherAnswer.disabled = true;

                            }
                        });
                    }
                     else {
                        // Change the clicked element's background color to red
                        answer2.classList.remove('correct');
                        answer2.classList.add('incorrect');
                        answer2.disabled = true;
                        question_next_btn.disabled = false;
                        // Saved The Failed Answer for display
                        const display_value2 = answer2.innerHTML;
                        // Saved The Failed Answer for display
                        wrong_answers.push(display_value2);
                        failed2.innerHTML = wrong_answers[1];
                        failed2.style.display = "block !important";

                        // Find and change the correct answer's background color to green
                        answers.forEach(function (otherAnswer) {
                            if (otherAnswer.innerHTML == post_question_correct_answer2) {
                                otherAnswer.classList.add('correct');
                                otherAnswer.disabled = true;
                                question_next_btn.disabled = false;
                            }
                            else {
                                otherAnswer.disabled = true;
                                question_next_btn.disabled = false;
                            }
                        });
                    }

                });
            });
        })
        .catch(err => console.log(err));
}

// HTML Feedback Function Section
let htmlFeedback = () => {
    parent_container.classList.remove('parent-container');
    parent_container.style.backgroundColor = 'white';
    // ------------
    content_section.style.display = "none";
    feedback_section.style.display = "block";
}

// Timer Function

const startCountDown = (seconds) => {
    // Keeping track of every second
    let counter = seconds;
    const time_interval = setInterval(
        () => {
            console.log(counter);
            document.getElementById('time-left').innerHTML = counter;
            counter--;

            // Preventing counter from going below 0
            if (counter < 0) {
                    // ------------
    content_section.style.display = "none";
    feedback_section.style.display = "block";
                const stop_alarm = new Audio('./alarm.mp3');
                stop_alarm.play();
                clearInterval(time_interval);
            }
        }, 1000
    );
}