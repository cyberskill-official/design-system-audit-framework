/**
 * audit.cyberskill.world — minimal motion script
 *
 * Dependencies: none. Runs after DOMContentLoaded (loaded with `defer`).
 * Respects prefers-reduced-motion.
 *
 *  1. Reveal-on-scroll: any element with `.fade-up` gains `.in` once it
 *     enters the viewport, triggering the CSS transition.
 *  2. Counter animation: any element with `data-counter` ticks from 0
 *     up to its target value once its container is visible.
 *  3. Rule-line draw: `<hr class="rule">` elements scale-X from 0 to 1
 *     when revealed (via the same `.in` class).
 *
 * No fallbacks needed — if JS fails or IO is unsupported, the
 * `noscript`-style override below removes the fade-up offset and shows
 * everything statically.
 */

(function () {
  "use strict";

  var prefersReduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If reduced motion is on, just show everything immediately.
  if (prefersReduce) {
    showAll();
    finalizeCounters();
    return;
  }

  // If IntersectionObserver is unavailable, also show everything.
  if (typeof IntersectionObserver === "undefined") {
    showAll();
    finalizeCounters();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in");

        // If this is a counter, animate it.
        if (entry.target.hasAttribute("data-counter")) {
          animateCounter(entry.target);
        }

        // If the element contains counters (e.g. the hero stats card),
        // animate each child counter once.
        var nested = entry.target.querySelectorAll("[data-counter]");
        nested.forEach(function (el) {
          if (!el.dataset.counted) animateCounter(el);
        });

        io.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  // Observe every fade-up + every counter (in case it sits outside fade-up).
  var watchers = document.querySelectorAll(".fade-up, [data-counter]");
  watchers.forEach(function (el) {
    io.observe(el);
  });

  /**
   * Animate a number from 0 → target, in-place.
   */
  function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";

    var target = parseFloat(el.dataset.counter);
    if (isNaN(target)) return;

    var decimals = parseInt(el.dataset.decimals || "0", 10);
    var duration = 1400;
    var start = performance.now();

    function step(now) {
      var t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - t, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }

  function showAll() {
    document.querySelectorAll(".fade-up").forEach(function (el) {
      el.classList.add("in");
    });
    document.querySelectorAll(".rule").forEach(function (el) {
      el.classList.add("in");
    });
  }

  function finalizeCounters() {
    document.querySelectorAll("[data-counter]").forEach(function (el) {
      var target = parseFloat(el.dataset.counter);
      var decimals = parseInt(el.dataset.decimals || "0", 10);
      if (!isNaN(target)) el.textContent = target.toFixed(decimals);
    });
  }
})();
