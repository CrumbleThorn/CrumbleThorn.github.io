/**
 * @file Provides reusable utility functions for the website.
 * @author CrumbleThorn <https://github.com/crumblethorn>
 * @license MPL-2.0
*/

/**
 * The log type for determining verbosity.
 * @readonly
 * @enum {number}
 */
export const LogType = Object.freeze({
    DEFAULT: 0,
    FATAL: 1,
    ERROR: 2,
    WARNING: 3,
    INFO: 4,
    DEBUG: 5,
    VERBOSE: 6,
});

/**
 * Determines which logs will be displayed in the console. Higher verbosity means more logs will be shown in the console.
 * - <0: None - No logs will be displayed.
 * -  0: Default - Only displays logs without verbosity.
 * -  1: Fatal/Critical - Displays logs resulting from crashes or unrecoverable errors.
 * -  2: Error - Displays logs resulting from errors that affect functionality.
 * -  3: Warning - Displays logs that may result in unexpected behavior.
 * -  4: Info -  Displays logs related to application flow.
 * -  5: Debug - Displays logs related to diagnostics and troubleshooting.
 * - >5: Verbose - Displays all logs.
 * @constant
 * @type {number}
 */
const LOG_VERBOSITY = LogType.DEFAULT;

/**
 * Determines if the stack trace will be always displayed with the log regardless of the setting passed to the log() function.
 * @constant
 * @type {number}
 */
const LOG_TRACING = false;

/**
 * The scroll events used by the DirectionalScrollManager.
 * @readonly
 * @enum {string}
 */
export const ScrollEvents = Object.freeze({
    SCROLL: 'scroll',
    SCROLL_DOWN: 'scrollDown',
    SCROLL_UP: 'scrollUp',
    SCROLL_RIGHT: 'scrollRight',
    SCROLL_LEFT: 'scrollLeft',
});

/**
 * Flag used to determine if the website is loaded in Developer Mode.
 * @readonly
 * @const {boolean}
 */
export const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' || 
              window.location.hostname.startsWith('192.168.') || 
              window.location.protocol === 'file:';

/**
 * Various CSS-related strings used in the website. Add to this list instead of directly assigning
 * strings for ease of referencing.
 * @readonly
 * @enum {object}
 */
export const css = Object.freeze({
    /**
     * Global CSS Styles.
     * @readonly
     * @enum {string}
     */
    Global: Object.freeze({
        inherit: 'inherit',
        initial: 'initial',
        revert: 'revert',
        revertLayer: 'revert-layer',
        unset: 'unset',
        }),
    /**
     * CSS Styles related to display.
     * @readonly
     * @enum {string}
     */
    Display: Object.freeze({
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
        }),
    /**
     * CSS Styles related to scrollBehavior.
     * @readonly
     * @enum {string}
     */
    ScrollBehavior: Object.freeze({
        auto: 'auto',
        smooth: 'smooth',
        }),
    /**
     * Custom CSS Colors.
     * @readonly
     * @enum {string}
     */
    SiteColor: Object.freeze({ 
        cillyBlue: 'var(--cilly-blue)',
        cillyDarkBlue: 'var(--cilly-darkblue)',
        cillyDarkBlueOverlay: 'var(--cilly-darkblue-overlay)',
        cillyAccentBlue: 'var(--cilly-accentblue)',
        cillyAccentGray: 'var(--cilly-accentgray)',
        cillyAccentGrayOverlay: 'var(--cilly-accentgray-overlay)',
        cillyWhite: 'var(--cilly-white)',
        cillyJetBlack: 'var(--cilly-jetblack)',
        cillyBlack: 'var(--cilly-black)',
        cillyRoyalPurple: 'var(--cilly-royalpurple)',
        }),
    /**
     * Custom CSS Font classes.
     * @readonly
     * @enum {string}
     */
    SiteFont: Object.freeze({
        // Font family classes
        notoSansTagalog: 'noto-sans-tagalog',
        nunito: 'nunito',
        saira: 'saira',
        sourceCodePro: 'source-code-pro',
        ubuntu: 'ubuntu',
        // Font style classes
        italic: 'italic',
        // Font weight classes
        light: 'light',
        regular: 'regular',
        medium: 'medium',
        semibold: 'semibold',
        bold: 'bold',
        // Font width classes
        semicondensed: 'semicondensed',
        condensed: 'condensed',
        semiexpanded: 'semiexpanded',
    }),
    /**
     * Custom CSS Classes used throughout the website.
     * @readonly
     * @enum {string}
     */
    SiteClass: Object.freeze({
        // Global classes
        content: 'content',
        hidden: 'hidden',
        noScroll: 'no-scroll',
        unselectable: 'unselectable',
        // Background classes
        siteOverlay: 'overlay',
        siteBackground: 'background',
        // Center Card Classes
        centercard: 'centercard',
        centercardContent: 'centercard-content',
        endcard: 'endcard',
        endcardContent: 'endcard-content',
        // Dropdown Classes
        dropdown: 'dropdown',
        dropdownItem: 'dropdown-item',
        navbarDropdown: 'navbar-dropdown',
        // Footer Classes
        footer: 'footer',
        footerContent: 'footer-content',
        // Hero Classes
        hero: 'hero',
        heroBackground: 'hero-background',
        heroText: 'hero-title',
        heroContent: 'hero-content',
        heroImage: 'hero-image',
        // Horizontal Bar Classes
        horizontalSpacer: 'horizontal-spacer',
        topbar: 'topbar',
        bottombar: 'bottombar',
        // Loading Screen Classes
        loadingscreen: 'loadingscreen',
        loadingAnimation: 'loading-animation',
        // Modal Classes
        modal: 'modal',
        modalContent: 'modal-content',
        // Navbar Classes
        navbar: 'navbar',
        navbarContent: 'navbar-content',
        navbarLogo: 'navbar-logo',
        navbarTitle: 'navbar-title',
        navbarLabel: 'navbar-label',
        navbarLabelDivider: 'navbar-label-divider',
        navbarBurger: 'navbar-burger',
        navbarMenu: 'navbar-menu',
        navbarMenuItem: 'navbar-menu-item',
        navbarCurrent: 'navbar-current',
        navbarLink: 'navbar-link',
        // Progress Bar Classes
        progressbarContainer: 'progressbar-container',
        progressbar: 'progressbar',
        // Sidebar Classes
        sidebar: 'sidebar',
        sidebarTitle: 'sidebar-title',
        sidebarContent: 'sidebar-content',
        sidebarSection: 'sidebar-section',
        sidebarDrawer: 'sidebar-drawer',
        sidebarLabel: 'sidebar-label',
        sidebarItem: 'sidebar-item',
        sidebarLink: 'sidebar-link',
        // Side Card Classes
        card: 'card',
        cardContent: 'card-content',
        cardContentLeft: 'card-content-left',
        cardContentRight: 'card-content-right',
        sidecard: 'sidecard',
        sidecardLeft: 'sidecard-left',
        sidecardRight: 'sidecard-right',
        sidecardContent: 'sidecard-content',
        // Slideshow Classes
        slideshow: 'slideshow',
        slideshowWindow: 'slideshow-window',
        slideshowControls: 'slideshow-controls',
        // Vertical Bar Classes
        verticalSpacer: 'vertical-spacer',
        leftbar: 'leftbar',
        rightbar: 'rightbar',
        }),
    /**
     * Custom CSS IDs used throughout the website.
     * @readonly
     * @enum {string}
     */
    SiteID: Object.freeze({
        siteOverlay: 'site-overlay',
        siteBackground: 'site-background',
        footer: 'footer',
        footerContent: 'footer-content',
        hero: 'hero',
        heroContent: 'hero-content',
        loadingscreen: 'loadingscreen',
        loadingAnimation: 'loading-animation',
        content: 'content',
        main: 'main',
        navbar: 'navbar',
        navbarContent: 'navbar-content',
        navbarBurger: 'navbar-burger',
        navbarLabel: 'navbar-label',
        navbarLogo: 'navbar-logo',
        navbarTitle: 'navbar-title',
        navbarMenu: 'navbar-menu',
        navbarProgressBar: 'navbar-progress-bar',
        sidebar: 'sidebar',
        sidebarContent: 'sidebar-content',
        sidebarTitle: 'sidebar-title',
        sidebarMenu: 'sidebar-menu',
    }),
});

function canLog(verbosity) {
    return (LOG_VERBOSITY > 0 && verbosity <= LOG_VERBOSITY) ||
            (LOG_VERBOSITY == 0 && verbosity == LOG_VERBOSITY) ||
            (LOG_VERBOSITY == LogType.VERBOSE);
}

/**
 * Outputs the provided message in the console when developer mode is active.
 * @param {object} message - The message to be sent to the console.
 * @param {LogType} [verbosity=LogType.DEFAULT] - The verbosity level of the message.
 *
*/
export function log(message, verbosity = LogType.DEFAULT, traceLogs = false) {
    if (isDev) {
        if (LOG_VERBOSITY >= LogType.VERBOSE) {
            console.trace(message);
        } else if (canLog(verbosity)) {
            if (LOG_TRACING || traceLogs) {
                console.trace(message);
            } else {
                console.log(message);
            }
        }
    }
}

/**
 * Outputs the provided warning in the console when developer mode is active.
 * @param {object} message - The message to be sent to the console.
 * @param {LogType} [verbosity=LogType.WARNING] - The verbosity level of the message.
 *
*/
export function warn(message, verbosity = LogType.WARNING) {
    if (isDev && canLog(verbosity)) {
        console.warn(message);
    }
}

/**
 * Outputs the provided error in the console when developer mode is active.
 * @param {object} message - The message to be sent to the console.
 * @param {LogType} [verbosity=LogType.ERROR] - The verbosity level of the message.
 *
*/
export function error(message, verbosity = LogType.ERROR) {
    if (isDev && canLog(verbosity)) {
        console.error(message);
    }
}

/**
 * Returns true if the window is in landscape mode (Width > Height).
 * @returns {boolean}
*/
export function isLandscape() {
    return window.innerWidth > window.innerHeight;
}


/**
 * Returns true if the window is determined to be low-resolution (<800px wide).
 * @returns {boolean}
*/
export function isLowResolution() {
    return window.innerWidth < 800;
}

/**
 * Scrolls to the very top of the web page.
*/
export function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}

/**
 * Scrolls the active window to the top-left corner of the selected element.
 * 
 * @param {Element} element - The element to scroll to.
 * @param {number} [offsetX=0] - Horizontal offset from the left of the element.
 * @param {number} [offsetY=0] - Vertical offset from the top of the element.
 *
*/
export function scrollTo(element, offsetY = 0, offsetX = 0) {
    window.scrollTo(element.getBoundingClientRect().left + window.scrollX + offsetX, element.getBoundingClientRect().top + window.scrollY + offsetY);
}

/**
 * Downloads the resource from the specified URL. Returns a Promise that resolves to a Response object.
 * 
 * @async
 * @param {string} url - The URL of the resource to be downloaded.
 * @returns {Promise}
 * @throws {Error} - Will throw an error if the resource was not successfully retrieved.
*/
export function getResource(url, type = Text) {
    return fetch(url)
        .then(response => {
            if (response.status === 200) {
                switch(type) {
                    case ArrayBuffer:
                        return response.arrayBuffer();
                    case Blob:
                        return response.blob();
                    case Uint8Array:
                        return response.bytes();
                    case FormData:
                        return response.formData();
                    case JSON:
                        return response.json();
                    case Text:
                        return response.text();
                }
            } else {
                return Promise.reject(new Error(`Failed to load ${url} with status ${response.status}`));
            }
        });
}

/**
 * Removes classes from an Element that begins with the provided prefix.
 * 
 * @param {Element} obj - The element to be modified.
 * @param {string} prefix - The prefix to be filtered.
*/
export function removeClassesByPrefix (obj, prefix) {
    const classes = obj.className.split(' ').filter(c => !c.startsWith(prefix));
    obj.className = classes.join(' ').trim();
}

/**
 * Singleton Manager class that dispatches directional scroll events.
 * @class
 * @singleton
*/
export class DirectionalScrollManager {
    #previousX;
    #previousY;
    constructor() {
        if (DirectionalScrollManager.instance) {
            return DirectionalScrollManager.instance;
        }
        this.#previousX = 0;
        this.#previousY = 0;
        DirectionalScrollManager.instance = this;
        window.addEventListener(ScrollEvents.SCROLL, () => {this.#update()});
    }

    #update() {
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;
        if (currentScrollY > this.#previousY) {
            window.dispatchEvent(new Event(ScrollEvents.SCROLL_DOWN));
        } else {
            window.dispatchEvent(new Event(ScrollEvents.SCROLL_UP));
        }

        if (currentScrollX > this.#previousX) {
            window.dispatchEvent(new Event(ScrollEvents.SCROLL_RIGHT));
        } else {
            window.dispatchEvent(new Event(ScrollEvents.SCROLL_LEFT));
        }

        this.#previousX = currentScrollX;
        this.#previousY = currentScrollY;
    }
}