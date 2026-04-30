export async function shakeToken(
  token,
  shakeDistancePercent,
  shakes,
  duration,
) {
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
