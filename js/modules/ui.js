import * as animate from './animate.js';
import * as anim from './animations.js';
import * as lottiefiles from './lottiefiles.js';
import * as util from './util.js';

export class LoadingScreen {
    #elem;
    #animation;
    #trigger;
    constructor(
        elem,
        animation,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(
                elem,
                true,
                new animate.Animation(
                    animate.animationClass.fadeIn,
                    animate.speedClass.faster,
                ),
                new animate.Animation(
                    animate.animationClass.fadeOut,
                    animate.speedClass.faster,
                )
            );
        } else {
            throw new TypeError(elem + ' is not a valid Loading Screen!');
        }

        if (animation instanceof lottiefiles.LottieContainer) {
            this.#animation = animation;
        } else {
            this.#animation = new lottiefiles.LottieContainer(
                this.#elem.obj.querySelector('#' + util.css.SiteID.loadingAnimation),
                'data/json/loading.json',
            );
        }
        
        this.#trigger = new anim.AnimationTrigger(
            this.#elem,
            anim.animationType.toggle,
            0,
            true
        );
        if(this.#elem.active) {
            document.body.classList.add(util.css.SiteClass.noScroll);
        }

        util.log(
            'Loading Screen with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
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
            document.body.classList.add(util.css.SiteClass.noScroll);
        } else {
            document.body.classList.remove(util.css.SiteClass.noScroll);
        }
        this.#trigger.trigger();
    }
}

export class Content {
    #obj;
    constructor(obj) {
        this.#obj = obj;

        util.log(
            'Content has been loaded.',
            util.LogType.INFO,
            true,
        );
    }

    hideContent() {
        this.#obj.classList.add(util.css.SiteClass.hidden);
    }

    showContent() {
        this.#obj.classList.remove(util.css.SiteClass.hidden);
    }
}

export class SideBar {
    #elem;
    constructor(
        elem,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.links = this.#elem.obj.querySelectorAll('.sidebar-link');

        util.log(
            'Side Bar with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }
}

// TO DO: Use util.css instead of direct string assignments
export class NavBar {
    #elem;
    
    constructor(
        elem,
        sidebar,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.content = elem.obj.querySelector('.navbar-content');
        this.menu = elem.obj.querySelector('.navbar-menu');
        this.burger = elem.obj.querySelector('.navbar-burger');
        this.logo = elem.obj.querySelector('.site-logo');
        this.title = elem.obj.querySelector('.site-title');
        this.links = elem.obj.querySelectorAll('.navbar-link');
        this.sidebar = sidebar;

        util.log(
            'Navigation Bar with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }

    toggleMenus() {

    }
}

export class ProgressBar {
    #elem;
    #start;
    #end;
    constructor(
        elem,
        start = 0,
        end = document.documentElement.scrollHeight,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.#start = start;
        this.#end = end;

        util.log(
            'Progress Bar with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }

    get start() {
        return this.#start;
    }

    set start(start) {
        this.#start = start;
        util.log(
            'Progress Bar Start set to ' + start + '.',
            util.LogType.INFO,
        );
    }

    get end() {
        return this.#end;
    }

    set end(end) {
        this.#end = end;
        util.log(
            'Progress Bar End set to ' + end + '.',
            util.LogType.INFO,
        );
    }

    updateProgress(progress) {
        this.#elem.obj.style.width = `${progress}%`;
        // If the user has reached the end, fill the progress bar
        if (progress >= 100) {
            this.#elem.obj.style.width = '100%';
        } else if (progress <= 0) {
            this.#elem.obj.style.width = '0%';
        }
    }
}

export class ScrollProgressBar extends ProgressBar {
    constructor(
        elem,
        start = 0,
        end = document.documentElement.scrollHeight,
    ) {
        super(elem, start, end);
        window.addEventListener(util.ScrollEvents.SCROLL, () => {this.updateProgress()});
        util.log(
            'Scroll Progress Bar with id ' + this.elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    updateProgress() {
        const progress = ((window.scrollY - this.start) / (this.end - window.innerHeight - this.start)) * 100;
        this.elem.obj.style.width = `${progress}%`;

        // If the user has reached the end, fill the progress bar
        if (progress >= 100) {
            this.elem.obj.style.width = '100%';
        } else if (progress <= 0) {
            this.elem.obj.style.width = '0%';
        }
    }
}

export class Hero {
    #elem;
    constructor(
        elem,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.content = new anim.AnimatedElement(
            this.#elem.obj.querySelector('#' + util.css.SiteID.heroContent),
            false,
            new animate.Animation(
                animate.animationClass.fadeInLeft,
                animate.speedClass.animated,
            ),
            new animate.Animation(
                animate.animationClass.fadeOutUp,
                animate.speedClass.animated,
            ),
        );

        util.log(
            'Hero with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }
}

export class Card {
    #elem;
    constructor(
        elem,
        side,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.side = side;

        util.log(
            'Card with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }
}

export class BottomBar {
    #elem;
    constructor(
        elem,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }

        util.log(
            'Bottom Bar with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }
}

export class NavButton {
    #elem;
    constructor(
        elem,
        target,
        offset,
        offsetY,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.target = target;

        util.log(
            'Navigation Button with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }
}

export class Slideshow {
    #elem;
    constructor(
        elem,
        images,
        behavior,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }
        this.images = images;
        this.behavior = behavior;

        util.log(
            'Slideshow with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }
}

export class Footer {
    #elem;
    constructor(
        elem,
    ) {
        if (elem instanceof anim.AnimatedElement) {
            this.#elem = elem;
        } else if (elem instanceof Element) {
            this.#elem = new anim.AnimatedElement(elem);
        }

        util.log(
            'Footer with id ' + this.#elem.obj.id + ' instantiated.',
            util.LogType.INFO,
            true,
        );
    }

    get elem() {
        return this.#elem;
    }
}

// TO DO: Check if this is necessary
class HeaderBar {
    constructor(elem, content, textbox) {
        this.element = elem;
        this.content = content;
        this.textbox = textbox;
    }
}