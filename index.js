const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
  return `
   <div class="profile-box">
     <div class="top-section">
       <div class="left">
         <div class="avatar">
           <img alt="avatar" src="${profile.avatar_url}" />
         </div>
         <div class="self">
           <h1>${profile.name || "No Name Provided"}</h1>
           <h1>@${profile.login}</h1>
         </div>
       </div>
       <a href="${profile.html_url}" target="_blank">
         <button class="primary-btn">Check Profile</button>
       </a>
     </div>

     <div class="about">
       <h2>About</h2>
       <p>${profile.bio || "No bio available"}</p>
     </div>
     <div class="status">
       <div class="status-item">
         <h3>Followers</h3>
         <p>${profile.followers}</p>
       </div>
       <div class="status-item">
         <h3>Following</h3>
         <p>${profile.following}</p>
       </div>
       <div class="status-item">
         <h3>Repos</h3>
         <p>${profile.public_repos}</p>
       </div>
     </div>
   </div>
   `;
};

const fetchProfile = async () => {
  const username = searchInputEl.value.trim(); // Trim to avoid empty spaces
  if (!username) {
    loadingEl.innerText = "Please enter a valid GitHub username!";
    loadingEl.style.color = "red";
    profileContainerEl.innerHTML = "";
    return;
  }

  loadingEl.innerText = "Loading...";
  loadingEl.style.color = "black";

  try {
    const res = await fetch(`${url}/${username}`); // Fixed fetch syntax
    const data = await res.json();
    
    if (res.ok) {
      loadingEl.innerText = "";
      profileContainerEl.innerHTML = generateProfile(data);
    } else {
      loadingEl.innerText = data.message || "User not found!";
      loadingEl.style.color = "red";
      profileContainerEl.innerHTML = "";
    }
  } catch (error) {
    console.error({ error });
    loadingEl.innerText = "An error occurred. Please try again!";
    loadingEl.style.color = "red";
  }
};

searchButtonEl.addEventListener("click", fetchProfile);