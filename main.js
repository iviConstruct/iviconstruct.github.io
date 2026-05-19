(function () {

    // =========================
    // FORM → WhatsApp
    // =========================
    var form = document.getElementById('quoteForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            var name = document.getElementById('name').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var service = document.getElementById('service').value;
            var address = document.getElementById('address').value.trim();

            var msg = encodeURIComponent(
                'Salut! Aș dori o ofertă.\n' +
                'Nume: ' + name + '\n' +
                'Telefon: ' + phone + '\n' +
                'Serviciu: ' + service + '\n' +
                'Adresa: ' + address
            );

            window.open('https://wa.me/40764843411?text=' + msg, '_blank', 'noopener');
        });
    }

    // =========================
    // REVEAL ANIMATION
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
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

   // =========================
// PORTFOLIO GALLERIES (FIXED)
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

function renderImage() {
    if (!currentGallery.length) return;
    lightboxImg.src = currentGallery[currentIndex];
}

function openLightbox(index = 0) {
    currentIndex = index;
    renderImage();
    lightbox.classList.add("active");
}

function closeLightbox() {
    lightbox.classList.remove("active");
}

function next() {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    renderImage();
}

function prev() {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    renderImage();
}

// click pe categorii
document.querySelectorAll(".portfolio-open").forEach((item) => {
    item.addEventListener("click", () => {
        const key = item.dataset.gallery;
        currentGallery = galleries[key] || [];

        if (!currentGallery.length) return;

        openLightbox(0);
    });
});

// controls
if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", next);
if (prevBtn) prevBtn.addEventListener("click", prev);

// click outside
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// keyboard
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
});
