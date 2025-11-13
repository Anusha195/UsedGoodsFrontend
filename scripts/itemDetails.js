const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

fetch("../db.json")
  .then(res => res.json())
  .then(data => {
    const product = data.products.find(p => p.id === productId);
    const container = document.getElementById("itemDetails");

    if (!product) {
      container.innerHTML = "<p>Item not found.</p>";
      return;
    }

    container.innerHTML = `
      <div class="details-content vertical">
        <div class="details-image">
          <img src="../${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info text-center">
          <h2>${product.name}</h2>
          <p class="desc">${product.description}</p>
          <p><strong>Price:</strong> ₹${product.price.toLocaleString()}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Posted by:</strong> ${product.seller}</p>
          <button class="btn btn-primary">Order Now</button>
        </div>
      </div>
    `;
  });
