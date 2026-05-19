(function () {

    // =========================
    // REVEAL
    // =========================
    if ('IntersectionObserver' in window) {
        var items = document.querySelectorAll('.reveal');

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        items.forEach(function (el) {
            io.observe(el);
        });
    }

    // =========================
    // PORTFOLIO LIGHTBOX (FIXED)
    // =========================

    const galleries = {
        baie: [
            "assets/portfolio/baie-la-cheie-1.jpg",
            "assets/portfolio/baie-la-cheie-2.jpg",
            "assets/portfolio/baie-la-cheie-3.jpg"
        ],
        amenajari: [
            "assets/portfolio/amenajari-interioare.jpg"
        ],
        gresie: [
            "assets/portfolio/gresie-faianta-1.jpg"
        ],
        renovare: [
            "assets/portfolio/apartament-renovare.jpg"
        ]
    };

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    let currentGallery = [];
    let currentIndex = 0;

    function openImage(index) {
        currentIndex = index;
        lightboxImg.src = currentGallery[currentIndex];
        lightbox.classList.add("active");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    function next() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        openImage(currentIndex);
    }

    function prev() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        openImage(currentIndex);
    }

    document.querySelectorAll(".portfolio-img").forEach((img) => {
        img.addEventListener("click", () => {
            const key = img.dataset.gallery;
            currentGallery = galleries[key] || [];
            openImage(0);
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    });

})();
