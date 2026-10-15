import { MODULE_ID } from "../../lib/const.js";
export async function shakeToken({
  token,
  shakeDistancePercent = 0.1,
  shakes,
  duration,
}) {
  new Sequence({
    moduleName: game.modules.get(MODULE_ID)?.title,
    softFail: true,
  })
    .motion()
    .on(token)
    .oscillate({
      period: duration / shakes,
      duration: duration,
      waveform: "sine",
      x: { strengthScaledToObject: shakeDistancePercent },
      fadeInDuration: duration / 16,
      fadeOutDuration: duration / 8,
    })
    .play();
}
