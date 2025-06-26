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
    main: 'main',
}
        
function onLoadComplete() {
    // Reset scroll progress on reload
    util.scrollToTop();
    setTimeout(() => {
        //#region Hero
        if (Object.hasOwn(loadedDOMS, 'hero')) {
            util.log('Hero Detected!');
            const hero = new ui.Hero(new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById(util.css.siteElements.hero)));
            const heroButton = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById('hero-button'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.fadeInUp,
                                                                                animate.speedClass.fast,
                                                                                1000
                                                                                ));
            const heroMenuText = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById('hero-menu-text'),
                                                            false,
                                                            new animate.Animation(animate.animationClass.fadeInUp,
                                                                                    animate.speedClass.fast,
                                                                                    1200
                                                                                    ));
            const scrollDownText = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById('scroll-down-text'),
                                                            false,
                                                            new animate.Animation(animate.animationClass.fadeInUp,
                                                                                    animate.speedClass.fast,
                                                                                    1400
                                                                                    ),
                                                            undefined,
                                                            new animate.Animation(animate.animationClass.bounce,
                                                                                    animate.speedClass.slow,
                                                                                    animate.delayClass.delay_4s,
                                                                                    animate.repeatClass.infinite
                                                                                    ));
            const heroTitle = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById('hero-title'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.backInLeft,
                                                                                animate.speedClass.animated,
                                                                                ));
            const heroSubtitle = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById('hero-subtitle'),
                                                            false,
                                                            new animate.Animation(animate.animationClass.backInLeft,
                                                                                    animate.speedClass.animated,
                                                                                    500
                                                                                    ));
            const heroImage = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById('hero-image'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.backInRight,
                                                                                animate.speedClass.animated,
                                                                                200
                                                                                ));
            const heroContent = new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById(util.css.siteElements.heroContent),
                                                            false,
                                                            new animate.Animation(animate.animationClass.fadeInLeft,
                                                                                    animate.speedClass.animated,
                                                                                    ));
            hero.elem.obj.addEventListener('showAnimationComplete', (event) => {
                if (event.target == heroContent.obj) {
                    heroTitle.show();
                    heroSubtitle.show();
                    heroImage.show();
                    heroButton.show();
                    heroMenuText.show();
                    scrollDownText.show();
                    removeEventListener('showAnimationComplete', hero.obj);
                    hero.elem.obj.addEventListener('showAnimationComplete', (event) => {
                        if (event.target == scrollDownText.obj) {
                            scrollDownText.highlight();
                            document.body.classList.remove(util.css.siteClasses.noScroll);
                        }
                    });
                }
            });
            document.body.classList.add(util.css.siteClasses.noScroll);
            heroContent.show();
        }
        //#endregion

        if (Object.hasOwn(loadedDOMS, 'sidecard')) {
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
                                                                    }
        if (Object.hasOwn(loadedDOMS, 'sidebar')) {
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
                                                    }
        if (Object.hasOwn(loadedDOMS, 'navbar')) {
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
        }
        if (Object.hasOwn(loadedDOMS, 'progressbar')) {
        const progressbar = new ui.ProgressBar(new anim.AnimatedElement(loadedDOMS.progressbar[0].shadow.getElementById('progressbar'),
                                                                undefined,
                                                                ),
                                       );
        progressbar.start = gameSection.elem.obj.getBoundingClientRect().top - window.innerHeight;
        }
        if (Object.hasOwn(loadedDOMS, 'horizontalbar')) {
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
        }
    }, 500);
}
window.addEventListener('load', onLoadComplete);