(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const videos = [];
  document.querySelectorAll(".belt__track").forEach((track) => {
    const n = track.dataset.row;
    for (let k = 0; k < 2; k++) {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = !reduce; v.preload = "auto";
      v.poster = `media/hero/row${n}.jpg`; v.src = `media/hero/row${n}.mp4`;
      track.appendChild(v); videos.push(v);
    }
  });
  const hero = document.getElementById("top");
  if (reduce) { hero.classList.add("is-paused"); return; }
  new IntersectionObserver(([e]) => {
    videos.forEach((v) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    hero.classList.toggle("is-offscreen", !e.isIntersecting);
  }).observe(hero);
})();
