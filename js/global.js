import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as lottiefiles from './modules/lottiefiles.js';
import * as responsive from './modules/responsive.js';
import * as templates from './modules/templates.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';

const scrollManager = new util.DirectionalScrollManager();

const content = new ui.Content(document.getElementById('content'));
let loadingScreen;

function onDocumentLoaded() {
    // Load all available templates
    templates.loadAllTemplates();
    // Hide the content while page is loading
    content.hideContent();
}

function loadLoadingScreen(event) {
    loadingScreen = new ui.LoadingScreen(new anim.AnimatedElement(event.target.shadow.getElementById('loadingscreen'),
                                                                    true,
                                                                    new animate.Animation(animate.animationClass.fadeIn,
                                                                                        animate.speedClass.faster,
                                                                                        ),
                                                                    new animate.Animation(animate.animationClass.fadeOut,
                                                                                        animate.speedClass.faster,
                                                                                        )
                                                                    ),
                                            new lottiefiles.LottieContainer(event.target.shadow.getElementById('loading-animation'),
                                                                    'data/json/loading.json',
                                                                    ),
                                            );
    util.log("Loading Screen Loaded");
}

function onLoadComplete() {
    util.log("LoadComplete");
    setTimeout(() => {
        if (Object.hasOwn(loadedDOMS, 'loadingscreen')) {
            loadingScreen.toggle();
        }
        content.showContent();
    }, 500);
}

window.addEventListener('DOMContentLoaded', onDocumentLoaded);
window.addEventListener('loadingScreenReady', (event) => loadLoadingScreen(event));
window.addEventListener('load', onLoadComplete);
window.addEventListener('resize', responsive.responsiveDesignChecker);