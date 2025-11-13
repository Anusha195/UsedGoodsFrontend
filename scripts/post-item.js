// check user
function checkUser() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) window.location.href = "../index.html";
}

// SIDEBAR TOGGLE
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("show");
  document.getElementById("overlay").classList.toggle("show");
}

// CLOSE SIDEBAR ON OVERLAY CLICK
document.addEventListener("click", (e) => {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if (overlay.classList.contains("show") && e.target === overlay) {
    toggleMenu();
  }
});

// CLOSE ON ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    if (menu.classList.contains("show")) toggleMenu();
  }
});

// LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}
