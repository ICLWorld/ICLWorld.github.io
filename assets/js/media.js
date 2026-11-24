window.ICLWORLD_MEDIA = {
  showcase: [
    {
      id: "cua", domain: "Computer use", app: "Music library · web app", difficulty: "Easy",
      title: "Normalize three song titles",
      goal: "Rewrite the display name of three newly added songs from their original titles, leaving other library data unchanged.",
      rules: {
        A: { text: "Uppercase the entire title.", demo: "media/showcase/music-a-demo.mp4" },
        B: { text: "Lowercase the entire title.", demo: "media/showcase/music-b-demo.mp4" },
        C: { text: "Uppercase only the final letter of the whole title; lowercase everything else.", demo: "media/showcase/music-c-demo.mp4" },
      },
      runs: {
        A: { R: { src: "media/showcase/music-a-replay.mp4", ok: true, model: "Claude Opus 5.5", titles: ["morning 3 Walk", "first 4 Snow", "ocean 11 Drive"] }, I: { src: "media/showcase/music-a-resample.mp4", ok: true, model: "Claude Opus 5.5" }, E: { src: "media/showcase/music-a-relocate.mp4", ok: true, model: "Claude Opus 5.5" } },
        B: { R: { src: "media/showcase/music-b-replay.mp4", ok: true, model: "Claude Opus 5.5", titles: ["morning 3 Walk", "first 4 Snow", "ocean 11 Drive"] }, I: { src: "media/showcase/music-b-resample.mp4", ok: true, model: "Claude Opus 5.5" }, E: { src: "media/showcase/music-b-relocate.mp4", ok: true, model: "Claude Opus 5.5" } },
        C: { R: { src: "media/showcase/music-c-replay.mp4", ok: true, model: "Claude Opus 5.5" },
             I: { src: "media/showcase/music-c-resample.mp4", ok: true, model: "Claude Opus 5.5" },
             E: { src: "media/showcase/music-c-relocate.mp4", ok: true, model: "Claude Opus 5.5" } },
      },
    },
    {
      id: "rua", domain: "Robot use", app: "Dual-arm tabletop", difficulty: "Hard",
      title: "Restock the display stand",
      goal: "Place the new batch on the two-tier stand as demonstrated, recycle the packaging, and move the stand to the ordered spot.",
      rules: {
        A: { text: "Blue items on the upper tier, green on the lower tier.", demo: "media/showcase/stand-a-demo-real.mp4", sim: "media/showcase/stand-a-demo-sim.mp4" },
        B: { text: "Triangles on the upper tier, squares on the lower tier.", demo: "media/showcase/stand-b-demo-real.mp4", sim: "media/showcase/stand-b-demo-sim.mp4" },
        C: { text: "All four items on the upper tier.", demo: "media/showcase/stand-c-demo-real.mp4", sim: "media/showcase/stand-c-demo-sim.mp4" },
      },
      runs: {
        A: { R: { src: "media/showcase/stand-a-replay.mp4", ok: false, model: "Claude Opus 5.5" }, I: { src: "media/showcase/stand-a-resample.mp4", ok: false, model: "Claude Opus 5.5" }, E: { src: "media/showcase/stand-a-relocate.mp4", ok: true, model: "Claude Opus 5.5" } },
        B: { R: { src: "media/showcase/stand-b-replay.mp4", ok: true, model: "Claude Opus 5.5" }, I: { src: "media/showcase/stand-b-resample.mp4", ok: false, model: "Claude Opus 5.5" }, E: { src: "media/showcase/stand-b-relocate.mp4", ok: false, model: "Claude Opus 5.5" } },
        C: { R: { src: "media/showcase/stand-c-replay.mp4", ok: false, model: "Claude Opus 5.5" }, I: { src: "media/showcase/stand-c-resample.mp4", ok: false, model: "Claude Opus 5.5" }, E: { src: "media/showcase/stand-c-relocate.mp4", ok: true, model: "Claude Opus 5.5" } },
      },
    },
  ],
};
