'use strict'

const stonePhotos = document.querySelectorAll('.dot-gallery img');
const description = document.querySelector('.dot-gallery .description');

const descr = [
    'description 1',
    'description 2',
    'description 3',
    'description 4',
    'description 5',
    'description 6'
]

stonePhotos.forEach( (img) => {
    img.addEventListener('click', toggleDescr)
})

function toggleDescr(event) {
    stonePhotos.forEach( (img) => {
        img.classList.remove('active');
    })
    this.classList.add('active');
    console.log(this.dataset.headstone);
    console.log(descr[this.dataset.headstone - 1]);
    description.innerHTML = descr[this.dataset.headstone - 1];
}


