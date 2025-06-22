import * as util from './util.js';
import * as animate from './animate.js';

export class AnimatedElement {
    constructor(obj,
                display = 'block',
                active = true,
                entry = new animate.Animation('fadeIn', 'faster'),
                exit = new animate.Animation('fadeOut', 'faster'),
                highlight = new animate.Animation('pulse', 'faster'),
                ) {
        this.obj = obj;
        this.display = display;
        this.active = active;
        this.isAnimating = false;
        this.entryAnimation = entry;
        this.exitAnimation = exit;
        this.highlightAnimation = highlight;
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
            animate.css(this.obj, this.entryAnimation, override).then((value) => {
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
            animate.css(this.obj, this.highlightAnimation, override);
        } else {
            util.warn("WARNING: Object " + this.obj.id + " is not active, skipping animation");
        }
    }

    hide(override = false) {
        if (this.active) {
            this.active = false;
            this.isAnimating = true;
            util.log("Hiding " + this.obj.id + "...");
            animate.css(this.obj, this.exitAnimation, override).then((value) => {
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
                entry = new animate.Animation('fadeIn', 'faster'),
                exit = new animate.Animation('fadeOut', 'faster'),
                highlight = new animate.Animation('pulse', 'faster'),
                ) {
        super(obj, display, active, entry, exit, highlight);
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
            animate.css(this.obj, this.entryAnimation, override).then((value) => {
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
            animate.css(this.obj, this.exitAnimation, override).then((value) => {
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