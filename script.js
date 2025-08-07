const southIndianStates = ['tamil nadu', 'kerala', 'karnataka', 'andhra pradesh', 'telangana'];
let userCity = '';
let userState = '';
let comments = [];

function submitCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (city === '') {
    alert("Please enter a city.");
    return;
  }

  userCity = city;
  userState = getStateFromCity(city.toLowerCase());

  // Determine theme
  const now = new Date();
  const hour = now.getHours();
  const isSouth = southIndianStates.includes(userState.toLowerCase());

  if (hour >= 10 && hour <= 12 && isSouth) {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  } else {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';
  }

  // Simulate OTP
  
  if (isSouth) {
    alert("OTP sent to your Email.");
  } else {
    alert("OTP sent to your Mobile Number.");
  }

  document.getElementById("mainContent").style.display = "block";
  document.getElementById("cityPrompt").style.display = "none";
}

// Dummy city-state mapping
function getStateFromCity(city) {
  const map = {
    'chennai': 'tamil nadu',
    'coimbatore': 'tamil nadu',
    'madurai': 'tamil nadu',
    'kochi': 'kerala',
    'trivandrum': 'kerala',
    'bangalore': 'karnataka',
    'mysore': 'karnataka',
    'hyderabad': 'telangana',
    'vijayawada': 'andhra pradesh',
    'vizag': 'andhra pradesh',
    'delhi': 'delhi',
    'mumbai': 'maharashtra',
    'kolkata': 'west bengal'
  };
  return map[city] || 'other';
}

// Video quality switcher
document.getElementById("qualitySelector").addEventListener("change", function () {
  const quality = this.value;
  const videoPlayer = document.getElementById("videoPlayer");
  videoPlayer.src = `video_${quality}p.mp4`;
  videoPlayer.load();
  videoPlayer.play();
});

// Comment functions
function addComment() {
  const input = document.getElementById("commentInput").value.trim();
  const specialCharRegex = /[^a-zA-Z0-9\s.,?!]/;
  if (specialCharRegex.test(input)) {
    alert("Special characters not allowed.");
    return;
  }
  if (input === '') return;

  const comment = {
    text: input,
    likes: 0,
    dislikes: 0,
    city: userCity
  };
  comments.push(comment);
  document.getElementById("commentInput").value = '';
  renderComments();
}

function renderComments() {
  const container = document.getElementById("comments");
  container.innerHTML = '';

  comments.forEach((comment, index) => {
    if (comment.dislikes >= 2) return;

    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${comment.city}:</strong> ${comment.text}</p>
      <button onclick="likeComment(${index})">👍 ${comment.likes}</button>
      <button onclick="dislikeComment(${index})">👎 ${comment.dislikes}</button>
      <button onclick="translateComment(${index})">🌐 Translate</button>
    `;
    container.appendChild(div);
  });
}

function likeComment(index) {
  comments[index].likes++;
  renderComments();
}

function dislikeComment(index) {
  comments[index].dislikes++;
  renderComments();
}

function translateComment(index) {
  // Dummy translation
  const translated = "[Translated] " + comments[index].text;
  alert(translated);
}
