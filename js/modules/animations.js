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
const scrollTriggerTypes = Object.freeze(new Array(onScrollDown, onScrollUp));

// Scroll Trigger Anchor Constants
export const anchorLeft = 'left';
export const anchorRight = 'right';
export const anchorTop = 'top';
export const anchorBottom = 'bottom';

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
    #triggerLimit;
    #override;
    #timesTriggered;

    constructor(elem,
                animationType = toggle,
                triggerLimit = 1,
                override = false,
                ) {
        this.#elem = elem;
        this.#animationType = this.#checkAnimationType(animationType);
        if (typeof(triggerLimit) == 'number') {
            if (triggerLimit >= 0) {
                this.#triggerLimit = triggerLimit;
            } else {
                throw new RangeError("Trigger Limit must be 0 or higher!");
            }
        } else {
            throw new TypeError(triggerLimit + ' is not a valid number!');
        }
        if (typeof(override) == 'boolean') {
            this.#override = override;
        } else {
            throw new TypeError(override + ' is not a boolean value!');
        }
        this.#timesTriggered = 0;
    }

    get elem() {
        return this.#elem;
    }

    get animationType() {
        return this.#animationType;
    }

    get triggerLimit() {
        return this.#triggerLimit;
    }

    #checkAnimationType(animationType) {
        if(animationTypes.includes(animationType)) {
            return animationType;
        } else {
            throw new TypeError(animationType +  ' is not a valid Animation type!');
        }
    }

    trigger() {
        if(this.#triggerLimit == 0 || this.#timesTriggered < this.#triggerLimit) {
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
            this.#timesTriggered += 1;
        } else {
            util.warn(this.#animationType + " Trigger for " + this.#elem.obj.id + " has already been triggered the maximum times, skipping...");
        }
    }
}

export class ScrollTriggerElement {
    obj;
    constructor (obj,
                 anchorY = anchorTop,
                 offsetY = 0,
                 anchorX = anchorLeft,
                 offsetX = 0,
                 ) {
        this.obj = obj;
        if ([anchorTop, anchorBottom].includes(anchorY)) {
            this.anchorY = anchorY;
        } else {
            throw new TypeError(anchorY + " is not a valid Vertical Anchor!")
        }
        this.offsetY = offsetY;
        if ([anchorLeft, anchorRight].includes(anchorX)) {
            this.anchorX = anchorX;
        } else {
            throw new TypeError(anchorX + " is not a valid Horizontal Anchor!")
        }
        this.offsetX = offsetX;
    }

    computeX() {
        if (this.obj instanceof Window) {
            return this.anchorX == 'left' ? this.offsetX : this.obj.innerWidth + this.offsetX;
        } else {
            return this.anchorX == 'left' ? this.obj.getBoundingClientRect().left + offsetX : this.obj.getBoundingClientRect().right + offsetX;
        }
    }

    computeY() {
        if (this.obj instanceof Window) {
            return this.anchorY == 'top' ? this.offsetY : this.obj.innerHeight + this.offsetY;
        } else {
            return this.anchorY == 'left' ? this.obj.getBoundingClientRect().top + offsetY : this.obj.getBoundingClientRect().bottom + offsetY;
        }
    }
}

// TO DO: Expand to handle horizontal scrolling
export class AnimationScrollTrigger extends AnimationTrigger {
    #triggerElem;
    #triggerPoint;
    #triggerType;
    #reversible;
    #triggered;

    constructor(elem,
                animationType = toggle,
                triggerElem = new ScrollTriggerElement(elem),
                triggerPoint = new ScrollTriggerElement(window),
                triggerType = onScrollDown,
                triggerLimit = 1,
                reversible = false, // Use this flag if you want the Trigger to check for the reverse value once triggered
                override = false,
                ) {
        super(elem, animationType, triggerLimit, override);
        this.#triggerElem = triggerElem;
        this.#triggerPoint = triggerPoint;
        this.#triggerType = this.#checkTriggerType(triggerType);

        if (typeof(reversible) == 'boolean') {
            this.#reversible = reversible;
        } else {
            throw new TypeError(reversible + ' is not a boolean value!');
        }
        this.#triggered = false;
        window.addEventListener('scroll', this.handle);
    }

    #checkTriggerType(triggerType) {
        if(scrollTriggerTypes.includes(triggerType)) {
            return triggerType;
        } else {
            throw new TypeError(triggerType + ' is not a valid Scroll Trigger type!');
        }
    }

    handle() {
        point1;
        point2;
        switch (this.#triggerType) {
            case onScrollDown:
                point1 = this.#triggerElem.computeY();
                point2 = this.#triggerPoint.computeY();
                break;
            case onScrollUp:
                point1 = this.#triggerPoint.computeY();
                point2 = this.#triggerElem.computeY;
                break;
        }
        if (point1 >= point2) {
            this.trigger();
            this.#triggered = true;
        } else if (this.reversible && this.#triggered) {
            this.trigger();
            this.#triggered = false;
        }
        util.log(point1);
        util.log(point2);
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