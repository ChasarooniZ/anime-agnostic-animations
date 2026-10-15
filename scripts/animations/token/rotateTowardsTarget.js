import { MODULE_ID } from "../../lib/const.js";

/**
 *
 * @param {Token} token Token to rotate
 * @param {{x: Number, y: Number}} targetLocation Coordinates of where to turn
 * @param {Number} offset How much degrees to offset the rotation by
 * @returns
 */
export async function rotateToTarget(token, targetLocation, offset) {
  const duration = 500 + token.document.width * 100;
  const ray = new foundry.canvas.geometry.Ray(
    token.center,
    targetLocation?.center ?? targetLocation,
  );
  const angleToTarget = Math.toDegrees(ray.angle);
  const currAngle = token.document.rotation;

  const angleDelta = getShortestAngleOfRotation(
    angleToTarget - currAngle - offset,
  );

  new Sequence({
    moduleName: game.modules.get(MODULE_ID)?.title,
    softFail: true,
  })
    .motion()
    .on(token)
    .rotateTo(angleDelta, { duration, ease: "easeOutCubic" })
    .play();
}

function getShortestAngleOfRotation(angleDelta) {
  return ((((angleDelta + 180) % 360) + 360) % 360) - 180;
}
