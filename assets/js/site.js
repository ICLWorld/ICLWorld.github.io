(function () {
  const nav = document.getElementById("hnav");
  const hero = document.getElementById("top");
  new IntersectionObserver(([e]) => nav.classList.toggle("is-solid", !e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" }).observe(hero);
  const links = [...nav.querySelectorAll(".hnav__links a")];
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("is-current", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });

  const copy = document.getElementById("bib-copy");
  if (copy) copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(document.getElementById("bibtex-code").textContent); copy.textContent = "Copied"; }
    catch { copy.textContent = "Select to copy"; }
    setTimeout(() => (copy.textContent = "Copy"), 1600);
  });
})();
