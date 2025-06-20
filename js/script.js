import * as animate from './modules/animate.js';
import * as util from './modules/util.js';
import * as site from './modules/classes.js';

const animatedElements = [];
const content = document.getElementById('content');
const hero = document.getElementById('hero');
const main = document.getElementById('main');
const sidebar = new site.SideBar(new animate.AnimatedElement(document.getElementById('sidebar'), 'flex'));
const navbar = new site.NavBar(new animate.AnimatedScrollElement(document.getElementById('navbar'), 'block', false, main), sidebar);
const progressbar = new site.ProgressBar(document.getElementById('progressbar'));
animatedElements.push(navbar);
// TO DO: add the rest of the animated Elements

const loadingScreen = new site.LoadingScreen(new animate.AnimatedLoadingScreenElement(document.getElementById('loading-screen'), 'flex'), document.getElementById('load-animation'));

// Handles Scroll Animations
function handleScrollAnimation(item) {
    if (item.element.hasReachedTrigger()) {
        item.element.normallyHidden ? item.element.show(true) : item.element.hide(true);
    } else {
        item.element.normallyHidden ? item.element.hide(true) : item.element.show(true);
    }
}

function scrollAnimationHelper() {
    progressbar.updateProgress();
    animatedElements.forEach(handleScrollAnimation);

}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}

// TO DO: Implement responsive design
function responsiveDesignChecker() {
    if (!util.isLandscape() || util.isLowResolution())
        util.log("TO DO: Toggle Mobile Mode!");
    else
        util.log("TO DO: Toggle PC Mode!");
        
}

function documentLoaded() {
    // Reset scroll progress on reload
    scrollToTop();
    document.body.classList.add('no-scroll');
    // Play Loading Screen Animation
    lottie.loadAnimation({
        container: loadingScreen.animation, // Target the container
        loop: true,       // Loop the animation
        autoplay: true,   // Play the animation automatically
        path: 'json/loading.json' // Path to your animation JSON file
    });
}

function onLoadComplete() {
    setTimeout(() => loadingScreen.toggleLoadingScreen(), 2000);

    // TO DO: Animate hero banner
    util.log("TO DO: Animate Hero");
}

window.addEventListener('DOMContentLoaded', documentLoaded)
window.addEventListener('load', onLoadComplete);
window.addEventListener('scroll', scrollAnimationHelper);
window.addEventListener('resize', responsiveDesignChecker);