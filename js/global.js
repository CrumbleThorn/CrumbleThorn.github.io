import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as lottiefiles from './modules/lottiefiles.js';
import * as responsive from './modules/responsive.js';
import * as templates from './modules/templates.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';

const scrollManager = new util.DirectionalScrollManager();

window.dummyDelay = 500;

const content = new ui.Content(document.getElementById(util.css.SiteID.content));
let loadingScreen;

function onDocumentLoaded() {
    // Load all available templates
    templates.loadAllTemplates();
    // Hide the content while page is loading
    content.hideContent();
}

function loadLoadingScreen(event) {
    loadingScreen = event.target.ui.elem;
    util.log(loadingScreen);
}

function onLoadComplete() {
    util.log(
        'Page has been fully loaded!',
        util.LogType.INFO,
    );
    setTimeout(() => {
        if (Object.hasOwn(loadedDOMs, templates.Template.LOADING_SCREEN)) {
            loadingScreen.toggle();
        }
        content.showContent();
    }, dummyDelay);
}

window.addEventListener('DOMContentLoaded', onDocumentLoaded);
window.addEventListener('loadingScreenReady', (event) => loadLoadingScreen(event));
window.addEventListener('load', onLoadComplete);
window.addEventListener('resize', responsive.responsiveDesignChecker);