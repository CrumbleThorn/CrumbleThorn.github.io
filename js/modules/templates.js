import * as animate from './animate.js';
import * as anim from './animations.js';
import * as lottiefiles from './lottiefiles.js';
import * as ui from './ui.js';
import * as util from './util.js';

// Instantiates global list if it doesn't exist yet
if (!Object.hasOwn(window, 'loadedDOMS')) {
    window.loadedDOMs = {};
}

export const Template = Object.freeze({
    // Internal Components
    DROPDOWN: 'dropdown',
    HORIZONTAL_BAR: 'horizontalbar',
    PROGRESS_BAR: 'progressbar',
    SLIDESHOW: 'slideshow',
    VERTICAL_BAR: 'verticalbar',
    // Singleton Components
    LOADING_SCREEN: 'loadingscreen',
    NAVBAR: 'navbar',
    SIDEBAR: 'sidebar',
    BACKGROUND: 'background',
    FOOTER: 'footer',
    HERO: 'hero',
    // Containers and External Components
    CENTER_CARD: 'centercard',
    CARD: 'card',
    MODAL: 'modal',
});

const TemplateEvents = Object.freeze({
    TEMPLATE_LOADED: 'templateLoaded',
    LOADING_SCREEN_READY: 'loadingScreenReady',
})

const TemplateType = Object.freeze({
    SINGLETON: 'singletons',
    SUBCOMPONENT: 'subcomponents',
    STANDARD: '',
});

function addToLoadedDOMs(key, value) {
    if (Object.hasOwn(loadedDOMs, key)) {
        loadedDOMs[key].push(value)
    } else {
        loadedDOMs[key] = [value];
    }
    if (value instanceof HTMLElement) {
        value.dispatchEvent(new Event(TemplateEvents.TEMPLATE_LOADED, {
            bubbles: true,
            composed: true,
        }));
    } else {
        value.template.dispatchEvent(new Event(TemplateEvents.TEMPLATE_LOADED, {
            bubbles: true,
            composed: true,
        }));
    }
}

function templateCount(template) {
    if(Object.hasOwn(window.loadedDOMs, template)) {
        return Object.keys(window.loadedDOMs[template]).length;
    }
        else return 0;
}

function constructURL(template, type) {
    return 'components/' + type + '/' + template + '.html';
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
        this.#name = Template.BACKGROUND;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SINGLETON), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class FooterTemplate extends HTMLElement {
    #name;
    #ui;
    constructor() {
        super();
        this.#name = Template.FOOTER;
    }

    get name() {
        return this.#name;
    }

    get ui() {
        return this.#ui;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SINGLETON), Text).then(html => {
            this.innerHTML = html;
            //this.#ui = this.querySelector('#' + util.css.siteElements.footer);
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class HeroTemplate extends HTMLElement {
    #shadow;
    #name;
    #ui;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = Template.HERO;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        const heroContent = this.#shadow.host.innerHTML;
        this.#shadow.host.innerHTML = '';
        this.#shadow.innerHTML = html;
        this.#shadow.getElementById(util.css.SiteID.heroContent).innerHTML = heroContent;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SINGLETON), Text).then(html => {
            this.#initialize(html);
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class LoadingScreenTemplate extends HTMLElement {
    #name;
    #shadow;
    #ui;
    constructor() {
        super();
        this.#name = Template.LOADING_SCREEN;
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow.innerHTML = html;
        if (this.dataset.animationHref != undefined) {
            util.log("Using custom loading animation provided at " + this.dataset.animationHref);
            this.#ui = new ui.LoadingScreen(
                this.#shadow.getElementById(util.css.SiteID.loadingscreen),
                new lottiefiles.LottieContainer(
                    this.#shadow.getElementById(util.css.SiteID.loadingAnimation),
                    this.dataset.animationHref,
                ),
            );
        } else {
            this.#ui = new ui.LoadingScreen(this.#shadow.getElementById(util.css.SiteID.loadingscreen));
        }
        
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SINGLETON), Text).then(html => {
            this.#initialize(html);
            addToLoadedDOMs(
                this.#name,
                {
                    template: this,
                    ui: this.#ui,
                },
                 );
            this.dispatchEvent(new Event(TemplateEvents.LOADING_SCREEN_READY, {
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
        this.#name = Template.NAVBAR;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    #intiializeNavbarLabel() {
        let html = '';
        const navbarLabel = this.#shadow.getElementById(util.css.SiteID.navbarLabel);

        if (this.dataset.logoSrc != undefined) {
            html += '<img class="' + util.css.SiteClass.navbarLogo + '" src="' + this.dataset.logoSrc +'" id="' + util.css.SiteID.navbarLogo + '">\n';
        } else if (this.dataset.logoId != undefined) {
            const navbarLogo = this.getElementById(util.css.SiteID.navbarLogo);
            html += navbarLogo.outerHTML;
            navbarLogo.outerHTML = '';
        }

        if ((this.dataset.title != undefined || this.dataset.titleId != undefined) && (this.dataset.logoSrc != undefined || this.dataset.logoId != undefined)) {
            html += '<'+ Template.VERTICAL_BAR + suffix + ' class="' + util.css.SiteClass.navbarLabelDivider + '"></' + Template.VERTICAL_BAR + suffix + '>\n';
        }
        
        if (this.dataset.title != undefined) {
            html += '<div class="' + util.css.SiteClass.navbarTitle + " " + util.css.SiteFont.ubuntu + '" id="' + util.css.SiteID.navbarTitle + '">' + this.dataset.title + '</div>\n';
        } else if (this.dataset.titleId != undefined) {
            const navbarTitle = this.getElementById(util.css.SiteID.navbarTitle);
            html += navbarTitle.outerHTML;
            navbarTitle.outerHTML = '';
        }

        navbarLabel.innerHTML = html;
    }

    #populateNavbarMenu() {
        let html = '';
        const navbarMenu = this.#shadow.getElementById(util.css.SiteID.navbarMenu);
        
        for (let ctr = 1; this.dataset['menuitem' + ctr.toString()] != undefined; ctr++) {
            if (ctr > 1) {
                html += '<'+ Template.VERTICAL_BAR + suffix + ' class="' + util.css.SiteClass.navbarLabelDivider + '"></' + Template.VERTICAL_BAR + suffix + '>\n';
            }
            let linkDetails = this.dataset['menuitem' + ctr.toString()].split(' ');

            if (linkDetails.length == 1) {
                html += '<div class="' + util.css.SiteClass.navbarCurrent + " " + util.css.SiteFont.saira + " " + util.css.SiteFont.semibold + '">' + linkDetails[0] + '</div>\n';
            } else if (linkDetails.length == 2) {
                html += '<a class="' + util.css.SiteClass.navbarLink + " " + util.css.SiteFont.saira + " " + util.css.SiteFont.medium + '" href="' + linkDetails[1] + '">' + linkDetails[0] + '</a>\n';
            } else {
                // TO DO: Implement Dropdown
            }
        }

        navbarMenu.innerHTML = html
    }

    #initialize() {
        util.log(this.dataset, true);

        // TO DO: Initialize Burger menu Button
        if (this.dataset.sidebarId != undefined) {
            const navbarBurger = this.#shadow.getElementById(util.css.SiteID.navbarBurger);
            //navbarBurger.classList.remove(util.css.siteClasses.hidden);
        }

        this.#intiializeNavbarLabel();
        this.#populateNavbarMenu();
        
        // Initialize Navbar Progress Bar
        if (this.dataset.progressbarStartId) {
            const navbar = this.#shadow.getElementById(util.css.SiteID.navbar);
            navbar.innerHTML += '<'+ Template.PROGRESS_BAR + suffix + ' id="' + util.css.SiteID.navbarProgressBar + '"></' + Template.PROGRESS_BAR + suffix + '>\n';
        }
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SINGLETON), Text).then(html => {
            this.#shadow.innerHTML += html;
            this.#initialize();
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class SideBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = Template.SIDEBAR;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SINGLETON), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
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
        this.#name = Template.CARD;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    #initialize(html) {
        const cardhtml = this.#shadow.host.innerHTML;
        this.#shadow.host.innerHTML = '';
        this.#shadow.innerHTML = html;
        const cardContent = this.#shadow.querySelector('.' + util.css.SiteClass.cardContent);
        cardContent.innerHTML = cardhtml;

        const card = this.#shadow.querySelector('.' + util.css.SiteClass.card);

        switch(this.dataset.side) {
            case 'left':
                card.classList.add(util.css.SiteClass.sidecard, util.css.SiteClass.sidecardLeft);
                cardContent.classList.add(util.css.SiteClass.cardContentLeft);
                break;
            case 'right':
                card.classList.add(util.css.SiteClass.sidecard, util.css.SiteClass.sidecardRight);
                cardContent.classList.add(util.css.SiteClass.cardContentRight);
                break;
            case 'top':
                break;
            case 'bottom':
                card.classList.add(util.css.SiteClass.endcard);
                cardContent.classList.add(util.css.SiteClass.endcardContent);
                break;
        }
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.STANDARD), Text).then(html => {
            this.#initialize(html);
            addToLoadedDOMs(this.#name, this);
        });
    }
}



class CenterCardTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = Template.CENTER_CARD;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.STANDARD), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class ModalTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = Template.MODAL;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.STANDARD), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
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
        this.#name = Template.DROPDOWN;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SUBCOMPONENT), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class HorizontalBarTemplate extends HTMLElement {
    #name;
    constructor() {
        super();
        this.#name = Template.HORIZONTAL_BAR;
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SUBCOMPONENT), Text).then(html => {
            this.outerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class ProgressBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = Template.PROGRESS_BAR;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SUBCOMPONENT), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
        
    }
}

class SlideshowTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = Template.SLIDESHOW;
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SUBCOMPONENT), Text).then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
    }
}

class VerticalBarTemplate extends HTMLElement {
    #name;
    constructor() {
        super();
        this.#name = Template.VERTICAL_BAR;
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource(constructURL(this.#name, TemplateType.SUBCOMPONENT), Text).then(html => {
            this.innerHTML = html;
            addToLoadedDOMs(this.#name, this);
        });
    }
}

const suffix = '-template';

const DemplateDefinitions = Object.freeze({
    // Internal Components
    DROPDOWN: DropdownTemplate,
    HORIZONTAL_BAR: HorizontalBarTemplate,
    PROGRESS_BAR: ProgressBarTemplate,
    SLIDESHOW: SlideshowTemplate,
    VERTICAL_BAR: VerticalBarTemplate,
    // Singleton Components
    LOADING_SCREEN: LoadingScreenTemplate,
    NAVBAR: NavBarTemplate,
    SIDEBAR: SideBarTemplate,
    BACKGROUND: BackgroundTemplate,
    FOOTER: FooterTemplate,
    HERO: HeroTemplate,
    // Containers and External Components
    CENTER_CARD: CenterCardTemplate,
    CARD: CardTemplate,
    MODAL: ModalTemplate,
});

export function loadTemplate(templateName, definition) {
    customElements.define(templateName, definition);
}

export function loadAllTemplates() {
    for (const template in Template) {
        loadTemplate(Template[template] + suffix, DemplateDefinitions[template]);
    }
    util.log("Templates Loaded!");
}