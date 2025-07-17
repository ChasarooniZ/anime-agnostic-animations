import { sepiaScreen } from "../animations/to-be-continued.js";
import { MODULE_ID } from "./const.js";

let socketlibSocket = undefined;
// Taken by Reference from Pf2e Action Support
export const setupSocket = () => {
    if (globalThis.socketlib) {
        socketlibSocket = globalThis.socketlib.registerModule(MODULE_ID);
        socketlibSocket.register("sepiaScreen", sepiaScreen);
    }
    return !!globalThis.socketlib;
};

