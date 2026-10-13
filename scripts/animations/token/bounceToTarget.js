export async function bounceToTarget(token, target, distance = canvas.grid.size / 2) {
  const duration = 150 * token.document.width + 200;

  new Sequence({
    moduleName: game.modules.get(MODULE_ID)?.title,
    softFail: true,
  })
    .motion()
    .on(token)
    .moveBy(distance, {
      towards: target,
      duration: duration,
      ease: "easeInBack",
      easeOut: "easeInCubic",
      returnDuration: duration * 1.5,
    })
    .play();
}
