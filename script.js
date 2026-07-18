"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initialiseMobileMenu();
    initialiseBackToTopButton();
    initialiseImageFallbacks();
});


/* =========================
   MOBILE MENU
========================= */

function initialiseMobileMenu() {
    const menuButton = document.querySelector("#menu-button");
    const navLinks = document.querySelector("#nav-links");

    if (!menuButton || !navLinks) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );
    });

    const links = navLinks.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}


/* =========================
   BACK TO TOP
========================= */

function initialiseBackToTopButton() {
    const button = document.querySelector("#back-to-top");

    if (!button) {
        return;
    }

    window.addEventListener("scroll", () => {
        button.classList.toggle(
            "visible",
            window.scrollY > 450
        );
    });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   IMAGE FALLBACKS
========================= */

function initialiseImageFallbacks() {
    const images = document.querySelectorAll(
        ".hero-image-card img, .activity-image img, .gallery-item img"
    );

    images.forEach((image) => {
        const container = image.parentElement;
        const fallback = container.querySelector(".image-fallback");

        function showImage() {
            image.style.display = "block";

            if (fallback) {
                fallback.style.display = "none";
            }
        }

        function showFallback() {
            image.style.display = "none";

            if (fallback) {
                fallback.style.display = "flex";
            }
        }

        image.addEventListener("load", showImage);
        image.addEventListener("error", showFallback);

        if (image.complete) {
            if (image.naturalWidth > 0) {
                showImage();
            } else {
                showFallback();
            }
        }
    });
}
