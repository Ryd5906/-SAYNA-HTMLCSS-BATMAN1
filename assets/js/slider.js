(function () {
    'use strict';

    var slider = document.getElementById('multimedia-slider');
    if (!slider) return;

    var track = slider.querySelector('.slider-track');
    var dotsContainer = slider.querySelector('.slider-dots');
    var prevButton = slider.querySelector('.slider-arrow.prev');
    var nextButton = slider.querySelector('.slider-arrow.next');

    var slides = [
        {
            image: './assets/Illustrations/Bathome_ba1.png',
            alt: 'Affiche de Batman Begins',
            kicker: 'BANDE-ANNONCE 01',
            title: 'Batman Begins',
            text: "Bruce Wayne quitte Gotham pour comprendre la peur, rejoint la Ligue des ombres puis revient affronter la corruption de sa ville. Le film qui a relancé la saga Batman au cinéma.",
            meta: '2005 · Christopher Nolan'
        },
        {
            image: './assets/Illustrations/Bathome_ba2.png',
            alt: 'Bande-annonce officielle de The Batman',
            kicker: 'BANDE-ANNONCE 02',
            title: 'The Batman',
            text: "Deux ans après ses premiers pas, Batman suit la trace du Riddler à travers un Gotham pluvieux et corrompu. Une enquête policière sombre, portée par une mise en scène très visuelle.",
            meta: '2022 · Matt Reeves'
        }
    ];

    var current = 0;

    function createSlide(slide, index) {
        var article = document.createElement('article');
        article.className = 'slide';
        article.setAttribute('role', 'group');
        article.setAttribute('aria-roledescription', 'slide');
        article.setAttribute('aria-label', (index + 1) + ' sur ' + slides.length);

        var media = document.createElement('div');
        media.className = 'slide-media';
        media.style.setProperty('--slide-bg', 'url("' + new URL(slide.image, document.baseURI).href + '")');

        var image = document.createElement('img');
        image.src = slide.image;
        image.alt = slide.alt;
        image.loading = index === 0 ? 'eager' : 'lazy';

        var badge = document.createElement('span');
        badge.className = 'slide-badge';
        badge.innerHTML = '<img src="./assets/Logos/icon_player.png" alt=""> Bande-annonce';

        media.appendChild(image);
        media.appendChild(badge);

        var content = document.createElement('div');
        content.className = 'slide-content';

        var kicker = document.createElement('p');
        kicker.className = 'slide-kicker';
        kicker.textContent = slide.kicker;

        var title = document.createElement('h2');
        title.textContent = slide.title;

        var text = document.createElement('p');
        text.className = 'slide-text';
        text.textContent = slide.text;

        var meta = document.createElement('p');
        meta.className = 'slide-meta';
        meta.textContent = slide.meta;

        content.appendChild(kicker);
        content.appendChild(title);
        content.appendChild(text);
        content.appendChild(meta);

        article.appendChild(media);
        article.appendChild(content);
        return article;
    }

    function createDot(index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Aller à la bande-annonce ' + (index + 1));
        dot.addEventListener('click', function () { goTo(index); });
        return dot;
    }

    slides.forEach(function (slide, index) {
        track.appendChild(createSlide(slide, index));
        dotsContainer.appendChild(createDot(index));
    });

    var dots = Array.prototype.slice.call(dotsContainer.children);
    var articles = Array.prototype.slice.call(track.children);

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';

        articles.forEach(function (article, i) {
            article.classList.toggle('is-active', i === current);
            article.setAttribute('aria-hidden', String(i !== current));
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === current);
            dot.setAttribute('aria-selected', String(i === current));
            dot.tabIndex = i === current ? 0 : -1;
        });
    }

    prevButton.addEventListener('click', function () { goTo(current - 1); });
    nextButton.addEventListener('click', function () { goTo(current + 1); });

    slider.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(current - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(current + 1);
        }
    });

    var touchStartX = null;
    slider.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', function (event) {
        if (touchStartX === null) return;
        var delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) {
            goTo(delta < 0 ? current + 1 : current - 1);
        }
        touchStartX = null;
    }, { passive: true });

    goTo(0);
})();
