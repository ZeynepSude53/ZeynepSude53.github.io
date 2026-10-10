/* Small progressive enhancements; map libraries are intentionally untouched. */
(() => {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const progress = document.createElement('div');
  progress.className = 'geo-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let frameScheduled = false;
  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0})`;
    frameScheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!frameScheduled) { requestAnimationFrame(updateProgress); frameScheduled = true; }
  }, {passive:true});
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.geo-reveal, .about-section, .projects-section, .table-section, .map-section');
  if (!targets.length) return;
  // Observe first, then opt in to animation to avoid hiding content with JS disabled.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('geo-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.06,rootMargin:'0px 0px -25px 0px'});
  targets.forEach(el => { el.classList.add('geo-reveal'); observer.observe(el); });
  document.body.classList.add('geo-motion-ready');
})();
