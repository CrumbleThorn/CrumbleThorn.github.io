import * as util from './util.js';

// TO DO: Implement responsive design
export function responsiveDesignChecker() {
    if (!util.isLandscape() || util.isLowResolution())
        util.log("TO DO: Toggle Mobile Mode!", util.LogType.WARNING);
    else
        util.log("TO DO: Toggle PC Mode!", util.LogType.WARNING);
}