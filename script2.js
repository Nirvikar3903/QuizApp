document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const checkBox = document.getElementById("tickbox");
    const signupButton = document.getElementById("signup-btn");
  
    //error msg elements
    const nameErr = document.getElementById("name-err");
    const emailErr = document.getElementById("email-err");
    const passwordErr = document.getElementById("password-err");
  
    //function validating email
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    window.signup = function () {
      // signupButton.addEventListener("click", (e) => {
      //   e.preventDefault();
  
      //clearing errors
      nameErr.textContent = "";
      emailErr.textContent = "";
      passwordErr.textContent = "";
  
      let isValid = true;
  
      // validate name
      if (nameInput.value.trim() === "") {
        nameErr.textContent = "Full name is required.";
        isValid = false;
      }
  
      // validate email
      if (emailInput.value.trim() === "") {
        emailErr.textContent = "Email is required";
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailErr.textContent = "Please enter a valid email !!";
        isValid = false;
      }
  
      // validate password
      if (passwordInput.value.trim() === "") {
        passwordErr.textContent = "Password is required";
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        passwordErr.textContent = "Password must be atleast 6 characters";
      }
      // validate checkbox
  
      if (!checkBox.checked) {
        alert("You must accept the Terms & Conditions");
        isValid = false;
      }
  
      if (isValid) {
        //stored in key value pair
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        const isEmailTaken = users.some(
          (user) => user.email === emailInput.value.trim()
        );
  
        if (isEmailTaken) {
          alert("This email is already taken. Please enter another email .");
        } else {
          const newUser = {
            username: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
          };
  
          users.push(newUser);
  
          // save it into locaalstorage
          localStorage.setItem("users", JSON.stringify(users));
  
          alert("Signup successful!!!");
  
          //clear the form
          nameInput.value = "";
          emailInput.value = "";
          passwordInput.value = "";
  
          //alert signup successful
          window.location.href = "login.html";
        }
        // localStorage.setItem("name" , nameInput.value.trim());
        // localStorage.setItem("email" , emailInput.value.trim());
        // localStorage.setItem("password" , passwordInput.value.trim());
      }
    };
  });
  
  // login page
  
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
      // loginButton.addEventListener("click", (e) => {
      //   e.preventDefault();
  
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
  
      if (isValid) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Find user which is already saved
        const user = users.find(
          (u) =>
            u.email === emailInput.value.trim() &&
            u.password === passwordInput.value.trim()
        );
  
        if (user) {
          const loggedInUser = {
            username: user.username,
            email: user.email,
          };
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  
          alert(`Welcome ${user.username}! Login successful!`);
          window.location.href = "startQuizPage.html";
        } else {
          alert("Incorrect email or password !! Please try again!");
        }
      }
    };
  });
  
  //   function logout() {
  //     // Remove loggedInUser from localStorage
  //     localStorage.removeItem("loggedInUser");
  
  //     // Redirect to login page
  //     alert("You have successfully logged out.");
  //     window.location.href = "login.html";
  // }
  // document.getElementById("profile-img").addEventListener("click", function () {
  //   const menu = document.getElementById("menu");
  //   menu.style.display = menu.style.display === "none" ? "block" : "none";
  // });
  
  //
  document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.addEventListener("change", function () {
        const selectedOption = this.value;
        if (selectedOption === "logout") {
          logout();
        } else if (selectedOption === "profile") {
          alert("Navigate to Profile Page");
          // Add your profile navigation logic here
        }
      });
    }
  });
  
  function logout() {
    // Remove loggedInUser from localStorage
    localStorage.removeItem("loggedInUser");
  
    // Redirect to login page
    alert("You have successfully logged out.");
    window.location.href = "login.html";
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
  
  // Here's a summary of changes made function by function:
  // displayQuestion: Updated to render options using the new format (option.id for the value and option.value for the display text).
  // saveSelectedAnswer: Adjusted to save the id of the selected option instead of the full value.
  // markPreviousAnswer: Updated to mark the option with the matching id as checked when revisiting a question.
  // randomQuestion and selectedAnswers processing: Adapted to compare selectedAnswers against question.answer using their id values instead of strings.
  
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
      currIndex === totalQuestions - 1 ? "Submit Quiz" : "Submit & Continue->";
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
    // nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector(
      'input[name="options"]:checked'
    );
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    //check if the answer is selected
    if (!selectedOption) {
      alert("Please select an answer before moving to next question");
      return;
    }
    saveSelectedAnswer();
  
    //move to next question
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
  
      const userTestData = {
        username: loggedInUser.username,
        email: loggedInUser.email,
        score: finalScore,
        questionsAnswered: randomQuestion.map((question, index) => ({
          question: question.question,
          selectedAnswer: randomQuestion[index].options.find(
            (option) => option.id === selectedAnswer[index]
          )?.value,
          correctAnswer: question.options[question.answer - 1]?.id,
        })),
      };
  
      // Store the user test data in localStorage
      let userTests = JSON.parse(localStorage.getItem("userTests")) || [];
      userTests.push(userTestData);
  
      localStorage.setItem("userTests", JSON.stringify(userTests));
  
      window.location.href = "ranking.html";
    }
  
    //calculate an display total score after quiz is submitted
  }
  // displayQuestion();
  
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/ranking.html") {
      displayRank();
    }
  });
  
  function sortAndRank() {
    // Retrieve the quiz data from localStorage (or an empty array if none exists)
    let quizData = JSON.parse(localStorage.getItem("userTests")) || [];
  
    // Sort by score in descending order
    quizData.sort((a, b) => b.score - a.score);
  
    // Add ranks using dense ranking (tied scores share the same rank)
    let rank = 1;
  
    const rankedQuizData = quizData.map((item, index) => {
      // Returning a new object with rank adde
      return { ...item, rank: index + 1 };
    });
  
    // Save the ranked quiz data back into localStorage
    localStorage.setItem("userTests", JSON.stringify(rankedQuizData));
  
    // Optional: log the ranked data to the console for debugging
    // console.log("Ranked Quiz Data: ", rankedQuizData);
    return rankedQuizData;
  }
  
  // function displayRank() {
  //   let userTests = JSON.parse(localStorage.getItem("userTests")) || [];
  //   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //   var existingQuizIndex;
  
  //   if (!loggedInUser || userTests.length === 0) {
  //       console.error("No user data found.");
  //       return; // Exit the function if there is no logged in user or no quiz data
  //   }
  
  //   // Call the sortAndRankFunction to sort the userTests array and assign ranks
  //   sortAndRank(userTests);
  
  //   // if(loggedInUser){
  //   //   existingQuizIndex = userTests.find(data=> email === loggedInUser.email)
  //   // }
  
  //   // Find the logged-in user's index
  //  // const existingQuizIndex = userTests.findIndex(data => data.email === loggedInUser.email);
  //   if (existingQuizIndex === -1) {
  //       console.error("Logged-in user not found in quiz data.");
  //       return; // Exit if the logged-in user isn't found
  //   }
  
  //   const currentUserRank = userTests[existingQuizIndex].rank;
  
  //   // Update the rank and score display
  //   const rankHeading = document.getElementById("rankDisplay");
  //   rankHeading.textContent = `Wow! Your rank is #${userTests[existingQuizIndex].rank}`;
  
  //   const rankScore = document.getElementById("rankScore");
  //   rankScore.textContent = `Your score is: ${userTests[existingQuizIndex].score}`;
  
  //   // 1st Ranker
  //   const firstRankerScore = userTests[0].score;
  //   const first = document.getElementById("first");
  //   const firstName = document.getElementById("firstName");
  //   first.textContent = firstRankerScore;
  //   firstName.textContent = userTests[0].username;
  
  //   // 2nd Ranker
  //   const secondRankerScore = userTests[1].score;
  //   const second = document.getElementById("second");
  //   const secondName = document.getElementById("secondName");
  //   second.textContent = secondRankerScore;
  //   secondName.textContent = userTests[1].username;
  
  //   // 3rd Ranker
  //   const thirdRankerScore = userTests[2].score;
  //   const third = document.getElementById("third");
  //   const thirdName = document.getElementById("thirdName");
  //   third.textContent = thirdRankerScore;
  //   thirdName.textContent = userTests[2].username;
  
  //   // Get the containers for current user and other users
  //   const currentUserDiv = document.querySelector(".ranking-score"); // Assuming rank-item for logged-in user
  //   const otherUsersContainer = document.querySelector(".rankList");
  
  //   // Hide current user div initially
  //   currentUserDiv.style.display = "none";
  //   let htmlContent = "";
  
  //   // Show logged-in user data if rank is > 3
  //   if (currentUserRank > 3) {
  //       currentUserDiv.style.display = "flex"; // Show current user div if their rank is > 3
  //       // currentUserDiv.style.display="flex";
  //       const currentUserRankDiv = currentUserDiv.querySelector(".currentUserRank");
  //       const currentUserNameDiv = currentUserDiv.querySelector(".currentUserName");
  //       const currentUserScoreDiv = currentUserDiv.querySelector(".currentUserScore");
  
  //       //currentUserRankDiv.textContent = `#${userTests[existingQuizIndex].rank}`;
  //       currentUserRankDiv.textContent = `#${currentUserRank}`;
  //       currentUserNameDiv.textContent = userTests[existingQuizIndex].username;
  //       currentUserScoreDiv.textContent = userTests[existingQuizIndex].score;
  
  //       // Now display other users from rank 4 onwards
  //       for (let i = 3; i < 6 && i < userTests.length; i++) {
  //           if (userTests[i].email === userTests[existingQuizIndex].email) {
  //             i=i+1;
  //               // continue; // Skip the current logged-in user
  //           }
  
  //           htmlContent += `
  //               <div class="rank-item">
  //                   <div style="display: flex; justify-content: space-evenly;">
  //                       <p class="currentUserRank">#${userTests[i].rank}</p>
  //                       <span class="currentUserName">${userTests[i].username}</span>
  //                   </div>
  //                   <p class="currentUserScore">${userTests[i].score}</p>
  //               </div>
  //           `;
  //       }
  
  //       // Set the inner HTML of the container
  //       otherUsersContainer.innerHTML = htmlContent;
  
  //   } else {
  //       // If user rank is 3 or less, show their rank directly and other users below them
  //       if (!otherUsersContainer) {
  //           console.error("Error: .rankList not found in the DOM.");
  //           return;
  //       }
  
  //       // Display other users' data from rank 4 onward
  //       for (let i = 3; i < 6 && i < userTests.length; i++) {
  //           htmlContent += `
  //               <div class="rank-item">
  //                   <div style="display: flex; justify-content: space-evenly;">
  //                       <p class="currentUserRank">#${userTests[i].rank}</p>
  //                       <span class="currentUserName">${userTests[i].username}</span>
  //                   </div>
  //                   <p class="currentUserScore">${userTests[i].score}</p>
  //               </div>
  //           `;
  //       }
  
  //       // Set the inner HTML of the container
  //       otherUsersContainer.innerHTML = htmlContent;
  //   }
  // }
  
  function displayRank() {
    let userTests = JSON.parse(localStorage.getItem("userTests")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!loggedInUser || userTests.length === 0) {
      console.error("No user data found.");
      return; // Exit the function if there is no logged in user or no quiz data
    }
  
    // Call the sortAndRankFunction to sort the userTests array and assign ranks
    sortAndRank(userTests);
  
    // Find the logged-in user's index
    const existingQuizIndex = userTests.findIndex(
      (data) => data.email === loggedInUser.email
    );
    if (existingQuizIndex === -1) {
      console.error("Logged-in user not found in quiz data.");
      return; // Exit if the logged-in user isn't found
    }
  
    const currentUserRank = userTests[existingQuizIndex].rank;
  
    // Update the rank and score display
    const rankHeading = document.getElementById("rankDisplay");
    rankHeading.textContent = `Wow! Your rank is #${userTests[existingQuizIndex].rank}`;
  
    const rankScore = document.getElementById("rankScore");
    rankScore.textContent = `Your score is: ${userTests[existingQuizIndex].score}`;
  
    // 1st Ranker
    const firstRankerScore = userTests[0].score;
    const first = document.getElementById("first");
    const firstName = document.getElementById("firstName");
    first.textContent = firstRankerScore;
    firstName.textContent = userTests[0].username;
  
    // 2nd Ranker
    const secondRankerScore = userTests[1].score;
    const second = document.getElementById("second");
    const secondName = document.getElementById("secondName");
    second.textContent = secondRankerScore;
    secondName.textContent = userTests[1].username;
  
    // 3rd Ranker
    const thirdRankerScore = userTests[2].score;
    const third = document.getElementById("third");
    const thirdName = document.getElementById("thirdName");
    third.textContent = thirdRankerScore;
    thirdName.textContent = userTests[2].username;
  
    // Get the containers for current user and other users
    const currentUserDiv = document.querySelector(".rankList "); // Assuming rank-item for logged-in user
    const otherUsersContainer = document.querySelector(".rank-item");
  
    // Hide current user div initially
    currentUserDiv.style.display = "none";
    let htmlContent = "";
  
    // Show logged-in user data if rank is > 3
    if (currentUserRank > 3) {
      currentUserDiv.style.display = "inline"; // Show current user div if their rank is > 3
      otherUsersContainer.style.display = "block";
  
      const currentUserRankDiv = document.querySelector(".currentUserRank");
      const currentUserNameDiv = document.querySelector(".currentUserName");
      const currentUserScoreDiv = document.querySelector(".currentUserScore");
  
      currentUserRankDiv.textContent = `#${currentUserRank}`;
      // currentUserRankDiv.textContent = `#${userTests[existingQuizIndex].rank}`;
      currentUserNameDiv.textContent = userTests[existingQuizIndex].username;
      currentUserScoreDiv.textContent = userTests[existingQuizIndex].score;
  
      // Now display other users from rank 4 onwards
  
      htmlContent += `
            <div class="rank-item">
                <div style="display: flex; justify-content: space-evenly;">
                    <p class="currentUserRank">#${userTests[existingQuizIndex].rank}</p>
                    <span class="currentUserName">${userTests[existingQuizIndex].username}</span>
                </div>
                <p class="currentUserScore">${userTests[existingQuizIndex].score}</p>
            </div>
        `;
  
      // Set the inner HTML of the container
      otherUsersContainer.innerHTML = htmlContent;
    }
    // If user rank is 3 or less, show their rank directly and other users below them
    // const otherUsersContainer = document.querySelector(".rankList");
    // if (!otherUsersContainer) {
    //   console.error("Error: .rankList not found in the DOM.");
    //   return;
    // }
  
    // Display other users' data from rank 4 onward
    for (let i = 3; i < 6 && i < userTests.length; i++) {
      // if (userTests[i].email === userTests[existingQuizIndex].email) {
      //   i=i+1; // Skip the current logged-in user
      // }
      htmlContent += `
                <div class="rank-item">
                    <div style="display: flex; justify-content: space-evenly;">
                        <p class="currentUserRank">#${userTests[i].rank}</p>
                        <span class="currentUserName">${userTests[i].username}</span>
                    </div>
                    <p class="currentUserScore">${userTests[i].score}</p>
                </div>
            `;
    }
  
    // Set the inner HTML of the container
    otherUsersContainer.innerHTML = htmlContent;
  }
  