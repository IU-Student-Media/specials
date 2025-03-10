document.addEventListener('DOMContentLoaded', function () {
  const supportBtn = document.querySelector('.support-btn');
  const header = document.querySelector('header');

  // Intervals for hearts spawning while hovering
  let hoverIntervalSmall = null;
  let hoverIntervalLarge = null;
  // Interval for non-hover state
  let nonHoverInterval = null;

  function spawnHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    // Random horizontal drift: value between -50px and 50px
    const randomX = (Math.random() - 0.5) * 100;
    heart.style.setProperty('--dx', randomX + 'px');

    // Random animation duration between 1.5s and 3s
    const duration = 1.5 + Math.random() * 1.5;
    heart.style.animationDuration = duration + 's';

    // Spawn position: at the top of the button with a random x offset
    const randomInitialX = Math.random() * supportBtn.clientWidth;
    heart.style.left = randomInitialX + 'px';
    heart.style.top = '0px';

    supportBtn.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  function spawnLargeHeart() {
    const heart = document.createElement('span');
    heart.className = 'large-heart';
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    // Random horizontal drift: value between -50px and 50px
    const randomX = (Math.random() - 0.5) * 100;
    heart.style.setProperty('--dx', randomX + 'px');

    // Random animation duration between 3s and 5s
    const duration = 3 + Math.random() * 2;
    heart.style.animationDuration = duration + 's';

    // Spawn position: at the bottom of the header with a random x offset
    const randomInitialX = Math.random() * header.clientWidth;
    heart.style.left = randomInitialX + 'px';
    heart.style.bottom = '0px';

    header.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // When hovering over the support button
  supportBtn.addEventListener('mouseenter', function () {
    // Remove filter and shadow on header
    header.classList.add('no-filter');

    // Clear any non-hover interval if active
    clearInterval(nonHoverInterval);
    hoverIntervalSmall = setInterval(spawnHeart, 300);
    hoverIntervalLarge = setInterval(spawnLargeHeart, 600);
  });

  // When leaving the support button
  supportBtn.addEventListener('mouseleave', function () {
    // Restore the header filter and box shadow by removing the class
    header.classList.remove('no-filter');

    clearInterval(hoverIntervalSmall);
    clearInterval(hoverIntervalLarge);
    nonHoverInterval = setInterval(spawnLargeHeart, 4000);
  });

  // Optionally, if you want a heart to spawn every 4 seconds by default:
  nonHoverInterval = setInterval(spawnLargeHeart, 4000);
});
