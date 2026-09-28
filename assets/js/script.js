/* ==========================================================================
   Dr. Sajib Khan — One Page Website
   File: assets/js/script.js
   Vanilla JavaScript (no framework). Safe for WordPress enqueue later.
   ========================================================================== */

(function () {
    'use strict';

    /* ------------------------------------------------------------------
       Config
    ------------------------------------------------------------------ */
    var CONFIG = {
        headerSelector: '#drHomeHeader',
        headerScrolledClass: 'dr-home-header--scrolled',
        progressBarSelector: '#drHomeProgressBar',
        scrollOffset: 96,        // fallback offset when a section is focused
        backToTopThreshold: 380, // px
        aos: {
            duration: 800,
            once: true,
            offset: 80
        }
    };

    /* Placeholder used when an image file is missing (keeps the layout clean) */
    var IMAGE_PLACEHOLDER = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
        '<rect width="600" height="400" fill="#E6F2EC"/>' +
        '<text x="300" y="205" font-size="22" fill="#006A4E" text-anchor="middle" ' +
        'font-family="sans-serif">ছবি যোগ করা হবে</text></svg>'
    );

    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------------
       Helpers
    ------------------------------------------------------------------ */
    function $(selector, scope) {
        return (scope || document).querySelector(selector);
    }

    function $$(selector, scope) {
        return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    }

    function getBootstrapModal(elementId) {
        if (typeof window.bootstrap === 'undefined' || !elementId) {
            return null;
        }
        return window.bootstrap.Modal.getOrCreateInstance(document.getElementById(elementId));
    }

    /* Height of the fixed header used as a scroll offset.
       While the mobile menu is open the header itself becomes very tall, so the
       collapsed height (brand row) is measured instead.
       The top information strip collapses away as soon as the page scrolls, so it
       is never part of the offset — otherwise a link clicked at the very top of the
       page would land ~50px too low once the header shrinks. */
    function getHeaderOffset() {
        var header = $(CONFIG.headerSelector);
        if (!header) {
            return CONFIG.scrollOffset;
        }

        var collapse = document.getElementById('drHomeNav');
        var brand = $('.dr-home-brand', header);
        var navbar = $('.dr-home-navbar', header);
        var topbar = $('.dr-home-topbar', header);

        if (collapse && brand && navbar && collapse.classList.contains('show')) {
            var collapsed = brand.getBoundingClientRect().bottom - navbar.getBoundingClientRect().top;
            if (collapsed > 0) {
                return Math.round(collapsed);
            }
        }

        var topbarHeight = topbar ? topbar.offsetHeight : 0;
        return Math.max(0, header.offsetHeight - topbarHeight);
    }

    /* ------------------------------------------------------------------
       1. Sticky header (transparent -> white + shadow)
    ------------------------------------------------------------------ */
    function initHeader() {
        var header = $(CONFIG.headerSelector);
        if (!header) {
            return;
        }

        function update() {
            if (window.scrollY > 24) {
                header.classList.add(CONFIG.headerScrolledClass);
            } else {
                header.classList.remove(CONFIG.headerScrolledClass);
            }
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ------------------------------------------------------------------
       1b. Scroll progress bar (top of the page)
    ------------------------------------------------------------------ */
    function initScrollProgress() {
        var bar = $(CONFIG.progressBarSelector);
        if (!bar) {
            return;
        }

        function update() {
            var scrollable = document.documentElement.scrollHeight - window.innerHeight;
            var ratio = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
            bar.style.width = Math.min(100, Math.max(0, ratio)).toFixed(2) + '%';
            bar.setAttribute('aria-valuenow', Math.round(ratio));
        }

        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    /* ------------------------------------------------------------------
       2. Smooth scrolling with header offset
    ------------------------------------------------------------------ */
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (event) {
                var hash = link.getAttribute('href');

                if (!hash || hash === '#' || link.hasAttribute('data-bs-toggle')) {
                    return;
                }

                var target = document.querySelector(hash);
                if (!target) {
                    return;
                }

                event.preventDefault();

                var top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset() - 16;

                window.scrollTo({
                    top: top < 0 ? 0 : top,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', hash);
                }
            });
        });
    }

    /* ------------------------------------------------------------------
       3. Active navigation state
    ------------------------------------------------------------------ */
    function initActiveNav() {
        var links = $$('.dr-home-nav__link');
        if (!links.length) {
            return;
        }

        /* Sections are sorted by document position so the active link is correct
           even when the navigation order differs from the page order. */
        var sections = links
            .map(function (link) {
                return document.querySelector(link.getAttribute('href'));
            })
            .filter(Boolean)
            .sort(function (a, b) {
                return a.offsetTop - b.offsetTop;
            });

        function update() {
            var line = getHeaderOffset() + 40;
            var currentId = sections.length ? sections[0].id : '';

            sections.forEach(function (section) {
                if (section.getBoundingClientRect().top <= line) {
                    currentId = section.id;
                }
            });

            /* Bottom of the page: keep the last section active */
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
                currentId = sections[sections.length - 1].id;
            }

            links.forEach(function (link) {
                var isActive = link.getAttribute('href') === '#' + currentId;
                link.classList.toggle('dr-home-nav__link--active', isActive);

                if (isActive) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    /* ------------------------------------------------------------------
       4. Back to top button
    ------------------------------------------------------------------ */
    function initBackToTop() {
        var button = $('#drHomeTop');
        if (!button) {
            return;
        }

        function update() {
            button.classList.toggle('dr-home-is-visible', window.scrollY > CONFIG.backToTopThreshold);
        }

        button.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ------------------------------------------------------------------
       5. Mobile menu: close after clicking an anchor
    ------------------------------------------------------------------ */
    function initMobileMenu() {
        var menu = $('#drHomeNav');
        if (!menu) {
            return;
        }

        $$('a[href^="#"]', menu).forEach(function (link) {
            link.addEventListener('click', function () {
                if (typeof window.bootstrap === 'undefined') {
                    return;
                }
                var instance = window.bootstrap.Collapse.getInstance(menu);
                if (instance) {
                    instance.hide();
                }
            });
        });
    }

    /* ------------------------------------------------------------------
       6. Biography modal
    ------------------------------------------------------------------ */
    function initBioModal() {
        $$('[data-dr-bio-open]').forEach(function (button) {
            button.addEventListener('click', function () {
                getBootstrapModal('drHomeBioModal')?.show();
            });
        });
    }

    /* ------------------------------------------------------------------
       7. Video modal — supports YouTube AND local MP4
       Supports:
         <button data-dr-video-open="1"
                 data-dr-video-type="youtube"
                 data-dr-video-id="VIDEO_ID"
                 data-dr-video-title="শিরোনাম">
       and
         <button data-dr-video-open="1"
                 data-dr-video-type="local"
                 data-dr-video-src="assets/videos/intro.mp4"
                 data-dr-video-title="শিরোনাম">
    ------------------------------------------------------------------ */
    function clearPlayer(player) {
        if (!player) {
            return;
        }
        player.innerHTML = '';
    }

    function buildNotice(player, message) {
        var notice = document.createElement('div');
        notice.className = 'dr-home-player__notice';
        notice.innerHTML = '<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span></span>';
        notice.querySelector('span').textContent = message;
        player.appendChild(notice);
    }

    function isPlaceholderId(videoId) {
        return !videoId || !videoId.trim() || /youtube_video_id/i.test(videoId);
    }

    function initVideoModal() {
        var player = $('#drHomePlayer');
        var modalEl = $('#drHomeVideoModal');
        if (!player || !modalEl) {
            return;
        }

        $$('[data-dr-video-open]').forEach(function (button) {
            button.addEventListener('click', function () {
                var type = button.getAttribute('data-dr-video-type') || 'youtube';
                var title = button.getAttribute('data-dr-video-title') || 'ভিডিও';
                var label = $('#drHomeVideoLabel');

                if (label) {
                    label.textContent = title;
                }

                clearPlayer(player);

                if (type === 'local') {
                    var src = button.getAttribute('data-dr-video-src');
                    var video = document.createElement('video');
                    video.controls = true;
                    video.playsInline = true;
                    video.preload = 'metadata';
                    video.setAttribute('playsinline', '');
                    video.setAttribute('aria-label', title);

                    if (src) {
                        video.src = src;
                    }

                    video.addEventListener('error', function () {
                        clearPlayer(player);
                        buildNotice(player, 'ভিডিও ফাইলটি পাওয়া যায়নি। ' + (src || '') + ' ফাইলটি যোগ করা হয়েছে কি না দেখুন।');
                    });

                    player.appendChild(video);
                } else {
                    var videoId = button.getAttribute('data-dr-video-id');

                    if (isPlaceholderId(videoId)) {
                        buildNotice(player, 'ভিডিও লিংক এখনো যোগ করা হয়নি। index.html ফাইলে data-dr-video-id="YOUTUBE_VIDEO_ID" এর জায়গায় আসল YouTube ভিডিও ID বসান।');
                    } else {
                        var iframe = document.createElement('iframe');
                        iframe.src = 'https://www.youtube.com/embed/' + videoId +
                            '?autoplay=1&rel=0&modestbranding=1';
                        iframe.title = title;
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                        iframe.allowFullscreen = true;
                        iframe.loading = 'lazy';
                        player.appendChild(iframe);
                    }
                }

                getBootstrapModal('drHomeVideoModal')?.show();
            });
        });

        /* Stop playback when the modal is closed */
        if (typeof window.bootstrap !== 'undefined') {
            modalEl.addEventListener('hidden.bs.modal', function () {
                clearPlayer(player);
            });
        }
    }

    /* ------------------------------------------------------------------
       8. Gallery modal
    ------------------------------------------------------------------ */
    function initGalleryModal() {
        var image = $('#drHomeGalleryImage');
        var caption = $('#drHomeGalleryCaption');

        $$('[data-dr-gallery]').forEach(function (button) {
            button.addEventListener('click', function () {
                if (!image) {
                    return;
                }

                image.src = button.getAttribute('data-dr-gallery');
                image.alt = button.getAttribute('data-dr-gallery-caption') || 'গ্যালারি ছবি';

                if (caption) {
                    caption.textContent = button.getAttribute('data-dr-gallery-caption') || '';
                }

                getBootstrapModal('drHomeGalleryModal')?.show();
            });
        });
    }

    /* ------------------------------------------------------------------
       9. Placeholder links
       Social links (Facebook / YouTube / Instagram) still use href="#".
       They must not jump the page back to the top until a real URL is added.
    ------------------------------------------------------------------ */
    function initPlaceholderLinks() {
        $$('a[href="#"]').forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
            });
        });
    }

    /* ------------------------------------------------------------------
       10. Image fallback for missing local files
    ------------------------------------------------------------------ */
    function initImageFallback() {
        $$('.dr-home-body img').forEach(function (image) {
            image.addEventListener('error', function () {
                if (image.dataset.drFallback === 'done') {
                    return;
                }
                image.dataset.drFallback = 'done';
                image.src = IMAGE_PLACEHOLDER;
            });
        });
    }

    /* ------------------------------------------------------------------
       11. AOS
    ------------------------------------------------------------------ */
    function initAOS() {
        if (typeof window.AOS === 'undefined') {
            return;
        }

        window.AOS.init({
            duration: CONFIG.aos.duration,
            once: CONFIG.aos.once,
            offset: CONFIG.aos.offset,
            disable: prefersReducedMotion
        });
    }

    /* ------------------------------------------------------------------
       Boot
    ------------------------------------------------------------------ */
    function init() {
        initHeader();
        initScrollProgress();
        initSmoothScroll();
        initActiveNav();
        initBackToTop();
        initMobileMenu();
        initBioModal();
        initVideoModal();
        initGalleryModal();
        initPlaceholderLinks();
        initImageFallback();
        initAOS();

        /* Re-calculate AOS after fonts/images settle */
        window.addEventListener('load', function () {
            initAOS();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
