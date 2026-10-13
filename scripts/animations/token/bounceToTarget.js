import { MODULE_ID } from "../../lib/const.js";

export async function bounceToTarget(
  token,
  target,
  distance = canvas.grid.size / 2,
) {
  const duration = 50 * token.document.width + 350;

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
