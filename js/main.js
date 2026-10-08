// ===== Media Asia interactions =====
(function () {
  'use strict';

  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Animated counters
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Fake play button
  var playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      playBtn.textContent = playBtn.textContent === '▶' ? '⏸' : '▶';
    });
  }

  // Contact form (demo)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nama = form.nama.value.trim();
    note.textContent = 'Terima kasih, ' + nama + '! Pesanmu sudah terkirim. Tim kami akan menghubungimu dalam 1x24 jam.';
    form.reset();
    setTimeout(function () { note.textContent = ''; }, 6000);
  });
})();
