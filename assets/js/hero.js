(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const videos = [];
  document.querySelectorAll(".belt__track").forEach((track) => {
    const n = track.dataset.row;
    for (let k = 0; k < 2; k++) {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
      v.poster = `https://gcore.jsdelivr.net/gh/ICLWorld/ICLWorld.github.io@media-v2/media/hero/row${n}.jpg`;
      v.dataset.src = `https://gcore.jsdelivr.net/gh/ICLWorld/ICLWorld.github.io@media-v2/media/hero/row${n}.mp4`;
      track.appendChild(v); videos.push(v);
    }
  });
  const hero = document.getElementById("top");
  if (reduce) { hero.classList.add("is-paused"); return; }
  let visible = true, started = false;
  const start = () => {
    started = true;
    videos.forEach((v) => { v.src = v.dataset.src; if (visible) v.play().catch(() => {}); });
  };
  if (document.readyState === "complete") setTimeout(start, 200); else window.addEventListener("load", () => setTimeout(start, 200));
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (started) videos.forEach((v) => (visible ? v.play().catch(() => {}) : v.pause()));
    hero.classList.toggle("is-offscreen", !visible);
  }).observe(hero);
})();
