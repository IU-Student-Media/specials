'use strict';

let showMoreNodes = document.querySelectorAll('.show-priorities');

showMoreNodes.forEach((node) => {
    node.addEventListener('click', () => {
        if (node.textContent === "More ↓") {
            node.previousElementSibling.style.overflow = 'visible';
            node.previousElementSibling.style.height = 'auto';
            node.textContent = "Less ↑";
        } else if (node.textContent === "Less ↑") {
            node.previousElementSibling.style.overflow = 'hidden';
            node.previousElementSibling.style.height = '132px';
            node.textContent = "More ↓";
        }
    })
})