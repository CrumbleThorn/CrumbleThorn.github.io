// This module uses animate.css, please check out https://animate.style for reference
import * as util from './util.js';

const prefix = 'animate__';

// Animation Constants
export const animationClass = {
    // Attention Seekers
    bounce: 'bounce',
    flash: 'flash',
    pulse: 'pulse',
    rubberBand: 'rubberBand',
    shakeX: 'shakeX',
    shakeY: 'shakeY',
    headShake: 'headShake',
    swing: 'swing',
    tada: 'tada',
    wobble: 'wobble',
    jello: 'jello',
    heartBeat: 'heartBeat',
    // Back Entrances
    backInDown: 'backInDown',
    backInLeft: 'backInLeft',
    backInRight: 'backInRight',
    backInUp: 'backInUp',
    // Back Exits
    backOutDown: 'backOutDown',
    backOutLeft: 'backOutLeft',
    backOutRight: 'backOutRight',
    backOutUp: 'backOutUp',
    // Bouncing Entrances
    bounceIn: 'bounceIn',
    bounceInDown: 'bounceInDown',
    bounceInLeft: 'bounceInLeft',
    bounceInRight: 'bounceInRight',
    bounceInUp: 'bounceInUp',
    // Bouncing Exits
    bounceOut: 'bounceOut',
    bounceOutDown: 'bounceOutDown',
    bounceOutLeft: 'bounceOutLeft',
    bounceOutRight: 'bounceOutRight',
    bounceOutUp: 'bounceOutUp',
    // Fading Entrances
    fadeIn: 'fadeIn',
    fadeInDown: 'fadeInDown',
    fadeInDownBig: 'fadeInDownBig',
    fadeInLeft: 'fadeInLeft',
    fadeInLeftBig: 'fadeInLeftBig',
    fadeInRight: 'fadeInRight',
    fadeInRightBig: 'fadeInRightBig',
    fadeInUp: 'fadeInUp',
    fadeInUpBig: 'fadeInUpBig',
    fadeInTopLeft: 'fadeInTopLeft',
    fadeInTopRight: 'fadeInTopRight',
    fadeInBottomLeft: 'fadeInBottomLeft',
    fadeInBottomRight: 'fadeInBottomRight',
    // Fading Exits
    fadeOut: 'fadeOut',
    fadeOutDown: 'fadeOutDown',
    fadeOutDownBig: 'fadeOutDownBig',
    fadeOutLeft: 'fadeOutLeft',
    fadeOutLeftBig: 'fadeOutLeftBig',
    fadeOutRight: 'fadeOutRight',
    fadeOutRightBig: 'fadeOutRightBig',
    fadeOutUp: 'fadeOutUp',
    fadeOutUpBig: 'fadeOutUpBig',
    fadeOutTopLeft: 'fadeOutTopLeft',
    fadeOutTopRight: 'fadeOutTopRight',
    fadeOutBottomRight: 'fadeOutBottomRight',
    fadeOutBottomLeft: 'fadeOutBottomLeft',
    // Flippers
    flip: 'flip',
    flipInX: 'flipInX',
    flipInY: 'flipInY',
    flipOutX: 'flipOutX',
    flipOutY: 'flipOutY',
    // Lightspeed
    lightSpeedInRight: 'lightSpeedInRight',
    lightSpeedInLeft: 'lightSpeedInLeft',
    lightSpeedOutRight: 'lightSpeedOutRight',
    lightSpeedOutLeft: 'lightSpeedOutLeft',
    // Rotating Entrances
    rotateIn: 'rotateIn',
    rotateInDownLeft: 'rotateInDownLeft',
    rotateInDownRight: 'rotateInDownRight',
    rotateInUpLeft: 'rotateInUpLeft',
    rotateInUpRight: 'rotateInUpRight',
    // Rotating Exits
    rotateOut: 'rotateOut',
    rotateOutDownLeft: 'rotateOutDownLeft',
    rotateOutDownRight: 'rotateOutDownRight',
    rotateOutUpLeft: 'rotateOutUpLeft',
    rotateOutUpRight: 'rotateOutUpRight',
    // Specials
    hinge:-'hinge',
    jackInTheBox: 'jackInTheBox',
    rollIn: 'rollIn',
    rollOut: 'rollOut',
    // Zooming Entrances
    zoomIn: 'zoomIn',
    zoomInDown: 'zoomInDown',
    zoomInLeft: 'zoomInLeft',
    zoomInRight: 'zoomInRight',
    zoomInUp: 'zoomInUp',
    // Zooming Exits
    zoomOut: 'zoomOut',
    zoomOutDown: 'zoomOutDown',
    zoomOutLeft: 'zoomOutLeft',
    zoomOutRight: 'zoomOutRight',
    zoomOutUp: 'zoomOutUp',
    // Sliding Entrances
    slideInDown: 'slideInDown',
    slideInLeft: 'slideInLeft',
    slideInRight: 'slideInRight',
    slideInUp: 'slideInUp',
    // Sliding Exits
    slideOutDown: 'slideOutDown',
    slideOutLeft: 'slideOutLeft',
    slideOutRight: 'slideOutRight',
    slideOutUp: 'slideOutUp',
};

// Animation Delay Constants
export const delayClass = {
    delay_1s: 'delay-1s',
    delay_2s: 'delay-2s',
    delay_3s: 'delay-3s',
    delay_4s: 'delay-4s',
    delay_5s: 'delay-5s',
};

// Animation Speed Constants
export const speedClass = {
    animated: 'animated',
    slow: 'slow',
    slower: 'slower',
    fast: 'fast',
    faster: 'faster',
};

// Animation Repeat Constants
export const repeatClass = {
    repeat_1: 'repeat-1',
    repeat_2: 'repeat-2',
    repeat_3: 'repeat-3',
    infinite: 'infinite',
};

// Helper Classes
export class Animation {
    #name;
    #speed;
    #delay;
    #repeat;

    constructor(name,
                speed = 'animated',
                delay = 0,
                repeat = 1
                ) {
        this.#name = this.#checkAnimationName(name); // animate.css animation class name without `animate__` prefix
        this.#speed = this.#checkAnimationSpeed(speed); // animate.css animation speed class OR number in milliseconds
        this.#delay = this.#checkAnimationDelay(delay); // animate.css animation delay class OR number in milliseconds
        this.#repeat = this.#checkAnimationRepeat(repeat); // animate.css animation repeat class OR whole number
    }
    
    get name() {
        return this.#name;
    }
    set name(newName) {
        this.#name = this.#checkAnimationName(newName);
    }

    get speed() {
        return this.#speed;
    }
    set speed(newSpeed) {
        this.#speed = this.#checkAnimationSpeed(newSpeed);
    }

    get delay() {
        return this.#delay;
    }
    set delay(newDelay) {
        this.#delay = this.#checkAnimationDelay(newDelay);
    }

    get repeat() {
        return this.#repeat;
    }
    set repeat(newRepeat) {
        this.#repeat = this.#checkAnimationRepeat(newRepeat);
    }

    #checkAnimationName(name) {
        if (Object.values(animationClass).includes(name)) {
            return name;
        } else {
            throw new TypeError(name + ' is not a valid animate.css Animation Class!');
        }
    }

    #checkAnimationSpeed(speed) {
        if (Object.values(speedClass).includes(speed)) {
            return speed;
        } else if (typeof(speed) == 'number') {
            if (Math.trunc(speed) != speed) {
                util.warn('WARNING: Speed has been truncated to ' + speed + 'ms.');
            }
            return speed;
        } else {
            throw new TypeError(speed + ' is not a valid number or animate.css Speed Class!');
        }
    }

    #checkAnimationDelay(delay) {
        if (Object.values(delayClass).includes(delay)) {
            return delay;
        } else if (typeof(delay) == 'number') {
            if (Math.trunc(delay) != delay) {
                util.warn('WARNING: Delay has been truncated to ' + delay + 'ms.');
            }
            return delay;
        } else {
            throw new TypeError(delay + ' is not a valid number or animate.css Delay Class!');
        }
    }

    #checkAnimationRepeat(repeat) {
        if (Object.values(repeatClass).includes(repeat)) {
            return repeat;
        } else if (typeof(repeat) == 'number') {
            if (Math.trunc(repeat) != repeat) {
                util.warn('WARNING: Repeat has been truncated to ' + repeat + ' times.');
            }
            return repeat;
        } else {
            throw new TypeError(repeat + ' is not a valid number or animate.css Repeat Class!');
        }
    }
}

// Animation Call Wrapper
export const css = (obj, animation, override = false) =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationClasses = [`${prefix}animated`, `${prefix}${animation.name}`];
        const node = obj;
        
        if (typeof(animation.speed) == 'number') {
            util.log(
                'Set Animation Speed to ' + `${animation.speed / 1000}s`,
                util.LogType.INFO,
            );
            node.style.setProperty('--animate-duration', `${animation.speed / 1000}s`);
            animationClasses.push(`${prefix}${animationClass.animated}`);
        } else {
            node.style.removeProperty('--animate-duration'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.speed}`);
        }

        if (typeof(animation.delay) == 'number') {
            util.log(
                'Set Animation Delay to ' + `${animation.delay / 1000}s`,
                util.LogType.INFO,
            );
            node.style.setProperty('--animate-delay', `${animation.delay / 1000}s`);
            animationClasses.push(`${prefix}${delayClass.delay_1s}`);
        } else {
            node.style.removeProperty('--animate-delay'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.delay}`);
        }
        
        if (typeof(animation.repeat) == 'number') {
            util.log(
                'Set Animation Repeat to ' + animation.repeat,
                util.LogType.INFO,
            );
            node.style.setProperty('--animate-repeat', animation.repeat);
        } else {
            node.style.removeProperty('--animate-repeat'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.repeat}`);
        }

        // Remove existing animations if an override is requested
        if (override) {
            node.dispatchEvent(new Event('animationinterrupted', {
                bubbles: false
            }));
        }

        util.log(
            "Playing animation for " + obj.id,
            util.LogType.INFO,
        );
        node.classList.add(...animationClasses);
    
        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            util.log(
                event,
                util.LogType.DEBUG,
            );
            event.stopPropagation();
            node.classList.remove(...animationClasses);
            resolve('Animation Ended!');
        }

        // If the animation is interrupted, we reject the Promise
        function handleAnimationInterrupt(event) {
            util.log(
                event,
                util.LogType.DEBUG,
            );
            node.classList.remove(...animationClasses);
            reject('Animation Interrupted!');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
        node.addEventListener('animationinterrupted', handleAnimationInterrupt, {once: true});
    });