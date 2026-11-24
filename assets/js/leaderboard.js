(function () {
  const D = window.ICLWORLD_DATA;
  const root = document.getElementById("lb");
  if (!root) return;

  const state = { mod: 0, view: "main", sort: null, dir: -1 };
  const pair = (get) => (id) => get(id)[state.mod];

  const VIEWS = {
    main: {
      cols: [
        { key: "overall", label: "Overall", get: pair((id) => D.main[id].overall), primary: true },
        { key: "cua", label: "Computer use", sub: "110 tasks", get: pair((id) => D.main[id].cua.avg) },
        { key: "rua", label: "Robot use", sub: "50 tasks", get: pair((id) => D.main[id].rua.avg) },
        { key: "gap", label: "Gap", sub: "CUA − RUA", get: (id) => D.main[id].cua.avg[state.mod] - D.main[id].rua.avg[state.mod], signed: true },
      ],
    },
    cua: {
      cols: ["avg", "easy", "medium", "hard"].map((k, i) => ({
        key: k, label: ["Average", "Easy", "Medium", "Hard"][i], sub: ["110", "36", "37", "37"][i] + " tasks",
        get: pair((id) => D.main[id].cua[k]), primary: i === 0,
      })),
    },
    rua: {
      cols: ["avg", "easy", "medium", "hard"].map((k, i) => ({
        key: k, label: ["Average", "Easy", "Medium", "Hard"][i], sub: ["50", "7", "19", "24"][i] + " tasks",
        get: pair((id) => D.main[id].rua[k]), primary: i === 0,
      })),
    },
    gen: {
      cols: D.generalization.columns.map((c, i) => ({
        key: "g" + i, label: c.level, sub: `${c.domain === "cua" ? "CUA" : "RUA"} · ${c.n}`,
        get: pair((id) => D.generalization.rows[id][i]), group: c.domain,
      })),
    },
  };

  const fmt = (v, signed) => (signed && v > 0 ? "+" : "") + v.toFixed(1);

  function render() {
    const view = VIEWS[state.view];
    const cols = view.cols;
    const sortCol = cols.find((c) => c.key === state.sort) || cols.find((c) => c.primary) || cols[0];
    const ids = D.models.map((m) => m.id).sort((a, b) => state.dir * (sortCol.get(a) - sortCol.get(b)));
    const prim = cols.find((c) => c.primary) || { get: pair((id) => D.main[id].overall) };
    const byPrim = D.models.map((m) => m.id).sort((a, b) => prim.get(b) - prim.get(a));
    const rank = (id) => 1 + byPrim.filter((x) => prim.get(x) > prim.get(id)).length;
    const best = Object.fromEntries(cols.map((c) => [c.key, Math.max(...ids.map(c.get))]));

    const t = document.createElement("table");
    t.className = "lb__table" + (state.view === "gen" ? " lb__table--gen" : "");
    const head = t.createTHead().insertRow();
    const th = (html, cls) => { const c = document.createElement("th"); c.innerHTML = html; if (cls) c.className = cls; head.appendChild(c); return c; };
    th("Rank", "c-rank");
    th("Model", "c-model");
    th("Agent", "c-agent");
    cols.forEach((c) => {
      const cell = th(`<span>${c.label}${c === sortCol ? (state.dir < 0 ? " ↓" : " ↑") : ""}</span>${c.sub ? `<small>${c.sub}</small>` : ""}`,
        "c-num sortable" + (c.primary ? " c-primary" : "") + (c.group === "rua" && c.key === "g4" ? " c-split" : ""));
      cell.tabIndex = 0;
      cell.setAttribute("aria-sort", c === sortCol ? (state.dir < 0 ? "descending" : "ascending") : "none");
      const go = () => { if (state.sort === c.key) state.dir *= -1; else { state.sort = c.key; state.dir = -1; } render(); };
      cell.addEventListener("click", go);
      cell.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });

    const tb = t.createTBody();
    ids.forEach((id) => {
      const m = D.models.find((x) => x.id === id);
      const tr = tb.insertRow();
      const r = rank(id);
      tr.insertCell().outerHTML = `<td class="c-rank">${r === 1 ? '<span class="medal">1</span>' : r}</td>`;
      tr.insertCell().outerHTML = `<td class="c-model"><div class="mdl"><img src="${m.logo}" alt="" width="28" height="28"><div><b>${m.name}</b><small>${m.org}</small></div></div></td>`;
      tr.insertCell().outerHTML = `<td class="c-agent">${m.agent}</td>`;
      cols.forEach((c) => {
        const v = c.get(id);
        const isBest = !c.signed && v === best[c.key] && v > 0;
        const split = c.group === "rua" && c.key === "g4" ? " c-split" : "";
        if (c.primary) {
          tr.insertCell().outerHTML = `<td class="c-num c-primary${isBest ? " is-best" : ""}"><div class="score"><b>${fmt(v)}</b><span class="bar"><i style="width:${v}%"></i></span></div></td>`;
        } else {
          tr.insertCell().outerHTML = `<td class="c-num${isBest ? " is-best" : ""}${split}">${fmt(v, c.signed)}</td>`;
        }
      });
    });
    root.replaceChildren(t);
  }

  document.querySelectorAll(".lb-bar [data-mod]").forEach((b) => b.addEventListener("click", () => {
    state.mod = +b.dataset.mod;
    b.parentElement.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    render();
  }));
  document.querySelectorAll(".lb-bar [data-view]").forEach((b) => b.addEventListener("click", () => {
    state.view = b.dataset.view; state.sort = null; state.dir = -1;
    b.parentElement.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    render();
  }));
  render();
})();
