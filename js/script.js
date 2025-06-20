import * as animate from './modules/animate.js';
import * as site from './modules/classes.js';
import * as util from './modules/util.js';


const scrollElements = [];
const hero = document.getElementById('hero');
const start = document.getElementById('game-section');
const sidebar = new site.SideBar(new animate.AnimatedElement(document.getElementById('sidebar'),
                                                             'flex'));
const navbar = new site.NavBar(new animate.AnimatedScrollElement(document.getElementById('navbar'),
                                                                 'block',
                                                                 false,
                                                                 start,
                                                                 window.innerHeight,
                                                                 new animate.Animation('slideInDown', 'fast'),
                                                                 new animate.Animation('slideOutUp', 'fast')),
                               sidebar);
scrollElements.push(navbar);

const progressbar = new site.ProgressBar(document.getElementById('progressbar'));
// TO DO: add the rest of the animated Elements

const loadingScreen = new site.LoadingScreen(new animate.AnimatedLoadingScreenElement(document.getElementById('loading-screen'), 'flex'),
                                             document.getElementById('load-animation'));

// Handles Scroll Animations
function scrollAnimationHelper() {
    progressbar.updateProgress();
    scrollElements.forEach((elem) => elem.element.handleScroll());
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
    setTimeout(() => loadingScreen.toggleLoadingScreen(), 200);
    // Initialize the correct starting point for the progress bar
    progressbar.setStart(start.getBoundingClientRect().top - window.innerHeight);
    // TO DO: Animate hero banner
    util.log("TO DO: Animate Hero");
}

window.addEventListener('DOMContentLoaded', documentLoaded)
window.addEventListener('load', onLoadComplete);
window.addEventListener('scroll', scrollAnimationHelper);
window.addEventListener('resize', responsiveDesignChecker);