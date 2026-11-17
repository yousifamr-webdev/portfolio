export const NAVBAR_OFFSET = 76;

export function scrollToElement(target: HTMLElement, extraOffset = 0) {
  window.scrollTo({
    top:
      target.getBoundingClientRect().top +
      window.scrollY -
      NAVBAR_OFFSET -
      extraOffset,
    behavior: "smooth",
  });
}
