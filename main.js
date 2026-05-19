/* =========================
   FORM (WhatsApp)
========================= */
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

            var msg = encodeURIComponent(
                "Salut! Aș dori o ofertă.\n" +
                "Nume: " + name + "\n" +
                "Telefon: " + phone + "\n" +
                "Serviciu: " + service + "\n" +
                "Adresa: " + address
            );

            window.open(
                "https://wa.me/40764843411?text=" + msg,
                "_blank",
                "noopener"
            );
        });
    }

    /* =========================
       REVEAL ANIMATION
    ========================= */
    if ('IntersectionObserver' in window) {
        var items = document.querySelectorAll('.reveal');

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        items.forEach(function (el) {
            io.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }
})();


/* =========================
   LIGHTBOX (FIXED VERSION)
========================= */

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
