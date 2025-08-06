import { MODULE_ID } from "../../lib/const.js";

const FILE = {
    CRISIS: {
        BG: "modules/genga/assets/darkest-dungeon/DD_CRISIS_BG.webp",
        FG: "modules/genga/assets/darkest-dungeon/DD_CRISIS_FG.webp"
    },
    VIRTUE: {
        BG: "modules/genga/assets/darkest-dungeon/DD_VIRTUE_BG.webp",
        FG: "modules/genga/assets/darkest-dungeon/DD_VIRTUE_FG.webp"
    }
}

export async function darkestDungeonVirtueCrit(actor, users, config) {
    darkestDungeonCrit(actor, "VIRTUE", users, config);
}


export async function darkestDungeonCrisisCrit(actor, users, config) {
    darkestDungeonCrit(actor, "CRISIS", users, config);
}


function darkestDungeonCrit(actor, type, users, config) {
    const duration = config.duration;
    const characterScale = 0.8 * config.scale;
    const positioning = {
        x: 0.5 + (config?.offset?.x ?? 0),
        y: 0.5 + (config?.offset?.y ?? 0)
    }

    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        //Aura
        .effect()
        .file(FILE[type].BG)
        .screenSpace()
        .screenSpaceAboveUI()
        .screenSpaceScale({ fitY: true, ratioX: true })
        .duration(duration)
        .fadeIn(duration / 4, { ease: "easeOutSine" })
        .fadeOut(duration / 8, { ease: "easeInQuint" })
        .delay(config.delay)
        .zIndex(1)
        .forUsers(users)
        //Symbol
        .effect()
        .file(FILE[type].FG)
        .screenSpace()
        .screenSpaceAboveUI()
        .screenSpaceScale({ fitY: true, ratioX: true })
        .duration(duration)
        .fadeIn(duration / 4, { ease: "easeOutSine" })
        .fadeOut(duration / 8, { ease: "easeInQuint" })
        .delay(config.delay)
        .zIndex(2)
        .forUsers(users)
        // Character
        .effect()
        .file(config.art)
        .screenSpace()
        .screenSpaceAboveUI()
        .screenSpaceScale({ x: characterScale, y: characterScale, fitY: true, ratioX: true })
        .screenSpaceAnchor(positioning)
        .duration(duration)
        .spriteRotation(config.rotation)
        .fadeIn(duration / 4, { ease: "easeOutSine" })
        .fadeOut(duration / 8, { ease: "easeInQuint" })
        .delay(config.delay)
        .zIndex(3)
        .forUsers(users)
        //Sound
        .sound()
        .file(config.sfx)
        .fadeOutAudio(config.duration / 4)
        .volume(config.volume)
        .forUsers(users)
        .delay(config.delay)
        .forUsers(users)

        .play({ preload: true })

}