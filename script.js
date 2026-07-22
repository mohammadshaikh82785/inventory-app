// =========================
// Get HTML Elements
// =========================

const addProductBtn = document.getElementById("addproductbtn");
const addProductPage = document.getElementById("addproductpage");
const productImage = document.getElementById("productimage");
const productName = document.getElementById("productname");
const productCost = document.getElementById("productcost");
const sellingPrice = document.getElementById("sellingprice");
const saveProductBtn = document.getElementById("saveproductbtn");
const productList = document.getElementById("productlist");
const searchProduct = document.getElementById("searchproduct");

// =========================
// Load Products
// =========================

let products = JSON.parse(localStorage.getItem("products")) || [];

// Hide Form

addProductPage.style.display = "none";

// =========================
// Save Products
// =========================

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// =========================
// Clear Form
// =========================

function clearForm() {
    productName.value = "";
    productCost.value = "";
    sellingPrice.value = "";
    productImage.value = null;

    addProductPage.style.display = "none";
}

// =========================
// Show Add Product Form
// =========================

addProductBtn.addEventListener("click", () => {

    clearForm();

    addProductPage.style.display = "block";

    addProductPage.scrollIntoView({
        behavior: "smooth"
    });

});

// =========================
// Save Product
// =========================

saveProductBtn.addEventListener("click", () => {

    const name = productName.value.trim();
    const cost = Number(productCost.value);
    const selling = Number(sellingPrice.value);

    if (!name || productCost.value === "" || sellingPrice.value === "") {
        alert("Please fill all product details!");
        return;
    }

    if (cost < 0 || selling < 0) {
        alert("Price cannot be negative!");
        return;
    }

    const product = {
        id: Date.now(),
        name,
        cost,
        selling,
        image: ""
    };

    // With Image

    if (productImage.files.length > 0) {

        const reader = new FileReader();

        reader.onload = (e) => {

            product.image = e.target.result;

            products.push(product);

            saveProducts();

            displayProducts();

            clearForm();

            alert("Product added successfully!");

        };

        reader.readAsDataURL(productImage.files[0]);

    } else {

        products.push(product);

        saveProducts();

        displayProducts();

        clearForm();
        // =========================
// Display Products
// =========================

function displayProducts() {

    productList.innerHTML = "<h2>Products</h2>";

    if (products.length === 0) {

        productList.innerHTML += `
            <p class="no-product">
                No products added yet.
            </p>
        `;

        return;
    }

    products.forEach((product) => {

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const profit = product.selling - product.cost;

        productCard.innerHTML = `
            ${product.image ? `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >
            ` : ""}

            <h3>${product.name}</h3>

            <p>Cost Price: ₹${product.cost}</p>

            <p>Selling Price: ₹${product.selling}</p>

            <p>Profit: ₹${profit}</p>

            <button
                class="delete-btn"
                onclick="deleteProduct(${product.id})"
            >
                Delete
            </button>
        `;

        productList.appendChild(productCard);

    });

}

// =========================
// Delete Product
// =========================

function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    products = products.filter(product => product.id !== id);

    saveProducts();

    displayProducts();

}
        // =========================
// Search Product
// =========================

searchProduct.addEventListener("input", () => {

    const searchText = searchProduct.value
        .toLowerCase()
        .trim();

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText)
    );

    displayFilteredProducts(filteredProducts);

});

// =========================
// Display Filtered Products
// =========================

function displayFilteredProducts(filteredProducts) {

    productList.innerHTML = "<h2>Products</h2>";

    if (filteredProducts.length === 0) {

        productList.innerHTML += `
            <p class="no-product">
                No product found.
            </p>
        `;

        return;
    }

    filteredProducts.forEach((product) => {

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const profit = product.selling - product.cost;

        productCard.innerHTML = `
            ${product.image ? `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >
            ` : ""}

            <h3>${product.name}</h3>

            <p>Cost Price: ₹${product.cost}</p>

            <p>Selling Price: ₹${product.selling}</p>

            <p>Profit: ₹${profit}</p>

            <button
                class="delete-btn"
                onclick="deleteProduct(${product.id})"
            >
                Delete
            </button>
        `;

        productList.appendChild(productCard);

    });

}

// =========================
// Load Products
// =========================

displayProducts();
