// Modify this to toggle certain logs on or off!
export const verbose = true;

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
    siteColors: { 
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
        },
    siteClasses: {
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
        },
    siteElements: {
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
        navbarLogo: 'navbar-logo',
        navbarTitle: 'navbar-title',
        navbarMenu: 'navbar-menu',
        sidebar: 'sidebar',
        sidebarContent: 'sidebar-content',
        sidebarTitle: 'sidebar-title',
        sidebarMenu: 'sidebar-menu',
    },
};

export const scrollEvents = {
    scroll: 'scroll',
    scrollDown: 'scrollDown',
    scrollUp: 'scrollUp',
    scrollRight: 'scrollRight',
    scrollLeft: 'scrollLeft',
};

export function log(message, verboseOnly = false) {
    if (isDev) {
        if (!(verboseOnly && !verbose)) {
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
        window.addEventListener(scrollEvents.scroll, () => {this.update()});
    }

    update() {
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;
        if (currentScrollY > this.#previousY) {
            window.dispatchEvent(new Event(scrollEvents.scrollDown));
        } else {
            window.dispatchEvent(new Event(scrollEvents.scrollUp));
        }

        if (currentScrollX > this.#previousX) {
            window.dispatchEvent(new Event(scrollEvents.scrollRight));
        } else {
            window.dispatchEvent(new Event(scrollEvents.scrollLeft));
        }

        this.#previousX = currentScrollX;
        this.#previousY = currentScrollY;
    }
}