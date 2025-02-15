document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const checkBox = document.getElementById("tickbox");
  const signupButton = document.getElementById("signup-btn");

  // Error message elements
  const nameErr = document.getElementById("name-err");
  const emailErr = document.getElementById("email-err");
  const passwordErr = document.getElementById("password-err");

  // Function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password (contains one uppercase letter and one @ special character)
  const isValidPassword = (password) => {
    const uppercaseRegex = /[A-Z]/; // at least one uppercase letter
    const specialCharRegex = /[@]/; // at least one @ special character
    return uppercaseRegex.test(password) && specialCharRegex.test(password);
  };

  window.signup = function () {
    // Clearing previous errors
    nameErr.textContent = "";
    emailErr.textContent = "";
    passwordErr.textContent = "";

    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === "") {
      nameErr.textContent = "Full name is required.";
      isValid = false;
    }

    // Validate email
    if (emailInput.value.trim() === "") {
      emailErr.textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailErr.textContent = "Please enter a valid email with @ !!";
      isValid = false;
    }

    // Validate password
    if (passwordInput.value.trim() === "") {
      passwordErr.textContent = "Password is required";
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      passwordErr.textContent = "Password must be at least 6 characters";
      isValid = false;
    } else if (!isValidPassword(passwordInput.value.trim())) {
      passwordErr.textContent = "Password must contain at least one uppercase letter and one special character (@)";
      isValid = false;
    }

    // If username, email, and password are valid, check terms and conditions
    if (isValid) {
      if (!checkBox.checked) {
        alert("You must accept the terms and conditions to sign up.");
        isValid = false;
      }
    }

    if (isValid) {
      // Check if email is already taken
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const isEmailTaken = users.some((user) => user.email === emailInput.value.trim());

      if (isEmailTaken) {
        alert("This email is already taken. Please enter another email.");
      } else {
        const newUser = {
          username: nameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
        };

        users.push(newUser);

        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful!!!");

        // Clear form
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        // Redirect to login page
        window.location.href = "index.html";
      }
    }
  };
});


document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login-btn");

  const emailErr = document.getElementById("email-err");
  const passwordErr = document.getElementById("password-err");

  // Function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  window.login = function () {
    emailErr.textContent = "";
    passwordErr.textContent = "";

    let isValid = true;

    // Validate email
    if (emailInput.value.trim() === "") {
      emailErr.textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailErr.textContent = "Please enter a valid Email !!";
      isValid = false;
    }

    // Validate password
    if (passwordInput.value.trim() === "") {
      passwordErr.textContent = "Password is required !!";
      isValid = false;
    }

    // If everything looks good, proceed to check for matching user
    if (isValid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find user matching email and password
      const user = users.find(
        (u) =>
          u.email === emailInput.value.trim() &&
          u.password === passwordInput.value.trim()
      );

      // Check if email or password is incorrect and show errors separately
      if (!user) {
        if (!users.some(u => u.email === emailInput.value.trim())) {
          emailErr.textContent = "Incorrect email address. Please try again!";
        }
        if (!users.some(u => u.password === passwordInput.value.trim())) {
          passwordErr.textContent = "Incorrect password. Please try again!";
        }
      } else {
        const loggedInUser = {
          username: user.username,
          email: user.email,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        alert(`Welcome ${user.username}! Login successful!`);
        window.location.href = "startQuizPage.html";
      }
    }
  };
});


document.addEventListener("DOMContentLoaded", function () {
  const profileImg = document.getElementById("profile-img");
  const menu = document.getElementById("menu");

  // Toggle menu visibility on profile image click
  profileImg.addEventListener("click", function () {
    // Toggle display of the dropdown menu
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });

  // Handle the menu selection
  menu.addEventListener("change", function () {
    const selectedOption = this.value;
    if (selectedOption === "logout") {
      logout();
    } else if (selectedOption === "profile") {
      alert("Navigate to Profile Page");
      // Add your profile navigation logic here, e.g., window.location.href = 'profile.html'
    }
  });

  // Close menu if clicked outside of the menu or profile image
  window.addEventListener("click", function (event) {
    if (!profileImg.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = "none"; // Close the menu if clicked outside
    }
  });
});

function logout() {
  // Remove loggedInUser from localStorage
  localStorage.removeItem("loggedInUser");

  // Redirect to login page
  alert("You have successfully logged out.");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // const startQuizButton = document.querySelector("button");

  window.startQuiz = function () {
    window.location.href = "questions.html";
  };
});

const defaultQuestions = [
  {
    id: 1,
    question: "What does the <title> tag define in an HTML document?",
    options: [
      { id: 1, value: "The main heading of the page" },
      {
        id: 2,
        value: "The title of the document that appears in the browser tab",
      },
      { id: 3, value: "The footer of the document" },
      { id: 4, value: "The subtitle of the page" },
    ],
    answer: 2,
  },
  {
    id: 2,
    question:
      "Which CSS property is used to change the background color of an element?",
    options: [
      { id: 1, value: "color" },
      { id: 2, value: "background-color" },
      { id: 3, value: "bg-color" },
      { id: 4, value: "background" },
    ],
    answer: 2,
  },
  {
    id: 3,
    question: "What is the purpose of the alt attribute in an <img> tag?",
    options: [
      { id: 1, value: "To link the image to a website" },
      { id: 2, value: "To add a title to the image" },
      {
        id: 3,
        value: "To display alternative text if the image fails to load",
      },
      { id: 4, value: "To set the image dimensions" },
    ],
    answer: 3,
  },
  {
    id: 4,
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      { id: 1, value: "&lt;a&gt;" },
      { id: 2, value: "&lt;link&gt;" },
      { id: 3, value: "&lt;href&gt;" },
      { id: 4, value: "&lt;hyperlink&gt;" },
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "Which CSS property is used to make the text italic?",
    options: [
      { id: 1, value: "text-style: italic;" },
      { id: 2, value: "font-style: italic;" },
      { id: 3, value: "font-weight: italic;" },
      { id: 4, value: "text-decoration: italic;" },
    ],
    answer: 2,
  },
  {
    id: 6,
    question:
      "Which JavaScript method is used to write content into an HTML element?",
    options: [
      { id: 1, value: "innerHTML()" },
      { id: 2, value: "document.write()" },
      { id: 3, value: "getElementById()" },
      { id: 4, value: "document.innerHTML()" },
    ],
    answer: 2,
  },
  {
    id: 7,
    question: "Which of the following is a semantic HTML tag?",
    options: [
      { id: 1, value: "&lt;div&gt;" },
      { id: 2, value: "&lt;span&gt;" },
      { id: 3, value: "&lt;section&gt;" },
      { id: 4, value: "&lt;b&gt;" },
    ],
    answer: 3,
  },
  {
    id: 8,
    question: "Which CSS property controls the text size?",
    options: [
      { id: 1, value: "font-size" },
      { id: 2, value: "text-size" },
      { id: 3, value: "font-weight" },
      { id: 4, value: "text-style" },
    ],
    answer: 1,
  },
  {
    id: 9,
    question: "What does position: absolute; do in CSS?",
    options: [
      { id: 1, value: "Positions the element relative to its parent" },
      { id: 2, value: "Positions the element at the top of the page" },
      {
        id: 3,
        value:
          "Positions the element relative to the nearest positioned ancestor",
      },
      { id: 4, value: "Makes the element float on top of all other elements" },
    ],
    answer: 3,
  },
  {
    id: 10,
    question: "What is the correct CSS syntax to make all <p> elements bold?",
    options: [
      { id: 1, value: "p {font-weight: bold;}" },
      { id: 2, value: "&lt;p style='bold;'&gt;" },
      { id: 3, value: "p {text-weight: bold;}" },
      { id: 4, value: "p {font-style: bold;}" },
    ],
    answer: 1,
  },
  {
    id: 11,
    question: "What is the correct way to declare a JavaScript function?",
    options: [
      { id: 1, value: "function myFunction()" },
      { id: 2, value: "def myFunction()" },
      { id: 3, value: "func myFunction()" },
      { id: 4, value: "declare myFunction()" },
    ],
    answer: 1,
  },
  {
    id: 12,
    question:
      "What is the correct syntax to include an external JavaScript file in HTML?",
    options: [
      { id: 1, value: "&lt;script src='script.js'></script&gt;" },
      { id: 2, value: "&lt;script href='script.js'></script&gt;" },
      { id: 3, value: "&lt;js src='script.js'></js&gt;" },
      { id: 4, value: "&lt;javascript src='script.js'></javascript&gt;" },
    ],
    answer: 1,
  },
  {
    id: 13,
    question: "What is the output of console.log(typeof null); in JavaScript?",
    options: [
      { id: 1, value: "null" },
      { id: 2, value: "undefined" },
      { id: 3, value: "object" },
      { id: 4, value: "string" },
    ],
    answer: 3,
  },
  {
    id: 14,
    question: "Which HTML tag is used to define an unordered list?",
    options: [
      { id: 1, value: "&lt;ul&gt;" },
      { id: 2, value: "&lt;ol&gt;" },
      { id: 3, value: "&lt;li&gt;" },
      { id: 4, value: "&lt;list&gt;" },
    ],
    answer: 1,
  },
  {
    id: 15,
    question: "What does the z-index property in CSS control?",
    options: [
      { id: 1, value: "The transparency of an element" },
      { id: 2, value: "The stacking order of elements" },
      { id: 3, value: "The zoom level of an element" },
      { id: 4, value: "The size of the element" },
    ],
    answer: 2,
  },
  {
    id: 16,
    question: "Which of the following is NOT a valid CSS property?",
    options: [
      { id: 1, value: "color" },
      { id: 2, value: "font-size" },
      { id: 3, value: "align-content" },
      { id: 4, value: "text-transform-upper" },
    ],
    answer: 4,
  },
  {
    id: 17,
    question:
      "Which attribute is used in HTML to uniquely identify an element?",
    options: [
      { id: 1, value: "class" },
      { id: 2, value: "id" },
      { id: 3, value: "name" },
      { id: 4, value: "key" },
    ],
    answer: 2,
  },
  {
    id: 18,
    question: "How do you declare a JavaScript array?",
    options: [
      { id: 1, value: "var arr = 1, 2, 3" },
      { id: 2, value: "var arr = [1, 2, 3]" },
      { id: 3, value: "var arr = {1, 2, 3}" },
      { id: 4, value: "var arr = (1, 2, 3)" },
    ],
    answer: 2,
  },
  {
    id: 19,
    question: "What is the purpose of the <meta> tag in HTML?",
    options: [
      {
        id: 1,
        value: "To add meta information for search engines and browsers",
      },
      { id: 2, value: "To link external files" },
      { id: 3, value: "To create headings" },
      { id: 4, value: "To define navigation menus" },
    ],
    answer: 1,
  },
  {
    id: 20,
    question:
      "Which CSS property is used to add space inside an element’s border?",
    options: [
      { id: 1, value: "margin" },
      { id: 2, value: "padding" },
      { id: 3, value: "border-spacing" },
      { id: 4, value: "spacing" },
    ],
    answer: 2,
  },
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
let questionNumber = 1;
const totalQuestions = 10;
const quizUsedIndex = new Set();
let randomQuestion = [];
let selectedAnswer = [];

function getRandomIndex() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * storedQuestions.length);
  } while (quizUsedIndex.has(randomIndex));
  quizUsedIndex.add(randomIndex);
  return randomIndex;
}

// Push in randomQuesion array with unique index
for (let i = 0; i < totalQuestions; i++) {
  const randomIndex = getRandomIndex();
  randomQuestion.push(storedQuestions[randomIndex]);
}
//displayQuestion();

//DOM elements
const questionHeading = document.getElementById("questionHeading");
const progressElement = document.getElementById("progress");
const questionNumberElement = document.querySelector(".questionNo");
const questionElement = document.querySelector(".quest");
const optionsContainer = document.querySelector(".options");

const previousBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function markPreviousAnswer() {
  // Mark the previously selected option if available
  if (selectedAnswer[currIndex] !== undefined) {
    const radioButtons = optionsContainer.querySelectorAll(
      "input[type ='radio']"
    );
    radioButtons.forEach((radioButton) => {
      if (parseInt(radioButton.value) === selectedAnswer[currIndex]) {
        radioButton.checked = true;
      }
    });
  }
}

//save and select answer
function saveSelectedAnswer() {
  const selectedOption = document.querySelector(
    'input[name="options"]:checked'
  );
  if (selectedOption) {
    selectedAnswer[currIndex] = parseInt(selectedOption.value);
  }
}

//display question
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/questions.html") {
    displayQuestion();
  }
});

function displayQuestion() {
  const currentQuestion = randomQuestion[currIndex];
  if (!questionHeading) {
    return null;
  }
  //update question heading
  questionHeading.innerHTML = `<p style="font-weight: 600; font-size: 45px; margin: 1rem 0 1rem 2rem;">
        ${
          currIndex === 8
            ? "Last 2 Questions left"
            : currIndex === 9
            ? "Heyy, This is the Last Question"
            : `Question ${currIndex + 1} of ${totalQuestions}`
        }
    </p>`;

  //update question number and text
  questionNumberElement.textContent = `${currIndex + 1}.`;
  questionElement.textContent = currentQuestion.question;

  //display options

  currentQuestion.options.map((v) => {
    console.log(v.value);
  });
  optionsContainer.innerHTML = currentQuestion.options
    .map(
      (option) =>
        `<div class="optionText">
                    <input type="radio" name="options" id="option${option.id}" value="${option.id}">
                    <label for="option${option.id}">${option.id}. ${option.value} </label>
                </div>`
    )
    .join("");

  // optionsContainer.innerHTML = ''

  // optionsHTML.forEach(() => {

  // })

  //mark perviously selected answer
  markPreviousAnswer();

  //updateProgressbr
  updateProgressBar();

  previousBtn.style.visibility = currIndex > 0 ? "visible" : "hidden"; // Show or hide the previous button
  nextBtn.textContent =
    currIndex === totalQuestions - 1 ? "Submit Quiz" : "next ->";
}
function updateProgressBar() {
  const progressWidth = ((currIndex + 1) / totalQuestions) * 100;
  progressElement.style.width = `${progressWidth}%`;
}

//Eventlisteners

function prevBtn() {
  // previousBtn.addEventListener("click", () => {
  saveSelectedAnswer();
  if (currIndex > 0) {
    currIndex--;
    displayQuestion();
  }
}

function nextQuestion() {
  const selectedOption = document.querySelector(
    'input[name="options"]:checked'
  );
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!selectedOption) {
    alert("Please select an answer before moving to next question");
    return;
  }
  saveSelectedAnswer();

  if (currIndex < totalQuestions - 1) {
    currIndex++;
    displayQuestion();
  } else {
    alert("Quiz Submitted!");

    // Calculate and display the total score after the quiz
    let finalScore = 0;
    randomQuestion.forEach((question, index) => {
      if (selectedAnswer[index] === question.answer) {
        finalScore += 100;
      }
    });

    console.log("Selected Answers: ", selectedAnswer);
    console.log("Final Score: ", finalScore); // Display the score
    alert("Your final score is: " + finalScore);



    let userTests = JSON.parse(localStorage.getItem("userTests")) || [];

    // Check if the user has given tests before
    let existingUser = userTests.find(user => user.email === loggedInUser.email);
    
    if (existingUser) {
      // User exists, increment the number of tests
      existingUser.noOfTests += 1;
      
      const totalNoOfCorrectAns = randomQuestion.reduce((acc , question , index)=>{
        if(selectedAnswer[indes] === question.answer){
          acc+=1;
        }
        return acc
      },0);
      // Add the new test data to their existing test history
      existingUser.tests.push({
        score: finalScore,
        date: new Date().toISOString().split('T')[0],
        questionsAnswered: randomQuestion.map((question, index) => ({
          question: question.question,
          selectedAnswer: selectedAnswer[index],  
          correctAnswer: question.answer,         
          options: question.options.reduce((acc, option) => {
            acc[option.id] = option.value;        
            return acc;
          }, {})
        })),
        totalNoOfCorrectAnswers: totalNoOfCorrectAnswers // Add totalNoOfCorrectAnswers
      });
    } else {
      // First test for this user, create new user entry

      const totalNoOfCorrectAnswers = randomQuestion.reduce((acc, question, index) => {
        if (selectedAnswer[index] === question.answer) {
          acc += 1; // Increment for correct answers
        }
        return acc;
      }, 0);


      const userTestData = {
        username: loggedInUser.username,
        email: loggedInUser.email,
        noOfTests: 1,
        tests: [
          {
            score: finalScore,
            date: new Date().toLocaleString(),
            questionsAnswered: randomQuestion.map((question, index) => ({
              question: question.question,
              selectedAnswer: selectedAnswer[index],
              correctAnswer: question.answer,
              options: question.options.reduce((acc, option) => {
                acc[option.id] = option.value;
                return acc;
              }, {})
            })),
            totalNoOfCorrectAnswers: totalNoOfCorrectAnswers
          }
        ]
      };
      
      // Add new user to userTests
      userTests.push(userTestData);
    }
    
    // Save back to localStorage
    localStorage.setItem("userTests", JSON.stringify(userTests));
    
    // Redirect after saving data
    window.location.href = "ranking.html";    
  }

}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/ranking.html") {
    displayLeaderboard();
  }
});

function sortAndRank() {
  let userTests = JSON.parse(localStorage.getItem("userTests")) || [];

  // Flatten the test data to focus on the latest score per user
  userTests = userTests.map(user => ({
    email: user.email,
    username: user.username,
    score: user.tests[user.tests.length - 1]?.score || 0  // Latest test score
  }));

  // Sort in descending order by score
  userTests.sort((a, b) => b.score - a.score);

  // Assign ranks
  userTests.forEach((user, index) => {
    user.rank = index + 1;
  });

  return userTests;
}


function displayLeaderboard() {
  const userTests = sortAndRank();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // redirect to login
    console.error("No user data found.");
    return; // Exit the function if there is no logged in user or no quiz data
  }

  if (userTests.length === 0) {
    // redirect to quiz entry
    console.error("No user data found.");
    return; // Exit the function if there is no logged in user or no quiz data
  }

  const loggedInUserIndex = userTests.findIndex(
    (data) => data.email === loggedInUser.email
  );

  if (loggedInUserIndex === -1) {
    console.error("Logged-in user not found in quiz data.");
    return; // Exit if the logged-in user isn't found
  }

  const loggedInUserRank = userTests[loggedInUserIndex].rank;
  const loggedInUserScore = userTests[loggedInUserIndex].score;
  const loggedInUserName = userTests[loggedInUserIndex].username;

  const rankHeading = document.getElementById("rank-display");
  rankHeading.textContent = `Wow! Your rank is #${loggedInUserRank}`;

  const rankScore = document.getElementById("rank-score");
  rankScore.textContent = `Your score is: ${loggedInUserScore}`;


  // 1st Ranker
if (userTests[0]) {
  const first = document.getElementById("first");
  const firstName = document.getElementById("firstName");
  first.textContent = userTests[0].score;
  firstName.textContent = userTests[0].username;
}

// 2nd Ranker
if (userTests[1]) {
  const second = document.getElementById("second");
  const secondName = document.getElementById("secondName");
  second.textContent = userTests[1].score;
  secondName.textContent = userTests[1].username;
}

// 3rd Ranker
if (userTests[2]) {
  const third = document.getElementById("third");
  const thirdName = document.getElementById("thirdName");
  third.textContent = userTests[2].score;
  thirdName.textContent = userTests[2].username;
}


  if (loggedInUserRank <= 3) {
    const loggedInUserDiv = document.querySelector(".logged-in-user");
    loggedInUserDiv.style.display = "none";  // Hide if user is in top 3
  } else {
    const loggedInUserDiv = document.querySelector(".logged-in-user");
    loggedInUserDiv.style.display = "flex"; 
  
    const currentUserRankDiv = document.querySelector(".current-user-rank");
    const currentUserNameDiv = document.querySelector(".current-user-name");
    const currentUserScoreDiv = document.querySelector(".current-user-score");
  
    currentUserRankDiv.textContent = `#${loggedInUserRank}`;
    currentUserNameDiv.textContent = loggedInUserName;
    currentUserScoreDiv.textContent = loggedInUserScore;
  }
  

  // Now display other users from rank 4 onwards
  let htmlContent = '';
  const otherUsersContainer = document.querySelector(".rank-list");

  for (let i = 3; i < 6 && i < userTests.length; i++) {
    if (userTests[i].email === userTests[loggedInUserIndex].email) {
      continue;
    }

    htmlContent += `
        <div class="rank-items">
          <div class="other-user">
              <div class="other-user-rank">#${userTests[i].rank}</div>
              <div class="other-user-name">${userTests[i].username}</div>
          </div>
              <div class="other-user-score">${userTests[i].score}</div>
        </div>
    `;
  }
  otherUsersContainer.innerHTML = htmlContent;
}