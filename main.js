(function () {
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

            var lines = [
                'Salut! Aș dori o ofertă.',
                'Nume: ' + name,
                'Telefon: ' + phone,
                'Serviciu: ' + service,
                'Adresa: ' + address
            ];
            var msg = encodeURIComponent(lines.join('\n'));
            window.open('https://wa.me/40764843411?text=' + msg, '_blank', 'noopener');
        });
    }

    if ('IntersectionObserver' in window) {
        var items = document.querySelectorAll('.reveal');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    entry.target.style.setProperty('--delay', (i % 6) * 80 + 'ms');
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(function (el) { io.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }
})();

const images = Array.from(document.querySelectorAll(".portfolio-item img"));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.add("active");
}

function closeLightbox() {
    lightbox.classList.remove("active");
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
});

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
const nextBtn = document.getElementById("lightboxNext");
const prevBtn = document.getElementById("lightboxPrev");

let currentGallery = [];
let currentIndex = 0;

document.querySelectorAll(".portfolio-open").forEach(item => {
    item.addEventListener("click", () => {
        const key = item.dataset.gallery;
        currentGallery = galleries[key] || [];
        currentIndex = 0;
        openImage();
    });
});

function openImage() {
    lightbox.style.display = "flex";
    lightboxImg.src = currentGallery[currentIndex];
}

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    openImage();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    openImage();
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
