import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as responsive from './modules/responsive.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';

const hero = new ui.Hero(new anim.AnimatedElement(document.getElementById('hero')));

const gameSection = new ui.SideCard(new anim.AnimatedElement(document.getElementById('game-section'),
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

//const gameSectionTrigger = new anim.AnimationScrollTrigger(gameSection.elem,);

const devSection = new ui.SideCard(new anim.AnimatedElement(document.getElementById('dev-section'),
                                                            ),
                                   anim.anchor.right);
const artSection = new ui.SideCard(new anim.AnimatedElement(document.getElementById('art-section'),
                                                            ),
                                   anim.anchor.left);
const musicSection = new ui.SideCard(new anim.AnimatedElement(document.getElementById('music-section'),
                                                              ),
                                     anim.anchor.right);

const sidebar = new ui.SideBar(new anim.AnimatedElement(document.getElementById('sidebar'),
                                                        undefined,
                                                        false,
                                                        new animate.Animation(animate.animationClass.slideInLeft,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        new animate.Animation(animate.animationClass.slideOutRight,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        ));
const navbar = new ui.NavBar(new anim.AnimatedElement(document.getElementById('navbar'),
                                                      undefined,
                                                      false,
                                                      new animate.Animation(animate.animationClass.slideInDown,
                                                                            animate.speedClass.fast,
                                                                            ),
                                                      new animate.Animation(animate.animationClass.slideOutUp,
                                                                            animate.speedClass.fast,
                                                                            ),
                                                      ),
                             sidebar);
const navbarTrigger = new anim.AnimationScrollTrigger(navbar.elem,
                                                      anim.animationType.toggle,
                                                      new anim.ScrollTriggerElement(gameSection.elem.obj),
                                                      new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                      anim.scrollTriggerType.onScrollDown,
                                                      0,
                                                      true,
                                                      true);

const progressbar = new ui.ProgressBar(new anim.AnimatedElement(document.getElementById('progressbar'),
                                                                undefined,
                                                                ),
                                       );

const bottomBar = new ui.BottomBar(new anim.AnimatedElement(document.getElementById('bottombar'),
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
// TO DO: add the rest of the animated Elements

const loadingScreen = new ui.LoadingScreen(new anim.AnimatedElement(document.getElementById('loading-screen'),
                                                                    undefined,
                                                                    true,
                                                                    new animate.Animation(animate.animationClass.fadeIn,
                                                                                          animate.speedClass.faster,
                                                                                          ),
                                                                    new animate.Animation(animate.animationClass.fadeOut,
                                                                                          animate.speedClass.faster,
                                                                                          )
                                                                    ),
                                           new anim.LottieContainer(document.getElementById('load-animation'),
                                                                    'data/json/loading.json',
                                                                    ),
                                           );

function documentLoaded() {
    // Reset scroll progress on reload
    util.scrollToTop();
}

function onLoadComplete() {
    setTimeout(() => loadingScreen.toggle(), 200);
    // Initialize the correct starting point for the progress bar
    progressbar.start = gameSection.elem.obj.getBoundingClientRect().top - window.innerHeight;
    // TO DO: Animate hero banner
    util.log("TO DO: Animate Hero");
}

window.addEventListener('DOMContentLoaded', documentLoaded)
window.addEventListener('load', onLoadComplete);
window.addEventListener('resize', responsive.responsiveDesignChecker);