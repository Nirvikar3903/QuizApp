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
  const firstRankerScore = userTests[0].score;
  const firstRankerUserName = userTests[0].username;

  const first = document.getElementById("first");
  const firstName = document.getElementById("firstName");

  first.textContent = firstRankerScore;
  firstName.textContent = firstRankerUserName;

  // 2nd Ranker
  const secondRankerScore = userTests[1].score;
  const secondRankerUserName = userTests[1].username;

  const second = document.getElementById("second");
  const secondName = document.getElementById("secondName");

  second.textContent = secondRankerScore;
  secondName.textContent = secondRankerUserName
  // 3rd Ranker
  const thirdRankerScore = userTests[2].score;
  const thirdRankerUserName = userTests[2].username;
  const third = document.getElementById("third");
  const thirdName = document.getElementById("thirdName");
  third.textContent = thirdRankerScore;
  thirdName.textContent = thirdRankerUserName

  if (loggedInUserRank > 3) {
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

