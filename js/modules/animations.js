import * as util from './util.js';
import * as animate from './animate.js';

// Animation Type Constants
//TO DO: Add reset function for removing looping animations
export const animationType = {
    show: 'show',
    hide: 'hide',
    highlight: 'highlight',
    toggle: 'toggle',
};

// Scroll Trigger Type Constants
export const scrollTriggerType = {
    onScrollDown: 'onScrollDown',
    onScrollUp: 'onScrollUp',
    onScrollLeft: 'onScrollLeft',
    onScrollRight: 'onScrollRight',
}

// Scroll Trigger Anchor Constants
export const anchor = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    vertical: {
        top: 'top',
        bottom: 'bottom',
        },
    horizontal: {
        left: 'left',
        right: 'right',
        },
};

// Mouse Event Trigger Type Constants
export const mouseEventTriggerType = {
    onMouseDown: 'onmousedown',
    onMouseUp: 'onmouseup',
    onMouseClick: 'onclick',
    onMouseDoubleClick: 'ondblclick', 
    onMouseAuxClick: 'onauxclick',
    onMouseOver: 'onmouseover',
    onMouseOut: 'onmouseout',
    onMouseEnter: 'onmouseenter',
    onMouseExit: 'onmouseleave',
};

export class AnimatedElement {
    #obj;
    #display;
    #active;
    #entryAnimation;
    #exitAnimation;
    #highlightAnimation;
    #isAnimating;

    constructor(obj,
                active = true,
                entry,
                exit,
                highlight,
                ) {
        if (obj.style.display == util.css.display.none) {
            throw RangeError("Default Display cannot be set to \'none\'!")
        }
        this.#obj = obj;
        this.#active = active;
        this.#entryAnimation = entry;
        this.#exitAnimation = exit;
        this.#highlightAnimation = highlight;
        this.#isAnimating = false;
        if (!this.#active) {
            this.#obj.classList.add(util.css.siteClasses.hidden);
        }
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
        if (this.#entryAnimation != undefined) {
            if (!this.#active) {
                util.log('Showing ' + this.#obj.id + '...');
                this.#obj.classList.remove(util.css.siteClasses.hidden);
                this.#active = true;
                this.#isAnimating = true;
                animate.css(this.#obj, this.#entryAnimation, override).then(() => {
                    util.log('Done Showing ' + this.#obj.id + '!');
                    this.#isAnimating = false;
                    this.#obj.dispatchEvent(new CustomEvent('showAnimationComplete', {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                }, () => {
                    util.log('Showing ' + this.#obj.id + ' was interrupted!');
                    this.#obj.dispatchEvent(new CustomEvent('showAnimationInterrupted', {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                });
            } else {
                util.warn('WARNING: Object ' + this.#obj.id + ' is already active, skipping animation');
            }
        } else {
            throw new ReferenceError("entryAnimation is undefined!");
        }
    }

    highlight(override = false) {
        if (this.#highlightAnimation != undefined) {
            if (this.#active) {
                util.log('Highlighting ' + this.#obj.id + '...');
                animate.css(this.#obj, this.#highlightAnimation, override).then(() => {
                    util.log('Done Highlighting ' + this.#obj.id + '!');
                    this.#obj.dispatchEvent(new CustomEvent('highlightAnimationComplete', {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                }, () => {
                    util.log('Highlighting ' + this.#obj.id + ' was interrupted!');
                    this.#obj.dispatchEvent(new CustomEvent('highlightAnimationInterrupted', {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                });
            } else {
                util.warn('WARNING: Object ' + this.#obj.id + ' is not active, skipping animation');
            }
        } else {
            throw new ReferenceError("highlightAnimation is undefined!");
        }
    }

    // Use this function to cleanly stop infinite animations
    stopHighlighting() {
        this.#obj.classList.add(animate.repeatClass.repeat_1);
        this.#obj.classList.remove(animate.repeatClass.infinite);
    }

    hide(override = false) {
        if (this.#exitAnimation != undefined) {
            if (this.#active) {
                this.#active = false;
                this.#isAnimating = true;
                util.log('Hiding ' + this.#obj.id + '...');
                animate.css(this.#obj, this.#exitAnimation, override).then(() => {
                    util.log('Done Hiding ' + this.#obj.id + '!');
                    this.#obj.classList.add(util.css.siteClasses.hidden);
                    this.#isAnimating = false;
                    this.#obj.dispatchEvent(new CustomEvent('hideAnimationComplete', {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                }, () => {
                    util.log('Hiding ' + this.#obj.id + ' was interrupted!');
                    this.#obj.dispatchEvent(new CustomEvent('hideAnimationInterrupted', {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                });
            } else {
                util.warn('WARNING: Object ' + this.#obj.id + ' is already inactive, skipping animation');
            }
        } else {
            throw new ReferenceError("exitAnimation is undefined!");
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
    #typeOfAnimation;
    #triggerLimit;
    #override;
    #timesTriggered;

    constructor(elem,
                typeOfAnimation = toggle,
                triggerLimit = 1,
                override = false,
                ) {
        this.#elem = elem;
        this.#typeOfAnimation = this.#checkAnimationType(typeOfAnimation);
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

    get typeOfAnimation() {
        return this.#typeOfAnimation;
    }

    get triggerLimit() {
        return this.#triggerLimit;
    }

    get timesTriggered() {
        return this.#timesTriggered;
    }

    #checkAnimationType(typeOfAnimation) {
        if (Object.values(animationType).includes(typeOfAnimation)) {
            return typeOfAnimation;
        } else {
            throw new TypeError(typeOfAnimation +  ' is not a valid Animation type!');
        }
    }

    trigger() {
        if (this.#triggerLimit == 0 || this.#timesTriggered < this.#triggerLimit) {
            switch(this.#typeOfAnimation) {
                case animationType.show:
                    this.#elem.show(this.#override);
                    break;
                case animationType.hide:
                    this.#elem.hide(this.#override);
                    break;
                case animationType.highlight:
                    this.#elem.highlight(this.#override);
                    break;
                case animationType.toggle:
                    this.#elem.toggle(this.#override);
                    break;
                //TO DO: Add reset function for removing looping animations
            }
            this.#elem.obj.dispatchEvent(new CustomEvent('animationTriggered', {
                    detail: {origin: this.elem.obj},
                    bubbles: true,
                    composed: true,
                }));
            this.#timesTriggered += 1;
        } else {
            util.warn(this.#typeOfAnimation + " Trigger for " + this.#elem.obj.id + " has already been triggered the maximum times, skipping...");
        }
    }
}

export class ScrollTriggerElement {
    #obj;
    constructor (obj,
                 anchorY = anchor.top,
                 offsetY = 0,
                 anchorX = anchor.left,
                 offsetX = 0,
                 ) {
        this.#obj = obj;
        if (Object.values(anchor.vertical).includes(anchorY)) {
            this.anchorY = anchorY;
        } else {
            throw new TypeError(anchorY + " is not a valid Vertical Anchor!")
        }
        this.offsetY = offsetY;
        if (Object.values(anchor.horizontal).includes(anchorX)) {
            this.anchorX = anchorX;
        } else {
            throw new TypeError(anchorX + " is not a valid Horizontal Anchor!")
        }
        this.offsetX = offsetX;
    }

    get obj() {
        return this.#obj;
    }

    computeX() {
        if (this.#obj instanceof Window) {
            return this.anchorX == 'left' ? this.offsetX : this.#obj.innerWidth + this.offsetX;
        } else {
            return this.anchorX == 'left' ? this.#obj.getBoundingClientRect().left + this.offsetX : this.#obj.getBoundingClientRect().right + this.offsetX;
        }
    }

    computeY() {
        if (this.#obj instanceof Window) {
            return this.anchorY == 'top' ? this.offsetY : this.#obj.innerHeight + this.offsetY;
        } else {
            return this.anchorY == 'top' ? this.#obj.getBoundingClientRect().top + this.offsetY : this.#obj.getBoundingClientRect().bottom + this.offsetY;
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
                triggerElem = new ScrollTriggerElement(elem.obj),
                triggerPoint = new ScrollTriggerElement(window),
                triggerType = scrollTriggerType.onScrollDown,
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
        window.addEventListener('scroll', () => {this.handle()});
    }

    get triggered() {
        return this.#triggered;
    }

    #checkTriggerType(triggerType) {
        if (Object.values(scrollTriggerType).includes(triggerType)) {
            return triggerType;
        } else {
            throw new TypeError(triggerType + ' is not a valid Scroll Trigger type!');
        }
    }

    handle() {
        let point1;
        let point2;
        switch (this.#triggerType) {
            case scrollTriggerType.onScrollDown:
                point1 = this.#triggerElem.computeY();
                point2 = this.#triggerPoint.computeY();
                break;
            case scrollTriggerType.onScrollUp:
                point1 = this.#triggerPoint.computeY();
                point2 = this.#triggerElem.computeY;
                break;
        }
        if (point1 <= point2) {
            if(!this.#triggered) {
                this.trigger();
                this.#triggered = true;
                
                // Remove listener once trigger limit has been reached for efficiency
                if (this.timesTriggered == this.triggerLimit) {
                    window.removeEventListener('scroll', this.handle);
                }
            }
        } else if (this.#reversible && this.#triggered) {
            this.trigger();
            this.#triggered = false;
            // Remove listener once trigger limit has been reached for efficiency
            if (this.timesTriggered == this.triggerLimit) {
                window.removeEventListener('scroll', this.handle);
            }
        }
    }
}