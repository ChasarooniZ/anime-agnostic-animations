import { MODULE_ID } from "../lib/const.js";
import { getVisibleUsers } from "../lib/misc.js";

const STRESS_IMG = "modules/genga/assets/darkest-dungeon/DD_STRESS.webp";
const RELIEF_IMG = "modules/genga/assets/darkest-dungeon/DD_VIRTUE_FG.webp";

const STRESS_SFX = "modules/genga/assets/darkest-dungeon/BNA_UI4.ogg";
const RELIEF_SFX = "modules/genga/assets/darkest-dungeon/Fantasy_UI_Vol_(18).ogg";

export function darkestDungeonStress(tokens, config) {
    const isStress = config?.isStress ?? true
    const duration = config?.duration || 1500;
    const delayPerToken = config?.delayPerToken ?? 150;
    const volume = config?.volume ?? 1;



    const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
    for (const [index, tok] of tokens.entries()) {
        const users = getVisibleUsers(tok);
        seq
            .effect()
            .file(isStress ? STRESS_IMG : RELIEF_IMG)
            .atLocation(tok)
            .scaleToObject(1.5)
            .scaleIn(isStress ? 1.5 : 0.25, duration / 6)
            .fadeIn(duration / 6 / 3)
            .fadeOut(duration / 4)
            .duration(duration)
            .delay(delayPerToken * index)
            .loopProperty("sprite", "scale.x", { from: 1, to: 1.05, delay: duration / 6, duration: 300, pingPong: true })
            .loopProperty("sprite", "scale.y", { from: 1, to: 1.05, delay: duration / 6, duration: 300, pingPong: true })
            .forUsers(users)
            .sound()
            .file(isStress ? STRESS_SFX : RELIEF_SFX)
            .volume(volume)
            .delay(delayPerToken * index)
            .forUsers(users)
    }
    seq.play({ preload: true });
}