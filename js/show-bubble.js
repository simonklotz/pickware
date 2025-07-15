let overlayHidden = true;
let locked = false;
let savedScrollY = 0;

function lockScroll() {
  if (locked) {
    return;
  }

  locked = true;
  savedScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.classList.add("scroll-locked");
  document.body.style.top = `-${savedScrollY}px`;
}

function unlockScroll() {
  if (!locked) {
    return;
  }

  locked = false;
  document.body.classList.remove("scroll-locked");
  document.body.style.top = "";
  window.scrollTo(0, savedScrollY);
}

function unhideOverlay() {
  const teamImage = document.getElementById("team-image-overlay");
  if (!teamImage) {
    return;
  }

  teamImage.style.opacity = 0;
  teamImage.classList.remove("hide");

  setTimeout(() => {
    teamImage.style.opacity = 1;
    unlockScroll();
    removeListeners();
  }, 400);
}

function revealOnce(e) {
  if (!overlayHidden) {
    return;
  }

  overlayHidden = false;

  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  lockScroll();
  unhideOverlay();
}

function onWheel(e) {
  revealOnce(e);
}

function onKeydown(e) {
  const k = e.key;

  if (
    k === " " ||
    k === "PageDown" ||
    k === "PageUp" ||
    k === "ArrowDown" ||
    k === "ArrowUp" ||
    k === "Home" ||
    k === "End"
  ) {
    revealOnce(e);
  }
}

let touchStartY = 0;
function onTouchStart(e) {
  if (!e.touches || !e.touches.length) {
    return;
  }
  touchStartY = e.touches[0].clientY;
}
function onTouchMove(e) {
  if (!e.touches || !e.touches.length) {
    return;
  }
  const dy = Math.abs(e.touches[0].clientY - touchStartY);
  if (dy > 10) {
    revealOnce(e);
  }
}

function removeListeners() {
  window.removeEventListener("wheel", onWheel, wheelOpts);
  window.removeEventListener("keydown", onKeydown, keyOpts);
  window.removeEventListener("touchstart", onTouchStart, tsOpts);
  window.removeEventListener("touchmove", onTouchMove, tmOpts);
}

const wheelOpts = { passive: false };
const keyOpts = { passive: false, capture: true };
const tsOpts = { passive: true };
const tmOpts = { passive: false };

window.addEventListener("wheel", onWheel, wheelOpts);
window.addEventListener("keydown", onKeydown, keyOpts);
window.addEventListener("touchstart", onTouchStart, tsOpts);
window.addEventListener("touchmove", onTouchMove, tmOpts);
