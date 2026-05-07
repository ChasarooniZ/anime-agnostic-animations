import { isTokenMagicActive } from "../../lib/misc.js";

export async function bounceToTarget(token, target) {
  if (!isTokenMagicActive()) {
    console.error("Missing Token Magic FX");
    return;
  }
  const angle = new foundry.canvas.geometry.Ray(target, token).angle;
  const { dx, dy } = foundry.canvas.geometry.Ray.fromAngle(
    0,
    0,
    angle,
    distance,
  );
  const params = getParams(dx, dy);
  return TokenMagic.addUpdateFiltersOnSelected(params);
}

const distance = 0.1;

const duration = 400;

function getParams(dx, dy) {
  return [
    {
      filterType: "transform",
      filterId: "bounceToTarget",
      autoDestroy: true,
      padding: 80,
      pivotX: 0.5,
      pivotY: 0.5,
      animated: {
        translationX: {
          animType: "cosOscillation",
          active: true,
          loopDuration: duration,
          loops: 1,
          val1: 0,
          val2: Math.round(dx * 100) / 100,
        },
        translationY: {
          animType: "cosOscillation",
          active: true,
          loopDuration: duration,
          loops: 1,
          val1: 0,
          val2: Math.round(dy * 100) / 100,
        },
      },
    },
  ];
}
