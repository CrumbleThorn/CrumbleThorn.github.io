import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';

const pageClasses = {
    mainTitleBar: 'main-title-bar',
    mainTitleBarContent: 'main-title-bar-content',
    mainTitle: 'main-title',
    mainLabel: 'main-label',
    mainSection: 'main-section',
    mainStickySection: 'main-sticky-section',
    endSection: 'end-section'
}
const pageElements =  {
    // Global Screen Elements
    content: 'content',
    main: 'main',
}
        
function onLoadComplete() {
    // Reset scroll progress on reload
    util.scrollToTop();
    setTimeout(() => {
        const hero = new ui.Hero(new anim.AnimatedElement(loadedDOMS.hero[0].shadow.querySelector('.hero')));

        const gameSection = new ui.SideCard(new anim.AnimatedElement(loadedDOMS.sidecard[0].shadow.querySelector('.sidecard'),
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
        const devSection = new ui.SideCard(new anim.AnimatedElement(loadedDOMS.sidecard[1].shadow.querySelector('.sidecard'),
                                                                    ),
                                           anim.anchor.right);
        const artSection = new ui.SideCard(new anim.AnimatedElement(loadedDOMS.sidecard[2].shadow.querySelector('.sidecard'),
                                                                    ),
                                           anim.anchor.left);
        const musicSection = new ui.SideCard(new anim.AnimatedElement(loadedDOMS.sidecard[3].shadow.querySelector('.sidecard'),
                                                                      ),
                                             anim.anchor.right);
        const sidebar = new ui.SideBar(new anim.AnimatedElement(loadedDOMS.sidebar[0].shadow.getElementById('sidebar'),
                                                        undefined,
                                                        false,
                                                        new animate.Animation(animate.animationClass.slideInLeft,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        new animate.Animation(animate.animationClass.slideOutRight,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        ));
        const navbar = new ui.NavBar(new anim.AnimatedElement(loadedDOMS.navbar[0].shadow.getElementById('navbar'),
                                                              undefined,
                                                              false,
                                                              new animate.Animation(animate.animationClass.slideInDown,
                                                                                    animate.speedClass.faster,
                                                                                    ),
                                                              new animate.Animation(animate.animationClass.slideOutUp,
                                                                                    animate.speedClass.faster,
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
        const progressbar = new ui.ProgressBar(new anim.AnimatedElement(loadedDOMS.progressbar[0].shadow.getElementById('progressbar'),
                                                                undefined,
                                                                ),
                                       );
        const bottomBar = new ui.BottomBar(new anim.AnimatedElement(loadedDOMS.horizontalbar[0].shadow.getElementById('bottombar'),
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
        progressbar.start = gameSection.elem.obj.getBoundingClientRect().top - window.innerHeight;
        // TO DO: Animate hero banner
        util.log("TO DO: Animate Hero");
    }, 1000);
}
window.addEventListener('load', onLoadComplete);