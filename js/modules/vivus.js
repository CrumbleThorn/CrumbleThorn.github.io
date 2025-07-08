// This module uses vivus, please check out https://github.com/maxwellito/vivus/ for reference
// Wrapper class for animating SVG files with vivus
import * as util from './util.js';

export class VivusContainer {
    #container;
    #vivus;
    #obj;
    
    constructor (id, options) {
        this.#container = document.getElementById(id);
        this.played = false;
        return new Promise(resolve => {
            this.#vivus = new Vivus(
                id,
                Object.assign(
                    options, 
                    {
                        onReady: (instance) => {
                            this.#obj = instance.el;
                            util.log(
                                'Vivus instance created on ' + id + ' with ' + options,
                                util.LogType.INFO,
                            );
                            resolve(this);
                        }
                    }
                )
            );
        });
    }

    get container() {
        return this.#container;
    }

    get vivus() {
        return this.#vivus;
    }

    get obj() {
        return this.#obj;
    }

    reset() {
        this.#vivus.reset();
        this.#obj.classList.remove('vivus-text-after');
    }

    hide() {
        this.#container.classList.add(util.css.SiteClass.hidden);
    }

    show() {
        this.#container.classList.remove(util.css.SiteClass.hidden);
    }
}