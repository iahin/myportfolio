export function renderHero(fragment, data) {
  const heroStatusLabel = fragment.querySelector('[data-field="heroStatusLabel"]');
  if (heroStatusLabel) heroStatusLabel.textContent = data.hero.statusLabel;

  const heroQuoteLabel = fragment.querySelector('[data-field="heroQuoteLabel"]');
  if (heroQuoteLabel) heroQuoteLabel.textContent = data.hero.quoteLabel;

  const heroTitlePrefix = fragment.querySelector('[data-field="heroTitlePrefix"]');
  if (heroTitlePrefix) heroTitlePrefix.textContent = data.hero.titlePrefix;

  const heroTitleStrong = fragment.querySelector('[data-field="heroTitleStrong"]');
  if (heroTitleStrong) heroTitleStrong.textContent = data.hero.titleStrong;

  const heroSummary = fragment.querySelector('[data-field="heroSummary"]');
  if (heroSummary) heroSummary.textContent = data.hero.summary;

  const heroQuote = fragment.querySelector('[data-field="heroQuote"]');
  if (heroQuote) heroQuote.textContent = data.hero.quote;

  const heroBadge = fragment.querySelector('[data-field="heroBadge"]');
  if (heroBadge) heroBadge.innerHTML = data.hero.badge;

  const heroImage = fragment.querySelector('[data-field="heroImage"]');
  if (heroImage) {
    heroImage.src = data.hero.image;
    heroImage.alt = data.hero.imageAlt;
  }

  const statsRoot = fragment.querySelector('[data-field="heroStats"]');
  if (statsRoot) {
    data.hero.stats.forEach((item, index) => {
      const stat = document.createElement("div");
      stat.className = "hero-stat";
      stat.innerHTML = `
        <span class="hero-stat-label">${item.label}</span>
        <span class="hero-stat-value">${item.value} <span class="hero-stat-unit">${item.unit}</span></span>
      `;
      statsRoot.append(stat);

      if (index < data.hero.stats.length - 1) {
        const divider = document.createElement("span");
        divider.className = "hero-stat-divider";
        divider.setAttribute("aria-hidden", "true");
        statsRoot.append(divider);
      }
    });
  }

}
