// This module uses LottieFiles, please check out https://developers.lottiefiles.com/docs/ for reference
// Wrapper class for Objects containing DotLottie animation instances
export class LottieContainer {
    #obj;
    #lottieInstance;
    constructor (obj,
                 animationData = 'data/json/loading.json',
                 loop = true,
                 autoplay = true,
                 ) {
        this.#obj = obj;
        // Plays the Lottie animation
        this.#lottieInstance = lottie.loadAnimation({
                                    container: this.#obj, // Target the container
                                    loop: loop,       // Loop the animation
                                    autoplay: autoplay,   // Play the animation automatically
                                    path: animationData // Path to your animation JSON file
                                });
    }

    get lottieInstance() {
        return this.#lottieInstance;
    }
}