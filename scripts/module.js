import { setupAPI } from "./api.js";
import { setupSocket } from "./lib/socket.js";

Hooks.once("init", async function () { });

Hooks.once("setup", function () {
  if (!setupSocket())
    console.error("Error: Unable to set up socketlib for Genga");
});

Hooks.once("ready", async function () {
  setupAPI();
});
