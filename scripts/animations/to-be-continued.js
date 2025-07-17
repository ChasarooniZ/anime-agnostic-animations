import { MODULE_ID } from "../lib/const.js";

const tbc = "modules/genga/assets/to-be-continued/TBC.webp";

export async function toBeContinued(cfg) {
  const duration = cfg?.duration ?? 1500;
  const delay = cfg?.delay ?? (43.4 + 1) * 1000;
  const scaleMod = cfg?.scale ?? 1;
  const waitDuration = cfg?.waitDuration ?? 2000;
  const song = cfg?.song ?? "";
  const volume = cfg?.volume ?? 0.7;

  const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title });
  const doFilter = true;
  const isActive =
    document.body.style.filter === "sepia(100%)" ||
    !!Sequencer.SoundManager.getSounds({ name: "tbc_song" }).length;

  if (isActive) {
    socketlib.modules.get(MODULE_ID)
      .executeForEveryone("sepiaScreen", false);
    Sequencer.SoundManager.endSounds({ name: "tbc_song" });
    return;
  }

  return seq
    .sound()
    .name("tbc_song")
    .file(song)
    .volume(volume)
    .wait(Math.max(delay - 300, 1))
    .thenDo(function () {
      if (doFilter) {
        socketlib.modules.get(MODULE_ID)
          .executeForEveryone("sepiaScreen", true);
      }
    })
    .wait(300)
    .effect()
    .name("tbc_arrow")
    .file(tbc)
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor({ x: 0.07, y: 0.9 })
    .screenSpaceScale({
      x: 0.3 * scaleMod,
      y: 0.3 * scaleMod,
      fitX: true,
      ratioY: true,
    })
    .anchor({ x: 0, y: 0.5 })
    .animateProperty("sprite", "position.x", {
      from: 2.5,
      to: 0,
      duration,
      ease: "easeOutQuint",
      screenSpace: true,
    })
    .duration(duration + waitDuration)
    .play({ preload: true });
}

/**
 * Set Screen to sepia
 * @param {boolean} activateFilter 
 */
export function sepiaScreen(activateFilter) {
  document.body.style.filter = activateFilter ? "sepia(100%)" : "";
}