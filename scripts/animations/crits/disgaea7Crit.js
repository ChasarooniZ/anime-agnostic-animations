/**
 * Perform a critical hit animation resembling the style of Disgaea 7
 * This function creates an animated effect around the provided actor, displaying
 * an image moving across the screen along with other visual effects and sounds.
 *
 * @param {Actor} actor - The actor object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @returns {void}
 */

import { MODULE_ID } from "../../lib/const.js";

export async function disgaea7Crit(actor, users, config) {
  const width = screen.width;
  const height = screen.height * 1.25;

  const widthPercent = 17.5 / 100;

  const imga = new Image();
  imga.src = config.art;
  imga.onload = ({ target }) => {
    const imgWidth = target.naturalWidth;
    const imgHeight = target.naturalHeight;
    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
      //BG start
      .effect()
      .syncGroup(`disgaea-7-crit-${actor.uuid}`)
      .shape("rectangle", {
        //isMask: true,
        width: width * widthPercent,
        height: height,
        fillColor: "#ffffff",
        fillAlpha: 1,
      })
      .screenSpace()
      .screenSpacePosition({
        x: 0,
        y: 0,
      })
      .screenSpaceAnchor({
        x: 0.05,
        y: 0,
      })
      .fadeIn(config.duration / 12)
      .animateProperty("spriteContainer", "position.y", {
        from: -1,
        to: 0,
        screenSpace: true,
        duration: config.duration / 4,
        ease: "easeOutBack",
      })
      .fadeOut(config.duration / 12)
      .duration(config.duration / 4)
      .forUsers(users)
      .screenSpaceAboveUI()
      .zIndex(-2)
      //BG end
      .effect()
      .syncGroup(`disgaea-7-crit-${actor.uuid}`)
      .shape("rectangle", {
        //isMask: true,
        width: width * widthPercent,
        height: height,
        fillColor: game.user.color.css,
        fillAlpha: 1,
      })
      .screenSpace()
      .screenSpacePosition({
        x: 0,
        y: 0,
      })
      .screenSpaceAnchor({
        x: 0.05,
        y: 0,
      })
      .opacity(0.5)
      .fadeIn(config.duration / 4, { ease: "easeOutQuint" })
      .animateProperty("spriteContainer", "scale.x", {
        from: 1,
        to: 0,
        duration: config.duration / 4,
        fromEnd: true,
      })
      .animateProperty("spriteContainer", "position.x", {
        from: 0,
        to: (width * widthPercent) / 2,
        screenSpace: true,
        duration: config.duration / 4,
        fromEnd: true,
      })
      .screenSpaceAboveUI()
      .zIndex(-1)
      .delay((config.duration * 0.9) / 4)
      .forUsers(users)
      .duration(config.duration * 0.775)
      //Mask + image
      .effect()
      .syncGroup(`disgaea-7-crit-${actor.uuid}`)
      .file(config.art, {
        antialiasing: 1,
      })
      .scale((height / imgHeight) * 0.75 * config.scale)
      .spriteOffset({
        x: (width * widthPercent) / 2,
        y: imgHeight / 4,
      })
      .spriteRotation(config.rotation)
      .zIndex(0)
      .shape("rectangle", {
        isMask: true,
        width: width * widthPercent,
        height: height * 2,
        offset: { x: 0, y: -height },
      })
      .animateProperty("sprite", "position.x", {
        from: config?.offset?.x ?? 0,
        to: config?.offset?.x ?? 0,
        duration: config.duration,
        screenSpace: true,
      })
      .animateProperty("sprite", "position.y", {
        from: -1,
        to: 0,
        screenSpace: true,
        duration: config.duration / 4,
        ease: "easeOutBack",
      })
      .animateProperty("spriteContainer", "scale.x", {
        from: 1 + (config?.offset?.y ?? 0),
        to: config?.offset?.y ?? 0,
        duration: config.duration / 4,
        fromEnd: true,
      })
      .animateProperty("spriteContainer", "position.x", {
        from: 0,
        to: (width * widthPercent) / 2,
        duration: config.duration / 4,
        fromEnd: true,
      })
      .screenSpace()
      /*.screenSpaceScale({
        x: 1.0,         // Scale on the effect's X scale
        y: 2.0,         // Scale on the effect's Y scale
        fitX: false,    // Causes the effect to set its width to fit the width of the screen
        fitY: true,    // Causes the effect to set its height to fit the height of the screen
        ratioX: true,  // If Y is scaled, setting this to true will preserve the width/height ratio
        ratioY: false   // If X is scaled, setting this to true will preserve the height/width ratio
    })*/
      .screenSpacePosition({
        x: 0,
        y: 0,
      })
      .screenSpaceAnchor({
        x: 0.05,
        y: 0.5,
      })
      .screenSpaceAboveUI()
      .forUsers(users)
      .duration(config.duration)
      //Sound
      .sound()
      .file(config.sfx)
      .fadeOutAudio(config.duration / 4)
      .volume(config.volume)
      .forUsers(users)
      .delay(config.delay)
      .play({ preload: true });
  };
}
