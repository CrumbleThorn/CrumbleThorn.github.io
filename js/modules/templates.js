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
    sidecardTemplate: 'sidecard',
    modalTemplate: 'modal',
};

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
    value.dispatchEvent(new Event('templateLoaded', {
        bubbles: true,
        composed: true,
    }));
}

function constructURL(template, type) {
    return 'components/' + type + template + '.html';
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
            this.#shadow.getElementById('hero-content').innerHTML = heroContent;
            addToLoadedDOMS('hero', this);
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
            addToLoadedDOMS('loadingscreen', this);
            this.dispatchEvent(new Event('loadingScreenReady', {
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

    connectedCallback() {
            // TO DO: Programmatic checking of template classes so it can adjust the contents 
        util.getResource(constructURL(this.#name, templateType.singleton)).then(html => {
            this.#shadow.innerHTML += html;
            addToLoadedDOMS('navbar', this);
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
            addToLoadedDOMS('sidebar', this);
        });
    }
}

// Container Templates
class SideCardTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.sidecardTemplate;
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
            addToLoadedDOMS('sidecard', this);
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
            addToLoadedDOMS('centercard', this);
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
            addToLoadedDOMS('modal', this);
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
            addToLoadedDOMS('dropdown', this);
        });
    }
}

class HorizontalBarTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = templateList.horizontalBarTemplate;
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
            addToLoadedDOMS('horizontalbar', this);
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
            addToLoadedDOMS('progressbar', this);
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
            addToLoadedDOMS('slideshow', this);
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
            addToLoadedDOMS('verticalbar', this);
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
    sidecardTemplate: SideCardTemplate,
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