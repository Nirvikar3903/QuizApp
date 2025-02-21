const sideBar = document.getElementById("side-navbar");
const hamburger = document.getElementById("menu-toggle");
const home = document.getElementById("home");
const users = document.querySelector(".users");
const quizzes = document.querySelector(".quizzes");
const profilePhoto = document.querySelector(".profile-photo");
const popupContainer = document.getElementById("popup-container");
const logoutBtn = document.getElementById("logout-button");

hamburger.addEventListener("click", function () {
  if (sideBar.style.display === "none") {
    sideBar.style.display = "flex";
  } else {
    sideBar.style.display = "none";
  }
  hamburger.classList.toggle("spin");
});

/*********************************** adminlogin *******************************/
function logout() {
  window.location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const profilePhoto = document.querySelector('.profile-photo');
  const popupContainer = document.getElementById('popup-container');
  const logoutBtn = document.getElementById('logout-button');

  // Hide the popup container initially using its class
  popupContainer.classList.add('hidden');

  profilePhoto.addEventListener('click', () => {
    popupContainer.classList.toggle('hidden');
  });

  logoutBtn.addEventListener('click', () => {
    popupContainer.classList.add('hidden');
    logout();
  })

})




/*********************************** Routing *******************************/

document.addEventListener("DOMContentLoaded", function () {
  // for every page
  if (window.location.pathname === "/Admin/users.html") {
    displayUsersList();
  } else if (window.location.pathname === "/Admin/usersTestDetails.html") {
    displayUsersTest();
  } else if (window.location.pathname === "/Admin/userTests.html") {
    displayUsersTests();
  } else if (window.location.pathname === "/Admin/quizzes.html") {
    displayAllQuestions();
  }
});

function checkRequiredFields(prefix = "") {
  var question = document.getElementById(prefix + "question").value;
  var option1 = document.getElementById(prefix + "option1").value;
  var option2 = document.getElementById(prefix + "option2").value;
  var option3 = document.getElementById(prefix + "option3").value;
  var option4 = document.getElementById(prefix + "option4").value;

  if (!question || !option1 || !option2 || !option3 || !option4) {
    alert("Please fill all required fields");
    return false;
  }
  return true;
}

function loadQuestions() {
  let questions = JSON.parse(localStorage.getItem("defaultQuestions"));
  return questions || [];
}

function saveQuestions(question) {
  let questions = JSON.parse(localStorage.getItem("defaultQuestions")) || [];
  questions.push(question);
  localStorage.setItem("defaultQuestions", JSON.stringify(questions));
}
/*********************************** Display Questions ************************************/

function displayAllQuestions() {
  let questions = loadQuestions();
  let tableBody = document.getElementById("question-table-container");
  tableBody.innerHTML = ""; // Clear existing content

  questions.slice(0, 21).forEach((question, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
          <td style = "text-align:center">${index + 1}</td>
          <td>${escapeHtml(question.question)}</td>
          <td>
              <i class="fa fa-eye view-icon" data-id="${question.id}" style="color:blue"></i>
              <i class="fa fa-pencil edit-icon" data-id="${question.id}" style="color:green"></i>
              <i class="fa fa-trash delete-icon" data-id="${question.id}" style="color:red"></i>
          </td>
      `;

    tableBody.appendChild(row);
  });

  attachViewListeners();
  attachEditListeners();
  attachDeleteListeners();
}

function attachViewListeners() {
  document.querySelectorAll(".view-icon").forEach((eyeButton) => {
    eyeButton.addEventListener("click", function () {
      let questionId = this.dataset.id; 
      showQuestionPopup(questionId);
    });
  });
}


function showQuestionPopup(questionId) {
  // Retrieve all questions from local storage
  let questions = JSON.parse(localStorage.getItem("defaultQuestions")) || [];
  
  // Find the question that matches the given questionId
  let questionData = questions.find((q) => q.id === parseInt(questionId)); // Ensure id is an integer

  if (questionData) {
    // Update the popup with the question data
    document.getElementById("popup-question").textContent = questionData.question;
    document.getElementById("popup-option1").innerHTML = questionData.options[0].value;
    document.getElementById("popup-option2").innerHTML = questionData.options[1].value;
    document.getElementById("popup-option3").innerHTML = questionData.options[2].value;
    document.getElementById("popup-option4").innerHTML = questionData.options[3].value;

    // Display the correct answer (index is 1-based, so subtract 1 for zero-based index)
    document.getElementById("popup-correct-option").innerHTML = 
      questionData.options[questionData.answer - 1].value;

    // Show the popup container
    document.querySelector(".view-question-popup").style.display = "block";
  } else {
    console.error("Question not found for ID:", questionId); // Debugging message
  }
}
function closePopup() {
  document.querySelector(".view-question-popup").style.display = "none";
}
// Adding event listener to close the popup when "X" is clicked
document.querySelector(".cross").addEventListener("click", closePopup);


// ******************************* Edit Questions ********************************//

let editingQuestionId = null;

function editQuestion() {
  if (!checkRequiredFields("edit-")) return;

  let questions = loadQuestions();

  let question = document.getElementById("edit-question").value;
  let option1 = document.getElementById("edit-option1").value;
  let option2 = document.getElementById("edit-option2").value;
  let option3 = document.getElementById("edit-option3").value;
  let option4 = document.getElementById("edit-option4").value;
  let correctAnswer = parseInt(document.getElementById("edit-correct-option").value);

  var questionIndex = questions.findIndex(q => q.id === parseInt(editingQuestionId));
  
  if (questionIndex !== -1) {
    questions[questionIndex] = {
      // id: editingQuestionId,
      id: parseInt(editingQuestionId),
      question: question,
      options: [
        { id: 1, value: option1 },
        { id: 2, value: option2 },
        { id: 3, value: option3 },
        { id: 4, value: option4 },
      ],
      answer: correctAnswer
    };
    
    localStorage.setItem("defaultQuestions", JSON.stringify(questions));
    alert("Question updated successfully!");
    
    document.querySelector(".edit-question-popup").style.display = "none";
    
    displayAllQuestions(); // Refresh the table instead of reloading the page
  } else {
    alert("Error: Question not found!");
  }
}

function attachEditListeners() {
  document.querySelectorAll(".edit-icon").forEach((editButton) => {
    editButton.addEventListener("click", function () {
      let questionId = parseInt(this.dataset.id);
      showEditQuestionPopup(questionId);
    });
  });
}

function showEditQuestionPopup(questionId) {
  let questions = JSON.parse(localStorage.getItem("defaultQuestions"))|| [];

  let questionData = questions.find(q => q.id === parseInt(questionId));

  editingQuestionId = parseInt(questionId); // Store the question being edited

  if (questionData) {
    document.getElementById("edit-question").value = questionData.question;
    document.getElementById("edit-option1").value = questionData.options[0].value;
    document.getElementById("edit-option2").value = questionData.options[1].value;
    document.getElementById("edit-option3").value = questionData.options[2].value;
    document.getElementById("edit-option4").value = questionData.options[3].value;

    const selectElement = document.getElementById("edit-correct-option");
    selectElement.innerHTML = "";

    questionData.options.forEach((option, index) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.id;
      optionElement.text = option.value;
      selectElement.appendChild(optionElement);
    });


    // selectElement.selectedIndex = parseInt(questionData.answer) - 1;
    selectElement.value = questionData.answer;


    document.querySelector(".edit-question-popup").style.display = "block";
  }
}
function closeEditPopup() {
  document.querySelector(".edit-question-popup").style.display = "none";
}
document.querySelector(".crossed").addEventListener("click", closeEditPopup);

/******************************* Delete Question ********************************/

let deletingQuestionId = null; 

// Function to show the delete popup
function showDeleteQuestionPopup(questionId) {
  console.log("Question ID for deletion: ", questionId); // Debugging
  let popup = document.querySelector(".deletion-popup"); 
  deletingQuestionId = parseInt(questionId); 
    popup.style.display = "flex"; 
}

// Function to hide the delete popup
function cancelDeletion() {
  let popup = document.querySelector(".deletion-popup"); 
  if (popup) {
    console.log("Canceling deletion, hiding popup"); // Debugging
    popup.style.display = "none"; 
    
  }
}

// Function to delete the question
function deleteQuestion() {
  console.log("Deleting question with ID: ", deletingQuestionId); // Debugging
  let questions = loadQuestions(); 
  let questionIndex = questions.findIndex(q => q.id === parseInt(deletingQuestionId));

  if (questionIndex !== -1) {
    questions.splice(questionIndex, 1); // Remove the question from the array
    localStorage.setItem("defaultQuestions", JSON.stringify(questions)); 
    alert("Question deleted successfully!");

    cancelDeletion(); 
    displayAllQuestions(); 
  } else {
    alert("Error: Question not found!"); 
  }
}

// Function to attach delete event listeners to delete icons
function attachDeleteListeners() {
  console.log("Attaching delete listeners"); // Debugging
  document.querySelectorAll(".delete-icon").forEach((deleteButton) => {
    deleteButton.addEventListener("click", function () {
      let questionId = parseInt(this.dataset.id); 
      console.log("Delete button clicked for question ID: ", questionId); // Debugging
      showDeleteQuestionPopup(questionId); 
    });
  });
}

// Attach the delete listener to the cancel button inside the popup
document.querySelector("#cancel").addEventListener("click", cancelDeletion);




// ******************************* Create new Question ********************************//

function showCreateQuestionPopup(){
  document.querySelector(".create-question-popup").style.display="block";
}

function addNewQuestion() {

  

  let questions = loadQuestions();
  let questionText = document.getElementById("question").value;
  let option1 = document.getElementById("option1").value;
  let option2 = document.getElementById("option2").value;
  let option3 = document.getElementById("option3").value;
  let option4 = document.getElementById("option4").value;
  let correctAnswer = parseInt(document.getElementById("correct-option").value);

  let newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;

  let newQuestion = {
    id: newId,
    question: questionText,
    options: [
      { id: 1, value: option1 },
      { id: 2, value: option2 },
      { id: 3, value: option3 },
      { id: 4, value: option4 },
    ],
    answer: correctAnswer
  };
  

  questions.push(newQuestion);
  if (!checkRequiredFields()) return;
  localStorage.setItem("defaultQuestions", JSON.stringify(questions));

  alert("Question inserted successfully!");
  closeCreateQuestionPopup();
  displayAllQuestions(); // Refresh the question list
}

function closeCreateQuestionPopup() {
  document.querySelector(".create-question-popup").style.display = "none";

  // Clear input fields after closing the popup
  document.getElementById("question").value = "";
  document.getElementById("option1").value = "";
  document.getElementById("option2").value = "";
  document.getElementById("option3").value = "";
  document.getElementById("option4").value = "";
  document.getElementById("correct-option").value = "1"; // Reset to default
}

// Attach event listener for closing popup
document.querySelector(".cross-delete").addEventListener("click", closeCreateQuestionPopup);
document.getElementById("new-question").addEventListener("click" , showCreateQuestionPopup )

// *******************************Display Users********************************//

function displayUsersList() {
  const users = JSON.parse(localStorage.getItem("userTests")) || [];

  const tableBody = document.querySelector("#userTable tbody");

  tableBody.innerHTML = "";

  // Loop through users and create table rows
  users.forEach((user, index) => {
    const noOfTests = user.noOfTests || 0; // Number of tests given
    const latestScore = user.tests[user.tests.length - 1]?.score || 0; // Latest test score

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${noOfTests}</td>
      <td>${latestScore}</td>
      <td>
  <a 
    href="/Admin/usersTestDetails.html?email=${encodeURIComponent(user.email)}" 
    style="color: blue; text-decoration: none;" 
    onclick="displayUsersTestDetails(event, '${encodeURIComponent(
      user.email
    )}')">View Tests</a>
</td>

    `;

    // Append the row to the table
    tableBody.appendChild(row);
  });
}

function displayUsersTestDetails() {
  // Get email from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get("email");

  // Get all users from localStorage
  const users = JSON.parse(localStorage.getItem("userTests")) || [];

  // Find the user with the matching email
  const user = users.find((u) => u.email === userEmail);

  if (user) {
    // Display user's identity
    const identityDiv = document.querySelector(".identity");
    identityDiv.innerHTML = `<h2>${user.username}|${user.email}</h2>`;

    // Populate test details in the table
    const tableBody = document.querySelector("#user-test-details-table tbody");
    tableBody.innerHTML = ""; // Clear existing data

    user.tests.forEach((test, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${test.date}</td>
        <td>${test.score}</td>
        <td>${test.correctAnswers}</td>
        <td><a href="/Admin/userTests.html?email=${encodeURIComponent(
          user.email
        )}&testIndex=${index}" 
         style="color: blue; text-decoration: none;">View Test</a>
         </td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    // Display message if user not found
    document.querySelector(".identity").innerHTML = "<p>User not found!</p>";
  }
}

function escapeHtml(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function displayUsersTest() {
  // Get the email from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get("email");

  // Call the function and pass the email to it
  displayUsersTestDetails(null, userEmail);
}

function displayUsersTests() {
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get("email");
  const testIndex = parseInt(urlParams.get("testIndex"), 10);

  const users = JSON.parse(localStorage.getItem("userTests")) || [];
  const user = users.find((u) => u.email === userEmail);

  if (!user) {
    document.getElementById("user-test-data").innerHTML =
      "<p>User not found!</p>";
    return;
  }
  if (user) {
    // Display user's identity
    const identityDiv = document.querySelector(".identity");
    identityDiv.innerHTML = `<h2>${user.username}|${user.email}</h2>`;
  }

  const test = user.tests[testIndex];

  if (!test || !Array.isArray(test.questionsAnswered)) {
    document.getElementById("user-test-data").innerHTML =
      "<p>No questions available for this test.</p>";
    return;
  }

  const testContainer = document.getElementById("user-test-data");
  testContainer.innerHTML = ""; // Ensure a fresh display

  // **Create Table**
  const table = document.createElement("table");
  table.classList.add("test-table");

  // **Create Table Header Row**
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr id="test-header">
      <th>Test ${testIndex + 1}</th>
      <th>Score: ${test.score}</th>
      <th>Test Date: ${test.date}</th>
    </tr>
  `;
  table.appendChild(thead);

  // **Create Table Body**
  const tbody = document.createElement("tbody");

  // **Loop through questionsAnswered to create rows**
  test.questionsAnswered.forEach((questionObj, index) => {
    const isCorrect = questionObj.selectedAnswer === questionObj.correctAnswer;

    // Convert options object into an array
    const optionsArray = Object.entries(questionObj.options).map(
      ([key, value]) => ({
        id: Number(key),
        text: value,
      })
    );

    const row = document.createElement("tr");

    // **Create Table Cell for the Question Card**
    const questionCardCell = document.createElement("td");
    questionCardCell.colSpan = 3; // Span all columns

    // **Create Question Card**
    const questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    questionCard.innerHTML = `
      <h4 class="question-title">Question ${index + 1}: ${
      questionObj.question
    }</h4>
      <div class="options-container">
        ${optionsArray
          .map(({ id, text }) => {
            const isSelected = id === questionObj.selectedAnswer;
            const isCorrectOption = id === questionObj.correctAnswer;
            const optionClass = isSelected
              ? isCorrectOption
                ? "correct"
                : "wrong"
              : isCorrectOption && !isSelected
              ? "correct-answer"
              : "";

            return `
            <div class="bind-together">
              <div style="width:90px">Option ${id}</div> 
              <div style="display:flex ; justify-content: space-between" class="option ${optionClass}">
              <div>${escapeHtml(text)}</div>
              ${optionClass === "wrong" ? '<span class="icon">✖</span>' : ""}
              ${optionClass === "correct" ? '<span class="icon">✔</span>' : ""}
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    `;

    // Append question card inside the table cell
    questionCardCell.appendChild(questionCard);
    row.appendChild(questionCardCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  testContainer.appendChild(table);
}
