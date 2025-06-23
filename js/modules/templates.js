import * as animate from './animate.js';
import * as anim from './animations.js';
import * as util from './util.js';

function addToTemplateDOMS(key, value) {
    if (window.templateDOMS.hasOwnProperty(key)) {
        window.templateDOMS[key].push(value)
    } else {
        window.templateDOMS[key] = [value];
    }
}

class BackgroundTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/background.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('background', this);
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
        util.getResource('../../components/loading.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('loadingscreen', this);
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
        util.getResource('../../components/sidebar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('sidebar', this);
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
        util.getResource('../../components/navbar.html').then(html => {
            this.#shadow.innerHTML += html;
            addToTemplateDOMS('navbar', this);
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
        util.getResource('../../components/hero.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('hero', this);
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
            addToTemplateDOMS('sidecard', this);
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
            addToTemplateDOMS('centercard', this);
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
        util.getResource('../../components/slideshow.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('slideshow', this);
        });
    }
}

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
        util.getResource('../../components/dropdown.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('dropdown', this);
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
        util.getResource('../../components/footer.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('footer', this);
        });
    }
}

class MenuTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/menu.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('menu', this);
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
            addToTemplateDOMS('modal', this);
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
        util.getResource('../../components/progressbar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('progressbar', this);
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
        util.getResource('../../components/verticalbar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('verticalbar', this);
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
        util.getResource('../../components/horizontalbar.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('horizontalbar', this);
        });
    }
}

class ButtonTemplate extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
    }

    get shadow() {
        return this.#shadow
    }

    connectedCallback() {
        util.getResource('../../components/button.html').then(html => {
            this.#shadow.innerHTML = html;
            addToTemplateDOMS('button', this);
        });
    }
}

customElements.define('background-template', BackgroundTemplate);
customElements.define('loadingscreen-template', LoadingScreenTemplate);
customElements.define('sidebar-template', SideBarTemplate);
customElements.define('navbar-template', NavBarTemplate);
customElements.define('progressbar-template', ProgressBarTemplate);
customElements.define('modal-template', ModalTemplate);
customElements.define('hero-template', HeroTemplate);
customElements.define('sidecard-template', SideCardTemplate);
customElements.define('centercard-template', CenterCardTemplate);
customElements.define('footer-template', FooterTemplate);
customElements.define('slideshow-template', SlideshowTemplate);
customElements.define('dropdown-template', DropdownTemplate);
customElements.define('button-template', ButtonTemplate);
customElements.define('verticalbar-template', VerticalBarTemplate);
customElements.define('horizontalbar-template', HorizontalBarTemplate);