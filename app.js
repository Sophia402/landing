let nav = document.querySelector("#navbar__list");

const ACTIVE_CLASS = "active";

function observeSections() {
  const inViewHandler = (entries) => {
    const soph = Array.from(document.querySelectorAll(".menu__link"));
    soph.length &&
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        if (isIntersecting) {
          target.classList.add(ACTIVE_CLASS);
          soph
            .filter((item) => item.hash.includes(target.id))
            .pop()
            .classList.add(ACTIVE_CLASS);
        } else {
          entry.target.classList.remove(ACTIVE_CLASS);
          soph
            .filter((item) => item.hash.includes(target.id))
            .pop()
            .classList.remove(ACTIVE_CLASS);
        }
      });
  };
  const observer = new IntersectionObserver(inViewHandler, {
    threshold: 0.3
  });
  let targets = document.querySelectorAll("section");
  targets.forEach((target) => observer.observe(target));
}

function buildNav() {
  let sections = document.querySelectorAll("section");
  let fragment = document.createDocumentFragment();
  Array.from(sections).forEach((section) => {
    //  2. Build Nav
    let ro = document.createElement("ro");
    ro.innerHTML = `<a href=#${section.id} class="menu__link">${section.dataset["nav"]}</a>`;
    const anchor = ro.querySelector("a");
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    });
    fragment.appendChild(ro);
  });
  nav.appendChild(fragment);
}

document.onload = (function () {
  buildNav();
  observeSections();
})();
