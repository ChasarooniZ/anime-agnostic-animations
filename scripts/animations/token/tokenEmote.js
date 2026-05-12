export async function tokenEmote({
  token,
  duration = 2500,
  art = "icons/svg/terror.svg",
  sound = null,
  glowColor = null,
  volume = 0.5,
}) {
  const seq = new Sequence()
    .effect()
    .file(art)
    .attachTo(token, {
      align: "top",
      edge: "outer",
      bindVisibility: true,
      bindScale: true,
    })
    .scaleToObject(0.5)
    .duration(duration)
    .fadeIn(duration / 8)
    .scaleIn(0.6, duration / 8)
    .fadeOut(duration / 8)
    .rotateOut(180, duration / 8)
    .scaleOut(0.4, duration / 8);

  if (glowColor) {
    seq.filter("Glow", {
      distance: (token.document.width * canvas.grid.size) / 15,
      quality: 0.1,
      color: glowColor,
    });
  }
  if (sound) {
    seq
      .sound()
      .file(sound)
      .volume(volume)
      .delay(duration / 8);
  }

  return seq.play({ preload: true });
}
