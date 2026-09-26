// =========================
// SCROLL REVEAL
// =========================

const initScrollReveal = () => {

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-content, .service-card, .facility-card, .pricing-card, .gallery-item, .contact-item, .map-placeholder"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    // STAGGER CARDS

    const cardGroups = [
        ".services-grid .service-card",
        ".facilities-grid .facility-card",
        ".pricing-grid .pricing-card",
        ".gallery-grid .gallery-item",
        ".contact-info .contact-item"
    ];

    cardGroups.forEach((selector) => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.classList.remove("reveal");
            card.classList.add("reveal-stagger");

            card.style.animationDelay = `${index * 0.08}s`;

        });

    });


    // OBSERVE

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

};


// =========================
// HEADER + SCROLL PROGRESS
// =========================

const initScrollEffects = () => {

    const header = document.querySelector(".header");

    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.prepend(progressBar);

    let ticking = false;

    const update = () => {

        const scrollTop = window.scrollY;

        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

        progressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;

        header.classList.toggle("is-scrolled", scrollTop > 40);

        ticking = false;

    };

    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }

        },
        { passive: true }
    );

    window.addEventListener("resize", update);

    update();

};


// =========================
// ACTIVE NAV LINK
// =========================

const initActiveNav = () => {

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "is-active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );

                });

            });

        },
        {
            rootMargin: "-45% 0px -50% 0px"
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

};


// =========================
// START
// =========================

const initApp = () => {

    initScrollReveal();
    initScrollEffects();
    initActiveNav();

};

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initApp);

} else {

    initApp();

}