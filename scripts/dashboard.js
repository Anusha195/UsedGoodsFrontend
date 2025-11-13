function loadDashboardUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || !user) {
    window.location.href = "../index.html";
    return;
  }

  document.getElementById("welcomeText").innerText =
    "Welcome, " + user.username;

  loadProducts();
}

function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("show");
  document.getElementById("overlay").classList.toggle("show");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}

function loadProducts() {
  fetch("../db.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("productGrid");
      grid.innerHTML = "";
      data.products.forEach(p => {
        grid.innerHTML += `
          <div class="item-card" onclick="viewDetails(${p.id})">
            <img src="../${p.image}" />
            <h4>${p.name}</h4>
            <p>₹${p.price.toLocaleString()}</p>
          </div>`;
      });
    });
}

function goToPostItem() {
  window.location.href = "post-item.html";  
}


function viewDetails(id) {
  window.location.href = `item-details.html?id=${id}`;
}