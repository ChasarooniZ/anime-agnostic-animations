import { demonSlayerTransition } from "./animations/demon-slayer-transition.js";
import { endCredits } from "./animations/endCredits.js";
import { jojoMenacingScreenSize } from "./animations/jojo-menacing-screen-size.js";

export function setupAPI() {
  game.genga = {
    api: {
      demonSlayerTransition: demonSlayerTransition,
      jojoMenacingScreenSize: jojoMenacingScreenSize,
      endCredits: endCredits,
    },
  };
}
