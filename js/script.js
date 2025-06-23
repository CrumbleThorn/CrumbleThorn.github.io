import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as responsive from './modules/responsive.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';


const scrollElements = [];
const hero = document.getElementById('hero');
const start = document.getElementById('game-section');
const sidebar = new ui.SideBar(new anim.AnimatedElement(document.getElementById('sidebar'),
                                                             'flex'));
const navbar = new ui.NavBar(new anim.AnimatedScrollElement(document.getElementById('navbar'),
                                                                 'block',
                                                                 false,
                                                                 start,
                                                                 window.innerHeight,
                                                                 new animate.Animation(animate.slideInDown, animate.fast),
                                                                 new animate.Animation(animate.slideOutUp, animate.fast)),
                               sidebar);
scrollElements.push(navbar);
const gameSection = new ui.SideCard();
const devSection = new ui.SideCard();
const artSection = new ui.SideCard();
const musicSection = new ui.SideCard();

const progressbar = new ui.ProgressBar(document.getElementById('progressbar'));
// TO DO: add the rest of the animated Elements

const loadingScreen = new ui.LoadingScreen(new anim.AnimatedLoadingScreenElement(document.getElementById('loading-screen'), 'flex'),
                                             document.getElementById('load-animation'));

// Handles Scroll Animations
function scrollAnimationHelper() {
    progressbar.updateProgress();
    scrollElements.forEach((elem) => elem.element.handleScroll());
}



function documentLoaded() {
    // Reset scroll progress on reload
    document.body.classList.add('no-scroll');
    // Play Loading Screen Animation
    lottie.loadAnimation({
        container: loadingScreen.animation, // Target the container
        loop: true,       // Loop the animation
        autoplay: true,   // Play the animation automatically
        path: 'data/json/loading.json' // Path to your animation JSON file
    });
    util.scrollToTop();
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
window.addEventListener('resize', responsive.responsiveDesignChecker);