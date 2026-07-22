// =========================
// Get HTML Elements
// =========================

const addProductBtn =
    document.getElementById("addproductbtn");

const addProductPage =
    document.getElementById("addproductpage");

const productImage =
    document.getElementById("productimage");

const productName =
    document.getElementById("productname");

const productCost =
    document.getElementById("productcost");

const sellingPrice =
    document.getElementById("sellingprice");

const saveProductBtn =
    document.getElementById("saveproductbtn");

const productList =
    document.getElementById("productlist");

const searchProduct =
    document.getElementById("searchproduct");


// =========================
// Load Products
// From LocalStorage
// =========================

let products =
    JSON.parse(
        localStorage.getItem("products")
    ) || [];


// =========================
// Hide Add Product Form
// =========================

addProductPage.style.display = "none";


// =========================
// Save Products
// To LocalStorage
// =========================

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// =========================
// Show Add Product Form
// =========================

addProductBtn.addEventListener(
    "click",
    function () {

        addProductPage.style.display =
            "block";

        addProductPage.scrollIntoView({

            behavior: "smooth"

        });

    }
);


// =========================
// Save New Product
// =========================

saveProductBtn.addEventListener(
    "click",
    function () {


        // Get Product Name

        const name =
            productName.value
                .trim();


        // Get Cost Price

        const cost =
            productCost.value;


        // Get Selling Price

        const selling =
            sellingPrice.value;


        // =========================
        // Check Required Fields
        // =========================

        if (
            name === "" ||
            cost === "" ||
            selling === ""
        ) {

            alert(
                "Please fill all product details!"
            );

            return;

        }


        // =========================
        // Convert Prices
        // =========================

        const costNumber =
            Number(cost);

        const sellingNumber =
            Number(selling);


        // =========================
        // Check Valid Prices
        // =========================

        if (
            costNumber < 0 ||
            sellingNumber < 0
        ) {

            alert(
                "Price cannot be negative!"
            );

            return;

        }


        // =========================
        // Create Product
        // =========================

        const product = {

            id: Date.now(),

            name: name,

            cost: costNumber,

            selling: sellingNumber,

            image: ""

        };


        // =========================
        // Check Product Image
        // =========================

        if (
            productImage.files.length > 0
        ) {


            const file =
                productImage.files[0];


            const reader =
                new FileReader();


            // =========================
            // Read Image
            // =========================

            reader.onload =
                function (event) {


                    product.image =
                        event.target.result;


                    // Add Product

                    products.push(
                        product
                    );


                    // Save Product

                    saveProducts();


                    // Display Products

                    displayProducts();


                    // Clear Form

                    clearForm();


                    alert(
                        "Product added successfully!"
                    );

                };


            reader.readAsDataURL(
                file
            );


        } else {


            // =========================
            // Add Product Without Image
            // =========================

            products.push(
                product
            );


            // Save Product

            saveProducts();


            // Display Products

            displayProducts();


            // Clear Form

            clearForm();


            alert(
                "Product added successfully!"
            );

        }

    }
);


// =========================
// Display All Products
// =========================

function displayProducts() {


    // Clear Product List

    productList.innerHTML =
        "<h2>Products</h2>";


    // =========================
    // Check Products
    // =========================

    if (
        products.length === 0
    ) {

        productList.innerHTML +=
            `
            <p class="no-product">
                No products added yet.
            </p>
            `;

        return;

    }


    // =========================
    // Display Every Product
    // =========================

    products.forEach(
        function (product) {


            // Create Card

            const productCard =
                document.createElement(
                    "div"
                );


            productCard.className =
                "product-card";


            // =========================
            // Product Image
            // =========================

            let imageHTML = "";


            if (
                product.image !== ""
            ) {

                imageHTML = `

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                    >

                `;

            }


            // =========================
            // Calculate Profit
            // =========================

            const profit =
                product.selling -
                product.cost;


            // =========================
            // Product Card HTML
            // =========================

            productCard.innerHTML = `

                ${imageHTML}

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Cost Price:
                    ₹${product.cost}
                </p>

                <p>
                    Selling Price:
                    ₹${product.selling}
                </p>

                <p>
                    Profit:
                    ₹${profit}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
                </button>

            `;


            // =========================
            // Add Card
            // To Product List
            // =========================

            productList.appendChild(
                productCard
            );

        }
    );

}


// =========================
// Delete Product
// =========================

function deleteProduct(id) {


    // =========================
    // Confirm Delete
    // =========================

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (
        !confirmDelete
    ) {

        return;

    }


    // =========================
    // Remove Product
    // =========================

    products =
        products.filter(
            function (product) {

                return (
                    product.id !== id
                );

            }
        );


    // =========================
    // Save Updated Products
    // =========================

    saveProducts();


    // =========================
    // Refresh Product List
    // =========================

    displayProducts();

}


// =========================
// Clear Product Form
// =========================

function clearForm() {


    productName.value = "";

    productCost.value = "";

    sellingPrice.value = "";

    productImage.value = "";


    // Hide Form

    addProductPage.style.display =
        "none";

}


// =========================
// Search Product
// =========================

searchProduct.addEventListener(
    "input",
    function () {


        // Get Search Text

        const searchText =
            searchProduct.value
                .toLowerCase()
                .trim();


        // =========================
        // Filter Products
        // =========================

        const filteredProducts =
            products.filter(
                function (product) {

                    return product.name
                        .toLowerCase()
                        .includes(searchText);

                }
            );


        // =========================
        // Display Search Results
        // =========================

        displayFilteredProducts(
            filteredProducts
        );

    }
);


// =========================
// Display Filtered Products
// =========================

function displayFilteredProducts(
    filteredProducts
) {


    // Clear Product List

    productList.innerHTML =
        "<h2>Products</h2>";


    // =========================
    // No Product Found
    // =========================

    if (
        filteredProducts.length === 0
    ) {

        productList.innerHTML +=
            `
            <p class="no-product">
                No product found.
            </p>
            `;

        return;

    }


    // =========================
    // Display Filtered Products
    // =========================

    filteredProducts.forEach(
        function (product) {


            // Create Product Card

            const productCard =
                document.createElement(
                    "div"
                );


            productCard.className =
                "product-card";


            // =========================
            // Product Image
            // =========================

            let imageHTML = "";


            if (
                product.image !== ""
            ) {

                imageHTML = `

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                    >

                `;

            }


            // =========================
            // Calculate Profit
            // =========================

            const profit =
                product.selling -
                product.cost;


            // =========================
            // Product Card
            // =========================

            productCard.innerHTML = `

                ${imageHTML}

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Cost Price:
                    ₹${product.cost}
                </p>

                <p>
                    Selling Price:
                    ₹${product.selling}
                </p>

                <p>
                    Profit:
                    ₹${profit}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
                </button>

            `;


            // Add Card

            productList.appendChild(
                productCard
            );

        }
    );

}


// =========================
// Load Products
// When Page Opens
// =========================

displayProducts();