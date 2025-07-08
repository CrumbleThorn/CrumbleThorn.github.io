import * as animate from './animate.js';
import * as anim from './animations.js';
import * as lottiefiles from './lottiefiles.js';
import * as ui from './ui.js';
import * as util from './util.js';

// TO DO: Create TemplateManager class, replace this so we can programmatically replace the loadedDOMs list when navigating
// Instantiates global list if it doesn't exist yet
if (!Object.hasOwn(window, 'loadedDOMS')) {
    window.loadedDOMs = {};
}

// NOTE: THESE NEED TO BE DEFINED IN ORDER STARTING FROM INTERNAL COMPONENTS
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

const TEMPLATE_SUFFIX = '-template';

export const TemplateEvents = Object.freeze({
    TEMPLATE_LOADED: 'templateLoaded',
    LOADING_SCREEN_READY: 'loadingScreenReady',
    ALL_TEMPLATES_LOADED: 'allTemplatesLoaded',
})

const TemplateType = Object.freeze({
    SINGLETON: 'singletons/',
    SUBCOMPONENT: 'subcomponents/',
    STANDARD: '',
});

function addToLoadedDOMs(key, value) {
    if (Object.hasOwn(loadedDOMs, key)) {
        const matchIndex = loadedDOMs[key].findIndex((elem) => elem.id == value.id);
        if (matchIndex != -1) {
            loadedDOMs[key][matchIndex] = value;
        } else {
            loadedDOMs[key].push(value);
        }
    } else {
        loadedDOMs[key] = [value];
    }
    value.dispatchEvent(
        new Event(TemplateEvents.TEMPLATE_LOADED,
        {
            bubbles: true,
            composed: true,
        },
        )
    );
}

function templateCount(template) {
    if(Object.hasOwn(loadedDOMs, template)) {
        return loadedDOMs[template].length;
    }
        else return 0;
}

function constructURL(template, type) {
    return 'components/' + type + template + '.html';
}

// TO DO: Check for Completeness
// Base Template Class
class HTMLTemplate extends HTMLElement {
    #name;
    #ready;
    #resolveReady;
    #type;
    #ui;
    constructor(name, type) {
        super();
        if (HTMLTemplate.renderingList == undefined) {
            HTMLTemplate.renderingList = 0;
        }

        this.#name = name;
        this.#type = type;

        if (this.id == '') {
            this.id = this.#name + '-' +  templateCount(this.#name);
        }

        // Reserve an entry in the loadedDOMs list
        addToLoadedDOMs(
            this.#name,
            this,
        );

        HTMLTemplate.renderingList++;

        this.#ready = new Promise(resolve => {
            this.#resolveReady = resolve;
        });
    }

    get name() {
        return this.#name;
    }

    get type() {
        return this.#type;
    }

    get ui() {
        return this.#ui;
    }

    get ready() {
        return this.#ready;
    }

    async getHTML() {
        const response = await util.getResource(constructURL(this.#name, this.#type))
        return response.text();
    }

    complete(ui, content) {
        this.#ui = ui;
        this.removeComments(content);
        addToLoadedDOMs(
            this.#name,
            this,
        );
        HTMLTemplate.renderingList--;
        if (HTMLTemplate.renderingList == 0) {
            window.dispatchEvent(
                new Event(
                    TemplateEvents.ALL_TEMPLATES_LOADED,
                    {
                        bubbles: true,
                        composed: true,
                    }
                )
            );
        }
        this.#resolveReady();
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
    constructor() {
        super(Template.BACKGROUND, TemplateType.STANDARD);
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        // TO DO: Make Background Class
        const background = /* new ui.Background(this); */ undefined;

        this.complete(background, this.#shadow);
    }

    // TO DO: Make Background Class so we can programmatically cycle between backgrounds
    connectedCallback() {
        this.#initialize();
    }
}

// Singleton Templates
class FooterTemplate extends HTMLTemplate {
    constructor() {
        const name = Template.FOOTER;
        if (templateCount(name) < 1) {
            super(name, TemplateType.SINGLETON);
        } else {
            throw new Error('Footer singleton can only be instantiated once!');
        }
    }

    async #initialize() {
        const html = await this.getHTML();

        this.innerHTML = html;

        // TO DO: Make Footer Class
        const footer = /* new ui.Footer(this); */ undefined;

        this.complete(footer, this);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class HeroTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        const name = Template.HERO;
        if (templateCount(name) < 1) {
            super(name, TemplateType.SINGLETON);
        } else {
            throw new Error('Hero singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        const heroContent = this.#shadow.host.innerHTML;

        this.#shadow.host.innerHTML = '';
        this.#shadow.innerHTML = html;

        const hero = new ui.Hero(this.#shadow.getElementById(util.css.SiteID.hero));

        hero.content.obj.innerHTML = heroContent;

        this.complete(hero, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class LoadingScreenTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        const name = Template.LOADING_SCREEN;
        if (templateCount(name) < 1) {
            super(name, TemplateType.SINGLETON);
        } else {
            throw new Error('Loading Screen singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();
        this.#shadow.innerHTML = html;
        
        let loadingscreen;

        if (this.dataset.animationHref != undefined) {
            util.log(
                'Using custom loading animation provided at ' + this.dataset.animationHref,
                util.LogType.INFO,
            );
            loadingscreen = new ui.LoadingScreen(
                this.#shadow.getElementById(util.css.SiteID.loadingscreen),
                new lottiefiles.LottieContainer(
                    this.#shadow.getElementById(util.css.SiteID.loadingAnimation),
                    this.dataset.animationHref,
                ),
            );
        } else {
            loadingscreen = new ui.LoadingScreen(this.#shadow.getElementById(util.css.SiteID.loadingscreen));
        }

        this.complete(loadingscreen, this.#shadow);
    }

    connectedCallback() {
        this.#initialize()
            .then(() => {
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
    constructor() {
        const name = Template.NAVBAR;
        if (templateCount(name) < 1) {
            super(name, TemplateType.SINGLETON);
        } else {
            throw new Error('Navigation Bar singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    #initializeNavbarLabel(navbar) {
        navbar.label.innerHTML = '';

        if (this.dataset.logoSrc != undefined) {
            navbar.label.innerHTML += '<img src="' + this.dataset.logoSrc + '" class="' + util.css.SiteClass.unselectable + '" id="' + util.css.SiteID.navbarLogo + '">\n';
            navbar.logo = this.#shadow.getElementById(util.css.SiteID.navbarLogo);
        } else if (this.dataset.logoId != undefined) {
            const navbarLogo = this.#shadow.getElementById(util.css.SiteID.navbarLogo);
            navbar.label.innerHTML += navbarLogo.outerHTML;
            navbarLogo.outerHTML = '';
            navbar.logo = this.#shadow.getElementById(util.css.SiteID.navbarLogo);
        }

        if ((this.dataset.title != undefined || this.dataset.titleId != undefined) && (this.dataset.logoSrc != undefined || this.dataset.logoId != undefined)) {
            navbar.label.innerHTML += '<'+ Template.VERTICAL_BAR + TEMPLATE_SUFFIX + ' class="' + util.css.SiteClass.navbarLabelDivider + '"></' + Template.VERTICAL_BAR + TEMPLATE_SUFFIX + '>\n';
        }
        
        if (this.dataset.title != undefined) {
            navbar.label.innerHTML += '<div class="' + util.css.SiteFont.ubuntu + ' ' + util.css.SiteClass.unselectable + '" id="' + util.css.SiteID.navbarTitle + '">' + this.dataset.title + '</div>\n';
            navbar.title = this.#shadow.getElementById(util.css.SiteID.navbarTitle);
        } else if (this.dataset.titleId != undefined) {
            const navbarTitle = this.#shadow.getElementById(util.css.SiteID.navbarTitle);
            navbar.label.innerHTML += navbarTitle.outerHTML;
            navbarTitle.outerHTML = '';
        }
    }

    #populateNavbarMenu(navbar) {
        navbar.menu.innerHTML = '';
        
        for (let ctr = 1; this.dataset['menuitem' + ctr.toString()] != undefined; ctr++) {
            if (ctr > 1) {
                navbar.menu.innerHTML += '<'+ Template.VERTICAL_BAR + TEMPLATE_SUFFIX + ' class="' + util.css.SiteClass.navbarLabelDivider + '"></' + Template.VERTICAL_BAR + TEMPLATE_SUFFIX + '>\n';
            }
            let linkDetails = this.dataset['menuitem' + ctr.toString()].split(' ');

            if (linkDetails.length == 1) {
                navbar.menu.innerHTML += '<div class="' + util.css.SiteClass.navbarCurrent + ' ' + util.css.SiteFont.saira + ' ' + util.css.SiteFont.semibold + ' ' + util.css.SiteClass.unselectable + '">' + linkDetails[0] + '</div>\n';
            } else if (linkDetails.length == 2) {
                navbar.menu.innerHTML += '<a class="' + util.css.SiteClass.navbarLink + ' ' + util.css.SiteFont.saira + ' ' + util.css.SiteFont.medium + ' ' + util.css.SiteClass.unselectable + '" href="' + linkDetails[1] + '">' + linkDetails[0] + '</a>\n';
            } else {
                // TO DO: Implement Dropdown
            }
        }

        
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();
        this.#shadow.innerHTML += html;

        util.log(
            this.dataset,
            util.LogType.DEBUG,
        );

        const navbar = new ui.NavBar(
            new anim.AnimatedElement(
                this.#shadow.getElementById(util.css.SiteID.navbar),
                false,
            )
        );

        // TO DO: Initialize Burger menu Button
        if (this.dataset.sidebarId != undefined) {
            navbar.burger.classList.remove(util.css.SiteClass.hidden);
        }

        this.#initializeNavbarLabel(navbar);
        this.#populateNavbarMenu(navbar);
        
        // Initialize Navbar Progress Bar
        if (this.dataset.progressbarStartId != undefined) {
            navbar.elem.obj.innerHTML += '<'+ Template.PROGRESS_BAR + TEMPLATE_SUFFIX + ' data-start-id="' + this.dataset.progressbarStartId + '" id="' + util.css.SiteID.navbarProgressBar + '"></' + Template.PROGRESS_BAR + TEMPLATE_SUFFIX + '>\n';
            navbar.progressbar = this.#shadow.getElementById(util.css.SiteID.navbarProgressBar);
        }

        this.complete(navbar, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class SideBarTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        const name = Template.SIDEBAR;
        if (templateCount(name) < 1) {
            super(name, TemplateType.SINGLETON);
        } else {
            throw new Error('Side Bar singleton can only be instantiated once!');
        }
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        const sidebar = /* new ui.SideBar(this) */ undefined;

        this.complete(sidebar, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

// Standard Templates
class CardTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        super(Template.CARD, TemplateType.STANDARD);
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        // Take contents of custom element first
        const cardhtml = this.#shadow.host.innerHTML;
        this.#shadow.host.innerHTML = '';
        // Then apply the Template
        this.#shadow.innerHTML = html;

        const card = new ui.Card(
            this.#shadow.getElementById(util.css.TemplateID.card),
            this.dataset.side,
        );

        // And THEN put the original contents into the card
        card.content.obj.innerHTML = cardhtml;

        switch(this.dataset.side) {
            case 'left':
                card.elem.obj.classList.add(util.css.SiteClass.sidecard, util.css.SiteClass.sidecardLeft);
                card.content.obj.classList.add(util.css.SiteClass.cardContentLeft);
                break;
            case 'right':
                card.elem.obj.classList.add(util.css.SiteClass.sidecard, util.css.SiteClass.sidecardRight);
                card.content.obj.classList.add(util.css.SiteClass.cardContentRight);
                break;
            case 'top':
                break;
            case 'bottom':
                card.elem.obj.classList.add(util.css.SiteClass.endcard);
                card.content.obj.classList.add(util.css.SiteClass.endcardContent);
                break;
        }
        
        this.complete(card, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class CenterCardTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        super(Template.CENTER_CARD, TemplateType.STANDARD);
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        const card = undefined;

        this.complete(card, this.#shadow)
    }

    connectedCallback() {
        this.#initialize();
    }
}

class ModalTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        super(Template.MODAL, TemplateType.STANDARD);
    }

    get shadow() {
        return this.#shadow;
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        const modal = undefined;

        this.complete(modal, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

// Internal Components
class DropdownTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        super(Template.DROPDOWN, TemplateType.SUBCOMPONENT);
    }

    get shadow() {
        return this.#shadow
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        const dropdown = undefined;

        this.complete(dropdown, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class HorizontalBarTemplate extends HTMLTemplate {
    constructor() {
        super(Template.HORIZONTAL_BAR, TemplateType.SUBCOMPONENT);
    }

    async #initialize() {
        const html = await this.getHTML();

        this.outerHTML = html;

        const bar = undefined;

        this.complete(bar, this);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class ProgressBarTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        super(Template.PROGRESS_BAR, TemplateType.SUBCOMPONENT);
    }

    get shadow() {
        return this.#shadow
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        let progressbar;

        if (this.dataset.startId != undefined) {
            progressbar = new ui.ScrollProgressBar(
                this.#shadow.getElementById(util.css.TemplateID.progressbarContainer),
            )
        } else {
            progressbar = new ui.ProgressBar(
                this.#shadow.getElementById(util.css.TemplateID.progressbarContainer),
            )
        }

        this.complete(progressbar, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class SlideshowTemplate extends HTMLTemplate {
    #shadow;
    constructor() {
        super(Template.SLIDESHOW, TemplateType.SUBCOMPONENT);
    }

    get shadow() {
        return this.#shadow
    }

    async #initialize() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        const html = await this.getHTML();

        this.#shadow.innerHTML = html;

        const slideshowObj = this.shadow.getElementById(util.css.TemplateID.slideshow);
        const slideshowWindow = this.shadow.getElementById(util.css.TemplateID.slideshowWindow);

        if (this.dataset.dimensions != undefined) {
            const dimensions = this.dataset.dimensions.split(' ');
            if (dimensions.length == 1) {
                slideshowObj.style.setProperty('width', dimensions[0]);
                slideshowObj.style.setProperty('height', dimensions[0]);
            } else {
                slideshowObj.style.setProperty('width', dimensions[0]);
                slideshowObj.style.setProperty('height', dimensions[1]);
            }
        }

        if (this.dataset.imageHref != undefined) {
            const urls = this.dataset.imageHref.split(' ');
            for (let i = 0; i < urls.length; i++) {
                slideshowWindow.innerHTML += '<img class="'
                    + util.css.TemplateID.slideshowImage
                    + ' ' + util.css.SiteClass.unselectable
                    + (i<1 ? '' : ' ' + util.css.SiteClass.hidden)
                    + '" src="'
                    + urls[i]
                    + '"/>';
            }
        }

        const imageList = slideshowWindow.querySelectorAll('.' + util.css.TemplateID.slideshowImage);

        util.log(
            imageList,
            util.LogType.DEBUG,
        );

        const duration = this.dataset.duration;
        const transition = this.dataset.transition;

        const slideshow = new ui.Slideshow(
            this.shadow.getElementById(util.css.TemplateID.slideshowWindow),
            imageList,
            duration,
            transition
        );

        /* // TO DO:
        if (this.dataset.addProgressbar != undefined) {

        }

        // TO DO:
        if (this.dataset.addControls != undefined) {

        } */

        this.complete(slideshow, this.#shadow);
    }

    connectedCallback() {
        this.#initialize();
    }
}

class VerticalBarTemplate extends HTMLTemplate {
    constructor() {
        super(Template.VERTICAL_BAR, TemplateType.SUBCOMPONENT);
    }

    async #initialize() {
        const html = await this.getHTML();

        this.innerHTML = html;

        const bar = undefined;

        this.complete(bar, this);
    }

    connectedCallback() {
        this.#initialize();
    }
}

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


// NOTE: Can probably be repurposed for recursive waiting
// (additional custom elements may be instantiated by other elements once they're rendered)
async function waitForReadyIn(node) {
    const elements = node.querySelectorAll('*');

    const promises = [];

    for (const elem of elements) {
        if (elem.tagName.includes('-') && typeof elem.ready === 'object') {
        promises.push(elem.ready);
        }

        if (elem.shadowRoot != undefined) {
        promises.push(waitForReadyIn(elem.shadowRoot));
        }
    }
    
    await Promise.all(promises);
}

export async function loadAllTemplates() {
    const names = Object.values(Template);
    const definitions = Object.values(TemplateDefinitions);

    for (let i = 0; i < names.length; i++) {
        loadTemplate(names[i] + TEMPLATE_SUFFIX, definitions[i]);
    }

    for (const template of Object.values(Template)) {
        await customElements.whenDefined(template + TEMPLATE_SUFFIX);
    }
}