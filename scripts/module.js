import { setupAPI } from "./api.js";
import { setupSocket } from "./lib/socket.js";
import { setupTokenMagicFX } from "./magicFXHandler.js";
import { setupSettings } from "./settings.js";

Hooks.once("init", async function () { });

Hooks.once("setup", function () {
  setupSettings()
  if (!setupSocket())
    console.error("Error: Unable to set up socketlib for Genga");
});

Hooks.once("ready", async function () {
  setupTokenMagicFX()
  setupAPI();
});
