export const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' || 
              window.location.hostname.startsWith('192.168.') || 
              window.location.protocol === 'file:';

export function log(message) {
    if (isDev) {
        console.log(message);
    }
}

export function warn(message) {
    if (isDev) {
        console.warn(message);
    }
}

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