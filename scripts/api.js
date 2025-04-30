import { demonSlayerTransition } from "./animations/demon-slayer-transition.js";

export function setupAPI() {
  game.genga = {
    api: {
      demonSlayerTransition: demonSlayerTransition,
    },
  };
}
