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

        // scroll-spy: mark the nav link of the section in the middle of the viewport
        var links = document.querySelectorAll('.nav-links a[href^="#"]');
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (a) {
                    if (entry.target.id && a.getAttribute('href') === '#' + entry.target.id) {
                        a.setAttribute('aria-current', 'true');
                    } else {
                        a.removeAttribute('aria-current');
                    }
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        // observe all sections so hero / unlinked sections clear the active link
        document.querySelectorAll('main > section').forEach(function (el) { spy.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }
})();
