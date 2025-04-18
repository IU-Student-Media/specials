document.addEventListener('DOMContentLoaded', function() {
    const leftCurtain = document.querySelector('.left-curtain');
    const rightCurtain = document.querySelector('.right-curtain');

    let max_scroll = 0
    const scrollDist = rightCurtain.innerHeight;
    // Function to handle scroll animation
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPercentage = Math.min(scrollPosition / (windowHeight * 0.25), 1);

        max_scroll = Math.max(scrollPercentage, max_scroll)

        

        // Apply transform based on scroll percentage
        leftCurtain.style.transform = `translateX(${-100 * max_scroll}%)`;
        rightCurtain.style.transform = `translateX(${100 * max_scroll}%)`;
    }

    // Initial call to set starting position
    handleScroll();

    // Add scroll event listener for curtain animation
    window.addEventListener('scroll', handleScroll);

    // Add resize event listener to handle window resizing
    window.addEventListener('resize', handleScroll);
});
