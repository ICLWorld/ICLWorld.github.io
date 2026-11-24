window.ICLWORLD_DATA = {
  models: [
    { id: "opus", logo: "assets/logos/claude-color.svg", name: "Claude Opus 5.5", org: "Anthropic", agent: "Claude Code" },
    { id: "astra", logo: "assets/logos/openai.svg", name: "GPT-6 Astra", org: "OpenAI", agent: "Codex" },
    { id: "qwen", logo: "assets/logos/qwen-color.svg", name: "Qwen3.8-Max", org: "Qwen", agent: "Claude Code" },
    { id: "deepseek", logo: "assets/logos/deepseek-color.svg", name: "DeepSeek-V4.1-Flash", org: "DeepSeek", agent: "DeepSeek Harness" },
    { id: "glm", logo: "assets/logos/zai.svg", name: "GLM-5.3-Flash", org: "Z.ai", agent: "ZCode" },
    { id: "kimi", logo: "assets/logos/kimi-color.svg", name: "Kimi K3", org: "Moonshot AI", agent: "Kimi Code" },
  ],

  main: {
    opus:     { overall: [53.9, 54.9], cua: { avg: [81.8, 81.8], easy: [97.2, 94.4], medium: [89.2, 86.5], hard: [59.5, 64.9] }, rua: { avg: [26.0, 28.0], easy: [28.6, 57.1], medium: [57.9, 42.1], hard: [0.0, 8.3] } },
    astra:    { overall: [49.7, 52.6], cua: { avg: [75.5, 77.3], easy: [88.9, 88.9], medium: [86.5, 81.1], hard: [51.4, 62.2] }, rua: { avg: [24.0, 28.0], easy: [57.1, 57.1], medium: [31.6, 47.4], hard: [8.3, 4.2] } },
    qwen:     { overall: [19.8, 17.5], cua: { avg: [33.6, 29.1], easy: [63.9, 63.9], medium: [29.7, 18.9], hard: [8.1, 5.4] },  rua: { avg: [6.0, 6.0],   easy: [0.0, 0.0],   medium: [15.8, 15.8], hard: [0.0, 0.0] } },
    deepseek: { overall: [17.8, 9.3],  cua: { avg: [23.6, 14.5], easy: [55.6, 38.9], medium: [13.5, 5.4], hard: [2.7, 0.0] },  rua: { avg: [12.0, 4.0],  easy: [14.3, 0.0],  medium: [26.3, 10.5], hard: [0.0, 0.0] } },
    glm:      { overall: [17.7, 15.1], cua: { avg: [35.5, 28.2], easy: [80.6, 63.9], medium: [18.9, 16.2], hard: [8.1, 5.4] },  rua: { avg: [0.0, 2.0],   easy: [0.0, 0.0],   medium: [0.0, 5.3],   hard: [0.0, 0.0] } },
    kimi:     { overall: [14.1, 12.3], cua: { avg: [28.2, 24.5], easy: [63.9, 55.6], medium: [16.2, 10.8], hard: [5.4, 8.1] },  rua: { avg: [0.0, 0.0],   easy: [0.0, 0.0],   medium: [0.0, 0.0],   hard: [0.0, 0.0] } },
  },

  generalization: {
    columns: [
      { domain: "cua", level: "Replay", n: 13 },
      { domain: "cua", level: "Resample", n: 13 },
      { domain: "cua", level: "Resample", n: 37 },
      { domain: "cua", level: "Relocate", n: 37 },
      { domain: "rua", level: "Replay", n: 14 },
      { domain: "rua", level: "Resample", n: 15 },
      { domain: "rua", level: "Relocate", n: 17 },
    ],
    rows: {
      opus:     [[84.6, 100.0], [92.3, 92.3], [78.4, 78.4], [70.3, 81.1], [21.4, 35.7], [33.3, 26.7], [29.4, 11.8]],
      astra:    [[76.9, 100.0], [76.9, 84.6], [67.6, 75.7], [70.3, 73.0], [35.7, 28.6], [13.3, 20.0], [5.9, 17.6]],
      qwen:     [[69.2, 100.0], [69.2, 69.2], [27.0, 32.4], [37.8, 37.8], [7.1, 0.0],   [0.0, 6.7],   [5.9, 0.0]],
      deepseek: [[53.8, 69.2],  [53.8, 15.4], [24.3, 8.1],  [32.4, 18.9], [7.1, 7.1],   [20.0, 6.7],  [17.6, 0.0]],
      glm:      [[53.8, 84.6],  [46.2, 53.8], [21.6, 21.6], [32.4, 35.1], [7.1, 0.0],   [0.0, 6.7],   [5.9, 5.9]],
      kimi:     [[53.8, 84.6],  [46.2, 46.2], [18.9, 16.2], [35.1, 35.1], [0.0, 0.0],   [0.0, 0.0],   [0.0, 0.0]],
    },
  },

  ablation: {
    context: {
      astra:    { cua: { none: 5.4, text: 67.6, video: 75.7 }, rua: { none: 0.0, text: 11.8, video: 17.6, sim: 23.5 } },
      deepseek: { cua: { none: 2.7, text: 24.3, video: 8.1 },  rua: { none: 0.0, text: 17.6, video: 5.9,  sim: 5.9 } },
      glm:      { cua: { none: 8.1, text: 21.6, video: 21.6 }, rua: { none: 0.0, text: 0.0,  video: 0.0,  sim: 5.9 } },
    },
    versions: {
      astra:    { cua: { A: 48.6, B: 48.6, C: 75.7, all: 37.8 }, rua: { A: 29.4, B: 11.8, C: 17.6, all: 11.8 } },
      deepseek: { cua: { A: 29.7, B: 24.3, C: 8.1,  all: 8.1 },  rua: { A: 11.8, B: 0.0,  C: 5.9,  all: 0.0 } },
      glm:      { cua: { A: 29.7, B: 27.0, C: 21.6, all: 16.2 }, rua: { A: 0.0,  B: 11.8, C: 5.9,  all: 0.0 } },
    },
  },

  understanding: {
    cua: { astra: [97.3, 57.7], glm: [80, 26], deepseek: [60, 21] },
    rua: { astra: [98.0, 19.6], glm: [100, 5.9], deepseek: [69, 6] },
  },


};

