import { NINETY_DEG_IN_RADIANS } from "../../lib/const.js";

export async function dodgeTarget(token, targetLocation) {
  const scale = 0.2;
  const ray = new Ray(token.center, targetLocation);
  const { dx, dy } = Ray.fromAngle(
    0,
    0,
    ray.angle + NINETY_DEG_IN_RADIANS,
    direction() * scale,
  );
  const padding = token.w / 2;
  const duration = 200 * token.document.width + 400;

  const params = getParams(dx, dy, duration, padding);

  return TokenMagic.addUpdateFiltersOnSelected(params);
}

function direction() {
  return Math.random() < 0.5 ? -1 : 1;
}

function getParams(dx, dy, duration, padding) {
  return [
    {
      filterType: "transform",
      filterId: "savingRoll",
      autoDestroy: true,
      padding: padding,
      pivotX: 0.5,
      pivotY: 0.5,
      animated: {
        translationX: {
          animType: "cosOscillation",
          active: true,
          loopDuration: duration,
          loops: 1,
          val1: 0,
          val2: dx,
        },
        translationY: {
          animType: "cosOscillation",
          active: true,
          loopDuration: duration,
          loops: 1,
          val1: 0,
          val2: dy,
        },
      },
    },
  ];
}