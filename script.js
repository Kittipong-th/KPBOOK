document.addEventListener("DOMContentLoaded", function () {
  const scrollContainers = document.querySelectorAll(".scroll-container");

  scrollContainers.forEach((scrollContainer) => {
    let isInteracting = false;
    let startX;
    let scrollLeft;

    const startInteraction = (event) => {
      isInteracting = true;
      startX =
        event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const moveInteraction = (event) => {
      if (!isInteracting) return;
      const clientX =
        event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
      const x = (clientX - startX) * 3; // Adjust the multiplier for smoother scrolling
      scrollContainer.scrollLeft = scrollLeft - x;
    };

    const endInteraction = () => {
      isInteracting = false;
    };

    scrollContainer.addEventListener("mousedown", startInteraction);
    scrollContainer.addEventListener("touchstart", startInteraction);

    scrollContainer.addEventListener("mousemove", moveInteraction);
    scrollContainer.addEventListener("touchmove", moveInteraction);

    document.addEventListener("mouseup", endInteraction);
    document.addEventListener("touchend", endInteraction);

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

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // console.log(e); #pointer for each event
    e.preventDefault();
    const href = link.getAttribute("href");
    // console.log(href); #get(id) #,#how

    // scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      // console.log(sectionEl); #get in click section on top
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const sectionHeroEl = document.querySelector(".hero-section");
console.log(sectionHeroEl);
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) document.body.classList.add("sticky");
    if (ent.isIntersecting === true) document.body.classList.remove("sticky");
  },
  {
    //In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
