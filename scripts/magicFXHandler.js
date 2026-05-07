import { MODULE_ID } from "./lib/const.js";
import { isTokenMagicActive } from "./lib/misc.js";

export function setupTokenMagicFX() {
  if (
    game.user.isGM &&
    isTokenMagicActive() &&
    game.settings.get(
      MODULE_ID,
      "token-magic-fx.ask-disable-template-handling",
    ) &&
    game.settings.get("tokenmagic", "autoTemplateEnabled")
  ) {
    game.settings.set(
      MODULE_ID,
      "token-magic-fx.ask-disable-template-handling",
      false,
    );
    dialogToDisableTemplates();
  }
}

async function dialogToDisableTemplates() {
  const proceed = await foundry.applications.api.DialogV2.confirm({
    window: {
      title: game.i18n.localize(
        "genga.dialogue.token-magic-fx.disable-template-filters.title",
      ),
    },
    content: game.i18n.localize(
      "genga.dialogue.token-magic-fx.disable-template-filters.content",
    ),
    rejectClose: true,
    modal: true,
  });
  if (proceed) {
    game.settings.set("tokenmagic", "autoTemplateEnabled", false);
    ui.notification.info(
      game.i18n.localize(
        "genga.dialogue.token-magic-fx.disable-template-filters.notification.yes",
      ),
    );
  } else {
    ui.notification.info(
      game.i18n.localize(
        "genga.dialogue.token-magic-fx.disable-template-filters.notification.no",
      ),
    );
  }
}
