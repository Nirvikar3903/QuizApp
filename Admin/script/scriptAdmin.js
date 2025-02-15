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
    <tr class="test-header">
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

    // **Create Question Row**
    const row = document.createElement("tr");

    // **Create Table Cell for the Question Card**
    const questionCardCell = document.createElement("td");
    questionCardCell.colSpan = 3; // Span all columns

    // **Create Question Card**
    const questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    questionCard.innerHTML = `
      <h4 class="question-title">Question ${index + 1}: ${questionObj.question}</h4>
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
            <span>Option ${id}</span> 
            <div class="option ${optionClass}">
              <div>${text}</div>
              ${optionClass === "wrong" ? '<span class="icon">✖</span>' : ""}
              ${optionClass === "correct" ? '<span class="icon">✔</span>' : ""}
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

  // Append table body to table
  table.appendChild(tbody);
  testContainer.appendChild(table);
}





document.addEventListener("DOMContentLoaded", function () {
  // for every page
  if (window.location.pathname === "/Admin/users.html") {
    displayUsersList();
  } else if (window.location.pathname === "/Admin/usersTestDetails.html") {
    displayUsersTest();
  } else if (window.location.pathname === "/Admin/userTests.html") {
    displayUsersTests();
  }
});
