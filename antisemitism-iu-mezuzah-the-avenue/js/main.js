document.querySelectorAll(".content-warning").forEach((warning) => {
  warning.querySelector("button").addEventListener("click", () => {
    warning.classList.add("hide");
    warning.addEventListener("animationend", () => {
      warning.style.display = "none";
    });

    document.querySelector("#hideBtn").addEventListener("click", () => {
      warning.classList.remove("hide");
      warning.style.display = "flex";
    });
  });
});
