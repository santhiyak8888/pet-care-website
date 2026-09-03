/* =========================
   PetCare - Interactions
   ========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const cartCount = document.getElementById("cartCount");
const year = document.getElementById("year");

let cart = 0;

/* Mobile menu */
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

/* Close mobile menu after navigation */
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

/* Smooth-scroll buttons */
document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.scroll);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* Simple cart interaction */
document.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", () => {
        cart++;
        cartCount.textContent = cart;

        showToast(`${button.dataset.product} added to your bag.`);
        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "Add to bag";
        }, 1200);
    });
});

/* Cart button */
document.getElementById("cartButton").addEventListener("click", () => {
    if (cart === 0) {
        showToast("Your bag is empty — pick something you love.");
    } else {
        showToast(`You have ${cart} item${cart > 1 ? "s" : ""} in your bag.`);
    }
});

/* Toast message */
function showToast(message) {
    let toast = document.querySelector(".toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

/* Scroll reveal */
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

/* Active navigation link while scrolling */
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
});

/* Footer year */
year.textContent = new Date().getFullYear();
