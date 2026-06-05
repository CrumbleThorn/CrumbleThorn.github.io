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
let bottombar;

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
}

// TO DO: Move to Hero UI Class
function intiializeHero() {
    if (Object.hasOwn(loadedDOMs, templates.Template.HERO)) {
        util.log(
            'Hero Detected!',
            util.LogType.INFO,
        );
        hero = loadedDOMs[templates.Template.HERO][0].ui;
        const heroShadow = loadedDOMs[templates.Template.HERO][0].shadow;
        hero.heroButton = new anim.AnimatedElement(
            heroShadow.getElementById(PageElements.HERO_BUTTON),
            false,
            new animate.Animation(
                animate.animationClass.fadeInUp,
                animate.speedClass.fast,
                1000,
            ),
        );
        hero.heroMenuText = new anim.AnimatedElement(
            heroShadow.getElementById(PageElements.HERO_MENU_TEXT),
            false,
            new animate.Animation(
                animate.animationClass.fadeInUp,
                animate.speedClass.fast,
                1200
            ),
        );
        hero.scrollDownText = new anim.AnimatedElement(
            heroShadow.getElementById(PageElements.SCROLL_DOWN_TEXT),
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
            heroShadow.getElementById(PageElements.HERO_TITLE),
            false,
            new animate.Animation(
                animate.animationClass.backInLeft,
                animate.speedClass.animated,
                ),
            );
        hero.heroSubtitle = new anim.AnimatedElement(
            heroShadow.getElementById(PageElements.HERO_SUBTITLE),
            false,
            new animate.Animation(
                animate.animationClass.backInLeft,
                animate.speedClass.animated,
                500,
            ),
        );
        hero.heroImage = new anim.AnimatedElement(
            heroShadow.getElementById(PageElements.HERO_IMAGE),
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

function initializeTitleBar() {
    titlebar = document.getElementById(PageElements.TITLE_BAR);
    if (titlebar) {
        util.log(
            'Title Bar Detected!',
            util.LogType.INFO,
        );
        titlebar = new TitleBar(titlebar);
    }
}

function initializeNavbar() {
    if (Object.hasOwn(loadedDOMs, templates.Template.NAVBAR)) {
        util.log(
            'Navbar Detected!',
            util.LogType.INFO,
        );
        navbar = loadedDOMs[templates.Template.NAVBAR][0].ui;

        navbar.elem.entryAnimation = new animate.Animation(
            animate.animationClass.slideInDown,
            animate.speedClass.faster,
        );
        navbar.elem.exitAnimation = new animate.Animation(
            animate.animationClass.slideOutUp,
            animate.speedClass.faster,
        );

        if (navbar.progressbar != undefined) {
            util.log(
                'Navbar Progress Bar Detected!',
                util.LogType.INFO,
            );
            const progressbar = loadedDOMs[templates.Template.PROGRESS_BAR].find((elem) => elem.shadow == navbar.progressbar.shadowRoot).ui;
            progressbar.start = start.getBoundingClientRect().top - window.innerHeight;
            progressbar.end = document.documentElement.scrollHeight;
        }
    }
}

// TO DO: Add exceptions for when pressing back to top
function initializeCards() {
    if (Object.hasOwn(loadedDOMs, templates.Template.CARD)) {
        endCard = loadedDOMs[templates.Template.CARD][4].ui;
        endSection = new anim.AnimatedElement(
            document.getElementById(PageElements.END_SECTION),
        );

        musicCard = loadedDOMs[templates.Template.CARD][3].ui;
        musicSection = new anim.AnimatedElement(
            document.getElementById(PageElements.MUSIC_SECTION),
        );

        artCard = loadedDOMs[templates.Template.CARD][2].ui;
        artSection = new anim.AnimatedElement(
            document.getElementById(PageElements.ART_SECTION),
        );

        devCard = loadedDOMs[templates.Template.CARD][1].ui;
        devSection = new anim.AnimatedElement(
            document.getElementById(PageElements.DEV_SECTION),
        );

        gameCard = loadedDOMs[templates.Template.CARD][0].ui;
        gameSection = new anim.AnimatedElement(
            document.getElementById(PageElements.GAME_SECTION),
        );
    }
}

function initializeSlideshows() {
    if (Object.hasOwn(loadedDOMs, templates.Template.SLIDESHOW)) {
        util.log(
            'Slideshow Detected!',
            util.LogType.INFO,
        );

        for (const slideshow of loadedDOMs[templates.Template.SLIDESHOW]) {
            slideshow.ui.play();
        }
    }
}

function initializeSideBar() {
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
}

function initializeHorizontalBar() {
    if (Object.hasOwn(loadedDOMs, templates.Template.HORIZONTAL_BAR)) {
        util.log(
            'Bottom Bar Detected!',
            util.LogType.INFO,
        );
        bottombar = new ui.BottomBar(
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
    }
}

let scrollToTopTrigger;

//#region Trigger Functions
function scrollToMain() {
    util.scrollTo(start, 28 * vh);
    setTimeout(() => {
        titlebar.playVivus();
    }, 500);
}

function handleTriggers(event) {
        switch(event.detail.trigger) {
            case hero.heroButtonTrigger:
                util.log(
                    'Hero Button Clicked!',
                    util.LogType.DEBUG,
                );
                scrollToMain();

                titlebar.scrollDownTrigger.active = false;
                scrollToTopTrigger.active = true;
                gameSection.scrollUpTrigger.active = true;
                gameSection.scrollDownTrigger.active = true;
                break;
            case titlebar.scrollDownTrigger:
                util.log(
                    'Hero Section Scroll Down Triggered!',
                    util.LogType.DEBUG,
                );
                scrollToMain();

                titlebar.scrollDownTrigger.active = false;
                scrollToTopTrigger.active = true;
                gameSection.scrollUpTrigger.active = true;
                gameSection.scrollDownTrigger.active = true;
                break;
            case scrollToTopTrigger:
                util.log(
                    'Hero Section Scroll Up Triggered!',
                    util.LogType.DEBUG,
                );
                util.scrollToTop();

                titlebar.scrollDownTrigger.active = true;
                scrollToTopTrigger.active = false;
                break;
            case gameSection.scrollUpTrigger:
                util.log(
                    'Game Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.resetVivus();
                util.scrollToTop();
                titlebar.scrollDownTrigger.active = true;
                scrollToTopTrigger.active = false;
                gameSection.scrollUpTrigger.active = false;
                gameSection.scrollDownTrigger.active = false;
                break;
            case gameSection.scrollDownTrigger:
                util.log(
                    'Game Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusDev);
                util.scrollTo(devSection.obj, 28 * vh);
                gameSection.scrollUpTrigger.active = false;
                gameSection.scrollDownTrigger.active = false;
                devSection.scrollUpTrigger.active = true;
                devSection.scrollDownTrigger.active = true;
                break;
            case devSection.scrollUpTrigger:
                util.log(
                    'Dev Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusGame);
                util.scrollTo(gameSection.obj, 28 * vh);

                devSection.scrollUpTrigger.active = false;
                devSection.scrollDownTrigger.active = false;
                gameSection.scrollUpTrigger.active = true;
                gameSection.scrollDownTrigger.active = true;
                break;
            case devSection.scrollDownTrigger:
                util.log(
                    'Dev Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusArt);
                util.scrollTo(artSection.obj, 28 * vh);

                devSection.scrollUpTrigger.active = false;
                devSection.scrollDownTrigger.active = false;
                artSection.scrollUpTrigger.active = true;
                artSection.scrollDownTrigger.active = true;
                break;
            case artSection.scrollUpTrigger:
                util.log(
                    'Art Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusDev);
                util.scrollTo(devSection.obj, 28 * vh);

                artSection.scrollUpTrigger.active = false;
                artSection.scrollDownTrigger.active = false;
                devSection.scrollUpTrigger.active = true;
                devSection.scrollDownTrigger.active = true;
                break;
            case artSection.scrollDownTrigger: 
                util.log(
                    'Art Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusMusic);
                util.scrollTo(musicSection.obj, 28 * vh);

                artSection.scrollUpTrigger.active = false;
                artSection.scrollDownTrigger.active = false;
                musicSection.scrollUpTrigger.active = true;
                musicSection.scrollDownTrigger.active = true;
                break;
            case musicSection.scrollUpTrigger:
                util.log(
                    'Music Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.transitionVivus(titlebar.vivusArt);
                util.scrollTo(artSection.obj, 28 * vh);

                musicSection.scrollUpTrigger.active = false;
                musicSection.scrollDownTrigger.active = false;
                artSection.scrollUpTrigger.active = true;
                artSection.scrollDownTrigger.active = true;
                break;
            case musicSection.scrollDownTrigger:
                util.log(
                    'Music Section Scroll Down Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.rewindVivus();
                window.scrollTo(0, document.body.scrollHeight);

                musicSection.scrollUpTrigger.active = false;
                musicSection.scrollDownTrigger.active = false;
                endSection.scrollUpTrigger.active = true;
                break;
            case endSection.scrollUpTrigger:
                util.log(
                    'End Section Scroll Up Triggered',
                    util.LogType.DEBUG,
                );
                titlebar.playVivus();
                util.scrollTo(musicSection.obj, 28 * vh);
                endSection.scrollUpTrigger.active = false;
                musicSection.scrollUpTrigger.active = true;
                musicSection.scrollDownTrigger.active = true;
                break;
            default:
                break;
        }
    }
//#endregion

function initializeTriggers() {
    // Scroll to Main Section
    hero.heroButtonTrigger = new anim.MouseEventTrigger(
        hero.heroButton.obj,
    );

    titlebar.scrollDownTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            titlebar.obj,
        ),
        undefined,
        undefined,
        0,
    );

    // Hide Hero
    hero.content.listenToTrigger(
        titlebar.scrollDownTrigger,
        anim.animationType.hide,
    );

    // Show NavBar
    navbar.elem.listenToTrigger(
        titlebar.scrollDownTrigger,
        anim.animationType.show,
        true,
    );

    // Show Bottom Bar
    bottombar.elem.listenToTrigger(
        titlebar.scrollDownTrigger,
        anim.animationType.show,
        true,
    )

    // Scroll Back to Hero
    gameSection.scrollUpTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            gameSection.obj,
        ),
        new anim.ScrollTriggerElement(
            window,
        ),
        anim.scrollTriggerType.onScrollUp,
        0,
        undefined,
        false,
    );
    gameSection.listenToTrigger(
        gameSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    );

    // Hide NavBar
    navbar.elem.listenToTrigger(
        gameSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    );

    // Hide Bottom Bar
    bottombar.elem.listenToTrigger(
        gameSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    )

    // Show Hero
    hero.content.listenToTrigger(
        gameSection.scrollUpTrigger,
        anim.animationType.show,
        true,
    );
    

    // Scroll to Dev Section
    gameSection.scrollDownTrigger = new anim.ScrollTrigger(
            new anim.ScrollTriggerElement(
                devSection.obj,
            ),
            undefined,
            undefined,
            0,
        );
    gameSection.listenToTrigger(
        gameSection.scrollDownTrigger,
        anim.animationType.show,
        true,
    );

    // Scroll to Game Section
    devSection.scrollUpTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            devSection.obj,
        ),
        new anim.ScrollTriggerElement(
            window,
        ),
        anim.scrollTriggerType.onScrollUp,
        0,
        undefined,
        false,
    );
    devSection.listenToTrigger(
        devSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    );

    // Scroll to Art Section
    devSection.scrollDownTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            artSection.obj,
        ),
        undefined,
        undefined,
        0,
    );
    devSection.listenToTrigger(
        devSection.scrollDownTrigger,
        anim.animationType.show,
        true,
    );

    // Scroll to Dev Section
    artSection.scrollDownTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            musicSection.obj,
        ),
        undefined,
        undefined,
        0,
    );
    artSection.listenToTrigger(
        artSection.scrollDownTrigger,
        anim.animationType.show,
        true,
    );

    // Scroll to Music Section
    artSection.scrollUpTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            artSection.obj,
        ),
        new anim.ScrollTriggerElement(
            window,
        ),
        anim.scrollTriggerType.onScrollUp,
        0,
        undefined,
        false,
    );
    artSection.listenToTrigger(
        artSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    );

    // Scroll to Art Section
    musicSection.scrollUpTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            musicSection.obj,
        ),
        new anim.ScrollTriggerElement(
            window,
        ),
        anim.scrollTriggerType.onScrollUp,
        0,
        undefined,
        false,
    );
    musicSection.listenToTrigger(
        musicSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    );

    // Scroll to End Section
    musicSection.scrollDownTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            endSection.obj,
        ),
        undefined,
        undefined,
        0,
    );
    musicSection.listenToTrigger(
        musicSection.scrollDownTrigger,
        anim.animationType.show,
        true,
    );

    // Scroll to Music Section    
    endSection.scrollUpTrigger = new anim.ScrollTrigger(
        new anim.ScrollTriggerElement(
            endSection.obj,
        ),
        new anim.ScrollTriggerElement(
            window,
        ),
        anim.scrollTriggerType.onScrollUp,
        0,
        undefined,
        false,
    );
    endSection.listenToTrigger(
        endSection.scrollUpTrigger,
        anim.animationType.hide,
        true,
    );

    //TODO: Change to reference toast button
    scrollToTopTrigger = new anim.ScrollTrigger(
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
        false,
    );

    window.addEventListener(anim.animationEvents.triggerFired, (event) => handleTriggers(event));
}

function onLoadComplete() {
    // Reset scroll progress on reload
    util.scrollToTop();
    setTimeout(() => {
        intiializeHero();
        initializeTitleBar();
        initializeNavbar();
        initializeCards();
        initializeSlideshows();
        initializeSideBar();
        initializeHorizontalBar();
        initializeTriggers();
    }, window.dummyDelay);
}
window.addEventListener(templates.TemplateEvents.ALL_TEMPLATES_LOADED, onLoadComplete);