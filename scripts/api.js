import { darkestDungeonCrisisCrit, darkestDungeonVirtueCrit } from "./animations/crits/darkestDungeonCrit.js";
import { disgaea7Crit } from "./animations/crits/disgaea7Crit.js";
import { fireEmblemAwakeningCrit } from "./animations/crits/fireEmblemAwakeningCrit.js";
import { fullscreenCrit } from "./animations/crits/fullscreenCrit.js";
import { persona5Crit } from "./animations/crits/persona5Crit.js";
import { demonSlayerTransition } from "./animations/demon-slayer-transition.js";
import { endCredits } from "./animations/endCredits.js";
import { eldenRingDeath } from "./animations/fromSoftwareText/deathEldenRing.js";
import { sekiroDeath } from "./animations/fromSoftwareText/deathSekiro.js";
import { eldenRingNounVerbed } from "./animations/fromSoftwareText/nounVerbedEldenRing.js";
import { jojoMenacingScreenSize } from "./animations/jojo-menacing-screen-size.js";
import { toBeContinued } from "./animations/to-be-continued.js";
import { DEFAULT_CRIT_CONFIG } from "./lib/const.js";

export function setupAPI() {
  game.genga = {
    api: {
      demonSlayerTransition: demonSlayerTransition,
      jojoMenacingScreenSize: jojoMenacingScreenSize,
      endCredits: endCredits,
      toBeContinued: toBeContinued,
      crit: {
        darkestDungeon: {
          crisis: (actor, users, config) =>
            darkestDungeonCrisisCrit(
              actor,
              users || [...game.users.keys()],
              config || DEFAULT_CRIT_CONFIG
            ),
          virtue: (actor, users, config) =>
            darkestDungeonVirtueCrit(
              actor,
              users || [...game.users.keys()],
              config || DEFAULT_CRIT_CONFIG
            ),
        },
        disgaea7: (actor, users, config) =>
          disgaea7Crit(
            actor,
            users || [...game.users.keys()],
            config || DEFAULT_CRIT_CONFIG
          ),
        fireEmblemAwakening: (actor, users, config) =>
          fireEmblemAwakeningCrit(
            actor,
            users || [...game.users.keys()],
            config || DEFAULT_CRIT_CONFIG
          ),
        fullscreen: (actor, users, config) =>
          fullscreenCrit(
            actor,
            users || [...game.users.keys()],
            config || DEFAULT_CRIT_CONFIG
          ),
        persona5: (actor, users, config) =>
          persona5Crit(
            actor,
            users || [...game.users.keys()],
            config || DEFAULT_CRIT_CONFIG
          ),
      },
      fromSoftware: {
        death: {
          eldenRing: eldenRingDeath,
          sekiro: sekiroDeath,
        },
        nounVerbed: {
          eldenRing: eldenRingNounVerbed,
        },
      },
    },
  };
}
