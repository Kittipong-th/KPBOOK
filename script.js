document.addEventListener("DOMContentLoaded", function () {
  const scrollContainers = document.querySelectorAll(".scroll-container");

  scrollContainers.forEach((scrollContainer) => {
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      startX = e.clientX;
      scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      const x = (e.clientX - startX) * 3; // Adjust the multiplier for smoother scrolling
      scrollContainer.scrollLeft = scrollLeft - x;
    });

    document.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    scrollContainer.addEventListener("scroll", () => {
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft === maxScroll) {
        setTimeout(() => {
          scrollContainer.scrollLeft = 0;
        }, 1000); // Wait 1 second before scrolling back
      }
    });
  });
});
