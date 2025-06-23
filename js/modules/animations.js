import * as util from './util.js';
import * as animate from './animate.js';

// Animation Type Constants
export const show = 'show';
export const hide = 'hide';
export const highlight = 'highlight';
export const toggle = 'toggle';
//TO DO: Add reset function for removing looping animations
const animationTypes = Object.freeze(new Array(show, hide, highlight, toggle));

// Scroll Trigger Type Constants
export const onScrollDown = 'onScrollDown';
export const onScrollUp = 'onScrollUp';
export const onScrollTo = 'onScrollTo';
const scrollTriggerTypes = Object.freeze(new Array(onScrollDown, onScrollUp, onScrollTo));

// Mouse Event Trigger Type Constants
export const onMouseDown = 'onmousedown';
export const onMouseUp = 'onmouseup';
export const onMouseClick = 'onclick';
export const onMouseDoubleClick = 'ondblclick'; 
export const onMouseAuxClick = 'onauxclick';
export const onMouseOver = 'onmouseover';
export const onMouseOut = 'onmouseout';
export const onMouseEnter = 'onmouseenter';
export const onMouseExit = 'onmouseleave';
const mouseEventTriggerTypes = Object.freeze(new Array(onMouseDown, onMouseUp, onMouseClick, onMouseDoubleClick, onMouseOver, onMouseOut, onMouseEnter, onMouseExit))

export class AnimatedElement {
    #obj;
    #display;
    #active;
    #entryAnimation;
    #exitAnimation;
    #highlightAnimation;
    #isAnimating;

    constructor(obj,
                display = 'block',
                active = true,
                entry,
                exit,
                highlight,
                ) {
        this.#obj = obj;
        this.#display = display;
        this.#active = active;
        this.#entryAnimation = entry;
        this.#exitAnimation = exit;
        this.#highlightAnimation = highlight;
        this.#isAnimating = false;
        if (active)
            this.#obj.style.display = display;
        else
            this.#obj.style.display = 'none';
    }

    get obj() {
        return this.#obj;
    }

    get display() {
        return this.#display;
    }

    get active() {
        return this.#active;
    }

    get entryAnimation() {
        return this.#entryAnimation;
    }

    set entryAnimation(animation) {
        this.#entryAnimation = animation;
    }

    get highlightAnimation() {
        return this.#highlightAnimation;
    }

    set highlightAnimation(animation) {
        this.#highlightAnimation = animation;
    }

    get highlightAnimation() {
        return this.#highlightAnimation;
    }

    set exitAnimation(animation) {
        this.#exitAnimation = animation;
    }

    get isAnimating() {
        return this.#isAnimating;
    }

    show(override = false) {
        if (!this.#active) {
            util.log('Showing ' + this.#obj.id + '...');
            this.#obj.style.display = this.#display;
            this.#active = true;
            this.#isAnimating = true;
            animate.css(this.#obj, this.#entryAnimation, override).then((value) => {
                util.log('Done Showing ' + this.#obj.id + '!');
                this.#obj.style.display = this.#display;
                this.#isAnimating = false;
            });
        } else {
            util.warn('WARNING: Object ' + this.#obj.id + ' is already active, skipping animation');
        }
    }

    highlight(override = false) {
        if (this.#active){
            util.log('Highlighting ' + this.#obj.id + '...');
            animate.css(this.#obj, this.#highlightAnimation, override);
        } else {
            util.warn('WARNING: Object ' + this.#obj.id + ' is not active, skipping animation');
        }
    }

    hide(override = false) {
        if (this.#active) {
            this.#active = false;
            this.#isAnimating = true;
            util.log('Hiding ' + this.#obj.id + '...');
            animate.css(this.#obj, this.#exitAnimation, override).then((value) => {
                util.log('Done Hiding ' + this.#obj.id + '!');
                this.#obj.style.display = 'none';
                this.#isAnimating = false;
            });
        } else {
            util.warn('WARNING: Object ' + this.#obj.id + ' is already inactive, skipping animation');
        }
    }

    //TO DO: Add reset function for removing looping animations

    toggle(override = false) {
        if (this.#isAnimating == false || override == true) {
            if (this.#active) {
                this.hide(override)
            } else {
                this.show(override);
            }
        }
    }
}

// TO DO: Send Trigger Events so Triggers can listen to other Triggers 
export class AnimationTrigger {
    #elem;
    #animationType;
    #isTriggered;

    constructor(elem,
                animationType = toggle,
                ) {
        this.#elem = elem;
        this.#animationType = this.#checkAnimationType(animationType);
        this.#isTriggered = false;
    }

    get elem() {
        return this.#elem;
    }

    get animationType() {
        return this.#animationType;
    }

    get isTriggered() {
        return this.#isTriggered;
    }

    #checkAnimationType(animationType) {
        if(animationTypes.includes(animationType)) {
            return animationType;
        } else {
            throw new TypeError(animationType +  ' is not a valid Animation type!');
        }
    }

    trigger() {
        switch(this.#animationType) {
            case show:
                this.elem.show();
                break;
            case hide:
                this.elem.hide();
                break;
            case highlight:
                this.elem.highlight();
                break;
            case toggle:
                this.elem.toggle();
                break;
            //TO DO: Add reset function for removing looping animations
        }
        this.#isTriggered = true;
    }
}

export class AnimationScrollTrigger extends AnimationTrigger {
    #triggerElem;
    #triggerPoint;
    #triggerType;
    #reversible;

    // TO DO: Add ability to change where trigger anchor point is located
    constructor(elem,
                animationType = toggle,
                triggerElem = elem,
                triggerPoint = window,
                triggerType = onScrollDown,
                reversible = true
                ) {
        super(elem, animationType);
        this.#triggerElem = triggerElem;
        this.#triggerPoint = triggerPoint;
        this.#triggerType = this.#checkTriggerType(triggerType);

        if (typeof(reversible) == 'boolean')
            this.#reversible = reversible;
        else
            throw new TypeError(reversible + " is not a boolean value!");
    }

    #checkTriggerType(triggerType) {
        if(scrollTriggerTypes.includes(triggerType)) {
            return triggerType;
        } else {
            throw new TypeError(triggerType + ' is not a valid Scroll Trigger type!');
        }
    }

}

export class AnimatedScrollElement extends AnimatedElement {

    constructor(obj,
                display = 'block',
                active = true,
                trigger = obj,
                triggerPoint = window.innerHeight,
                entry = new animate.Animation('fadeIn', 'faster'),
                exit = new animate.Animation('fadeOut', 'faster'),
                highlight = new animate.Animation('pulse', 'faster'),
                ) {
        super(obj, display, active, entry, exit, highlight);
        this.trigger = trigger;
        this.triggerPoint = triggerPoint;
        this.normallyHidden = !active; // Determines if element should be visible by default
    }
    
    hasReachedTrigger() {
        //util.log(this.trigger);
        //util.log(this.triggerPoint);
        if (this.trigger.getBoundingClientRect().top <= this.triggerPoint) {
            return true;
        }
        else
        return false;
    }

    handleScroll() {
        if (this.hasReachedTrigger()) {
            this.normallyHidden ? this.show(true) : this.hide(true);
        } else {
            this.normallyHidden ? this.hide(true) : this.show(true);
        }
    }
}

export class AnimatedLoadingScreenElement extends AnimatedElement {

    constructor(obj,
                display = 'block',
                active = true,
                body = document.body,
                entry = new animate.Animation(animate.fadeIn, animate.faster),
                exit = new animate.Animation(animate.fadeOut, animate.faster),
                highlight,
                ) {
        super(obj, display, active, entry, exit, highlight);
        this.body = body;
        this.normallyHidden = !active; // Determines if element should be visible by default
    }

    showLoadingScreen(override = false) {
        if(!this.active) {
            this.body.classList.add('no-scroll');
            this.show();
        } else {
            util.warn('WARNING: Loading Screen is already active, skipping animation');
        }
    }
    
    hideLoadingScreen(override = false) {
        if (this.active) {
            this.body.classList.remove('no-scroll');
            this.hide();
        } else {
            util.warn('WARNING: Loading Screen is already inactive, skipping animation');
        }
    }

    toggle(override = false) {
        if (this.isAnimating == false || override == true) {
            if (this.active) {
                this.hideLoadingScreen(override)
            } else {
                this.showLoadingScreen(override);
            }
        }
    }
}