const navbar = document.querySelector('.navbar');
navbar.style.display = 'none'

const triggerSection = document.querySelector('.game-section');

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

function checkScroll() {
  // Get the position of the trigger section
  var triggerPosition = triggerSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  // If the trigger section is visible in the viewport
  if (triggerPosition <= windowHeight && (navbar.style.display == 'none' || navbar.classList.contains('animate__slideOutUp'))) {
    navbar.classList.remove('animate__animated', 'animate__slideOutUp');
    // Show the navbar
    navbar.style.display = 'block';
    animateCSS('.navbar', 'slideInDown');
  } else if (triggerPosition > windowHeight && navbar.style.display == 'block') {
    // Hide the navbar
    animateCSS('.navbar', 'slideOutUp').then((message) => {
      triggerPosition = triggerSection.getBoundingClientRect().top;
      if (triggerPosition > windowHeight) {
        navbar.style.display = 'none';
      }
    });
    
  }
}

window.addEventListener('scroll', checkScroll);

window.addEventListener('load', function() {
    // Fade out the loading screen
    setTimeout(function() {
    document.getElementById('loading-screen').style.opacity = '0';

    // After the fade-out transition, hide the loading screen completely
    setTimeout(function() {
      document.getElementById('loading-screen').style.display = 'none';
      // Show the main content
      document.getElementById('content').style.display = 'block';
    }, 500); // Match the duration of the fade transition (0.5s)
    }, 0);
});

lottie.loadAnimation({
  container: document.getElementById('load-animation'), // Target the container
  loop: true,       // Loop the animation
  autoplay: true,   // Play the animation automatically
  path: 'json/loading.json' // Path to your animation JSON file
});