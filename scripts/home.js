fetch("db.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("itemGrid");
    data.products.forEach(item => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onclick="viewDetails(${item.id})">
        <div class="info">
          <h4>${item.name}</h4>
          <p>₹${item.price.toLocaleString()}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  });

function viewDetails(id) {
  window.location.href = `views/item-details.html?id=${id}`;
}


function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("show");

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  const firstInput = modal.querySelector("input");
  if (firstInput) firstInput.focus();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("show");

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

window.addEventListener("click", function (event) {
  document.querySelectorAll(".modal.show").forEach(modal => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.show").forEach(modal => closeModal(modal.id));
  }
});

function handleRegister(e) {
  e.preventDefault();

  const username = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const pw = document.getElementById("password").value;
  const cpw = document.getElementById("confirmPassword").value;

  if (pw !== cpw) {
    alert("Passwords do not match.");
    return;
  }
  let users = JSON.parse(localStorage.getItem("userdetails")) || [];

  if (users.some(u => u.email === email)) {
    alert("Email already exists! Please login.");
    return;
  }

  users.push({
    username,
    email,
    password: pw
  });

  localStorage.setItem("userdetails", JSON.stringify(users));

  alert("Registration successful! Please login now.");
  closeModal("registerModal");
}


function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("userdetails")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Login successful!");

  closeModal("loginModal");

  window.location.href = "views/dashboard.html";
}


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal .close").forEach(btn => {
    btn.addEventListener("click", ev => {
      const modal = ev.target.closest(".modal");
      if (modal) closeModal(modal.id);
    });
  });
});
