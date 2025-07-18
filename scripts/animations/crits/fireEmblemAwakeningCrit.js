

/**
 * Perform a critical hit animation resembling the style of Fire Emblem.
 * This function creates an animated effect around the provided actor, displaying
 * an image moving across the screen along with other visual effects and sounds.
 *
 * @param {Actor} actor - The actor object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @returns {void}
 */

import { MODULE_ID } from "../../lib/const.js";

export async function fireEmblemAwakeningCrit(actor, users, config) {
  const windowHeight = screen.height / 10;
  const padding = windowHeight / 10;
  const rectangleHeight = windowHeight + padding * 2;
  const windowWidth = screen.width;
  
  new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
    //background
    .effect()
    .zIndex(-1)
    .syncGroup(`fe-crit-${actor.uuid}`)
    .shape("rectangle", {
      lineSize: 0,
      width: windowWidth,
      height: rectangleHeight,
      fillColor: game.user.color.css,
      fillAlpha: 0.6,
      name: "feCritA",
    })
    .opacity(0.7)
    .duration(config.duration)
    .animateProperty("shapes.feCritA", "scale.y", {
      from: 1,
      to: 0.6,
      duration: config.duration,
      ease: "easeInCubic",
    })
    .animateProperty("shapes.feCritA", "position.y", {
      from: 0,
      to: (rectangleHeight * 0.4) / 2,
      duration: config.duration,
      ease: "easeInCubic",
    })
    .screenSpace()
    .screenSpacePosition({ x: 0, y: -rectangleHeight / 2 })
    .screenSpaceAnchor({ x: 0, y: 0.5 })
    .forUsers(users)
    .delay(config.delay)
    .screenSpaceAboveUI()
    //Image
    .effect()
    .zIndex(0)
    .syncGroup(`fe-crit-${actor.uuid}`)
    .file(config.art)
    .spriteRotation(config.rotation)
    .animateProperty("sprite", "position.x", {
      from: -1.2,
      to: 1.8,
      screenSpace: true,
      duration: config.duration,
      ease: "easeInBack",
    })
    .screenSpaceAnchor({ x: 0.5, y: 0.5 })
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceScale({
      x: 0.134 * config.scale,
      y: 0.134 * config.scale,
      fitX: false,
      fitY: true,
      ratioX: true,
      ratioY: false,
    })
    // Y Offset
    .animateProperty("sprite", "position.y", {
      from: config?.offset?.y ?? 0,
      to: config?.offset?.y ?? 0,
      duration: config.duration,
      screenSpace: true,
    })
    .duration(config.duration)
    .forUsers(users)
    .delay(config.delay)
    //Sound
    .sound()
    .file(config.sfx)
    .fadeOutAudio(config.duration / 4)
    .volume(config.volume)
    .forUsers(users)
    .delay(config.delay)
    .play({ preload: true });
}
