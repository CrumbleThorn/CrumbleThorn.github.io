import * as animate from './animate.js';
import * as anim from './animations.js';
import * as lottiefiles from './lottiefiles.js';
import * as ui from './ui.js';
import * as util from './util.js';

// TO DO: Create TemplateManager class, replace this
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
        value.dispatchEvent(
            new Event(
                TemplateEvents.TEMPLATE_LOADED,
                {
                    bubbles: true,
                    composed: true,
                }
            )
        );
    } else {
        value.template.dispatchEvent(
            new Event(
                TemplateEvents.TEMPLATE_LOADED,
                {
                    bubbles: true,
                    composed: true,
                },
            )
        );
    }
}

function templateCount(template) {
    if(Object.hasOwn(window.loadedDOMs, template)) {
        console.log(Object.keys(window.loadedDOMs[template]).length);
        return Object.keys(window.loadedDOMs[template]).length;
    } else {
        return 0;
    }
}

function constructURL(template, type) {
    return 'components/' + type + '/' + template + '.html';
}

// TO DO: base all templates to this template class
// Base Template Class
class HTMLTemplate extends HTMLElement {
    #name;
    constructor(name) {
        super();
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    addToLoadedDOMs(key, value) {
        if (Object.hasOwn(loadedDOMs, key)) {
            loadedDOMs[key].push(value)
        } else {
            loadedDOMs[key] = [value];
        }
        value.template.dispatchEvent(
            new Event(TemplateEvents.TEMPLATE_LOADED,
            {
                bubbles: true,
                composed: true,
            },
            )
        );
    }

    templateCount(template) {
        if(Object.hasOwn(window.loadedDOMs, template)) {
            return Object.keys(window.loadedDOMs[template]).length;
        }
            else return 0;
    }

    constructURL(template, type) {
        return 'components/' + type + '/' + template + '.html';
    }

    removeComments(elem, comments = []) {
        for (const child of elem.childNodes) {
            if (child.nodeType === Node.COMMENT_NODE) {
                elem.removeChild(child);
            } else {
                this.removeComments(child, comments);
            }
        }
    }
}

class BackgroundTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.BACKGROUND);
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;
        this.removeComments(this.#shadow);
    }

    // TO DO: Make Background Class so we can programmatically cycle between backgrounds
    connectedCallback() {
        // TO DO: Change from singleton to subcomponent
        util.getResource(this.constructURL(this.name, TemplateType.SINGLETON), Text)
            .then(html => {
                this.#initialize(html);
                this.addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    } 
                );
            });
    }
}

// Singleton Templates
class FooterTemplate extends HTMLTemplate {
    #ui;
    constructor() {
        const name = Template.FOOTER;
        if (templateCount(name) < 1) {
            super(name);
        } else {
            throw new Error('Footer singleton can only be instantiated once!');
        }
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.innerHTML = html;
        this.removeComments(this);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SINGLETON), Text)
            .then(html => {
                this.#initialize(html);
                //this.#ui = this.querySelector('#' + util.css.siteElements.footer);
                this.addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    } 
                );
            });
    }
}

class HeroTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        const name = Template.HERO;
        if (templateCount(name) < 1) {
            super(name);
        } else {
            throw new Error('Hero singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });

        const heroContent = this.#shadow.host.innerHTML;
        this.#shadow.host.innerHTML = '';
        this.#shadow.innerHTML = html;
        this.#shadow.getElementById(util.css.SiteID.heroContent).innerHTML = heroContent;

        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SINGLETON), Text)
            .then(html => {
                this.#initialize(html);
                this.addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    } 
                );
            });
    }
}

class LoadingScreenTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        const name = Template.LOADING_SCREEN;
        if (templateCount(name) < 1) {
            super(name);
        } else {
            throw new Error('Loading Screen singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });

        this.#shadow.innerHTML = html;
        if (this.dataset.animationHref != undefined) {
            util.log(
                "Using custom loading animation provided at " + this.dataset.animationHref,
                util.LogType.INFO,
            );
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
        
        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SINGLETON), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
                this.dispatchEvent(
                    new Event(
                        TemplateEvents.LOADING_SCREEN_READY,
                        {
                        bubbles: true,
                        composed: true,
                        },
                    )
                );
            });
    }
}

class NavBarTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        const name = Template.NAVBAR;
        if (templateCount(name) < 1) {
            super(name);
        } else {
            throw new Error('Navigation Bar singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initializeNavbarLabel() {
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

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML += html;

        util.log(
            this.dataset,
            util.LogType.DEBUG,
        );

        // TO DO: Initialize Burger menu Button
        if (this.dataset.sidebarId != undefined) {
            const navbarBurger = this.#shadow.getElementById(util.css.SiteID.navbarBurger);
            //navbarBurger.classList.remove(util.css.siteClasses.hidden);
        }

        this.#initializeNavbarLabel();
        this.#populateNavbarMenu();
        
        // Initialize Navbar Progress Bar
        if (this.dataset.progressbarStartId) {
            const navbar = this.#shadow.getElementById(util.css.SiteID.navbar);
            navbar.innerHTML += '<'+ Template.PROGRESS_BAR + suffix + ' id="' + util.css.SiteID.navbarProgressBar + '"></' + Template.PROGRESS_BAR + suffix + '>\n';
        }

        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SINGLETON), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class SideBarTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        const name = Template.SIDEBAR;
        if (templateCount(name) < 1) {
            super(name);
        } else {
            throw new Error('Side Bar singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;

        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SINGLETON), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

// Container Templates
class CardTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.CARD);
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });

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
        
        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.STANDARD), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class CenterCardTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.CENTER_CARD);
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;

        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.STANDARD), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class ModalTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.MODAL);
    }

    get shadow() {
        return this.#shadow;
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;

        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.STANDARD), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

// Internal Components
class DropdownTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.DROPDOWN);
    }

    get shadow() {
        return this.#shadow
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;

        this.removeComments(this.#shadow);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SUBCOMPONENT), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class HorizontalBarTemplate extends HTMLTemplate {
    #ui;
    constructor() {
        super(Template.HORIZONTAL_BAR);
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.outerHTML = html;

        this.removeComments(this);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SUBCOMPONENT), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class ProgressBarTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.PROGRESS_BAR);
    }

    get shadow() {
        return this.#shadow
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;
        
        this.removeComments(this);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SUBCOMPONENT), Text)
            .then(html => {
                this.#initialize(html)
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class SlideshowTemplate extends HTMLTemplate {
    #shadow;
    #ui;
    constructor() {
        super(Template.SLIDESHOW);
    }

    get shadow() {
        return this.#shadow
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.innerHTML = html;

        this.removeComments(this);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SUBCOMPONENT), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

class VerticalBarTemplate extends HTMLTemplate {
    #ui;
    constructor() {
        super(Template.VERTICAL_BAR);
    }

    get ui() {
        return this.#ui;
    }

    #initialize(html) {
        this.innerHTML = html;

        this.removeComments(this);
    }

    connectedCallback() {
        util.getResource(constructURL(this.name, TemplateType.SUBCOMPONENT), Text)
            .then(html => {
                this.#initialize(html);
                addToLoadedDOMs(
                    this.name,
                    {
                        template: this,
                        ui: this.#ui,
                    },
                );
            });
    }
}

const suffix = '-template';

const TemplateDefinitions = Object.freeze({
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
        loadTemplate(Template[template] + suffix, TemplateDefinitions[template]);
    }
    util.log(
        "Templates Loaded!",
        util.LogType.INFO,
    );
}