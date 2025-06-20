import * as animate from './modules/animate.js';
import * as util from './modules/util.js';
import * as site from './modules/classes.js';

const animatedElements = [];
const hero = document.getElementById('hero');
const main = document.getElementById('main');
const sidebar = new site.SideBar(new animate.AnimatedElement(document.getElementById('sidebar'), 'flex'));
const navbar = new site.NavBar(new animate.AnimatedScrollElement(document.getElementById('navbar'), 'block', false, main), sidebar);
const progressbar = new site.ProgressBar(document.getElementById('progressbar'));
animatedElements.push(navbar);
// TO DO: add the rest of the animated Elements

// TO DO: Modify variables using Class Methods instead of direct assignment
const loadingScreen = new site.LoadingScreen(new animate.AnimatedElement(document.getElementById('loading-screen'), 'flex'), document.getElementById('load-animation'));
loadingScreen.element.exitAnimation.delay = 'delay-1s';

// Reset scroll progress on reload
scrollToTop();

// TO DO: Change overrides to happen at an animation-level
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
window.addEventListener('scroll', scrollAnimationHelper);

// TO DO: Implement responsive design
function responsiveDesignChecker() {
    if (!util.isLandscape() || util.isLowResolution())
        console.log("TO DO: Toggle Mobile Mode!");
    else
        console.log("TO DO: Toggle PC Mode!");
        
}
window.addEventListener('resize', responsiveDesignChecker);

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}

// Handles Loading Screen Behavior
window.addEventListener('load', function() { 
    loadingScreen.toggleLoadingScreen();
    // TO DO: Animate hero banner
    console.log("TO DO: Animate Hero");
});
// Play Loading Screen Animation
lottie.loadAnimation({
    container: loadingScreen.animation, // Target the container
    loop: true,       // Loop the animation
    autoplay: true,   // Play the animation automatically
    path: 'json/loading.json' // Path to your animation JSON file
});