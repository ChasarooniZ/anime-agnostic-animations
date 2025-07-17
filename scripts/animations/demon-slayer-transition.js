import { MODULE_ID } from "../lib/const.js";
import { tokenImage } from "../lib/misc.js";

export async function demonSlayerTransition(
  config = {
    bg: "modules/genga/assets/demon-slayer-transitions/scuffed_DS_Transition_BG.webp",
    art: [],
    useCharacters: false,
    duration: 2500,
    sfx: "modules/genga/assets/demon-slayer-transitions/bongo-drum-roll.ogg",
    volume: 0.5,
    sfxDelay: 0,
  }
) {
  const { bg, art, useCharacters, duration, sfx, volume, sfxDelay } = config;
  let final_art = art;
  if (art.length === 0) {
    if (canvas.tokens.controlled.length > 0 && !useCharacters) {
      final_art = canvas.tokens.controlled.map((c) => tokenImage(c.document));
    } else {
      final_art = game.actors.party.members
        .filter((c) => c.type === "character")
        .map((c) => tokenImage(c.prototypeToken));
    }
  }

  const anchorAMT = Math.round((1 / (final_art.length + 1)) * 10) / 10;

  let seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
    .sound()
    .file(sfx)
    .volume(volume)
    .delay(sfxDelay)
    .effect()
    .file(bg)
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceScale({ fitX: true, ratioY: true })
    .duration(duration)
    .zIndex(0);
  let cnt = 1;
  for (const a of final_art) {
    seq
      .effect()
      .file(a)
      .screenSpace()
      .screenSpaceAboveUI()
      .screenSpaceScale({ fitY: true, ratioX: true })
      .screenSpaceAnchor({ x: anchorAMT * cnt + 1, y: 0.5 })
      .scale(0.4)
      .duration(duration)
      .animateProperty("effect", "position.x", {
        from: 0,
        to: -1.5,
        duration: duration,
        screenSpace: true,
      })
      .loopProperty("sprite", "rotation", {
        from: 30,
        to: -30,
        duration: 750,
        pingPong: true,
        ease: "easeOutExpo",
      })
      .zIndex(1);
    cnt++;
  }
  return seq.play({ preload: true });
}
