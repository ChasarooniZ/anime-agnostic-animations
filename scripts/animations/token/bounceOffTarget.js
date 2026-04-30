import { CONST, MODULE_ID } from "../../lib/const.js";
import { getVisibleUsers } from "../../lib/misc.js";

export async function bounceOffTarget(token, target, delay, filter = {}) {
    const users = getVisibleUsers(target);

    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        //Burst FX
        .effect()
        .delay(delay)
        .atLocation(target)
        .rotateTowards(token, { rotationOffset: CONST.BOUNCE.ROTATION.OPPOSITE })
        .file("jb2a.impact.008.orange")
        .filter("ColorMatrix", filter)
        .scaleToObject()
        .anchor(CONST.BOUNCE.ANCHOR.BURST)
        .mirrorX()
        .waitUntilFinished(CONST.BOUNCE.DELAY_FINISH.SPARK)
        .forUsers(users)
        //Spark Left
        .effect()
        .atLocation(target)
        .file("jb2a.melee_generic.piercing.two_handed")
        .filter("ColorMatrix", filter)
        .rotateTowards(token, { rotationOffset: CONST.BOUNCE.ROTATION.OPPOSITE - CONST.BOUNCE.ROTATION.OFFSET })
        .scaleToObject(CONST.BOUNCE.SIZE_MULT.SPARK)
        .mirrorY()
        .spriteAnchor(CONST.BOUNCE.ANCHOR.SPARK)
        .forUsers(users)
        //Spark Right
        .effect()
        .atLocation(target)
        .file("jb2a.melee_generic.piercing.two_handed")
        .filter("ColorMatrix", filter)
        .rotateTowards(token, { rotationOffset: CONST.BOUNCE.ROTATION.OPPOSITE + CONST.BOUNCE.ROTATION.OFFSET })
        .scaleToObject(CONST.BOUNCE.SIZE_MULT.SPARK)
        .spriteAnchor(CONST.BOUNCE.ANCHOR.SPARK)
        .forUsers(users)
        .play({ preload: true });
}