// https://codepen.io/kevinpowell/pen/BavVLra
export function initTicker(root: ParentNode = document): void {
  // If a user hasn't opted in for reduced motion, then we add the animation.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const scrollers = root.querySelectorAll<HTMLElement>(".scroller");

  scrollers.forEach((scroller) => {
    if (scroller.dataset.animated === "true") {
      return;
    }

    // Add data-animated="true" to every `.scroller` on the page.
    scroller.setAttribute("data-animated", "true");

    // Make an array from the elements within `.scroller__inner`.
    const scrollerInner = scroller.querySelector<HTMLElement>(".scroller__inner");
    if (!scrollerInner) {
      return;
    }

    const originalItems = Array.from(scrollerInner.children);

    const appendClones = (items: Element[]) => {
      items.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as Element;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });
    };

    const ensureSeamlessLoop = () => {
      const scrollerWidth = scroller.getBoundingClientRect().width;
      const contentWidth = scrollerInner.scrollWidth;
      if (scrollerWidth === 0 || contentWidth === 0) {
        return;
      }

      const repeatsNeeded = Math.max(1, Math.ceil(scrollerWidth / contentWidth));
      for (let i = 0; i < repeatsNeeded - 1; i += 1) {
        appendClones(originalItems);
      }

      const baseItems = Array.from(scrollerInner.children);
      appendClones(baseItems);
    };

    requestAnimationFrame(ensureSeamlessLoop);
  });
}

// From https://codepen.io/kevinpowell/pen/BavVLra
