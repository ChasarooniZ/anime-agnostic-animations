import { MODULE_ID, NINETY_DEG_IN_RADIANS } from "../../lib/const.js";

export async function dodgeTarget(token, targetLocation) {
  const scale = token?.document?.width * 0.7;
  const ray = new foundry.canvas.geometry.Ray(
    token.center,
    targetLocation?.center ?? targetLocation,
  );
  const { dx, dy } = foundry.canvas.geometry.Ray.fromAngle(
    0,
    0,
    ray.angle + NINETY_DEG_IN_RADIANS,
    direction() * scale,
  );

  const duration = 100 * token.document.width + 200;

  new Sequence({
    moduleName: game.modules.get(MODULE_ID)?.title,
    softFail: true,
  })
    .motion()
    .on(token)
    .moveBy(
      {
        x: dx,
        y: dy,
      },
      {
        duration: duration,
        ease: "easeOutCubic",
        easeOut: "easeInSine",
        returnDuration: duration * 1.2,
        gridUnits: true,
      },
    )
    .play();
}

function direction() {
  return Math.random() < 0.5 ? -1 : 1;
}
