import * as animate from './modules/animate.js';
import * as anim from './modules/animations.js';
import * as templates from './modules/templates.js';
import * as ui from './modules/ui.js';
import * as util from './modules/util.js';
import * as vivus from './modules/vivus.js';

const PageClasses = Object.freeze({
    TITLE_BAR: 'title-bar',
    TITLE_BAR_CONTENT: 'title-bar-content',
    TITLE_TEXT: 'title-text',
    VIVUS_TEXT: 'vivus-text',
    VIVUS_TEXT_AFTER: 'vivus-text-after',
    MAIN_SECTION: 'main-section',
    MAIN_STICKY_SECTION: 'main-sticky-section',
    STICKY_LEFT: 'sticky-left',
    STICKY_RIGHT: 'sticky-right',
    END_SECTION: 'end-section',
    END_STICKY: 'end-sticky',
    END_CARD: 'end-card',
});

const PageElements =  Object.freeze({
    HERO_BUTTON: 'hero-button',
    HERO_MENU_TEXT: 'hero-menu-text',
    SCROLL_DOWN_TEXT: 'scroll-down-text',
    HERO_TITLE: 'hero-title',
    HERO_SUBTITLE: 'hero-subtitle',
    HERO_IMAGE: 'hero-image',
    TITLE_BAR: 'title-bar',
    TITLE_BAR_CONTENT: 'title-bar-content',
    VIVUS_GAME: 'vivus-game',
    VIVUS_DEV: 'vivus-dev',
    VIVUS_ART: 'vivus-art',
    VIVUS_MUSIC: 'vivus-music',
    GAME_SECTION: 'game-section',
    GAME_CARD: 'game-card',
    DEV_SECTION: 'dev-section',
    DEV_CARD: 'dev-card',
    ART_SECTION: 'art-section',
    ART_CARD: 'art-card',
    MUSIC_SECTION: 'music-section',
    MUSIC_CARD: 'music-card',
    END_SECTION: 'end-section',
    END_CARD: 'end-card',
});

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

const content = new ui.Content(document.getElementById(util.css.SiteID.content));

const start = document.getElementById(PageElements.GAME_SECTION);

class TitleBar {
    constructor(obj) {
        this.obj = obj;
        this.titleContent = document.getElementById(PageElements.TITLE_BAR_CONTENT);
        this.vivusGame = new vivus.VivusContainer(
            PageElements.VIVUS_GAME,
            {
                type: 'oneByOne',
                file: 'data/svg/gamedeveloper.svg',
                start: 'manual',
            },
            ).then((vivusObject) => {
                this.vivusGame = vivusObject;
                this.intializeVivus(this.vivusGame);
                this.activeVivus = this.vivusGame;
            });
        this.vivusDev = new vivus.VivusContainer(
            PageElements.VIVUS_DEV,
            {
                type: 'oneByOne',
                file: 'data/svg/softwareengineer.svg',
                start: 'manual',
            },
            ).then((vivusObject) => {
                this.vivusDev = vivusObject;
                this.intializeVivus(
                    this.vivusDev,
                    false,
                );
            });
        this.vivusArt = new vivus.VivusContainer(
            PageElements.VIVUS_ART,
            {
                type: 'oneByOne',
                file: 'data/svg/digitalartist.svg',
                start: 'manual',
            },
            ).then((vivusObject) => {
                this.vivusArt = vivusObject;
                this.intializeVivus(
                    this.vivusArt,
                    false,
                );
            });
        this.vivusMusic = new vivus.VivusContainer(
            PageElements.VIVUS_MUSIC,
            {
                type: 'oneByOne',
                file: 'data/svg/musician.svg',
                start: 'manual',
            },
            ).then((vivusObject) => {
                this.vivusMusic = vivusObject;
                this.vivusMusic.obj.classList.add('vivus-music');
                this.intializeVivus(
                    this.vivusMusic,
                    false,
                );
            });
        
        this.titleTrigger = new anim.AnimationScrollTrigger(
            hero.content,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                this.obj,
            ),
            undefined,
            undefined,
            0,
            undefined,
            true,
        );
        this.heroTrigger = new anim.AnimationScrollTrigger(
            hero.content,
            anim.animationType.show,
            new anim.ScrollTriggerElement(
                hero.elem.obj,
                anim.anchor.bottom,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {this.handle(event)});
    }

    intializeVivus(elem, active = true) {
        util.log(
            'Vivus element ' + elem.obj.parentElement.id + ' instantiated.',
            util.LogType.INFO,
        );
        elem.obj.classList.add(PageClasses.VIVUS_TEXT);
        if (!active) {
            elem.hide();
        }
    }

    playVivus() {
        this.activeVivus.vivus.play(1.5, () => {
            this.activeVivus.obj.classList.add(PageClasses.VIVUS_TEXT_AFTER);
        });
    }

    rewindVivus() {
        this.activeVivus.obj.classList.remove(PageClasses.VIVUS_TEXT_AFTER);
        this.activeVivus.vivus.play(-2);
    }

    transitionVivus(next) {
        this.activeVivus.obj.classList.remove(PageClasses.VIVUS_TEXT_AFTER);
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
            util.log(
                'Hero Section Scroll Down Triggered',
                util.LogType.DEBUG,
            );
            this.scrollToMain();
        }
    }
}

// TO DO: Move to Hero UI Class
function handleHero() {
    if (Object.hasOwn(loadedDOMs, templates.Template.HERO)) {
        util.log(
            'Hero Detected!',
            util.LogType.INFO,
        );
        hero = loadedDOMs[templates.Template.HERO][0].ui;
        hero.heroButton = new anim.AnimatedElement(
            loadedDOMs[templates.Template.HERO][0].template.shadow.getElementById(PageElements.HERO_BUTTON),
            false,
            new animate.Animation(
                animate.animationClass.fadeInUp,
                animate.speedClass.fast,
                1000,
            ),
        );
        hero.heroMenuText = new anim.AnimatedElement(
            loadedDOMs[templates.Template.HERO][0].template.shadow.getElementById(PageElements.HERO_MENU_TEXT),
            false,
            new animate.Animation(
                animate.animationClass.fadeInUp,
                animate.speedClass.fast,
                1200
            ),
        );
        hero.scrollDownText = new anim.AnimatedElement(
            loadedDOMs[templates.Template.HERO][0].template.shadow.getElementById(PageElements.SCROLL_DOWN_TEXT),
            false,
            new animate.Animation(
                animate.animationClass.fadeInUp,
                animate.speedClass.fast,
                1400,
            ),
            undefined,
            new animate.Animation(
                animate.animationClass.bounce,
                animate.speedClass.slow,
                animate.delayClass.delay_4s,
                animate.repeatClass.infinite,
            ),
        );
        hero.heroTitle = new anim.AnimatedElement(
            loadedDOMs[templates.Template.HERO][0].template.shadow.getElementById(PageElements.HERO_TITLE),
            false,
            new animate.Animation(
                animate.animationClass.backInLeft,
                animate.speedClass.animated,
                ),
            );
        hero.heroSubtitle = new anim.AnimatedElement(
            loadedDOMs[templates.Template.HERO][0].template.shadow.getElementById(PageElements.HERO_SUBTITLE),
            false,
            new animate.Animation(
                animate.animationClass.backInLeft,
                animate.speedClass.animated,
                500,
            ),
        );
        hero.heroImage = new anim.AnimatedElement(
            loadedDOMs[templates.Template.HERO][0].template.shadow.getElementById(PageElements.HERO_IMAGE),
            false,
            new animate.Animation(
                animate.animationClass.backInRight,
                animate.speedClass.animated,
                200,
            ),
        );
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
        util.log(
            'Navbar Detected!',
            util.LogType.INFO,
        );
        navbar = loadedDOMs[templates.Template.NAVBAR][0].template.ui;

        navbar.elem.entryAnimation = new animate.Animation(
            animate.animationClass.slideInDown,
            animate.speedClass.faster,
        );
        navbar.elem.exitAnimation = new animate.Animation(
            animate.animationClass.slideOutUp,
            animate.speedClass.faster,
        );

        navbar.scrollDownTrigger = new anim.AnimationScrollTrigger(
            navbar.elem,
            anim.animationType.show,
            new anim.ScrollTriggerElement(
                titlebar.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
                anim.anchor.bottom,
            ),
            undefined,
            0,
            undefined,
            true,
        );
        navbar.scrollUpTrigger = new anim.AnimationScrollTrigger(
            navbar.elem,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                hero.elem.obj,
                anim.anchor.bottom,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );

        if (navbar.progressbar != undefined) {
            util.log(
                'Navbar Progress Bar Detected!',
                util.LogType.INFO,
            );
            const progressbar = loadedDOMs[templates.Template.PROGRESS_BAR].find((elem) => elem.template.shadow == navbar.progressbar.shadowRoot).ui;
            progressbar.start = start.getBoundingClientRect().top - window.innerHeight;
            progressbar.end = document.documentElement.scrollHeight;
        }
    }
}

// TO DO: Add exceptions for when pressing back to top
function handleCards() {
    if (Object.hasOwn(loadedDOMs, templates.Template.CARD)) {
        endCard = new ui.Card(
            new anim.AnimatedElement(
                loadedDOMs[templates.Template.CARD][4].template.shadow.querySelector('.' + util.css.SiteClass.card),
            ),
            anim.anchor.bottom,
        );
        endSection = new anim.AnimatedElement(
            document.getElementById(PageElements.END_SECTION),
        );

        musicCard = new ui.Card(
            new anim.AnimatedElement(
                loadedDOMs[templates.Template.CARD][3].template.shadow.querySelector('.' + util.css.SiteClass.card),
            ),
            anim.anchor.right,
        );
        musicSection = new anim.AnimatedElement(
            document.getElementById(PageElements.MUSIC_SECTION),
        );
        endSection.scrollUpTrigger = new anim.AnimationScrollTrigger(
            endSection,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                endSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == endSection.scrollUpTrigger) {
                util.log(
                    'End Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.playVivus();
                util.scrollTo(musicSection.obj, 28 * vh);
            }
        });
        musicSection.scrollDownTrigger = new anim.AnimationScrollTrigger(
            musicSection,
            anim.animationType.show,
            new anim.ScrollTriggerElement(
                endSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
                anim.anchor.bottom,
            ),
            undefined,
            0,
            undefined,
            true,
            false,
        );
        musicSection.scrollUpTrigger = new anim.AnimationScrollTrigger(
            musicSection,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                musicSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );

        artCard = new ui.Card(
            new anim.AnimatedElement(
                loadedDOMs[templates.Template.CARD][2].template.shadow.querySelector('.' + util.css.SiteClass.card),
            ),
            anim.anchor.left,
        );
        artSection = new anim.AnimatedElement(
            document.getElementById(PageElements.ART_SECTION),
        );
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == musicSection.scrollDownTrigger) {
                util.log(
                    'Music Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.rewindVivus();
                window.scrollTo(0, document.body.scrollHeight);
            } else if (event.detail.origin == musicSection.scrollUpTrigger) {
                util.log(
                    'Music Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusArt);
                util.scrollTo(artSection.obj, 28 * vh);
            }
        });
        artSection.scrollDownTrigger = new anim.AnimationScrollTrigger(
            artSection,
            anim.animationType.show,
            new anim.ScrollTriggerElement(
                musicSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
                anim.anchor.bottom,
            ),
            undefined,
            0,
            undefined,
            true,
            false,
        );
        artSection.scrollUpTrigger = new anim.AnimationScrollTrigger(
            artSection,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                artSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );

        devCard = new ui.Card(
            new anim.AnimatedElement(
                loadedDOMs[templates.Template.CARD][1].template.shadow.querySelector('.' + util.css.SiteClass.card),
            ),
            anim.anchor.right,
        );
        devSection = new anim.AnimatedElement(
            document.getElementById(PageElements.DEV_SECTION),
        );
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == artSection.scrollDownTrigger) {
                util.log(
                    'Art Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusMusic);
                util.scrollTo(musicSection.obj, 28 * vh);
            } else if (event.detail.origin == artSection.scrollUpTrigger) {
                util.log(
                    'Art Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusDev);
                util.scrollTo(devSection.obj, 28 * vh);
            }
        });
        devSection.scrollDownTrigger = new anim.AnimationScrollTrigger(
            devSection,
            anim.animationType.show,
            new anim.ScrollTriggerElement(
                artSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
                anim.anchor.bottom,
            ),
            undefined,
            0,
            undefined,
            true,
            false,
        );
        devSection.scrollUpTrigger = new anim.AnimationScrollTrigger(
            devSection,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                devSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );

        gameCard = new ui.Card(
            new anim.AnimatedElement(
                loadedDOMs[templates.Template.CARD][0].template.shadow.querySelector('.' + util.css.SiteClass.card),
            ),
            anim.anchor.left,
        );
        gameSection = new anim.AnimatedElement(
            document.getElementById(PageElements.GAME_SECTION),
        );
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == devSection.scrollDownTrigger) {
                util.log(
                    'Dev Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusArt);
                util.scrollTo(artSection.obj, 28 * vh);
            } else if (event.detail.origin == devSection.scrollUpTrigger) {
                util.log(
                    'Dev Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusGame);
                util.scrollTo(gameSection.obj, 28 * vh);
            }
        });
        gameSection.scrollDownTrigger = new anim.AnimationScrollTrigger(
            gameSection,
            anim.animationType.show,
            new anim.ScrollTriggerElement(
                devSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
                anim.anchor.bottom,
            ),
            undefined,
            0,
            undefined,
            true,
            false,
        );
        gameSection.scrollUpTrigger = new anim.AnimationScrollTrigger(
            gameSection,
            anim.animationType.hide,
            new anim.ScrollTriggerElement(
                gameSection.obj,
            ),
            new anim.ScrollTriggerElement(
                window,
            ),
            anim.scrollTriggerType.onScrollUp,
            0,
            undefined,
            true,
            false,
        );
        window.addEventListener(anim.animationEvents.scrollTriggered, (event) => {
            if (event.detail.origin == gameSection.scrollDownTrigger) {
                util.log(
                    'Game Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusDev);
                util.scrollTo(devSection.obj, 28 * vh);
            } else if (event.detail.origin == gameSection.scrollUpTrigger) {
                util.log(
                    'Game Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
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

        titlebar = document.getElementById(PageElements.TITLE_BAR);
        if (titlebar) {
            util.log(
                'Title Bar Detected!',
                util.LogType.INFO,
            );
            titlebar = new TitleBar(titlebar);
        }

        handleNavbar();
        handleCards();

        hero.heroButton.obj.addEventListener('click', () => {
            titlebar.titleTrigger.trigger();
            titlebar.scrollToMain();
        });

        if (Object.hasOwn(loadedDOMs, templates.Template.SLIDESHOW)) {
            util.log(
                'Slideshow Detected!',
                util.LogType.INFO,
            );
            loadedDOMs[templates.Template.SLIDESHOW][0].ui.play();
            /* for (const slideshow in loadedDOMs[templates.Template.SLIDESHOW]) {
                slideshow.ui.play();
            } */
        }

        if (Object.hasOwn(loadedDOMs, templates.Template.SIDEBAR)) {
            util.log(
                'Side Bar Detected!',
                util.LogType.INFO,
            );
            const sidebar = new ui.SideBar(
                new anim.AnimatedElement(
                    loadedDOMs.sidebar[0].template.shadow.getElementById(util.css.SiteID.sidebar),
                    false,
                    new animate.Animation(
                        animate.animationClass.slideInLeft,
                        animate.speedClass.fast,
                    ),
                    new animate.Animation(
                        animate.animationClass.slideOutRight,
                        animate.speedClass.fast,
                    ),
                ),
            );
        }

        if (Object.hasOwn(loadedDOMs, templates.Template.HORIZONTAL_BAR)) {
            util.log(
                'Bottom Bar Detected!',
                util.LogType.INFO,
            );
            const bottombar = new ui.BottomBar(
                new anim.AnimatedElement(
                    document.getElementById(util.css.SiteID.bottombar),
                    false,
                    new animate.Animation(
                        animate.animationClass.slideInUp,
                        animate.speedClass.faster,
                    ),
                    new animate.Animation(
                        animate.animationClass.slideOutDown,
                        animate.speedClass.faster,
                    ),
                )
            );
            const bottombarScrollDownTrigger = new anim.AnimationScrollTrigger(
                bottombar.elem,
                anim.animationType.show,
                new anim.ScrollTriggerElement(
                    titlebar.obj,
                ),
                new anim.ScrollTriggerElement(
                    window,
                    anim.anchor.bottom,
                ),
                undefined,
                0,
                undefined,
                true,
            );
            const bottombarScrollUpTrigger = new anim.AnimationScrollTrigger(
                bottombar.elem,
                anim.animationType.hide,
                new anim.ScrollTriggerElement(
                    hero.elem.obj,
                    anim.anchor.bottom,
                ),
                new anim.ScrollTriggerElement(
                    window,
                ),
                anim.scrollTriggerType.onScrollUp,
                0,
                undefined,
                true,
                false,
            );
        }
    }, 500);
}
window.addEventListener('load', onLoadComplete);