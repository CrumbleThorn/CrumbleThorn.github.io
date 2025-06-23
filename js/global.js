import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';
import * as templates from './modules/templates.js';

window.templateDOMS = new Object();
const content = new ui.Content(document.getElementById('content'));

function documentLoaded() {
    util.log("DocumentLoaded");
    // Reset scroll progress on reload
    util.scrollToTop();
    // Hide the content while page is loading
    content.hideContent();
}

function onLoadComplete() {
    util.log("LoadComplete");
    setTimeout(() => {
        const hero = new ui.Hero(new anim.AnimatedElement(templateDOMS.hero[0].shadow.querySelector('.hero')));

        const gameSection = new ui.SideCard(new anim.AnimatedElement(templateDOMS.sidecard[0].shadow.querySelector('.side-card'),
                                                                     undefined,
                                                                     true,
                                                                     new animate.Animation(animate.animationClass.slideInUp,
                                                                                           animate.speedClass.fast,
                                                                                           ),
                                                                     new animate.Animation(animate.animationClass.slideOutUp,
                                                                                           animate.speedClass.fast,
                                                                                           ),
                                                                     ),
                                            anim.anchor.left);
        const devSection = new ui.SideCard(new anim.AnimatedElement(templateDOMS.sidecard[1].shadow.querySelector('.side-card'),
                                                                    ),
                                           anim.anchor.right);
        const artSection = new ui.SideCard(new anim.AnimatedElement(templateDOMS.sidecard[2].shadow.querySelector('.side-card'),
                                                                    ),
                                           anim.anchor.left);
        const musicSection = new ui.SideCard(new anim.AnimatedElement(templateDOMS.sidecard[3].shadow.querySelector('.side-card'),
                                                                      ),
                                             anim.anchor.right);
        const sidebar = new ui.SideBar(new anim.AnimatedElement(templateDOMS.sidebar[0].shadow.getElementById('sidebar'),
                                                        undefined,
                                                        false,
                                                        new animate.Animation(animate.animationClass.slideInLeft,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        new animate.Animation(animate.animationClass.slideOutRight,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        ));
        const navbar = new ui.NavBar(new anim.AnimatedElement(templateDOMS.navbar[0].shadow.getElementById('navbar'),
                                                              undefined,
                                                              false,
                                                              new animate.Animation(animate.animationClass.slideInDown,
                                                                                    animate.speedClass.fast,
                                                                                    ),
                                                              new animate.Animation(animate.animationClass.slideOutUp,
                                                                                    animate.speedClass.fast,
                                                                                    ),
                                                              ),
                                     undefined);
        const navbarTrigger = new anim.AnimationScrollTrigger(navbar.elem,
                                                            anim.animationType.toggle,
                                                            new anim.ScrollTriggerElement(gameSection.elem.obj),
                                                            new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                            anim.scrollTriggerType.onScrollDown,
                                                            0,
                                                            true,
                                                            true);
        const progressbar = new ui.ProgressBar(new anim.AnimatedElement(templateDOMS.progressbar[0].shadow.getElementById('progressbar'),
                                                                undefined,
                                                                ),
                                       );
        const bottomBar = new ui.BottomBar(new anim.AnimatedElement(templateDOMS.horizontalbar[0].shadow.getElementById('bottombar'),
                                                                    undefined,
                                                                    false,
                                                                    new animate.Animation(animate.animationClass.slideInUp,
                                                                                          animate.speedClass.faster,
                                                                                          ),
                                                                    new animate.Animation(animate.animationClass.slideOutDown,
                                                                                          animate.speedClass.faster,
                                                                                          ),
                                                                    ));
        const bottombarTrigger = new anim.AnimationScrollTrigger(bottomBar.elem,
                                                                anim.animationType.toggle,
                                                                new anim.ScrollTriggerElement(gameSection.elem.obj),
                                                                new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                anim.scrollTriggerType.onScrollDown,
                                                                0,
                                                                true,
                                                                true);
        const loadingScreen = new ui.LoadingScreen(new anim.AnimatedElement(templateDOMS.loadingscreen[0].shadow.getElementById('loading-screen'),
                                                                             undefined,
                                                                             true,
                                                                             new animate.Animation(animate.animationClass.fadeIn,
                                                                                                   animate.speedClass.faster,
                                                                                                   ),
                                                                             new animate.Animation(animate.animationClass.fadeOut,
                                                                                                   animate.speedClass.faster,
                                                                                                   )
                                                                             ),
                                                    new anim.LottieContainer(templateDOMS.loadingscreen[0].shadow.getElementById('load-animation'),
                                                                             'data/json/loading.json',
                                                                             ),
                                                    );
        loadingScreen.toggle();
        // Initialize the correct starting point for the progress bar
        content.showContent();
        //progressbar.start = gameSection.elem.obj.getBoundingClientRect().top - window.innerHeight;
        // TO DO: Animate hero banner
        util.log("TO DO: Animate Hero");
    }, 200);
}

window.addEventListener('DOMContentLoaded', documentLoaded)
window.addEventListener('load', onLoadComplete);