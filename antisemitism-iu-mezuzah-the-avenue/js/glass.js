document.querySelectorAll(".glass-interactive").forEach((element) => {
  const glassCursor = element.children.namedItem("glassCursor");

  element.addEventListener("mouseenter", () => {
    document.onmousemove = (event) => {
      const cursorY = event.clientY;
      const cursorX = event.clientX;

      glassCursor.style.top = cursorY + "px";
      glassCursor.style.left = cursorX + "px";
    };

    glassCursor.style.opacity = 1;
  });

  element.addEventListener("mouseleave", () => {
    document.onmousemove = null;
    glassCursor.style.opacity = 0;
  });
});
