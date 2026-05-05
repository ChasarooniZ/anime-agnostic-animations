import { MODULE_ID } from "./lib/const.js";

export function setupSettings() {
  game.settings.register(
    MODULE_ID,
    "token-magic-fx.ask-disable-template-handling",
    {
      name: "",
      hint: "",
      scope: "world",
      config: false,
      default: true,
      type: Boolean,
    },
  );
}
