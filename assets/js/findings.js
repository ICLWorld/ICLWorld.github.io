(function () {
  const D = window.ICLWORLD_DATA;
  const SHORT = { opus: "Opus 5.5", astra: "GPT-6 Astra", qwen: "Qwen3.8-Max", deepseek: "DeepSeek-V4.1", glm: "GLM-5.3", kimi: "Kimi K3" };
  const ORDER = ["opus", "astra", "qwen", "deepseek", "glm", "kimi"];

  function pairedBars(rows, series) {
    const wrap = document.createElement("div");
    wrap.className = "pb";
    const legend = document.createElement("div");
    legend.className = "pb__legend";
    series.forEach((s) => {
      const k = document.createElement("span");
      k.innerHTML = `<i class="${s.cls}"></i>`;
      k.append(s.label);
      legend.appendChild(k);
    });
    wrap.appendChild(legend);
    rows.forEach((r) => {
      const row = document.createElement("div");
      row.className = "pb__row" + (r.strong ? " is-strong" : "");
      const name = document.createElement("span");
      name.className = "pb__name";
      name.textContent = r.label;
      const bars = document.createElement("div");
      bars.className = "pb__bars";
      r.values.forEach((v, j) => {
        const line = document.createElement("div");
        line.className = "pb__line";
        line.title = `${r.label} · ${series[j].label}: ${v.toFixed(1)}%`;
        line.innerHTML = `<i class="${series[j].cls}" style="width:${Math.max(v, 0.6)}%"></i><b>${v.toFixed(1)}</b>`;
        bars.appendChild(line);
      });
      row.append(name, bars);
      wrap.appendChild(row);
    });
    return wrap;
  }

  const findings = [
    {
      title: "The physical world is much harder.",
      text: "Same model, same harness: 76–82% on screens, 24–26% with a robot.",
      chart: () => pairedBars(ORDER.map((id) => ({ label: SHORT[id], values: [D.main[id].cua.avg[0], D.main[id].rua.avg[0]], strong: id === "opus" || id === "astra" })),
        [{ label: "Computer use", cls: "c-cua" }, { label: "Robot use", cls: "c-rua" }]),
    },
    {
      title: "Identifying a rule is not acting on it.",
      text: "Agents name the rule correctly, then fail to carry it out.",
      chart: () => pairedBars([
        { label: "Astra · CUA", values: D.understanding.cua.astra },
        { label: "Astra · RUA", values: D.understanding.rua.astra, strong: true },
        { label: "GLM · RUA", values: D.understanding.rua.glm },
        { label: "DeepSeek · RUA", values: D.understanding.rua.deepseek },
      ], [{ label: "Rule QA accuracy", cls: "c-qa" }, { label: "Execution success", cls: "c-cua" }]),
    },
    {
      title: "Testing a single rule overestimates rule following.",
      text: "GPT-6 Astra solves 76% of computer-use tasks under rule C, but only 38% under all three rules.",
      chart: () => {
        const v = D.ablation.versions.astra.cua;
        return pairedBars([
          { label: "Rule A", values: [v.A] }, { label: "Rule B", values: [v.B] }, { label: "Rule C", values: [v.C] },
          { label: "All three", values: [v.all], strong: true },
        ], [{ label: "GPT-6 Astra, computer use", cls: "c-cua" }]);
      },
    },
    {
      title: "Frontier agents learn from video as well as from text.",
      text: "Frontier agents: ±2 pp gap. Weaker agents rely on text.",
      chart: () => pairedBars(ORDER.map((id) => ({ label: SHORT[id], values: D.main[id].cua.avg, strong: id === "opus" || id === "astra" })),
        [{ label: "Text rule", cls: "c-cua" }, { label: "Video rule", cls: "c-video" }]),
    },
    {
      title: "Testing only in the demonstrated situation credits imitation.",
      text: "Weaker agents copy the demo; a new instance exposes it.",
      chart: () => pairedBars(ORDER.map((id) => ({ label: SHORT[id], values: [D.generalization.rows[id][0][1], D.generalization.rows[id][1][1]], strong: id === "opus" || id === "astra" })),
        [{ label: "Replay", cls: "c-cua" }, { label: "Resample", cls: "c-video" }]),
    },
    {
      title: "Without the rule, tasks are practically unsolvable.",
      text: "Goal only: 2.7–8.1% on computer use, 0% on robot use.",
      chart: () => pairedBars(["astra", "deepseek", "glm"].map((id) => ({ label: SHORT[id], values: [D.ablation.context[id].cua.text, D.ablation.context[id].cua.none] })),
        [{ label: "Text rule", cls: "c-cua" }, { label: "No rule", cls: "c-none" }]),
    },
  ];

  const list = document.getElementById("findings-list");
  findings.forEach((f, i) => {
    const card = document.createElement("article");
    card.className = "finding";
    const h = document.createElement("h3");
    h.innerHTML = `<span class="num">${i + 1}</span>`;
    h.append(f.title);
    const p = document.createElement("p");
    p.textContent = f.text;
    const fig = document.createElement("figure");
    fig.appendChild(f.chart());
    card.append(h, p, fig);
    list.appendChild(card);
  });

})();
