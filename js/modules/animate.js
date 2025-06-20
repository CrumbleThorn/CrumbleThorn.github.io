// This module uses animate.css, please check out https://animate.style for reference
import * as util from './util.js';

const prefix = 'animate__';

const animateCSS = (element, animation, override = false) =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationClasses = [`${prefix}animated`, `${prefix}${animation.name}`];
        const node = element.obj;

        // BUG: numeric durations currently do not work
        if (typeof(animation.speed) == 'number')
            node.style.setProperty('--animate-duration', `${animation.speed / 1000}s`);
        else {
            node.style.removeProperty('--animate-duration'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.speed}`);
        }
        // BUG: numeric delays currently do not work
        if (typeof(animation.delay) == 'number'){
            util.log("Set Delay to " + animation.delay);
            node.style.setProperty('--animate-delay', `${animation.delay / 1000}s`);
        }
        else {
            node.style.removeProperty('--animate-delay'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.delay}`);
        }

        // Remove existing animations if an override is requested
        if (override)
            util.removeClassesByPrefix(element.obj, prefix);

        node.classList.add(...animationClasses);
    
        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            util.log(event);
            event.stopPropagation();
            node.classList.remove(...animationClasses);
            resolve('Animation ended');
        }
    
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

// Helper Classes
// TO DO: Add override variable to link overrides based on the animation played
export class Animation {
    constructor(name,
                speed = 'animated',
                delay = 0,
                ) {
        this.name = name; // animate.css animation classes
        this.speed = speed; // animate.css animation speed classes OR number in milliseconds
        this.delay = delay; // animate.css animation delay classes OR number in milliseconds
    }
}

export class AnimatedElement {
    constructor(obj,
                display = 'block',
                active = true,
                entry = new Animation('fadeIn', 'faster'),
                highlight = new Animation('pulse', 'faster'),
                exit = new Animation('fadeOut', 'faster'),
                ) {
        this.obj = obj;
        this.display = display;
        this.active = active;
        this.isAnimating = false;
        this.entryAnimation = entry;
        this.highlightAnimation = highlight;
        this.exitAnimation = exit;
        if (active)
            this.obj.style.display = display;
        else
            this.obj.style.display = 'none';
    }

    setEntry(animation) {
        this.entryAnimation = animation;
    }

    setHighlight(animation) {
        this.highlightAnimation = animation;
    }

    setExit(animation) {
        this.exitAnimation = animation;
    }

    show(override = false) {
        if (!this.active) {
            util.log("Showing " + this.obj.id + "...");
            this.obj.style.display = this.display;
            this.active = true;
            this.isAnimating = true;
            animateCSS(this, this.entryAnimation, override).then((value) => {
                util.log("Done Showing " + this.obj.id + "!");
                this.obj.style.display = this.display;
                this.isAnimating = false;
            });
        } else {
            util.warn("WARNING: Object " + this.obj.id + " is already active, skipping animation");
        }
    }

    highlight(override = false) {
        if (this.active){
            util.log("Highlighting " + this.obj.id + "...");
            animateCSS(this, this.highlightAnimation, override);
        } else {
            util.warn("WARNING: Object " + this.obj.id + " is not active, skipping animation");
        }
    }

    hide(override = false) {
        if (this.active) {
            this.active = false;
            this.isAnimating = true;
            util.log("Hiding " + this.obj.id + "...");
            animateCSS(this, this.exitAnimation, override).then((value) => {
                util.log("Done Hiding" + this.obj.id + "!");
                this.obj.style.display = 'none';
                this.isAnimating = false;
            });
        } else {
            util.warn("WARNING: Object " + this.obj.id + " is already inactive, skipping animation");
        }
    }

    toggle(override = false) {
        if (this.isAnimating == false || override == true) {
            if (this.active) {
                this.hide(override)
            } else {
                this.show(override);
            }
        }
    }
}

export class AnimatedScrollElement extends AnimatedElement {
    constructor(obj, display = 'block', active = true, triggerPoint = window) {
        super(obj, display, active);
        this.triggerPoint = triggerPoint;
        this.normallyHidden = !active; // Determines if element should be visible by default
    }
    
    hasReachedTrigger() {
        if (this.triggerPoint.getBoundingClientRect().top <= window.innerHeight) {
            return true;
        }
        else
        return false;
    }
}

export class AnimatedLoadingScreenElement extends AnimatedElement {
    constructor(obj, display = 'block', active = true, body = document.body) {
        super(obj, display, active);
        this.body = body;
        this.normallyHidden = !active; // Determines if element should be visible by default
    }

    show(override = false) {
        if (!this.active) {
            util.log("Showing Loading Screen...");
            this.obj.style.display = this.display;
            this.body.classList.add("no-scroll");
            this.active = true;
            this.isAnimating = true;
            animateCSS(this, this.entryAnimation, override).then((value) => {
                util.log("Done Showing Loading Screen!");
                this.obj.style.display = this.display;
                this.isAnimating = false;
            });
        } else {
            util.warn("WARNING: Loading Screen is already active, skipping animation");
        }
    }
    
    hide(override = false) {
        if (this.active) {
            this.active = false;
            this.body.classList.remove("no-scroll");
            this.isAnimating = true;
            util.log("Hiding Loading Screen...");
            animateCSS(this, this.exitAnimation, override).then((value) => {
                util.log("Done Hiding Loading Sreen!");
                this.obj.style.display = 'none';
                this.isAnimating = false;
            });
        } else {
            util.warn("WARNING: Loading Screen is already inactive, skipping animation");
        }
    }

    toggle(override = false) {
        if (this.isAnimating == false || override == true) {
            if (this.active) {
                this.hide(override)
            } else {
                this.show(override);
            }
        }
    }
}