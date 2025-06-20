import * as util from './util.js';

export class LoadingScreen {
    constructor(element, animation) {
        this.element = element;
        this.animation = animation;
    }

    toggleLoadingScreen() {
        util.log("Toggling Loading Screen...");
        this.element.toggle();
    }
}

export class SideBar {
    constructor(element) {
        this.element = element;
        this.links = element.obj.querySelectorAll('.navbar-link');
    }
}

export class NavBar {
    constructor(element, sidebar) {
        this.element = element;
        this.content = element.obj.querySelector('.navbar-content');
        this.menu = element.obj.querySelector('.navbar-menu');
        this.burger = element.obj.querySelector('.navbar-burger');
        this.logo = element.obj.querySelector('.site-logo');
        this.title = element.obj.querySelector('.site-title');
        this.links = element.obj.querySelectorAll('.navbar-link');
        this.sidebar = sidebar;
    }

    toggleMenus() {
        if (this.burger.style.display == 'none') {
            this.content.style.padding = '0.5vh';
            this.burger.style.display = 'block';
            this.menu.style.display = 'none';
        } else {
            this.content.style.padding = '0.5vh 10vw 0';
            this.burger.style.display = 'none';
            this.menu.style.display = 'flex';
        }
    }
}

export class ProgressBar {
    constructor(element,
                start = 0,
                end = document.documentElement.scrollHeight,
                ) {
        this.element = element;
        this.start = start;
        this.end = end;
    }

    setStart(start) {
        this.start = start;
        util.log("Progress Bar Start set to " + start + ".");
    }

    setEnd(end) {
        this.end = end;
        util.log("Progress Bar End set to " + end + ".");
    }

    updateProgress() {
        const progress = ((window.scrollY - this.start) / (this.end - window.innerHeight - this.start)) * 100;
        this.element.style.width = `${progress}%`;

        // If the user has reached the end, fill the progress bar
        if (progress >= 100) {
            this.element.style.width = "100%";
        } else if (progress <= 0) {
            this.element.style.width = "0%";
        }
    }
}

export class SideCard {
    constructor(element, side) {
        this.element = element;
        this.side = side;
    }
}

export class BottomBar {
    constructor(element) {
        this.element = element;
    }
}

export class NavButton {
    constructor(element, target) {
        this.element = element;
        this.target = target;
    }
}