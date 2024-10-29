export function isLandscape() {
    if (window.innerWidth - window.innerHeight > 0)
        return true;
    else
        return false;
}

export function isLowResolution() {
    if (window.innerWidth < 800)
        return true;
    else
        return false;
}

export function removeClassesByPrefix (obj, prefix) {
    const classes = obj.className.split(" ").filter(c => !c.startsWith(prefix));
    obj.className = classes.join(" ").trim();
}