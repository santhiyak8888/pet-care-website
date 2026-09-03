/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});


/* Close mobile menu after selecting a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");

    });

});


/* =========================================
   CART
========================================= */

let cartCount = 0;

const cartCounter = document.getElementById("cartCount");

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartCounter.textContent = cartCount;

        /* Small success animation */

        button.innerHTML =
            '<i class="fa-solid fa-check"></i>';

        button.style.transform = "scale(1.15)";

        setTimeout(() => {

            button.innerHTML =
                '<i class="fa-solid fa-plus"></i>';

            button.style.transform = "";

        }, 900);

    });

});


/* =========================================
   WISHLIST
========================================= */

document.querySelectorAll(".wishlist").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const icon = button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

    });

});


/* =========================================
   SEARCH
========================================= */

const searchButton =
    document.querySelector(".icon-btn");

const searchModal =
    document.getElementById("searchModal");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const searchMessage =
    document.getElementById("searchMessage");


searchButton.addEventListener("click", () => {

    searchModal.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 100);

});


closeSearch.addEventListener("click", () => {

    searchModal.classList.remove("active");

});


/* Close search when clicking outside */

searchModal.addEventListener("click", event => {

    if (event.target === searchModal) {

        searchModal.classList.remove("active");

    }

});


/* Simple product search */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    let found = false;

    products.forEach(product => {

        const name =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();

        if (!search || name.includes(search)) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";

        }

    });


    if (search && !found) {

        searchMessage.textContent =
            "No matching product found.";

    } else {

        searchMessage.textContent = "";

    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        searchModal.classList.remove("active");

        navLinks.classList.remove("active");

    }

});
