function loadAndResize() {
  const spirals = document.querySelectorAll('.spiral-container');

  spirals.forEach((spiral) => spiral.style.setProperty('display', 'none'))
  document.querySelector('.all-spirals').style.setProperty('height', '0px')

  const height = document.documentElement.scrollHeight;
  document.querySelector('.all-spirals').style.setProperty('height', `${height}px`)

  spirals.forEach((spiral, index) => {
    // console.log(spiral);
    // console.log(height);
    const image = spiral.querySelector('img');
    spiral.style.setProperty('top', `${(height / 4) * (index + 1)}px`);
});

  spirals.forEach((spiral) => spiral.style.setProperty('display', 'block'))


  const rotation = window.scrollY / 10;
  spirals.forEach((spiral) => {
    const image = spiral.querySelector('img');
    image.style.transform = `rotate(${rotation}deg)`;
  });
}

window.addEventListener('load', loadAndResize);
window.addEventListener('resize', loadAndResize);

window.addEventListener('scroll', function () {
  const spirals = document.querySelectorAll('.spiral-container');

  spirals.forEach((spiral, index) => {
    const image = spiral.querySelector('img');
    const rotation = window.scrollY / 10;
    // console.log(image);
    image.style.transform = `rotate(${rotation}deg)`;
  });
});
