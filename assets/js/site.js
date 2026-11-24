(function () {
  const nav = document.getElementById("hnav");
  const hero = document.getElementById("top");
  new IntersectionObserver(([e]) => nav.classList.toggle("is-solid", !e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" }).observe(hero);
  const links = [...nav.querySelectorAll(".hnav__links a")];
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("is-current", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });

  const vio = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target;
    if (!v.autoplay) return;
    if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  }), { threshold: 0.2 });
  const watch = () => document.querySelectorAll("#showcase video").forEach((v) => {
    if (!v.dataset.watched) { v.dataset.watched = "1"; vio.observe(v); }
  });
  watch();
  new MutationObserver(watch).observe(document.getElementById("showcase"), { childList: true, subtree: true });
  const copy = document.getElementById("bib-copy");
  if (copy) copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(document.getElementById("bibtex-code").textContent); copy.textContent = "Copied"; }
    catch { copy.textContent = "Select to copy"; }
    setTimeout(() => (copy.textContent = "Copy"), 1600);
  });
})();
