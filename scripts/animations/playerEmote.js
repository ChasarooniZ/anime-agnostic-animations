const buffer = 10;

export async function playerEmote({
  token,
  duration = 5000,
  scale = 1 / 8,
  art = "icons/svg/terror.svg",
  sound = null,
  glowColor = null,
  volume = 0.5,
  spacing = 30,
}) {
  const width = document.getElementById("ui-right").clientWidth;
  const num = getEmoteNumber();
  const seq = new Sequence()
    .effect()
    .file(art)
    .name(`reaction-image-${num}`)
    .animateProperty("sprite", "position.x", {
      from: -spacing / 2,
      to: 0,
      duration: duration / 8,
      ease: "easeOutCubic",
    })
    .fadeOut(duration / 8)
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor({ x: 1, y: 1 })
    .anchor({ x: 1, y: 1 })
    .screenSpaceScale({ fitY: true, ratioX: true })
    .scale(scale)
    .screenSpacePosition({ x: -width - buffer - spacing * num, y: -buffer });

  if (glowColor) {
    seq.filter("Glow", {
      distance: 2,
      quality: 0.1,
      color: game.user.color.css,
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

function getEmoteNumber() {
  return Sequencer.EffectManager.getEffects({ name: "reaction-image-*" })
    .length;
}
