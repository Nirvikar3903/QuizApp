document.addEventListener("DOMContentLoaded" , ()=>{

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const checkBox = document.getElementById("tickbox");
    const signupButton = document.getElementById("signup-btn");


    //error msg elements
    const nameErr = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const passwordErr = document.getElementById("passwordErr");


    //function validating email
    const isValidEmail=(email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    signupButton.addEventListener("click" , (e)=>{
        e.preventDefault();

        //clearing errors
        nameErr.textContent ="";
        emailErr.textContent="";
        passwordErr.textContent="";

        let isValid = true;

        // validate name
        if(nameInput.value.trim()=== ""){
            nameErr.textContent = "Full name is required.";
            isValid = false;
        }
        
        // validate email
        if(emailInput.value.trim()=== ""){
            emailErr.textContent= "Email is required"
            isValid = false;
        }else if(!isValidEmail(emailInput.value.trim())){
            emailErr.textContent = "Please enter a valid email !!";
            isValid = false;
        }

        // validate password
        if(passwordInput.value.trim()===""){
            passwordErr.textContent = "Password is required"
            isValid = false;
        }else if(passwordInput.value.length < 6){
            passwordErr.textContent = "Password must be atleast 6 characters"
        }
        // validate checkbox

        if(!checkBox.checked){
            alert("You must accept the Terms & Conditions")
            isValid = false
        }
        // else{
        //     alert("Terms & Conditions accepted!!!")
        // }

        if(isValid) {
            //stored in key value pair
            localStorage.setItem("name" , nameInput.value.trim());
            localStorage.setItem("email" , emailInput.value.trim());
            localStorage.setItem("password" , passwordInput.value.trim());

            //alert signup successful
            alert("Signup successful!!!");

            //clear the form 
            nameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";

            window.location.href = "login.html";
        }

       
        
    })
});

//login page

document.addEventListener("DOMContentLoaded" ,()=>{

    // e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-btn");

    const emailErr = document.getElementById("emailErr");
    const passwordErr = document.getElementById("passwordErr");


    const isValid = (email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    loginButton.addEventListener("click" , (e)=>{
    
        e.preventDefault();

        emailErr.textContent = "";
        passwordErr.textContent = "";

        let isValid = true;

        //validate email
        if(emailInput.value.trim() === ""){
            emailErr.textContent = "Email is required."
            isValid = false;
        }else if (!isValidEmail(emailInput.value.trim())){
            emailErr.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        //validate password

        if (passwordInput.value.trim() === "") {
            passwordErr.textContent = "Password is required.";
            isValid = false;
        }

        if(isValid){

            //get storage from localStorage
            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");

            // check email password
            if( emailInput.value.trim() === storedEmail && passwordInput.value.trim() === storedPassword){
                alert ("Login successful!!")
                window.location.href = "startQuizpage.html";
            }else{
                alert("Incorrect Email or Password .Please try again later!!!")
            }
        }
    });

});



//logout functionality start 

//logout functionality start  ends



//questions page
const defaultQuestions = [
    {
        id:1,
        question: "What does the <title> tag define in an HTML document?",
        options: ["The main heading of the page", "The title of the document that appears in the browser tab","The footer of the document", "The subtitle of the page"],
        answer: "The title of the document that appears in the browser tab"
    },
    {
        id:2,
        question: "Which CSS property is used to change the background color of an element?",
        options: ["color", "background-color","bg-color", "background"],
        answer: "background-color"
    },   
    {
        id: 3,
        question: "What is the purpose of the alt attribute in an <img> tag?",
        options: [
            "To link the image to a website",
            "To add a title to the image",
            "To display alternative text if the image fails to load",
            "To set the image dimensions"
        ],
        answer: "To display alternative text if the image fails to load"
    },
    {
        id: 4,
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["'<a>'", "'<link>'", "'<href>'", "'<hyperlink>'"],
        answer: "<a>"
    },
    {
        id: 5,
        question: "Which CSS property is used to make the text italic?",
        options: [
            "text-style: italic;",
            "font-style: italic;",
            "font-weight: italic;",
            "text-decoration: italic;"
        ],
        answer: "font-style: italic;"
    },
    {
        id: 6,
        question: "Which JavaScript method is used to write content into an HTML element?",
        options: ["innerHTML()", "document.write()", "getElementById()", "document.innerHTML()"],
        answer: "document.write()"
    },
    {
        id: 7,
        question: "Which of the following is a semantic HTML tag?",
        options: ["'<div>'", "'<span>'", "'<section>'", "'<b>'"],
        answer: "'<section>'"
    },
    {
        id: 8,
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-weight", "text-style"],
        answer: "font-size"
    },
    {
        id: 9,
        question: "What does position: absolute; do in CSS?",
        options: [
            "Positions the element relative to its parent",
            "Positions the element at the top of the page",
            "Positions the element relative to the nearest positioned ancestor",
            "Makes the element float on top of all other elements"
        ],
        answer: "Positions the element relative to the nearest positioned ancestor"
    },
    {
        id: 10,
        question: "What is the correct CSS syntax to make all <p> elements bold?",
        options: [
            "'p {font-weight: bold;}'",
            "'<p style='bold;'>'",
            "'p {text-weight: bold;}'",
            "'p {font-style: bold;}'"
        ],
        answer: "'p {font-weight: bold;}'"
    },
    {
        id: 11,
        question: "What is the correct way to declare a JavaScript function?",
        options: [
            "function myFunction()",
            "def myFunction()",
            "func myFunction()",
            "declare myFunction()"
        ],
        answer: "function myFunction()"
    },
    {
        id: 12,
        question: "What is the correct syntax to include an external JavaScript file in HTML?",
        options: [
            "'<script src='script.js'></script>'",
            "'<script href='script.js'></script>'",
            "'<js src='script.js'></js>'",
            "'<javascript src='script.js'></javascript>'"
        ],
        answer: "'<script src='script.js'></script>'"
    },
    {
        id: 13,
        question: "What is the output of console.log(typeof null); in JavaScript?",
        options: ['"null"', '"undefined"', '"object"', '"string"'],
        answer: '"object"'
    },
    {
        id: 14,
        question: "Which HTML tag is used to define an unordered list?",
        options: ["'<ul>'", "'<ol>'", "'<li>'", "'<list>'"],
        answer: "'<ul>'"
    },
    {
        id: 15,
        question: "What does the z-index property in CSS control?",
        options: [
            "The transparency of an element",
            "The stacking order of elements",
            "The zoom level of an element",
            "The size of the element"
        ],
        answer: "The stacking order of elements"
    },
    {
        id: 16,
        question: "Which of the following is NOT a valid CSS property?",
        options: ["color", "font-size", "align-content", "text-transform-upper"],
        answer: "text-transform-upper"
    },
    {
        id: 17,
        question: "Which attribute is used in HTML to uniquely identify an element?",
        options: ["class", "id", "name", "key"],
        answer: "id"
    },
    {
        id: 18,
        question: "How do you declare a JavaScript array?",
        options: [
            "var arr = 1, 2, 3",
            "var arr = [1, 2, 3]",
            "var arr = {1, 2, 3}",
            "var arr = (1, 2, 3)"
        ],
        answer: "var arr = [1, 2, 3]"
    },
    {
        id: 19,
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            "To add meta information for search engines and browsers",
            "To link external files",
            "To create headings",
            "To define navigation menus"
        ],
        answer: "To add meta information for search engines and browsers"
    },
    {
        id: 20,
        question: "Which CSS property is used to add space inside an element’s border?",
        options: ["margin", "padding", "border-spacing", "spacing"],
        answer: "padding"
    }
];

// localStorage.setItem(JSON.stringify(defaultQuestions));
localStorage.setItem("defaultQuestions", JSON.stringify(defaultQuestions));

// Retrieve questions from localStorage
const storedQuestions = JSON.parse(localStorage.getItem("defaultQuestions"));

// Ensure questions exist in localStorage
if (!storedQuestions || storedQuestions.length === 0) {
    console.error("No questions found in localStorage.");
} else {
    console.log("Questions loaded successfully.");
}

// Variables for quiz
let currIndex = 0;
let randomQuestion = [];
let questionNumber = 1;
const totalQuestions = 10;
const quizUsedIndex = new Set();
let selectedAnswers = [];

// Function to get unique random index
function getRandomIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * storedQuestions.length);
    } while (quizUsedIndex.has(randomIndex));
    quizUsedIndex.add(randomIndex);
    return randomIndex;
}

// Populate randomQuestion array with unique questions
for (let i = 0; i < totalQuestions; i++) {
    const randomIndex = getRandomIndex();
    randomQuestion.push(storedQuestions[randomIndex]);
}

// DOM Elements
const questionHeading = document.getElementById("questionHeading");
const progressElement = document.getElementById("progress");
const questionNumberElement = document.querySelector(".questionNo");
const questionElement = document.querySelector(".quest");
const optionsContainer = document.querySelector(".options");
const previousBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


function markPreviousAnswer() {
    // Mark the previously selected option if available
    if (selectedAnswers[currIndex] !== undefined) {
        const radioButtons = optionsContainer.querySelectorAll("input[type='radio']");
        radioButtons.forEach(radioButton => {
            if (radioButton.value === selectedAnswers[currIndex]) {
                radioButton.checked = true;
            }
        });
    }
}

// Save selected answer
function saveSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    if (selectedOption) {
        selectedAnswers[currIndex] = selectedOption.value;
    }  
}

// Display question
function displayQuestion() {
    const currentQuestion = randomQuestion[currIndex];

    // Update question heading
    questionHeading.innerHTML = `<p style="font-weight: 600; font-size: 45px; margin: 1rem 0 1rem 2rem;">
        ${
            currIndex === 8
                ? "Last 2 Questions left"
                : currIndex === 9
                ? "Heyy, This is the Last Question"
                : `Question ${currIndex + 1} of ${totalQuestions}`
        }
    </p>`;

    // Update question number and text
    questionNumberElement.textContent = `${currIndex + 1}.`;
    questionElement.textContent = currentQuestion.question;

    // Display options
    optionsContainer.innerHTML = currentQuestion.options
        .map(
            (option, optionIndex) =>
                `<div class="optionText" >
                    <input type="radio" name="options" id="option${optionIndex}" value="${option}">
                    <label for="option${optionIndex}">${optionIndex + 1}. ${option}</label>
                </div>`
        )
        .join("");

    // Mark previously selected answer
    markPreviousAnswer();

    // Update progress bar
    updateProgressBar();
    
    // previousBtn.textContent = currIndex === totalQuestions - 1 ? "Submit Quiz" : "Submit & Continue->";
    previousBtn.style.visibility = currIndex > 0 ? "visible" : "hidden"; // Show or hide the previous button
    nextBtn.textContent = currIndex === totalQuestions - 1 ? "Submit Quiz" : "Submit & Continue->";
}

// Update progress bar
function updateProgressBar() {
    const progressWidth = ((currIndex + 1) / totalQuestions) * 100;
    progressElement.style.width = `${progressWidth}%`;
}

// Event Listeners
previousBtn.addEventListener("click", () => {
    
    saveSelectedAnswer();
    if (currIndex > 0) {
        currIndex--;
        displayQuestion();
    }
});

// nextBtn.addEventListener("click", () => {
//     let score = 0;
//     const selectedOption = document.querySelector('input[name="options"]:checked');

//     // if (!selectedOption) {
//     //     alert("Please select an answer before moving to the next question.");
//     //     return;
//     // }
//     saveSelectedAnswer();

//     // Check if the answer is correct
//     const currentQuestion = randomQuestion[currIndex];
//     const selectedAnswer = selectedOption.value.trim(); // Trim to avoid whitespace issues
//     const correctAnswer = currentQuestion.answer.trim();

    
//     if (selectedAnswers[currIndex] === currentQuestion.answer) {
//         score = score+10;
//     }
//     currIndex++;


//     if (currIndex < totalQuestions - 1) {
//         currIndex++;
//         displayQuestion();
//     } else {
//         let score = 0;
        
//         alert("Quiz Submitted!");
//         console.log("Selected Answers: ", selectedAnswers);
//         console.log("Score: ", score); // Display the score
//     }
// });



// Initialize quiz

nextBtn.addEventListener("click", () => {
    // let score = 0;
    const selectedOption = document.querySelector('input[name="options"]:checked');

    // Check if an answer is selected
    if (!selectedOption) {
        alert("Please select an answer before moving to the next question.");
        return;
    }

    saveSelectedAnswer();

    // Check if the selected answer is correct
    // const currentQuestion = randomQuestion[currIndex];
    // const selectedAnswer = selectedOption.value.trim(); // Trim to avoid whitespace issues
    // const correctAnswer = currentQuestion.answer.trim();

    // if (selectedAnswer === correctAnswer) {
    //     score = score + 10; // Increment score if the answer is correct
    // }

    // Move to next question or submit the quiz
    if (currIndex < totalQuestions - 1) {
        currIndex++;
        displayQuestion();
    } else {
        alert("Quiz Submitted!");
        
        // Calculate and display the total score after the quiz
        let finalScore = 0;
        randomQuestion.forEach((question, index) => {
            // if (selectedAnswer === correctAnswer) {
            if (selectedAnswers[index] === question.answer ) {
                finalScore = finalScore +10;
            }
        });

        console.log("Selected Answers: ", selectedAnswers);
        console.log("Final Score: ", finalScore); // Display the score
        alert("Your final score is: " + finalScore);
    }
});





displayQuestion();
