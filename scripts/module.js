import { setupAPI } from "./api.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  setupAPI();
});
