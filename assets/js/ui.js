(function () {
    'use strict';

    var scrollUp = document.getElementById('scrollUp');
    var scrollDown = document.getElementById('scrollDown');

    if (scrollUp) {
        scrollUp.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (scrollDown) {
        scrollDown.addEventListener('click', function () {
            var contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    var form = document.getElementById('contact-form');
    var status = document.getElementById('formStatus');
    if (!form || !status) return;

    var email = document.getElementById('email');

    function setStatus(message, type) {
        status.textContent = message;
        status.className = 'form-status' + (type ? ' ' + type : '');
    }

    email.addEventListener('input', function () {
        email.removeAttribute('aria-invalid');
        if (status.textContent) setStatus('', '');
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var value = email.value.trim();
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

        if (!valid) {
            email.setAttribute('aria-invalid', 'true');
            setStatus("Merci d'indiquer une adresse email valide.", 'error');
            email.focus();
            return;
        }

        setStatus('Merci ! Votre message est prêt. Ce formulaire de démonstration ne transmet encore aucune donnée.', 'success');
        email.removeAttribute('aria-invalid');
        form.reset();
    });
})();
