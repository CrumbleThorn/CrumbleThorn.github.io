// TO DO: Implement responsive design
export function responsiveDesignChecker() {
    if (!util.isLandscape() || util.isLowResolution())
        util.log("TO DO: Toggle Mobile Mode!");
    else
        util.log("TO DO: Toggle PC Mode!");
}