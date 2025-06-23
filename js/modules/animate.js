// This module uses animate.css, please check out https://animate.style for reference
import * as util from './util.js';

const prefix = 'animate__';

// Animation Constants
// Attention Seekers
export const bounce = "bounce";
export const flash = "flash";
export const pulse = "pulse";
export const rubberBand = "rubberBand";
export const shakeX = "shakeX";
export const shakeY = "shakeY";
export const headShake = "headShake";
export const swing = "swing";
export const tada = "tada";
export const wobble = "wobble";
export const jello = "jello";
export const heartBeat = "heartBeat";
// Back Entrances
export const backInDown = "backInDown";
export const backInLeft = "backInLeft";
export const backInRight = "backInRight";
export const backInUp = "backInUp";
// Back Exits
export const backOutDown = "backOutDown";
export const backOutLeft = "backOutLeft";
export const backOutRight = "backOutRight";
export const backOutUp = "backOutUp";
// Bouncing Entrances
export const bounceIn = "bounceIn";
export const bounceInDown = "bounceInDown";
export const bounceInLeft = "bounceInLeft";
export const bounceInRight = "bounceInRight";
export const bounceInUp = "bounceInUp";
// Bouncing Exits
export const bounceOut = "bounceOut";
export const bounceOutDown = "bounceOutDown";
export const bounceOutLeft = "bounceOutLeft";
export const bounceOutRight = "bounceOutRight";
export const bounceOutUp = "bounceOutUp";
// Fading Entrances
export const fadeIn = "fadeIn";
export const fadeInDown = "fadeInDown";
export const fadeInDownBig = "fadeInDownBig";
export const fadeInLeft = "fadeInLeft";
export const fadeInLeftBig = "fadeInLeftBig";
export const fadeInRight = "fadeInRight";
export const fadeInRightBig = "fadeInRightBig";
export const fadeInUp = "fadeInUp";
export const fadeInUpBig = "fadeInUpBig";
export const fadeInTopLeft = "fadeInTopLeft";
export const fadeInTopRight = "fadeInTopRight";
export const fadeInBottomLeft = "fadeInBottomLeft";
export const fadeInBottomRight = "fadeInBottomRight";
// Fading Exits
export const fadeOut = "fadeOut";
export const fadeOutDown = "fadeOutDown";
export const fadeOutDownBig = "fadeOutDownBig";
export const fadeOutLeft = "fadeOutLeft";
export const fadeOutLeftBig = "fadeOutLeftBig";
export const fadeOutRight = "fadeOutRight";
export const fadeOutRightBig = "fadeOutRightBig";
export const fadeOutUp = "fadeOutUp";
export const fadeOutUpBig = "fadeOutUpBig";
export const fadeOutTopLeft = "fadeOutTopLeft";
export const fadeOutTopRight = "fadeOutTopRight";
export const fadeOutBottomRight = "fadeOutBottomRight";
export const fadeOutBottomLeft = "fadeOutBottomLeft";
// Flippers
export const flip = "flip";
export const flipInX = "flipInX";
export const flipInY = "flipInY";
export const flipOutX = "flipOutX";
export const flipOutY = "flipOutY";
// Lightspeed
export const lightSpeedInRight = "lightSpeedInRight";
export const lightSpeedInLeft = "lightSpeedInLeft";
export const lightSpeedOutRight = "lightSpeedOutRight";
export const lightSpeedOutLeft = "lightSpeedOutLeft";
// Rotating Entrances
export const rotateIn = "rotateIn";
export const rotateInDownLeft = "rotateInDownLeft";
export const rotateInDownRight = "rotateInDownRight";
export const rotateInUpLeft = "rotateInUpLeft";
export const rotateInUpRight = "rotateInUpRight";
// Rotating Exits
export const rotateOut = "rotateOut";
export const rotateOutDownLeft = "rotateOutDownLeft";
export const rotateOutDownRight = "rotateOutDownRight";
export const rotateOutUpLeft = "rotateOutUpLeft";
export const rotateOutUpRight = "rotateOutUpRight";
// Specials
export const hinge =-"hinge";
export const jackInTheBox = "jackInTheBox";
export const rollIn = "rollIn";
export const rollOut = "rollOut";
// Zooming Entrances
export const zoomIn = "zoomIn";
export const zoomInDown = "zoomInDown";
export const zoomInLeft = "zoomInLeft";
export const zoomInRight = "zoomInRight";
export const zoomInUp = "zoomInUp";
// Zooming Exits
export const zoomOut = "zoomOut";
export const zoomOutDown = "zoomOutDown";
export const zoomOutLeft = "zoomOutLeft";
export const zoomOutRight = "zoomOutRight";
export const zoomOutUp = "zoomOutUp";
// Sliding Entrances
export const slideInDown = "slideInDown";
export const slideInLeft = "slideInLeft";
export const slideInRight = "slideInRight";
export const slideInUp = "slideInUp";
// Sliding Exits
export const slideOutDown = "slideOutDown";
export const slideOutLeft = "slideOutLeft";
export const slideOutRight = "slideOutRight";
export const slideOutUp = "slideOutUp"

const animationClasses = Object.freeze(new Array(
bounce,
flash,
pulse,
rubberBand,
shakeX,
shakeY,
headShake,
swing,
tada,
wobble,
jello,
heartBeat,
backInDown,
backInLeft,
backInRight,
backInUp,
backOutDown,
backOutLeft,
backOutRight,
backOutUp,
bounceIn,
bounceInDown,
bounceInLeft,
bounceInRight,
bounceInUp,
bounceOut,
bounceOutDown,
bounceOutLeft,
bounceOutRight,
bounceOutUp,
fadeIn,
fadeInDown,
fadeInDownBig,
fadeInLeft,
fadeInLeftBig,
fadeInRight,
fadeInRightBig,
fadeInUp,
fadeInUpBig,
fadeInTopLeft,
fadeInTopRight,
fadeInBottomLeft,
fadeInBottomRight,
fadeOut,
fadeOutDown,
fadeOutDownBig,
fadeOutLeft,
fadeOutLeftBig,
fadeOutRight,
fadeOutRightBig,
fadeOutUp,
fadeOutUpBig,
fadeOutTopLeft,
fadeOutTopRight,
fadeOutBottomRight,
fadeOutBottomLeft,
flip,
flipInX,
flipInY,
flipOutX,
flipOutY,
lightSpeedInRight,
lightSpeedInLeft,
lightSpeedOutRight,
lightSpeedOutLeft,
rotateIn,
rotateInDownLeft,
rotateInDownRight,
rotateInUpLeft,
rotateInUpRight,
rotateOut,
rotateOutDownLeft,
rotateOutDownRight,
rotateOutUpLeft,
rotateOutUpRight,
hinge,
jackInTheBox,
rollIn,
rollOut,
zoomIn,
zoomInDown,
zoomInLeft,
zoomInRight,
zoomInUp,
zoomOut,
zoomOutDown,
zoomOutLeft,
zoomOutRight,
zoomOutUp,
slideInDown,
slideInLeft,
slideInRight,
slideInUp,
slideOutDown,
slideOutLeft,
slideOutRight,
slideOutUp,
));

// Animation Delay Constants
export const delay_2s = "delay-2s";
export const delay_3s = "delay-3s";
export const delay_4s = "delay-4s";
export const delay_5s = "delay-5s";

const delayClasses = Object.freeze(new Array(
delay_2s,
delay_3s,
delay_4s,
delay_5s
));

// Animation Speed Constants
export const animated = "animated";
export const slow = "slow";
export const slower = "slower";
export const fast = "fast";
export const faster = "faster";

const speedClasses = Object.freeze(new Array(
animated,
slow,
slower,
fast,
faster
))

// Animation Repeat Constants
export const repeat_1 = "repeat-1";
export const repeat_2 = "repeat-2";
export const repeat_3 = "repeat-3";
export const infinite = "infinite";

const repeatClasses = Object.freeze(new Array(
repeat_1,
repeat_2,
repeat_3,
infinite
))

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
        if (animationClasses.includes(name)) {
            return name;
        } else {
            throw new TypeError(name + " is not a valid animate.css Animation Class!");
        }
    }

    #checkAnimationSpeed(speed) {
        if (speedClasses.includes(speed)) {
            return speed;
        } else if(typeof(speed) == "number") {
            if (Math.trunc(speed) != speed) {
                console.warn("WARNING: Speed has been truncated to " + speed + "ms.");
            }
            return speed;
        } else {
            throw new TypeError(speed + " is not a valid number or animate.css Speed Class!");
        }
    }

    #checkAnimationDelay(delay) {
        if (delayClasses.includes(delay)) {
            return delay;
        } else if(typeof(delay) == "number") {
            if (Math.trunc(delay) != delay) {
                console.warn("WARNING: Delay has been truncated to " + delay + "ms.");
            }
            return delay;
        } else {
            throw new TypeError(delay + " is not a valid number or animate.css Delay Class!");
        }
    }

    #checkAnimationRepeat(repeat) {
        if (repeatClasses.includes(repeat)) {
            return repeat;
        } else if(typeof(repeat) == "number") {
            if (Math.trunc(repeat) != repeat) {
                console.warn("WARNING: Repeat has been truncated to " + repeat + " times.");
            }
            return repeat;
        } else {
            throw new TypeError(repeat + " is not a valid number or animate.css Repeat Class!");
        }
    }
}

// Animation Call Wrapper
export const css = (obj, animation, override = false) =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationClasses = [`${prefix}animated`, `${prefix}${animation.name}`];
        const node = obj;
        
        // BUG: numeric durations currently do not work
        if (typeof(animation.speed) == 'number') {
            util.log("Set Animation Speed to " + animation.speed);
            node.style.setProperty('--animate-duration', `${animation.speed / 1000}s`);
        }
        else {
            node.style.removeProperty('--animate-duration'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.speed}`);
        }
        // BUG: numeric delays currently do not work
        if (typeof(animation.delay) == 'number') {
            util.log("Set Animation Delay to " + animation.delay);
            node.style.setProperty('--animate-delay', `${animation.delay / 1000}s`);
        }
        else {
            node.style.removeProperty('--animate-delay'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.delay}`);
        }
        if (typeof(animation.repeat) == 'number') {
            util.log("Set Animation Repeat to " + animation.repeat);
            node.style.setProperty('--animate-repeat', animation.repeat);
        }
        else {
            node.style.removeProperty('--animate-repeat'); // Remove property if it exists
            animationClasses.push(`${prefix}${animation.repeat}`);
        }

        // Remove existing animations if an override is requested
        if (override)
            util.removeClassesByPrefix(obj, prefix);

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