import { isTokenMagicActive } from "../../lib/misc.js";

export async function shakeToken(
  token,
  shakeDistancePercent,
  shakes,
  duration,
) {
  if (!isTokenMagicActive()) {
    console.error("Missing Token Magic FX");
    return;
  }
  const params = [
    {
      filterType: "transform",
      filterId: "tokenShake",
      autoDestroy: true,
      animated: {
        translationX: {
          animType: "sinOscillation",
          val1: -shakeDistancePercent,
          val2: +shakeDistancePercent,
          loopDuration: duration / shakes,
          loops: shakes,
        },
      },
    },
  ];
  TokenMagic.addFilters(token, params);
}
