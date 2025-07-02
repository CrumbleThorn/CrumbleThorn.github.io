import * as animate from './animate.js';
import * as anim from './animations.js';
import * as util from './util.js';

// Instantiates global list if it doesn't exist yet
if (!Object.hasOwn(window, 'loadedDOMS')) {
    window.loadedDOMS = {};
}

export const templateList = {
    // Internal Components
    dropdownTemplate: 'dropdown',
    horizontalBarTemplate: 'horizontalbar',
    progressbarTemplate: 'progressbar',
    slideshowTemplate: 'slideshow',
    verticalbarTemplate: 'verticalbar',
    // Singleton Components
    loadingScreenTemplate: 'loadingscreen',
    navbarTemplate: 'navbar',
    sidebarTemplate: 'sidebar',
    backgroundTemplate: 'background',
    footerTemplate: 'footer',
    heroTemplate: 'hero',
    // Containers and External Components
    centerCardTemplate: 'centercard',
    cardTemplate: 'card',
    modalTemplate: 'modal',
};

const templateEvents = {
    templateLoaded: 'templateLoaded',
    loadingScreenReady: 'loadingScreenReady',
}

const templateType = {
    singleton: 'singletons/',
    subcomponent: 'subcomponents/',
    standard: ''
}

function addToLoadedDOMS(key, value) {
    if (Object.hasOwn(loadedDOMS, key)) {
        loadedDOMS[key].push(value)
    } else {
        loadedDOMS[key] = [value];
    }
    value.dispatchEvent(new Event(templateEvents.templateLoaded, {
        bubbles: true,
        composed: true,
    }));
}

function constructURL(template, type) {
    return 'components/' + type + template + '.html';
}

// TO DO: base all templates to this template class
// Base Template Class
class HTMLTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }
}

// Singleton Templates
class BackgroundTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.backgroundTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class FooterTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.footerTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class HeroTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.heroTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            const heroContent = this.#shadow.host.innerHTML;
            this.#shadow.host.innerHTML = '';
            this.#shadow.innerHTML = html;
            this.#shadow.getElementById(util.css.siteElements.heroContent).innerHTML = heroContent;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class LoadingScreenTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.loadingScreenTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
            this.dispatchEvent(new Event(templateEvents.loadingScreenReady, {
                bubbles: true,
                composed: true,
            }));
        });
    }
}

class NavBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.navbarTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    #intiializeNavbarLabel() {
        let html = '';
        const navbarLabel = this.#shadow.getElementById(util.css.siteElements.navbarLabel);

        if (this.dataset.logoSrc != undefined) {
            html += '<img class="' + util.css.siteClasses.navbarLogo + '" src="' + this.dataset.logoSrc +'" id="' + util.css.siteElements.navbarLogo + '">\n';
        } else if (this.dataset.logoId != undefined) {
            const navbarLogo = this.getElementById(util.css.siteElements.navbarLogo);
            html += navbarLogo.outerHTML;
            navbarLogo.outerHTML = '';
        }

        if ((this.dataset.title != undefined || this.dataset.titleId != undefined) && (this.dataset.logoSrc != undefined || this.dataset.logoId != undefined)) {
            html += '<'+ templateList.verticalbarTemplate + suffix + ' id="' + util.css.siteElements.navbarLabelDivider + '"></' + templateList.verticalbarTemplate + suffix + '>\n';
        }
        
        if (this.dataset.title != undefined) {
            html += '<div class="' + util.css.siteClasses.navbarTitle + '" id="' + util.css.siteElements.navbarTitle + '">' + this.dataset.title + '</div>\n';
        } else if (this.dataset.titleId != undefined) {
            const navbarTitle = this.getElementById(util.css.siteElements.navbarTitle);
            html += navbarTitle.outerHTML;
            navbarTitle.outerHTML = '';
        }

        navbarLabel.innerHTML = html;
    }

    #populateNavbarMenu() {
        let html = '';
        const navbarMenu = this.#shadow.getElementById(util.css.siteElements.navbarMenu);
        
        for (let ctr = 1; this.dataset['menuitem' + ctr.toString()] != undefined; ctr++) {
            if (ctr > 1) {
                html += '<'+ templateList.verticalbarTemplate + suffix + ' id="' + util.css.siteElements.navbarLabelDivider + '"></' + templateList.verticalbarTemplate + suffix + '>\n';
            }
            let linkDetails = this.dataset['menuitem' + ctr.toString()].split(' ');

            if (linkDetails.length == 1) {
                html += '<div class="' + util.css.siteClasses.navbarCurrent + '">' + linkDetails[0] + '</div>\n';
            } else if (linkDetails.length == 2) {
                html += '<a class="' + util.css.siteClasses.navbarLink + '" href="' + linkDetails[1] + '">' + linkDetails[0] + '</a>\n';
            } else {
                // TO DO: Implement Dropdown
            }
        }

        navbarMenu.innerHTML = html
    }

    #initializeNavbar() {
        util.log(this.dataset, true);

        // TO DO: Initialize Burger menu Button
        if (this.dataset.sidebarId != undefined) {
            const navbarBurger = this.#shadow.getElementById(util.css.siteElements.navbarBurger);
            //navbarBurger.classList.remove(util.css.siteClasses.hidden);
        }

        this.#intiializeNavbarLabel();
        this.#populateNavbarMenu();
        
        // Initialize Navbar Progress Bar
        if (this.dataset.progressbarStartId) {
            const navbar = this.#shadow.getElementById(util.css.siteElements.navbar);
            navbar.innerHTML += '<'+ templateList.progressbarTemplate + suffix + ' id="' + util.css.siteElements.navbarProgressBar + '"></' + templateList.progressbarTemplate + suffix + '>\n';
        }
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            this.#shadow.innerHTML += html;
            this.#initializeNavbar();
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class SideBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.sidebarTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

// Container Templates
class CardTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.cardTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.standard)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}



class CenterCardTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.centerCardTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.standard)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class ModalTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.modalTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.standard)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

// Internal Components
class DropdownTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.dropdownTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.subcomponent)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class HorizontalBarTemplate extends HTMLElement {
    #name;
    constructor() {
        super();
        this.#name = templateList.horizontalBarTemplate;
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.subcomponent)).then(html => {
            this.outerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class ProgressBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.progressbarTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.subcomponent)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
        
    }
}

class SlideshowTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.slideshowTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.subcomponent)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class VerticalBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.verticalbarTemplate;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, templateType.subcomponent)).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

const suffix = '-template';

const templateDefinitions = {
    // Internal Components
    dropdownTemplate: DropdownTemplate,
    horizontalBarTemplate: HorizontalBarTemplate,
    progressbarTemplate: ProgressBarTemplate,
    slideshowTemplate: SlideshowTemplate,
    verticalbarTemplate: VerticalBarTemplate,
    // Singleton Components
    loadingScreenTemplate: LoadingScreenTemplate,
    navbarTemplate: NavBarTemplate,
    sidebarTemplate: SideBarTemplate,
    backgroundTemplate: BackgroundTemplate,
    footerTemplate: FooterTemplate,
    heroTemplate: HeroTemplate,
    // Containers and External Components
    centerCardTemplate: CenterCardTemplate,
    cardTemplate: CardTemplate,
    modalTemplate: ModalTemplate,
};

export function loadTemplate(templateName, definition) {
    customElements.define(templateName, definition);
}

export function loadAllTemplates() {
    for (const template in templateList) {
        loadTemplate(templateList[template] + suffix, templateDefinitions[template]);
    }
    util.log("Templates Loaded!");
}