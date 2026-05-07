import { isTokenMagicActive } from "../../lib/misc.js";

/**
 *
 * @param {Token} token Token to rotate
 * @param {{x: Number, y: Number}} targetLocation Coordinates of where to turn
 * @param {Number} offset How much degrees to offset the rotation by
 * @returns
 */
export async function rotateToTarget(token, targetLocation, offset) {
  if (!isTokenMagicActive()) {
    console.error("Missing Token Magic FX");
    return;
  }
  const ray = new Ray(token.center, targetLocation);
  const angleToTarget = Math.toDegrees(ray.angle);
  const currAngle = token.document.rotation;

  const angleDelta = getShortestAngleOfRotation(
    angleToTarget - currAngle - offset,
  );

  const params = getParams(angleDelta);

  return TokenMagic.addUpdateFiltersOnSelected(params);
}

function getParams(angleDelta) {
  return [
    {
      filterType: "transform",
      filterId: "savingRoll",
      autoDestroy: true,
      padding: 80,
      pivotX: 0.5,
      pivotY: 0.5,
      animated: {
        rotation: {
          animType: "cosOscillation",
          active: true,
          loopDuration: 1250,
          loops: 1,
          val1: 0,
          val2: angleDelta,
        },
      },
    },
  ];
}

function getShortestAngleOfRotation(angleDelta) {
  return ((((angleDelta + 180) % 360) + 360) % 360) - 180;
}
