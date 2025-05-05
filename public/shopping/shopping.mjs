// Array of product data (simulating server-provided data)
const PRODUCTS = [
  {
    name: "Elder Chocolate Truffles, 2oz",
    description: "The best of the best in chocolate truffles.",
    imageSrc: "https://placehold.co/200x200",
    price: 10,
    numInCart: 2,
  },
  {
    name: "Jelly Belly Jelly Beans, 100 count",
    description: "Not for planting.",
    imageSrc: "https://placehold.co/200x200",
    price: 5,
    numInCart: 1,
  },
  {
    name: "Kettle Chips, 8oz",
    description: "Delicious and unhealthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 3,
    numInCart: 0,
  },
  {
    name: "Carrots, 2lb",
    description: "Delicious and healthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 2,
    numInCart: 0,
  },
];

/**
 * Converts a product object into an HTML element.
 * @param {Object} product - product data
 * @return {HTMLElement} - HTML element representing the product card
 */
function renderProductCard(product) {
  const productCard = document.createElement("article");

  productCard.innerHTML = `
    <img src="${product.imageSrc}" alt="${product.name}">
    <div class="product-details">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
      <div>
        <button class="buy-button">Add to cart</button>
        <span class="num-in-cart">${product.numInCart} in cart</span>
      </div>
    </div>`;

  return productCard;
}

/**
 * Clears and repopulates the product list.
 */
function rerenderAllProducts() {
  const productList = document.querySelector("section.product-list");
  productList.innerHTML = "";

  const heading = document.createElement("h2");
  heading.innerText = "Search Results";
  productList.append(heading);

  PRODUCTS.forEach((product) => {
    const article = renderProductCard(product);
    const button = article.querySelector("button.buy-button");

    button.addEventListener("click", () => {
      product.numInCart++;
      rerenderAllProducts();
      rerenderCart();
    });

    if (shouldProductBeVisible(product)) {
      productList.append(article);
    }
  });
}

/**
 * Clears and repopulates the cart items section.
 */
function rerenderCart() {
  const cartItems = document.querySelector("div.cart-items");
  cartItems.innerHTML = "";

  PRODUCTS.forEach((product) => {
    if (product.numInCart > 0) {
      const item = document.createElement("p");
      const button = document.createElement("button");

      item.innerText = `${product.name} x${product.numInCart}`;
      button.classList.add("remove-button");
      button.innerText = "Remove";

      button.addEventListener("click", () => {
        product.numInCart = 0;
        rerenderAllProducts();
        rerenderCart();
      });

      cartItems.append(item);
      cartItems.append(button);
    }
  });
}

// Get price input filters
const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);

/**
 * Checks if a product passes current price filters.
 * @param {Object} product - product data
 * @return {boolean} - true if product should be visible
 */
function shouldProductBeVisible(product) {
  const min = parseFloat(minPriceInput.value);
  const max = parseFloat(maxPriceInput.value);

  // Show all products if both filters are empty
  if (isNaN(min) && isNaN(max)) return true;

  // Check against min and max if they are valid numbers
  if (!isNaN(min) && product.price < min) return false;
  if (!isNaN(max) && product.price > max) return false;

  return true;
}

// Initial rendering
rerenderAllProducts();
rerenderCart();