document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const cartCountEl = document.getElementById("cartCount");
    const header = document.querySelector(".site-header");
    const year = document.getElementById("year");

    // Mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            menuToggle.innerHTML = open
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // Smooth-scroll buttons
    document.querySelectorAll("[data-scroll]").forEach(button => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.scroll);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Simple cart counter + toast feedback
    let cartCount = 0;
    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {
            cartCount += 1;
            if (cartCountEl) {
                cartCountEl.textContent = cartCount;
                cartCountEl.animate(
                    [{ transform: "scale(1)" }, { transform: "scale(1.35)" }, { transform: "scale(1)" }],
                    { duration: 300 }
                );
            }

            const originalText = button.textContent;
            button.textContent = "Added ✓";
            button.disabled = true;
            showToast(`${button.dataset.product} added to your bag.`);

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1100);
        });
    });

    function showToast(message) {
        let toast = document.querySelector(".toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.remove(), 2200);
    }

    // Scroll reveal
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("show"));
    }

    // Active navigation item while scrolling
    const sections = [...document.querySelectorAll("main section[id]")];
    const links = [...document.querySelectorAll("#navLinks a")];

    function updateActiveNav() {
        let current = "home";
        const marker = window.scrollY + 180;
        sections.forEach(section => {
            if (marker >= section.offsetTop) current = section.id;
        });
        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    }

    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 10);
        updateActiveNav();
    }, { passive: true });

    updateActiveNav();

    // Current year
    if (year) year.textContent = new Date().getFullYear();
});
