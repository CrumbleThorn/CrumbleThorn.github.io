// Modify this to toggle certain logs on or off!
export const verbose = false;

export const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' || 
              window.location.hostname.startsWith('192.168.') || 
              window.location.protocol === 'file:';

export const css = {
    global: {
        inherit: 'inherit',
        initial: 'initial',
        revert: 'revert',
        revertLayer: 'revert-layer',
        unset: 'unset',
        },
    display: {
        block: 'block',
        inline: 'inline',
        inlineBlock: 'inline-block',
        flex: 'flex',
        inlineFlex: 'inline-flex',
        grid: 'grid',
        inlineGrid: 'inline-grid',
        flowRoot: 'flow-root',
        none: 'none',
        contents: 'contents',
        table: 'table',
        tableRow: 'table-row',
        listItem: 'list-item',
        },
    scrollBehavior: {
        auto: 'auto',
        smooth: 'smooth',
        },
    siteClasses: {
        noScroll: 'no-scroll',
        },
};

export function log(message, verboseOnly = false) {
    if (isDev) {
        if (!verboseOnly && !verbose) {
            console.log(message);
        }
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

export function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}

export function getResource(uri) {
    return fetch(uri)
        .then(response => {
            if (response.status === 200) {
                return response.text();
            } else {
                return Promise.reject(new Error(`Failed to load ${uri} with status ${response.status}`));
            }
        });
}

export function removeClassesByPrefix (obj, prefix) {
    const classes = obj.className.split(' ').filter(c => !c.startsWith(prefix));
    obj.className = classes.join(' ').trim();
}