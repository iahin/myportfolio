export function renderMarquee(fragment, data) {
  const marqueeRoot = fragment.querySelector('[data-field="marqueeItems"]');
  const marqueeItems = [...data.marquee, ...data.marquee];

  marqueeItems.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "marquee-item";
    chip.textContent = item;
    marqueeRoot.append(chip);
  });
}
