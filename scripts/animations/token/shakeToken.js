export async function shakeToken(
  token,
  shakeDistancePercent,
  shakes,
  duration,
) {
  if (!TokenMagic) {
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
