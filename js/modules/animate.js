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
            console.log("Set Delay to " + animation.delay);
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
            console.log(event);
            event.stopPropagation();
            node.classList.remove(...animationClasses);
            resolve('Animation ended');
        }
    
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

// Helper Classes
// TO DO: Add override variable to link overrides based on the animation played
export class Animation {
    constructor(name, speed = 'animated', delay = 0) {
        this.name = name; // animate.css animation classes
        this.speed = speed; // animate.css animation speed classes OR number in milliseconds
        this.delay = delay; // animate.css animation delay classes OR number in milliseconds
    }
}

export class AnimatedElement {
    constructor(obj, display = 'block', active = true) {
        this.obj = obj;
        this.display = display;
        this.active = active;
        this.entryAnimation = new Animation('fadeIn', 'faster');
        this.highlightAnimation = new Animation('pulse', 'faster');
        this.exitAnimation = new Animation('fadeOut', 'faster');
        if (active)
            this.obj.style.display = display;
        else
            this.obj.style.display = 'none';
    }

    show(override = false) {
        if (!this.active) {
            console.log("Show");
            this.obj.style.display = this.display;
            this.active = true;
            animateCSS(this, this.entryAnimation, override);
        } else {
            console.warn("WARNING: Object is already active, skipping animation");
        }
    }

    highlight(override = false) {
        if (this.active){
            console.log("Highlight");
            animateCSS(this, this.highlightAnimation, override);
        } else {
            console.warn("WARNING: Object is not active, skipping animation");
        }
    }

    hide(override = false) {
        if (this.active) {
            this.active = false;
            console.log("Hide");
            animateCSS(this, this.exitAnimation, override).then((value) => {
                this.obj.style.display = 'none';
            });
        } else {
            console.warn("WARNING: Object is not active, skipping animation");
        }
    }

    toggle() {
        if (this.active) {
            this.hide()
        } else {
            this.show();
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