import * as animate from './animate.js';
import * as anim from './animations.js';
import * as util from './util.js';

// Instantiates global list if it doesn't exist yet
if (!Object.hasOwn(window, 'loadedDOMS')) {
    window.loadedDOMS = {};
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

// Singleton Templates
class BackgroundTemplate extends HTMLElement {
    #shadow;
    #name;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#name = 'background';
    }

    get shadow() {
        return this.#shadow
    }

    get name() {
        return this.#name;
    }

    connectedCallback() {
        util.getResource('components/singletons/background.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS(this.#name, this);
        });
    }
}

class FooterTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('components/singletons/footer.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('footer', this);
        });
    }
}

class HeroTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('components/singletons/hero.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('hero', this);
        });
    }
}

class LoadingScreenTemplate extends HTMLElement {
    #shadow;
    constructor(test) {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('components/singletons/loadingscreen.html').then(html => {
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
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('components/singletons/navbar.html').then(html => {
            // TO DO: Programmatic checking of template classes so it can adjust the contents 
            this.#shadow.innerHTML += html;
            addToLoadedDOMS('navbar', this);
        });
    }
}

class SideBarTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('components/singletons/sidebar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('sidebar', this);
        });
    }
}


class SideCardTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/sidecard.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('sidecard', this);
        });
    }
}



class CenterCardTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/centercard.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('centercard', this);
        });
    }
}

class ModalTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/modal.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('modal', this);
        });
    }
}

// Internal Components
class DropdownTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/subcomponents/dropdown.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('dropdown', this);
        });
    }
}

class HorizontalBarTemplate extends HTMLElement {
    #shadow;
    constructor(test) {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/subcomponents/horizontalbar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('horizontalbar', this);
        });
    }
}

class ProgressBarTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/subcomponents/progressbar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('progressbar', this);
        });
        
    }
}

class SlideshowTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/subcomponents/slideshow.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('slideshow', this);
        });
    }
}

class VerticalBarTemplate extends HTMLElement {
    #shadow;
    constructor(test) {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/subcomponents/verticalbar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToLoadedDOMS('verticalbar', this);
        });
    }
}

export const templateList = {
    // Internal Components
    dropdownTemplate: {
        name: 'dropdown-template',
        definition: DropdownTemplate
    },
    horizontalBarTemplate: {
        name: 'horizontalbar-template',
        definition: HorizontalBarTemplate
    },
    progressbarTemplate: {
        name: 'progressbar-template',
        definition: ProgressBarTemplate
    },
    slideshowTemplate: {
        name: 'slideshow-template',
        definition: SlideshowTemplate
    },
    verticalbarTemplate: {
        name: 'verticalbar-template',
        definition: VerticalBarTemplate
    },
    // Singleton Components
    loadingScreenTemplate: {
        name: 'loadingscreen-template',
        definition: LoadingScreenTemplate
    },
    navbarTemplate: {
        name: 'navbar-template',
        definition: NavBarTemplate
    },
    sidebarTemplate: {
        name: 'sidebar-template',
        definition: SideBarTemplate
    },
    backgroundTemplate: {
        name: 'background-template',
        definition: BackgroundTemplate
    },
    footerTemplate: {
        name: 'footer-template',
        definition: FooterTemplate
    },
    heroTemplate: {
        name: 'hero-template',
        definition: HeroTemplate
    },
    // Containers and External Components
    centerCardTemplate: {
        name: 'centercard-template',
        definition: CenterCardTemplate
    },
    sidecardTemplate: {
        name: 'sidecard-template',
        definition: SideCardTemplate
    },
    modalTemplate: {
        name: 'modal-template',
        definition: ModalTemplate
    },
};

export function loadTemplate(templateName, definition) {
    customElements.define(templateName, definition);
}

export function loadAllTemplates() {
    for (const template in templateList) {
        loadTemplate(templateList[template].name, templateList[template].definition);
    }
    util.log("Templates Loaded!");
}