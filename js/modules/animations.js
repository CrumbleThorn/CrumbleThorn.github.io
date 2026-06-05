import * as util from './util.js';
import * as animate from './animate.js';

// Animation Type Constants
export const animationType = {
    show: 'show',
    hide: 'hide',
    highlight: 'highlight',
    toggle: 'toggle',
};

// Scroll Trigger Type Constants
export const scrollTriggerType = {
    onScroll: 'scroll',
    onScrollDown: 'scrollDown',
    onScrollUp: 'scrollUp',
    onScrollLeft: 'scrollLeft',
    onScrollRight: 'scrollRight',
    onScrollEnd: 'scrollend',
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
    onMouseDown: 'mousedown',
    onMouseUp: 'mouseup',
    onMouseClick: 'click',
    onMouseDoubleClick: 'dblclick',
    onMouseAuxClick: 'auxclick',
    onMouseOver: 'mouseover',
    onMouseOut: 'mouseout',
    onMouseEnter: 'mouseenter',
    onMouseExit: 'mouseleave',
};

export const animationEvents = {
    showAnimationComplete: 'showAnimationComplete',
    showAnimationInterrupted: 'showAnimationInterrupted',
    highlightAnimationComplete: 'highlightAnimationComplete',
    highlightAnimationInterrupted: 'highlightAnimationInterrupted',
    hideAnimationComplete: 'hideAnimationComplete',
    hideAnimationInterrupted: 'hideAnimationInterrupted',
    animationTriggered: 'animationTriggered',
    scrollTriggered: 'scrollTriggered',
    triggerFired: 'triggerFired',
}

export class AnimatedElement {
    #obj;
    #display;
    #active;
    #entryAnimation;
    #exitAnimation;
    #highlightAnimation;
    #isAnimating;
    #triggerListeners;

    constructor(obj,
                active = true,
                entry,
                exit,
                highlight,
                ) {
        if (obj.style.display == util.css.Display.none) {
            throw RangeError('Default Display cannot be set to \'none\'!')
        }
        this.#obj = obj;
        this.#active = active;
        this.#entryAnimation = entry;
        this.#exitAnimation = exit;
        this.#highlightAnimation = highlight;
        this.#isAnimating = false;
        this.#triggerListeners = new Map();
        
        if (!this.#active) {
            this.#obj.classList.add(util.css.SiteClass.hidden);
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

    get exitAnimation() {
        return this.#exitAnimation;
    }

    set exitAnimation(animation) {
        this.#exitAnimation = animation;
    }

    get isAnimating() {
        return this.#isAnimating;
    }

    get triggerListeners() {
        return this.#triggerListeners;
    }

    /**
     * Listen to a trigger and perform animation when trigger fires
     * @param {Trigger} trigger - The trigger to listen to
     * @param {string} animation - The animation type to perform
     * @param {boolean} override - Whether to override current animation
     */
    listenToTrigger(trigger, animation = animationType.toggle, override = false) {
        if (!Object.values(animationType).includes(animation)) {
            throw new TypeError(animation + ' is not a valid Animation type!');
        }

        const listener = (event) => {
            this.#handleTrigger(animation, override);
        };

        // Store the listener so we can remove it later if needed
        if (!this.#triggerListeners.has(trigger)) {
            this.#triggerListeners.set(trigger, []);
        }
        this.#triggerListeners.get(trigger).push({ animation, listener });

        // Listen to the trigger's fired event
        trigger.addEventListener(animationEvents.triggerFired, listener);
    }

    /**
     * Stop listening to a specific trigger
     * @param {Trigger} trigger - The trigger to stop listening to
     */
    stopListeningToTrigger(trigger) {
        const listeners = this.#triggerListeners.get(trigger);
        if (listeners) {
            listeners.forEach(({ listener }) => {
                trigger.removeEventListener(animationEvents.triggerFired, listener);
            });
            this.#triggerListeners.delete(trigger);
        }
    }

    #handleTrigger(animation, override) {
        switch(animation) {
            case animationType.show:
                this.show(override);
                break;
            case animationType.hide:
                this.hide(override);
                break;
            case animationType.highlight:
                this.highlight(override);
                break;
            case animationType.toggle:
                this.toggle(override);
                break;
        }
        
        this.#obj.dispatchEvent(new CustomEvent(animationEvents.animationTriggered, {
            detail: { origin: this, animation: animation },
            bubbles: true,
            composed: true,
        }));
    }

    show(override = false) {
        if (this.#entryAnimation != undefined) {
            if (!this.#active) {
                util.log(
                    'Showing ' + this.#obj.id + '...',
                    util.LogType.INFO,
                );
                this.#obj.classList.remove(util.css.SiteClass.hidden);
                this.#active = true;
                this.#isAnimating = true;
                animate.css(this.#obj, this.#entryAnimation, override).then(() => {
                    util.log(
                        'Done Showing ' + this.#obj.id + '!',
                        util.LogType.INFO,
                    );
                    this.#isAnimating = false;
                    this.#obj.dispatchEvent(new CustomEvent(animationEvents.showAnimationComplete, {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                }, () => {
                    util.log(
                        'Showing ' + this.#obj.id + ' was interrupted!',
                        util.LogType.INFO,
                    );
                    this.#obj.dispatchEvent(new CustomEvent(animationEvents.showAnimationInterrupted, {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                });
            } else {
                util.warn('WARNING: Object ' + this.#obj.id + ' is already active, skipping animation...');
            }
        } else {
            util.warn('WARNING: entryAnimation is undefined, nothing will be animated!');
        }
    }

    highlight(override = false) {
        if (this.#highlightAnimation != undefined) {
            if (this.#active) {
                util.log(
                    'Highlighting ' + this.#obj.id + '...',
                    util.LogType.INFO,
                );
                animate.css(this.#obj, this.#highlightAnimation, override).then(() => {
                    util.log(
                        'Done Highlighting ' + this.#obj.id + '!',
                        util.LogType.INFO,
                    );
                    this.#obj.dispatchEvent(new CustomEvent(animationEvents.highlightAnimationComplete, {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                }, () => {
                    util.log(
                        'Highlighting ' + this.#obj.id + ' was interrupted!',
                        util.LogType.INFO,
                    );
                    this.#obj.dispatchEvent(new CustomEvent(animationEvents.highlightAnimationInterrupted, {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                });
            } else {
                util.warn('WARNING: Object ' + this.#obj.id + ' is not active, skipping animation...');
            }
        } else {
            util.warn('WARNING: highlightAnimation is undefined, nothing will be animated!');
        }
    }

    stopHighlighting() {
        this.#obj.classList.add(animate.repeatClass.repeat_1);
        this.#obj.classList.remove(animate.repeatClass.infinite);
    }

    hide(override = false) {
        if (this.#exitAnimation != undefined) {
            if (this.#active) {
                this.#active = false;
                this.#isAnimating = true;
                util.log(
                    'Hiding ' + this.#obj.id + '...',
                    util.LogType.INFO,
                );
                animate.css(this.#obj, this.#exitAnimation, override).then(() => {
                    util.log(
                        'Done Hiding ' + this.#obj.id + '!',
                        util.LogType.INFO,
                    );
                    this.#obj.classList.add(util.css.SiteClass.hidden);
                    this.#isAnimating = false;
                    this.#obj.dispatchEvent(new CustomEvent(animationEvents.hideAnimationComplete, {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                }, () => {
                    util.log(
                        'Hiding ' + this.#obj.id + ' was interrupted!',
                        util.LogType.INFO,
                    );
                    this.#obj.dispatchEvent(new CustomEvent(animationEvents.hideAnimationInterrupted, {
                        detail: {origin: this.#obj},
                        bubbles: true,
                        composed: true,
                    }));
                });
            } else {
                util.warn('WARNING: Object ' + this.#obj.id + ' is already inactive, skipping animation...');
            }
        } else {
            util.warn('WARNING: exitAnimation is undefined, nothing will be animated!');
        }
    }

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

/**
 * Base Trigger class that fires events
 */
export class Trigger extends EventTarget {
    #triggerLimit;
    #timesTriggered;
    #active;

    constructor(triggerLimit = 0, active = true) {
        super();
        
        if (typeof(triggerLimit) == 'number') {
            if (triggerLimit >= 0) {
                this.#triggerLimit = triggerLimit;
            } else {
                throw new RangeError('Trigger Limit must be 0 or higher!');
            }
        } else {
            throw new TypeError(triggerLimit + ' is not a valid number!');
        }
        
        this.#timesTriggered = 0;
        this.#active = active;
    }

    get triggerLimit() {
        return this.#triggerLimit;
    }

    get timesTriggered() {
        return this.#timesTriggered;
    }

    get active() {
        return this.#active;
    }

    set active(value) {
        this.#active = value;
    }

    fire(detail = {}) {
        if (!this.#active) {
            return false;
        }

        if (this.#triggerLimit == 0 || this.#timesTriggered < this.#triggerLimit) {
            this.#timesTriggered += 1;
            
            const triggerEvent = new CustomEvent(animationEvents.triggerFired, {
                detail: { 
                    ...detail,
                    trigger: this,
                    timesTriggered: this.#timesTriggered,
                },
                bubbles: true,
                composed: true,
            });

            this.dispatchEvent(triggerEvent);
            document.dispatchEvent(triggerEvent);

            // Disable trigger if limit reached
            if (this.#triggerLimit > 0 && this.#timesTriggered >= this.#triggerLimit) {
                this.#active = false;
            }

            return true;
        } else {
            util.warn('Trigger has already been fired the maximum times, skipping...');
            return false;
        }
    }

    reset() {
        this.#timesTriggered = 0;
        this.#active = true;
    }
}

// TODO: add way to reuse ScrollTriggerElements when referenced multiple times to avoid unnecessary computations
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
            throw new TypeError(anchorY + ' is not a valid Vertical Anchor!')
        }
        this.offsetY = offsetY;
        if (Object.values(anchor.horizontal).includes(anchorX)) {
            this.anchorX = anchorX;
        } else {
            throw new TypeError(anchorX + ' is not a valid Horizontal Anchor!')
        }
        this.offsetX = offsetX;
    }

    get obj() {
        return this.#obj;
    }

    computeX() {
        if (this.#obj instanceof Window) {
            return this.anchorX == anchor.left ? this.offsetX : this.#obj.innerWidth + this.offsetX;
        } else {
            return this.anchorX == anchor.left ? this.#obj.getBoundingClientRect().left + this.offsetX : this.#obj.getBoundingClientRect().right + this.offsetX;
        }
    }

    computeY() {
        if (this.#obj instanceof Window) {
            return this.anchorY == anchor.top ? this.offsetY : this.#obj.innerHeight + this.offsetY;
        } else {
            return this.anchorY == anchor.top ? this.#obj.getBoundingClientRect().top + this.offsetY : this.#obj.getBoundingClientRect().bottom + this.offsetY;
        }
    }
}

/**
 * ScrollTrigger that fires when scroll conditions are met
 */
export class ScrollTrigger extends Trigger {
    #triggerElem;
    #triggerPoint;
    #triggerType;
    #reversible;
    #triggered;
    #point1;
    #point2;
    #scrollHandler;
    #directionHandler;

    constructor(triggerElem,
                triggerPoint = new ScrollTriggerElement(window, anchor.bottom),
                triggerType = scrollTriggerType.onScrollDown,
                triggerLimit = 1,
                reversible = false,
                active = true,
                ) {
        super(triggerLimit, active);
        
        this.#triggerElem = triggerElem;
        this.#triggerPoint = triggerPoint;
        this.#triggerType = this.#checkTriggerType(triggerType);

        if (typeof(reversible) == 'boolean') {
            this.#reversible = reversible;
        } else {
            throw new TypeError(reversible + ' is not a boolean value!');
        }
        
        this.#triggered = false;
        
        // Initialize values
        this.calculate();
        
        // Create bound handlers for proper cleanup
        this.#scrollHandler = () => this.calculate();
        this.#directionHandler = () => this.handle();
        
        // Set up event listeners
        window.addEventListener(scrollTriggerType.onScroll, this.#scrollHandler);
        
        if (reversible) {
            window.addEventListener(scrollTriggerType.onScroll, this.#directionHandler);
        } else {
            window.addEventListener(triggerType, this.#directionHandler);
        }
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

    calculate() {
        switch (this.#triggerType) {
            case scrollTriggerType.onScrollDown:
                this.#point1 = this.#triggerElem.computeY();
                this.#point2 = this.#triggerPoint.computeY();
                break;
            case scrollTriggerType.onScrollUp:
                this.#point1 = this.#triggerPoint.computeY();
                this.#point2 = this.#triggerElem.computeY();
                break;
            // Add horizontal scroll cases here
        }
    }

    handle() {
        if (!this.active) return;

        if (this.#point1 < this.#point2) {
            if (!this.#triggered) {
                this.#triggered = true;
                const fired = this.fire({ 
                    direction: 'forward',
                    triggerType: this.#triggerType 
                });
                
                // Clean up listeners if limit reached
                if (this.triggerLimit > 0 && this.timesTriggered >= this.triggerLimit) {
                    this.cleanup();
                }
            }
        } else if (this.#triggered) {
            this.#triggered = false;
            if (this.#reversible) {
                const fired = this.fire({ 
                    direction: 'reverse',
                    triggerType: this.#triggerType 
                });
                
                // Clean up listeners if limit reached
                if (this.triggerLimit > 0 && this.timesTriggered >= this.triggerLimit) {
                    this.cleanup();
                }
            }
        }
    }

    cleanup() {
        window.removeEventListener(scrollTriggerType.onScroll, this.#scrollHandler);
        
        if (this.#reversible) {
            window.removeEventListener(scrollTriggerType.onScroll, this.#directionHandler);
        } else {
            window.removeEventListener(this.#triggerType, this.#directionHandler);
        }
    }
}

/**
 * MouseEventTrigger that fires on mouse events
 */
export class MouseEventTrigger extends Trigger {
    #targetElement;
    #eventType;
    #eventHandler;

    constructor(targetElement,
                eventType = mouseEventTriggerType.onMouseClick,
                triggerLimit = 0,
                active = true) {
        super(triggerLimit, active);
        
        this.#targetElement = targetElement;
        this.#eventType = this.#checkEventType(eventType);
        
        // Create bound handler for proper cleanup
        this.#eventHandler = (event) => this.handle(event);
        
        // Set up event listener
        this.#targetElement.addEventListener(this.#eventType, this.#eventHandler);
    }

    #checkEventType(eventType) {
        if (Object.values(mouseEventTriggerType).includes(eventType)) {
            return eventType;
        } else {
            throw new TypeError(eventType + ' is not a valid Mouse Event Trigger type!');
        }
    }

    handle(event) {
        if (!this.active) return;

        const fired = this.fire({
            eventType: this.#eventType,
            mouseEvent: event
        });

        // Clean up listener if limit reached
        if (this.triggerLimit > 0 && this.timesTriggered >= this.triggerLimit) {
            this.cleanup();
        }
    }

    cleanup() {
        this.#targetElement.removeEventListener(this.#eventType, this.#eventHandler);
    }
}

// Helper function to connect triggers to animated elements
export function connectTriggerToElement(trigger, animatedElement, animation = animationType.toggle, override = false) {
    animatedElement.listenToTrigger(trigger, animation, override);
}