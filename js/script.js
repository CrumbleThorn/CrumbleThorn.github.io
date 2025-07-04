import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as templates from './modules/templates.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';
import * as vivus from './modules/vivus.js';

const pageClasses = {
    titleBar: 'title-bar',
    titleBarContent: 'title-bar-content',
    titleText: 'title-text',
    vivusText: 'vivus-text',
    vivusTextAfter: 'vivus-text-after',
    mainSection: 'main-section',
    mainStickySection: 'main-sticky-section',
    stickyLeft: 'sticky-left',
    stickyRight: 'sticky-right',
    endSection: 'end-section',
    endSticky: 'end-sticky',
    endCard: 'end-card',
}
const pageElements =  {
    titleBar: 'title-bar',
    titleBarContent: 'title-bar-content',
    vivusGame: 'vivus-game',
    vivusDev: 'vivus-dev',
    vivusArt: 'vivus-art',
    vivusMusic: 'vivus-music',
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
        this.vivusGame = new vivus.VivusContainer ( pageElements.vivusGame,
                                                    {
                                                        type: 'oneByOne',
                                                        file: 'data/svg/gamedeveloper.svg',
                                                        start: 'manual',
                                                    }).then((vivusObject) => {
                                                                                this.vivusGame = vivusObject;
                                                                                this.intializeVivus(this.vivusGame);
                                                                                this.activeVivus = this.vivusGame;});
        this.vivusDev = new vivus.VivusContainer (  pageElements.vivusDev,
                                                    {
                                                        type: 'oneByOne',
                                                        file: 'data/svg/softwareengineer.svg',
                                                        start: 'manual',
                                                    }).then((vivusObject) => {
                                                                                this.vivusDev = vivusObject;
                                                                                this.intializeVivus(this.vivusDev, false);});
        this.vivusArt = new vivus.VivusContainer (  pageElements.vivusArt,
                                                    {
                                                        type: 'oneByOne',
                                                        file: 'data/svg/digitalartist.svg',
                                                        start: 'manual',
                                                    }).then((vivusObject) => {
                                                                                this.vivusArt = vivusObject;
                                                                                this.intializeVivus(this.vivusArt, false);});
        this.vivusMusic = new vivus.VivusContainer (pageElements.vivusMusic,
                                                    {
                                                        type: 'oneByOne',
                                                        file: 'data/svg/musician.svg',
                                                        start: 'manual',
                                                    }).then((vivusObject) => {
                                                                                this.vivusMusic = vivusObject;
                                                                                this.vivusMusic.obj.classList.add('vivus-music');
                                                                                this.intializeVivus(this.vivusMusic, false);});
        
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
                                                            true,
                                                            false);
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {this.handle(event)});
    }

    intializeVivus(elem, active = true) {
        util.log(this.vivusGame);
        elem.obj.classList.add(pageClasses.vivusText);
        if (!active) {
            elem.hide();
        }
    }

    playVivus() {
        this.activeVivus.vivus.play(1.5, () => {
            this.activeVivus.obj.classList.add(pageClasses.vivusTextAfter);
        });
    }

    rewindVivus() {
        this.activeVivus.obj.classList.remove(pageClasses.vivusTextAfter);
        this.activeVivus.vivus.play(-2);
    }

    transitionVivus(next) {
        this.activeVivus.obj.classList.remove(pageClasses.vivusTextAfter);
        this.activeVivus.vivus.play(-2, () => {
            this.activeVivus.hide();
            this.activeVivus = next;
            this.activeVivus.show();
            this.playVivus();
        })
    }

    resetVivus() {
        this.vivusGame.reset();
        this.vivusDev.reset();
        this.vivusDev.hide();
        this.vivusArt.reset();
        this.vivusArt.hide();
        this.vivusMusic.reset();
        this.vivusMusic.hide();
        this.activeVivus = this.vivusGame;
        this.activeVivus.show();
    }

    scrollToMain() {
        util.scrollTo(start, 28 * vh);
        setTimeout(() => {
            this.playVivus();
        }, 500);
    }

    handle(event) {
        if (event.detail.origin == this.titleTrigger) {
            util.log("hero scroll down");
            this.scrollToMain();
        }
    }

    modifyText(newText) {
        // TO DO: Logic
        this.titleText.innerHTML = newText;
    }
}

// TO DO: Move to Hero UI Class
function handleHero() {
    if (Object.hasOwn(loadedDOMs, templates.Template.HERO)) {
        util.log('Hero Detected!');
        hero = new ui.Hero(new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById(util.css.SiteID.hero)));
        hero.heroButton = new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById('hero-button'),
                                                    false,
                                                    new animate.Animation(animate.animationClass.fadeInUp,
                                                                            animate.speedClass.fast,
                                                                            1000
                                                                            ));
        hero.heroMenuText = new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById('hero-menu-text'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.fadeInUp,
                                                                                animate.speedClass.fast,
                                                                                1200
                                                                                ));
        hero.scrollDownText = new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById('scroll-down-text'),
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
        hero.heroTitle = new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById('hero-title'),
                                                    false,
                                                    new animate.Animation(animate.animationClass.backInLeft,
                                                                            animate.speedClass.animated,
                                                                            ));
        hero.heroSubtitle = new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById('hero-subtitle'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.backInLeft,
                                                                                animate.speedClass.animated,
                                                                                500
                                                                                ));
        hero.heroImage = new anim.AnimatedElement(loadedDOMs.hero[0].shadow.getElementById('hero-image'),
                                                    false,
                                                    new animate.Animation(animate.animationClass.backInRight,
                                                                            animate.speedClass.animated,
                                                                            200
                                                                            ));
        // TO DO: Create AnimationEventTrigger for these
        hero.elem.obj.addEventListener(anim.animationEvents.showAnimationComplete, (event) => {
            if (event.target == hero.content.obj) {
                hero.heroTitle.show();
                hero.heroSubtitle.show();
                hero.heroImage.show();
                hero.heroButton.show();
                hero.heroMenuText.show();
                hero.scrollDownText.show();
                removeEventListener(anim.animationEvents.showAnimationComplete, hero.elem.obj);
                hero.elem.obj.addEventListener(anim.animationEvents.showAnimationComplete, (event) => {
                    if (event.target == hero.scrollDownText.obj) {
                        hero.scrollDownText.highlight();
                        document.body.classList.remove(util.css.SiteClass.noScroll);
                        removeEventListener(anim.animationEvents.showAnimationComplete, hero.scrollDownText.obj);
                    }
                }, );
            }
        });
        document.body.classList.add(util.css.SiteClass.noScroll);
        hero.content.show();
    }
}

function handleNavbar() {
    if (Object.hasOwn(loadedDOMs, templates.Template.NAVBAR)) {
        util.log("Navbar Detected!");
        navbar = new ui.NavBar(new anim.AnimatedElement(loadedDOMs.navbar[0].shadow.getElementById(util.css.SiteID.navbar),
                                                                false,
                                                                new animate.Animation(animate.animationClass.slideInDown,
                                                                                    animate.speedClass.faster,
                                                                                    ),
                                                                new animate.Animation(animate.animationClass.slideOutUp,
                                                                                    animate.speedClass.faster,
                                                                                    ),
                                                                ),
                                        undefined);
        navbar.scrollDownTrigger = new anim.AnimationScrollTrigger(navbar.elem,
                                                                        anim.animationType.show,
                                                                        new anim.ScrollTriggerElement(titlebar.obj),
                                                                        new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                        undefined,
                                                                        0,
                                                                        undefined,
                                                                        true);
        navbar.scrollUpTrigger = new anim.AnimationScrollTrigger(  navbar.elem,
                                                                        anim.animationType.hide,
                                                                        new anim.ScrollTriggerElement(hero.elem.obj, anim.anchor.bottom),
                                                                        new anim.ScrollTriggerElement(window),
                                                                        anim.scrollTriggerType.onScrollUp,
                                                                        0,
                                                                        undefined,
                                                                        true,
                                                                        false);
    }
}

// TO DO: Add exceptions for when pressing back to top
function handleCards() {
    if (Object.hasOwn(loadedDOMs, templates.Template.CARD)) {
        endCard = new ui.Card(new anim.AnimatedElement(loadedDOMs[templates.Template.CARD][4].shadow.querySelector('.card')),
                                    anim.anchor.bottom);
        endSection = new anim.AnimatedElement(document.getElementById(pageElements.endSection));

        musicCard = new ui.Card(new anim.AnimatedElement(loadedDOMs[templates.Template.CARD][3].shadow.querySelector('.card')),
                                    anim.anchor.right);
        musicSection = new anim.AnimatedElement(document.getElementById(pageElements.musicSection));
        endSection.scrollUpTrigger = new anim.AnimationScrollTrigger(  endSection,
                                                                    anim.animationType.hide,
                                                                    new anim.ScrollTriggerElement(endSection.obj),
                                                                    new anim.ScrollTriggerElement(window),
                                                                    anim.scrollTriggerType.onScrollUp,
                                                                    0,
                                                                    undefined,
                                                                    true,
                                                                    false);
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == endSection.scrollUpTrigger) {
                util.log("end scroll up");
                titlebar.playVivus();
                util.scrollTo(musicSection.obj, 28 * vh);
            }
        });
        musicSection.scrollDownTrigger = new anim.AnimationScrollTrigger(  musicSection,
                                                                                anim.animationType.show,
                                                                                new anim.ScrollTriggerElement(endSection.obj),
                                                                                new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                                undefined,
                                                                                0,
                                                                                undefined,
                                                                                true,
                                                                                false);
        musicSection.scrollUpTrigger = new anim.AnimationScrollTrigger(musicSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(musicSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true,
                                                                            false);

        artCard = new ui.Card(  new anim.AnimatedElement(loadedDOMs[templates.Template.CARD][2].shadow.querySelector('.card')),
                                    anim.anchor.left);
        artSection = new anim.AnimatedElement(document.getElementById(pageElements.artSection));
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == musicSection.scrollDownTrigger) {
                util.log("music scroll down");
                titlebar.rewindVivus();
                window.scrollTo(0, document.body.scrollHeight);
            } else if (event.detail.origin == musicSection.scrollUpTrigger) {
                util.log("music scroll up");
                titlebar.transitionVivus(titlebar.vivusArt);
                util.scrollTo(artSection.obj, 28 * vh);
            }
        });
        artSection.scrollDownTrigger = new anim.AnimationScrollTrigger(artSection,
                                                                            anim.animationType.show,
                                                                            new anim.ScrollTriggerElement(musicSection.obj),
                                                                            new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                            undefined,
                                                                            0,
                                                                            undefined,
                                                                            true,
                                                                            false);
        artSection.scrollUpTrigger = new anim.AnimationScrollTrigger(  artSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(artSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true,
                                                                            false);

        devCard = new ui.Card(  new anim.AnimatedElement(loadedDOMs[templates.Template.CARD][1].shadow.querySelector('.card')),
                                    anim.anchor.right);
        devSection = new anim.AnimatedElement(document.getElementById(pageElements.devSection));
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == artSection.scrollDownTrigger) {
                util.log("art scroll down");
                titlebar.transitionVivus(titlebar.vivusMusic);
                util.scrollTo(musicSection.obj, 28 * vh);
            } else if (event.detail.origin == artSection.scrollUpTrigger) {
                util.log("art scroll up");
                titlebar.transitionVivus(titlebar.vivusDev);
                util.scrollTo(devSection.obj, 28 * vh);
            }
        });
        devSection.scrollDownTrigger = new anim.AnimationScrollTrigger(devSection,
                                                                            anim.animationType.show,
                                                                            new anim.ScrollTriggerElement(artSection.obj),
                                                                            new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                            undefined,
                                                                            0,
                                                                            undefined,
                                                                            true,
                                                                            false);
        devSection.scrollUpTrigger = new anim.AnimationScrollTrigger(  devSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(devSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true,
                                                                            false);


        gameCard = new ui.Card(new anim.AnimatedElement(loadedDOMs[templates.Template.CARD][0].shadow.querySelector('.card')),
                                            anim.anchor.left);
        gameSection = new anim.AnimatedElement(document.getElementById(pageElements.gameSection));
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == devSection.scrollDownTrigger) {
                util.log("dev scroll down");
                titlebar.transitionVivus(titlebar.vivusArt);
                util.scrollTo(artSection.obj, 28 * vh);
            } else if (event.detail.origin == devSection.scrollUpTrigger) {
                util.log("dev scroll up");
                titlebar.transitionVivus(titlebar.vivusGame);
                util.scrollTo(gameSection.obj, 28 * vh);
            }
        });
        gameSection.scrollDownTrigger = new anim.AnimationScrollTrigger(   gameSection,
                                                                                anim.animationType.show,
                                                                                new anim.ScrollTriggerElement(devSection.obj),
                                                                                new anim.ScrollTriggerElement(window, anim.anchor.bottom),
                                                                                undefined,
                                                                                0,
                                                                                undefined,
                                                                                true,
                                                                                false);
        gameSection.scrollUpTrigger = new anim.AnimationScrollTrigger( gameSection,
                                                                            anim.animationType.hide,
                                                                            new anim.ScrollTriggerElement(gameSection.obj),
                                                                            new anim.ScrollTriggerElement(window),
                                                                            anim.scrollTriggerType.onScrollUp,
                                                                            0,
                                                                            undefined,
                                                                            true,
                                                                            false);
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == gameSection.scrollDownTrigger) {
                util.log("game scroll down");
                titlebar.transitionVivus(titlebar.vivusDev);
                util.scrollTo(devSection.obj, 28 * vh);
            } else if (event.detail.origin == gameSection.scrollUpTrigger) {
                util.log("game scroll up");
                titlebar.resetVivus();
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
        hero.heroButton.obj.addEventListener('click', () => {
            titlebar.titleTrigger.trigger();
            titlebar.scrollToMain();
        })
        if (Object.hasOwn(loadedDOMs, 'sidebar')) {
        const sidebar = new ui.SideBar(new anim.AnimatedElement(loadedDOMs.sidebar[0].shadow.getElementById('sidebar'),
                                                        false,
                                                        new animate.Animation(animate.animationClass.slideInLeft,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        new animate.Animation(animate.animationClass.slideOutRight,
                                                                              animate.speedClass.fast,
                                                                              ),
                                                        ));
                                                    }
        if (Object.hasOwn(loadedDOMs, 'progressbar')) {
        const progressbar = new ui.ScrollProgressBar(   new anim.AnimatedElement(loadedDOMs.progressbar[0].shadow.getElementById('progressbar')),
                                                        document.getElementById(pageElements.gameSection).getBoundingClientRect().top - window.innerHeight);
        }
        if (Object.hasOwn(loadedDOMs, 'horizontalbar')) {
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
                                                                                true,
                                                                                false);
        }
    }, 500);
}
window.addEventListener('load', onLoadComplete);