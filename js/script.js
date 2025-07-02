import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as templates from './modules/templates.js';
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
    titleBar: 'title-bar',
    titleBarContent: 'title-bar-content',
    titleText: 'title-text',
    gameSection: 'game-section',
    gameCard: 'game-card',
    devSection: 'dev-section',
    devCard: 'dev-card',
    artSection: 'art-section',
    artCard: 'art-card',
    musicSection: 'music-section',
    musicCard: 'music-card',
    endSection: 'end-section',
    endCard: 'end-card',
}

let vh = window.innerHeight / 100;
let vw = window.innerWidth / 100;

// Temporary variables while definitions are not put into classes
let hero;
let titlebar;
let navbar;
let gameSection;
let gameCard;
let devSection;
let devCard;
let artSection;
let artCard;
let musicSection;
let musicCard;
let endCard;
let endSection;

const start = document.getElementById(pageElements.gameSection);

class TitleBar {
    constructor(obj) {
        this.obj = obj;
        this.titleContent = document.getElementById(pageElements.titleBarContent);
        this.titleText = document.getElementById(pageElements.titleText);
        this.titleTrigger = new anim.AnimationScrollTrigger(hero.content,
                                                            anim.animationType.hide,
                                                            new anim.ScrollTriggerElement(this.obj),
                                                            undefined,
                                                            undefined,
                                                            0,
                                                            undefined,
                                                            true);
        this.heroTrigger = new anim.AnimationScrollTrigger(hero.content,
                                                            anim.animationType.show,
                                                            new anim.ScrollTriggerElement(hero.elem.obj, anim.anchor.bottom),
                                                            new anim.ScrollTriggerElement(window),
                                                            anim.scrollTriggerType.onScrollUp,
                                                            0,
                                                            undefined,
                                                            true);
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {this.handle(event)});
    }

    handle(event) {
        util.log(event.detail.origin);
        if (event.detail.origin == this.titleTrigger) {
            util.scrollTo(start, 28 * vh);
        }
    }

    modifyText(newText) {
        // TO DO: Logic
        this.titleText.innerHTML = newText;
    }
}

// TO DO: Move to Hero UI Class
function handleHero() {
    if (Object.hasOwn(loadedDOMS, templates.templateList.heroTemplate)) {
        util.log('Hero Detected!');
        hero = new ui.Hero(new anim.AnimatedElement(loadedDOMS.hero[0].shadow.getElementById(util.css.siteElements.hero)));
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
        // TO DO: Create AnimationEventTrigger for these
        hero.elem.obj.addEventListener(anim.animationEvents.showAnimationComplete, (event) => {
            if (event.target == hero.content.obj) {
                heroTitle.show();
                heroSubtitle.show();
                heroImage.show();
                heroButton.show();
                heroMenuText.show();
                scrollDownText.show();
                removeEventListener(anim.animationEvents.showAnimationComplete, hero.elem.obj);
                hero.elem.obj.addEventListener(anim.animationEvents.showAnimationComplete, (event) => {
                    if (event.target == scrollDownText.obj) {
                        scrollDownText.highlight();
                        document.body.classList.remove(util.css.siteClasses.noScroll);
                        removeEventListener(anim.animationEvents.showAnimationComplete, scrollDownText.obj);
                    }
                }, );
            }
        });
        document.body.classList.add(util.css.siteClasses.noScroll);
        hero.content.show();
    }
}

function handleNavbar() {
    if (Object.hasOwn(loadedDOMS, templates.templateList.navbarTemplate)) {
        util.log("Navbar Detected!");
        navbar = new ui.NavBar(new anim.AnimatedElement(loadedDOMS.navbar[0].shadow.getElementById(util.css.siteElements.navbar),
                                                                false,
                                                                new animate.Animation(animate.animationClass.slideInDown,
                                                                                    animate.speedClass.faster,
                                                                                    ),
                                                                new animate.Animation(animate.animationClass.slideOutUp,
                                                                                    animate.speedClass.faster,
                                                                                    ),
                                                                ),
                                        undefined);
        const navbarScrollDownTrigger = new anim.AnimationScrollTrigger(navbar.elem,
                                                                        anim.animationType.show,
                                                                        new anim.ScrollTriggerElement(titlebar.obj),
                                                                        new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                        undefined,
                                                                        0,
                                                                        undefined,
                                                                        true);
        const navbarScrollUpTrigger = new anim.AnimationScrollTrigger(  navbar.elem,
                                                                        anim.animationType.hide,
                                                                        new anim.ScrollTriggerElement(hero.elem.obj, anim.anchor.bottom),
                                                                        new anim.ScrollTriggerElement(window),
                                                                        anim.scrollTriggerType.onScrollUp,
                                                                        0,
                                                                        undefined,
                                                                        true);
    }
}

// TO DO: Add exceptions for when pressing back to top
function handleCards() {
    if (Object.hasOwn(loadedDOMS, templates.templateList.cardTemplate)) {
        endCard = new ui.Card(new anim.AnimatedElement(loadedDOMS[templates.templateList.cardTemplate][4].shadow.querySelector('.card')),
                                    anim.anchor.bottom);
        endSection = new anim.AnimatedElement(document.getElementById(pageElements.endSection));

        musicCard = new ui.Card(new anim.AnimatedElement(loadedDOMS[templates.templateList.cardTemplate][3].shadow.querySelector('.card')),
                                    anim.anchor.right);
        musicSection = new anim.AnimatedElement(document.getElementById(pageElements.musicSection));
        const endSectionScrollUpTrigger = new anim.AnimationScrollTrigger(  endSection,
                                                                    anim.animationType.hide,
                                                                    new anim.ScrollTriggerElement(endSection.obj),
                                                                    new anim.ScrollTriggerElement(window),
                                                                    anim.scrollTriggerType.onScrollUp,
                                                                    0,
                                                                    undefined,
                                                                    true);
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == endSectionScrollUpTrigger) {
                util.scrollTo(musicSection.obj, 28 * vh);
            }
        });
        const musicSectionScrollDownTrigger = new anim.AnimationScrollTrigger(  musicSection,
                                                                                anim.animationType.show,
                                                                                new anim.ScrollTriggerElement(endSection.obj),
                                                                                new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                                undefined,
                                                                                0,
                                                                                undefined,
                                                                                true);
        const musicSectionScrollUpTrigger = new anim.AnimationScrollTrigger(musicSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(musicSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true);

        artCard = new ui.Card(  new anim.AnimatedElement(loadedDOMS[templates.templateList.cardTemplate][2].shadow.querySelector('.card')),
                                    anim.anchor.left);
        artSection = new anim.AnimatedElement(document.getElementById(pageElements.artSection));
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == musicSectionScrollDownTrigger) {
                window.scrollTo(0, document.body.scrollHeight);
            } else if (event.detail.origin == musicSectionScrollUpTrigger) {
                util.scrollTo(artSection.obj, 28 * vh);
            }
        });
        const artSectionScrollDownTrigger = new anim.AnimationScrollTrigger(artSection,
                                                                            anim.animationType.show,
                                                                            new anim.ScrollTriggerElement(musicSection.obj),
                                                                            new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                            undefined,
                                                                            0,
                                                                            undefined,
                                                                            true);
        const artSectionScrollUpTrigger = new anim.AnimationScrollTrigger(  artSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(artSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true);

        devCard = new ui.Card(  new anim.AnimatedElement(loadedDOMS[templates.templateList.cardTemplate][1].shadow.querySelector('.card')),
                                    anim.anchor.right);
        devSection = new anim.AnimatedElement(document.getElementById(pageElements.devSection));
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == artSectionScrollDownTrigger) {
                util.scrollTo(musicSection.obj, 28 * vh);
            } else if (event.detail.origin == artSectionScrollUpTrigger) {
                util.scrollTo(devSection.obj, 28 * vh);
            }
        });
        const devSectionScrollDownTrigger = new anim.AnimationScrollTrigger(devSection,
                                                                            anim.animationType.show,
                                                                            new anim.ScrollTriggerElement(artSection.obj),
                                                                            new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                            undefined,
                                                                            0,
                                                                            undefined,
                                                                            true);
        const devSectionScrollUpTrigger = new anim.AnimationScrollTrigger(  devSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(devSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true);


        gameCard = new ui.Card(new anim.AnimatedElement(loadedDOMS[templates.templateList.cardTemplate][0].shadow.querySelector('.card')),
                                            anim.anchor.left);
        gameSection = new anim.AnimatedElement(document.getElementById(pageElements.gameSection));
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == devSectionScrollDownTrigger) {
                util.scrollTo(artSection.obj, 28 * vh);
            } else if (event.detail.origin == devSectionScrollUpTrigger) {
                util.scrollTo(gameSection.obj, 28 * vh);
            }
        });
        const gameSectionScrollDownTrigger = new anim.AnimationScrollTrigger(   gameSection,
                                                                                anim.animationType.show,
                                                                                new anim.ScrollTriggerElement(devSection.obj),
                                                                                new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                                undefined,
                                                                                0,
                                                                                undefined,
                                                                                true);
        const gameSectionScrollUpTrigger = new anim.AnimationScrollTrigger( gameSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(gameSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true);
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == gameSectionScrollDownTrigger) {
                util.scrollTo(devSection.obj, 28 * vh);
            } else if (event.detail.origin == gameSectionScrollUpTrigger) {
                util.scrollToTop();
            }
        });
    }
}

function onLoadComplete() {
    // Reset scroll progress on reload
    util.scrollToTop();
    setTimeout(() => {
        handleHero();
        //#region Title Bar
        titlebar = document.getElementById(pageElements.titleBar);
        if (titlebar) {
            util.log('Title Bar Detected!');
            titlebar = new TitleBar(titlebar);
        }
        //#endregion
        handleNavbar();
        handleCards();
        if (Object.hasOwn(loadedDOMS, 'sidebar')) {
        const sidebar = new ui.SideBar(new anim.AnimatedElement(loadedDOMS.sidebar[0].shadow.getElementById('sidebar'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.slideInLeft,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        new animate.Animation(animate.animationClass.slideOutRight,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        ));
                                                    }

        if (Object.hasOwn(loadedDOMS, 'progressbar')) {
        const progressbar = new ui.ScrollProgressBar(   new anim.AnimatedElement(loadedDOMS.progressbar[0].shadow.getElementById('progressbar')),
                                                        document.getElementById(pageElements.gameSection).getBoundingClientRect().top - window.innerHeight);
        }
        if (Object.hasOwn(loadedDOMS, 'horizontalbar')) {
            const bottombar = new ui.BottomBar(new anim.AnimatedElement(document.getElementById('bottombar'),
                                                                        false,
                                                                        new animate.Animation(animate.animationClass.slideInUp,
                                                                                            animate.speedClass.faster,
                                                                                            ),
                                                                        new animate.Animation(animate.animationClass.slideOutDown,
                                                                                            animate.speedClass.faster,
                                                                                            ),
                                                                        ));
            const bottombarScrollDownTrigger = new anim.AnimationScrollTrigger( bottombar.elem,
                                                                                anim.animationType.show,
                                                                                new anim.ScrollTriggerElement(titlebar.obj),
                                                                                new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                                undefined,
                                                                                0,
                                                                                undefined,
                                                                                true);
            const bottombarScrollUpTrigger = new anim.AnimationScrollTrigger(   bottombar.elem,
                                                                                anim.animationType.hide,
                                                                                new anim.ScrollTriggerElement(hero.elem.obj, anim.anchor.bottom),
                                                                                new anim.ScrollTriggerElement(window),
                                                                                anim.scrollTriggerType.onScrollUp,
                                                                                0,
                                                                                undefined,
                                                                                true);
        }
    }, 500);
}
window.addEventListener('load', onLoadComplete);