var sideBar = document.getElementById("side-navbar");
var hamburger = document.getElementById("menu-toggle");
var home = document.getElementById("home");
var users = document.querySelector(".users");
var quizzes = document.querySelector(".quizzes");

hamburger.addEventListener("click", function(){
    if(sideBar.style.display === "none")
    {
        sideBar.style.display = "flex";
    }
    else
    {
        sideBar.style.display = "none";
    }
    hamburger.classList.toggle("spin");
})

function logout()
{
  window.location.href="../login.html";
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
    });
})



function displayUsers() {
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('userTests')) || [];
  
  // Select the table body
  const tableBody = document.querySelector('#userTable tbody');
  
  // Clear existing rows
  tableBody.innerHTML = '';

  // Loop through users and create table rows
  users.forEach((user, index) => {
    const noOfTests = user.noOfTests || 0;  // Number of tests given
    const latestScore = user.tests[user.tests.length - 1]?.score || 0;  // Latest test score

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${noOfTests}</td>
      <td>${latestScore}</td>
      <td><a href="/Admin/userTests.html" style="color: blue; text-decoration: none;">View Tests</a></td>
    `;

    // Append the row to the table
    tableBody.appendChild(row);
  });
}

// Call displayUsers on page load
window.onload = displayUsers;

function displayUsersTest(){
  const identity = document.querySelector(".identity");

  identity = 
}