import * as animate from './animate.js';
import * as anim from './animations.js';
import * as util from './util.js';

export class LoadingScreen {
    #elem;
    #animation;
    #trigger;
    constructor(elem,
                animation,
                ) {
        this.#elem = elem;
        this.#animation = animation;
        this.#trigger = new anim.AnimationTrigger(elem, anim.animationType.toggle, 0, true);
        if(this.#elem.active) {
            document.body.classList.add(util.css.siteClasses.noScroll);
        }
    }

    get elem() {
        return this.#elem;
    }

    get animation() {
        return this.#animation;
    }

    get trigger() {
        return this.#trigger;
    }
    
    toggle() {
        if (!this.#elem.active) {
            document.body.classList.add(util.css.siteClasses.noScroll);
        } else {
            document.body.classList.remove(util.css.siteClasses.noScroll);
        }
        this.#trigger.trigger();
    }
}

export class Content {
    #obj;
    #display;
    constructor(obj) {
        this.#obj = obj;
        this.#display = obj.style.display;
    }

    hideContent() {
        this.#obj.style.display = util.css.display.none;
    }

    showContent() {
        this.#obj.style.display = this.#display;
    }
}

export class SideBar {
    constructor(elem) {
        this.elem = elem;
        this.links = elem.obj.querySelectorAll('.sidebar-link');
    }
}

// TO DO: Use util.css instead of direct string assignments
export class NavBar {
    constructor(elem, sidebar) {
        this.elem = elem;
        this.content = elem.obj.querySelector('.navbar-content');
        this.menu = elem.obj.querySelector('.navbar-menu');
        this.burger = elem.obj.querySelector('.navbar-burger');
        this.logo = elem.obj.querySelector('.site-logo');
        this.title = elem.obj.querySelector('.site-title');
        this.links = elem.obj.querySelectorAll('.navbar-link');
        this.sidebar = sidebar;
    }

    toggleMenus() {
        if (this.burger.style.display == 'none') {
            this.content.style.padding = '0.5vh';
            this.burger.style.display = 'block';
            this.menu.style.display = 'none';
        } else {
            this.content.style.padding = '0.5vh 10vw 0';
            this.burger.style.display = 'none';
            this.menu.style.display = 'flex';
        }
    }
}

export class ProgressBar {
    #elem;
    #start;
    #end;
    constructor(elem,
                start = 0,
                end = document.documentElement.scrollHeight,
                ) {
        this.#elem = elem;
        this.#start = start;
        this.#end = end;
        window.addEventListener('scroll', () => {this.updateProgress()});
    }

    get elem() {
        return this.#elem;
    }

    set start(start) {
        this.#start = start;
        util.log('Progress Bar Start set to ' + start + '.');
    }

    set end(end) {
        this.#end = end;
        util.log('Progress Bar End set to ' + end + '.');
    }

    updateProgress() {
        const progress = ((window.scrollY - this.#start) / (this.#end - window.innerHeight - this.#start)) * 100;
        this.#elem.obj.style.width = `${progress}%`;

        // If the user has reached the end, fill the progress bar
        if (progress >= 100) {
            this.#elem.obj.style.width = '100%';
        } else if (progress <= 0) {
            this.#elem.obj.style.width = '0%';
        }
    }
}

export class Hero {
    constructor(elem) {
        this.elem = elem;
    }
}

export class SideCard {
    constructor(elem, side) {
        this.elem = elem;
        this.side = side;
    }
}

export class BottomBar {
    constructor(elem) {
        this.elem = elem;
    }
}

export class NavButton {
    constructor(elem, target) {
        this.elem = elem;
        this.target = target;
    }
}

export class Slideshow {
    constructor(elem, images, behavior) {
        this.elem = elem;
        this.images = images;
        this.behavior = behavior;
    }
}

class HeaderBar {
    constructor(elem, content, textbox) {
        this.element = elem;
        this.content = content;
        this.textbox = textbox;
    }

    modifyText(newText) {
        // TO DO: Logic
        this.textbox.innerHTML = newText;
    }
}