(function () {

    // =========================
    // FORM → WhatsApp (SAFE)
    // =========================
    var form = document.getElementById('quoteForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameEl = document.getElementById('name') || form.querySelector('input[type="text"]');
            var phoneEl = document.getElementById('phone') || form.querySelector('input[type="tel"]');
            var serviceEl = document.getElementById('service') || form.querySelector('select');
            var addressEl = document.getElementById('address') || form.querySelector('textarea');

            var name = nameEl ? nameEl.value.trim() : '';
            var phone = phoneEl ? phoneEl.value.trim() : '';
            var service = serviceEl ? serviceEl.value : '';
            var address = addressEl ? addressEl.value.trim() : '';

            var msg = encodeURIComponent(
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
    // REVEAL ANIMATION (SAFE)
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
    // LIGHTBOX (FIXED + SAFE)
    // =========================
    var lightbox = document.getElementById("lightbox");
    var lightboxImg =
        document.getElementById("lightboxImg") ||
        document.querySelector(".lightbox-img");

    var closeBtn =
        document.getElementById("lightboxClose") ||
        document.querySelector(".lightbox-close");

    var prevBtn =
        document.getElementById("lightboxPrev") ||
        document.querySelector(".lightbox-prev");

    var nextBtn =
        document.getElementById("lightboxNext") ||
        document.querySelector(".lightbox-next");

    var images = Array.from(document.querySelectorAll(".portfolio-grid img"));

    var currentIndex = 0;

    function openImage(index) {
        if (!lightbox || !lightboxImg) return;

        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightbox.classList.add("active");
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("active");
    }

    function next() {
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        openImage(currentIndex);
    }

    function prev() {
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openImage(currentIndex);
    }

    images.forEach(function (img, i) {
        img.addEventListener("click", function () {
            openImage(i);
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    if (lightbox) {
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener("keydown", function (e) {
        if (!lightbox || !lightbox.classList.contains("active")) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    });

})();
