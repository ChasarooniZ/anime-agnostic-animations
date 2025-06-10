import { MODULE_ID, PERSONA5_POLYGON_POINTS } from "../../lib/const.js";
/**
 *  Conversion method from css clip path
 * r = """0% 55%, 2% 52%, 9% 51%, 15% 44%, 23% 40%, 32% 38%, 34% 36%, 35% 35%, 41% 28%, 43% 30%, 50% 26%, 53% 27%, 58% 26%, 59% 26%, 62% 24%, 65% 25%, 71% 23%, 78% 15%, 85% 14%, 89% 14%, 95% 11%, 97% 12%, 100% 9%, 100% 55%, 97% 53%, 96% 55%, 92% 55%, 80% 56%, 72% 57%, 69% 58%, 64% 63%, 62% 63%, 61% 65%, 59% 63%, 57% 62%, 55% 64%, 53% 65%, 49% 63%, 43% 63%, 39% 64%, 37% 65%, 36% 65%, 34% 68%, 32% 67%, 29% 72%, 27% 71%, 27% 73%, 24% 72%, 22% 73%, 20% 70%, 16% 73%, 14% 71%, 13% 72%, 10% 71%, 5% 72%, 6% 70%, 0% 73%"""

 for pair in r.split(","):
 pair = pair.replace('%', '').strip()
 items = pair.split(" ")
 widthPer = str(int(items[0])/100)
 heightPer = str(int(items[1])/100)
 print("[" + widthPer + "* width, " + heightPer + "* height],")
 */
//https://www.cssportal.com/css-clip-path-generator/
/**
 * Perform a critical hit animation resembling a persona-like effect.
 * This function creates an animated effect centered around the provided actor, displaying
 * an image with a polygonal mask, along with other visual effects and sounds.
 *
 * @param {Actor} actor - The actor object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @returns {void}
 */

export function persona5Crit(actor, users, config) {
  const screenWidth = screen.availWidth;
  const screenHeight = screen.availHeight;
  const centeredPoints = PERSONA5_POLYGON_POINTS.map(([x, y]) => [
    x * screenWidth - screenWidth / 2,
    y * screenHeight - screenHeight / 2,
  ]);

  if (config.art.endsWith(".webm")) {
    const video = document.createElement("video");
    video.src = config.art;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    video.onloadeddata = async () => {
      new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        // BG Color
        .effect()
        .syncGroup(`p5-crit-${actor?.uuid}`)
        .shape("polygon", {
          points: centeredPoints,
          fillColor: game.user.color.css,
          fillAlpha: 1,
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpaceAboveUI()
        .zIndex(-1)
        .duration(config.duration)
        .forUsers(users)
        .delay(config.delay)
        // Video
        .effect()
        .syncGroup(`p5-crit-${actor?.uuid}`)
        .file(config.art)
        .zIndex(0)
        .shape("polygon", { isMask: true, points: centeredPoints })
        .spriteOffset(config.offset, { gridUnits: false })
        .spriteRotation(config.rotation)
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpaceScale({ fitY: true, ratioX: true })
        .scale(config.scale)
        .screenSpaceAboveUI()
        .duration(config.duration)
        .forUsers(users)
        .delay(config.delay)
        // Outline
        .effect()
        .syncGroup(`p5-crit-${actor?.uuid}`)
        .zIndex(1)
        .shape("polygon", {
          points: centeredPoints,
          fillAlpha: 0,
          lineSize: 10,
          lineColor: "white",
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpaceAboveUI()
        .duration(config.duration)
        .forUsers(users)
        .delay(config.delay)
        // Sound
        .sound()
        .file(config.sfx)
        .fadeOutAudio(config.duration / 4)
        .volume(config.volume)
        .forUsers(users)
        .delay(config.delay)
        .play({ preload: true });
    };
  } else {
    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
      // BG Color
      .effect()
      .syncGroup(`p5-crit-${actor?.uuid}`)
      .shape("polygon", {
        points: centeredPoints,
        fillColor: game.user.color.css,
        fillAlpha: 1,
      })
      .screenSpace()
      .screenSpacePosition({ x: 0, y: 0 })
      .screenSpaceAnchor({ x: 0.5, y: 0.5 })
      .screenSpaceAboveUI()
      .zIndex(-1)
      .duration(config.duration)
      .forUsers(users)
      .delay(config.delay)
      // Image
      .effect()
      .syncGroup(`p5-crit-${actor?.uuid}`)
      .file(config.art)
      .zIndex(0)
      .shape("polygon", { isMask: true, points: centeredPoints })
      .scale(config.scale)
      .spriteOffset(config.offset, { gridUnits: false })
      .spriteRotation(config.rotation)
      .screenSpace()
      .screenSpacePosition({ x: 0, y: 0 })
      .screenSpaceAnchor({ x: 0.5, y: 0.5 })
      // X Offset
      .animateProperty("sprite", "position.x", {
        from: config?.offset?.x ?? 0,
        to: config?.offset?.x ?? 0,
        duration: config.duration,
        screenSpace: true,
      })
      // Y Offset
      .animateProperty("sprite", "position.y", {
        from: config?.offset?.y ?? 0,
        to: config?.offset?.y ?? 0,
        duration: config.duration,
        screenSpace: true,
      })
      .screenSpaceAboveUI()
      .duration(config.duration)
      .forUsers(users)
      .delay(config.delay)
      // Outline
      .effect()
      .syncGroup(`p5-crit-${actor?.uuid}`)
      .zIndex(1)
      .shape("polygon", {
        points: centeredPoints,
        fillAlpha: 0,
        lineSize: 10,
        lineColor: "white",
      })
      .screenSpace()
      .screenSpacePosition({ x: 0, y: 0 })
      .screenSpaceAnchor({ x: 0.5, y: 0.5 })
      .screenSpaceAboveUI()
      .duration(config.duration)
      .forUsers(users)
      .delay(config.delay)
      // Sound
      .sound()
      .file(config.sfx)
      .fadeOutAudio(config.duration / 4)
      .volume(config.volume)
      .forUsers(users)
      .delay(config.delay)
      .play({ preload: true });
  }
}
