(function () {
  const M = window.ICLWORLD_MEDIA;
  const root = document.getElementById("showcase");
  if (!root) return;

  const LEVELS = [["R", "Replay"], ["I", "Resample"], ["E", "Relocate"]];
  const TITLES = {
    R: ["morning 3 Walk"],
    I: ["winter 6 Letters", "autumn 8 Lanterns", "first 4 Snow"],
    E: ["winter 6 Letters", "autumn 8 Lanterns", "first 4 Snow"],
  };
  const APPLY = {
    A: (s) => s.toUpperCase(),
    B: (s) => s.toLowerCase(),
    C: (s) => s.slice(0, -1).toLowerCase() + s.slice(-1).toUpperCase(),
  };

  function h(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function video(src, opts = {}) {
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = !opts.still;
    v.preload = "metadata";
    v.poster = src.replace(/\.mp4$/, ".jpg");
    v.src = src;
    if (opts.controls) v.controls = true;
    return v;
  }

  function syncGroup(videos, box) {
    videos.forEach((v) => {
      v.loop = false; v.autoplay = false;
      v.addEventListener("ended", () => {
        if (videos.every((x) => x.ended)) videos.forEach((x) => { x.currentTime = 0; x.play().catch(() => {}); });
      });
    });
    let visible = false;
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      videos.forEach((x) => (visible && !x.ended ? x.play().catch(() => {}) : x.pause()));
    }, { threshold: 0.2 }).observe(box);
  }

  const tabs = h("div", "ex-tabs");
  tabs.setAttribute("role", "tablist");
  const panels = h("div", "ex-panels");
  root.append(tabs, panels);

  M.showcase.forEach((task, ti) => {
    const tab = h("button", "ex-tab");
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(ti === 0));
    tab.append(h("span", "chip chip--" + task.id, task.domain), h("span", "", task.title));
    tabs.appendChild(tab);

    const panel = h("article", "ex ex--" + task.id);
    panel.hidden = ti !== 0;
    panel.innerHTML = `
      <header class="ex__head">
        <h3 class="ex__title"></h3>
        <p class="ex__goal"></p>
      </header>
      <div class="ex__body">
        <section class="ex__context" aria-label="Rule in context">
          <div class="ex__rules" role="radiogroup" aria-label="Rule version"></div>
          <div class="ex__ruletext"><p class="label">Text rule</p><p class="ex__rule"></p></div>
          <figure class="ex__demo"><div class="ex__demo-media"></div><figcaption></figcaption></figure>
        </section>
        <section class="ex__levels" aria-label="Generalization levels"></section>
      </div>`;
    panel.querySelector(".ex__title").textContent = task.title;
    panel.querySelector(".ex__goal").textContent = task.goal;
    panels.appendChild(panel);

    const rulesEl = panel.querySelector(".ex__rules");
    const ruleText = panel.querySelector(".ex__rule");
    const demoBox = panel.querySelector(".ex__demo-media");
    const demoCap = panel.querySelector(".ex__demo figcaption");
    const levelsEl = panel.querySelector(".ex__levels");

    let rule = "C", demoSource = "demo";

    let srcToggle = null;
    if (task.rules.A.sim) {
      srcToggle = h("div", "seg seg--sm");
      [["demo", "Real video"], ["sim", "Simulated video"]].forEach(([k, label]) => {
        const b = h("button", "", label);
        b.setAttribute("role", "radio");
        b.setAttribute("aria-checked", String(k === demoSource));
        b.addEventListener("click", () => {
          demoSource = k;
          srcToggle.querySelectorAll("button").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
          render();
        });
        srcToggle.appendChild(b);
      });
      panel.querySelector(".ex__demo").prepend(srcToggle);
    }

    ["A", "B", "C"].forEach((r) => {
      const b = h("button", "ex__rulebtn");
      b.setAttribute("role", "radio");
      b.dataset.rule = r;
      b.append(h("span", "ex__rulebtn-k", r), h("span", "ex__rulebtn-t", task.rules[r].text));
      b.addEventListener("click", () => { rule = r; render(); });
      rulesEl.appendChild(b);
    });

    function levelCard(code, name) {
      const card = h("figure", "lv");
      const head = h("figcaption", "lv__head");
      head.append(h("span", "lv__name", name));
      const media = h("div", "lv__media");
      const foot = h("div", "lv__foot");

      const run = task.runs && task.runs[rule] ? task.runs[rule][code] : null;
      if (run) {
        media.appendChild(video(run.src));
        const tag = (run.ok ? "✓" : "✗") + (run.model ? " " + run.model : "");
        head.appendChild(h("span", "lv__tag " + (run.ok ? "lv__tag--ok" : "lv__tag--fail"), tag));
      }
      if (task.id === "cua") {
        const list = h("ol", "lv__titles");
        ((run && run.titles) || TITLES[code]).forEach((t) => {
          const li = h("li");
          li.append(h("span", "from", t), h("span", "arrow", "→"), h("b", "to", APPLY[rule](t)));
          list.appendChild(li);
        });
        foot.append(list);
      }
      card.append(head, media, foot);
      return card;
    }

    function render() {
      rulesEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.rule === rule)));
      ruleText.textContent = `“${task.rules[rule].text}”`;
      const src = demoSource === "sim" && task.rules[rule].sim ? task.rules[rule].sim : task.rules[rule].demo;
      demoBox.replaceChildren(video(src, { controls: true }));
      demoCap.textContent = "";
      levelsEl.replaceChildren(...LEVELS.map(([c, n]) => levelCard(c, n)));
      const runs = [...levelsEl.querySelectorAll(".lv__media video")];
      if (runs.length > 1) syncGroup(runs, levelsEl);
    }
    render();

    tab.dataset.example = task.id;
    tab.addEventListener("click", () => {
      tabs.querySelectorAll(".ex-tab").forEach((x) => x.setAttribute("aria-selected", String(x === tab)));
      panels.querySelectorAll(".ex").forEach((p) => { p.hidden = p !== panel; });
    });
  });

  const open = () => {
    const m = location.hash.match(/^#example-(\w+)$/);
    const t = m && tabs.querySelector(`[data-example="${m[1]}"]`);
    if (t) { t.click(); root.scrollIntoView(); }
  };
  window.addEventListener("hashchange", open);
  open();
})();
