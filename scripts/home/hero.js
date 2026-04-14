export function renderHero(fragment, data) {
  const heroTitlePrefix = fragment.querySelector('[data-field="heroTitlePrefix"]');
  if (heroTitlePrefix) heroTitlePrefix.textContent = data.hero.titlePrefix;

  const heroTitleStrong = fragment.querySelector('[data-field="heroTitleStrong"]');
  if (heroTitleStrong) heroTitleStrong.textContent = data.hero.titleStrong;

  const heroSummary = fragment.querySelector('[data-field="heroSummary"]');
  if (heroSummary) heroSummary.textContent = data.hero.summary;

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

    const heroBody = statsRoot.closest(".hero-body");
    const heroVisual = fragment.querySelector(".hero-visual");
    const mobileStatsQuery = window.matchMedia("(max-width: 720px)");

    const syncHeroStatsPosition = () => {
      if (!heroBody || !heroVisual) return;

      if (mobileStatsQuery.matches) {
        heroVisual.append(statsRoot);
      } else {
        heroBody.append(statsRoot);
      }
    };

    syncHeroStatsPosition();

    if (typeof mobileStatsQuery.addEventListener === "function") {
      mobileStatsQuery.addEventListener("change", syncHeroStatsPosition);
    } else if (typeof mobileStatsQuery.addListener === "function") {
      mobileStatsQuery.addListener(syncHeroStatsPosition);
    }
  }

}
