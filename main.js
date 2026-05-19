(function () {

    // =========================
    // FORM → WhatsApp
    // =========================
    const form = document.getElementById('quoteForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const name = document.getElementById('name')?.value.trim() || '';
            const phone = document.getElementById('phone')?.value.trim() || '';
            const service = document.getElementById('service')?.value || '';
            const address = document.getElementById('address')?.value.trim() || '';

            const msg = encodeURIComponent(
                'Salut! Aș dori o ofertă.\n' +
                'Nume: ' + name + '\n' +
                'Telefon: ' + phone + '\n' +
                'Serviciu: ' + service + '\n' +
                'Adresa: ' + address
            );

            window.open(
                'https://wa.me/40764843411?text=' + msg,
                '_blank',
                'noopener'
            );
        });
    }

    // =========================
    // REVEAL ANIMATION
    // =========================
    if ('IntersectionObserver' in window) {
        const items = document.querySelectorAll('.reveal');

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        items.forEach((el) => io.observe(el));

    } else {
        document.querySelectorAll('.reveal').forEach((el) => {
            el.classList.add('is-visible');
        });
    }

    // =========================
    // PORTFOLIO LIGHTBOX
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
    const img = document.getElementById("lightboxImg");

    if (!lightbox || !img) return;

    let current = [];
    let index = 0;

    function show() {
        if (!current.length) return;
        img.src = current[index];
    }

    document.querySelectorAll(".portfolio-open").forEach(el => {
        el.addEventListener("click", () => {
            const key = el.dataset.gallery;

            if (!galleries[key]) return;

            current = galleries[key];
            index = 0;

            show();
            lightbox.classList.add("active");
        });
    });

    const nextBtn = document.getElementById("lightboxNext");
    const prevBtn = document.getElementById("lightboxPrev");
    const closeBtn = document.getElementById("lightboxClose");

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (!current.length) return;
            index = (index + 1) % current.length;
            show();
        };
    }

    if (prevBtn) {
        prevBtn.onclick = () => {
            if (!current.length) return;
            index = (index - 1 + current.length) % current.length;
            show();
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            lightbox.classList.remove("active");
        };
    }

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", e => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") {
            lightbox.classList.remove("active");
        }

        if (e.key === "ArrowRight") {
            index = (index + 1) % current.length;
            show();
        }

        if (e.key === "ArrowLeft") {
            index = (index - 1 + current.length) % current.length;
            show();
        }
    });

})();
