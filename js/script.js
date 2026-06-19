document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       CURSOR GLOW
    ========================== */

    const glow = document.getElementById("cursor-glow");

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animateGlow() {

        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        if (glow) {

            glow.style.left = currentX + "px";
            glow.style.top = currentY + "px";

        }

        requestAnimationFrame(animateGlow);

    }

    animateGlow();

    /* ==========================
       SCROLL REVEAL
    ========================== */

    const hiddenElements = document.querySelectorAll(
        ".overview-card, .featured-card, .timeline-item, .stat-card, .reflection-card, .certificate-card"
    );

    hiddenElements.forEach(el => {
        el.classList.add("hidden");
    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    hiddenElements.forEach(el => {
        observer.observe(el);
    });

    /* ==========================
       ACTIVE NAVIGATION
    ========================== */

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

    /* ==========================
       FLOATING CARDS
    ========================== */

    const cards = document.querySelectorAll(".overview-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -8;
            const rotateY = ((x / rect.width) - 0.5) * 8;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        });

    });

    /* ==========================
       HERO FADE IN
    ========================== */

    const hero = document.querySelector(".hero-content");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(40px)";

        setTimeout(() => {

            hero.style.transition = "all 1s ease";
            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";

        }, 300);

    }

    console.log("✨ MiPortfolio Loaded");

});

/* ==========================
   CERTIFICATE POPUP
========================== */

function openModal(imageSrc) {

    const modal = document.getElementById("certificateModal");
    const image = document.getElementById("modalImage");

    modal.style.display = "flex";
    image.src = imageSrc;

}

function closeModal() {

    document.getElementById("certificateModal")
    .style.display = "none";

}

window.addEventListener("click", (e) => {

    const modal = document.getElementById("certificateModal");

    if (e.target === modal) {

        modal.style.display = "none";

    }

});