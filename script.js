const contentRoot = document.querySelector("#app");
const template = document.querySelector("#portfolio-template");

async function loadPortfolio() {
  try {
    const response = await fetch("./data/site.json");

    if (!response.ok) {
      throw new Error(`Failed to load site data: ${response.status}`);
    }

    const data = await response.json();
    renderPortfolio(data);
  } catch (error) {
    renderError(error);
  }
}

function renderPortfolio(data) {
  const fragment = template.content.cloneNode(true);

  fragment.querySelector('[data-field="brandName"]').textContent = data.site.brand;

  const navRoot = fragment.querySelector('[data-field="navLinks"]');
  data.navigation.links.forEach((item, index) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    link.className = index === 0 ? "nav-link active" : "nav-link";
    navRoot.append(link);
  });

  const navCta = fragment.querySelector('[data-field="navCta"]');
  navCta.href = data.navigation.cta.href;
  navCta.textContent = data.navigation.cta.label;

  fragment.querySelector('[data-field="heroEyebrow"]').textContent = data.hero.eyebrow;
  fragment.querySelector('[data-field="heroTitlePrefix"]').textContent = data.hero.titlePrefix;
  fragment.querySelector('[data-field="heroTitleStrong"]').textContent = data.hero.titleStrong;
  fragment.querySelector('[data-field="heroSummary"]').textContent = data.hero.summary;
  fragment.querySelector('[data-field="heroQuote"]').textContent = data.hero.quote;
  fragment.querySelector('[data-field="heroBadge"]').innerHTML = data.hero.badge;

  const heroImage = fragment.querySelector('[data-field="heroImage"]');
  heroImage.src = data.hero.image;
  heroImage.alt = data.hero.imageAlt;

  const statsRoot = fragment.querySelector('[data-field="heroStats"]');
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

  bindLink(fragment.querySelector('[data-field="primaryLink"]'), data.hero.primaryLink);
  bindLink(fragment.querySelector('[data-field="secondaryLink"]'), data.hero.secondaryLink);

  const marqueeRoot = fragment.querySelector('[data-field="marqueeItems"]');
  const marqueeItems = [...data.marquee, ...data.marquee];
  marqueeItems.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "marquee-item";
    chip.textContent = item;
    marqueeRoot.append(chip);
  });

  fragment.querySelector('[data-field="projectsKicker"]').textContent = data.projectsOverview.kicker;
  fragment.querySelector('[data-field="projectsTitle"]').textContent = data.projectsOverview.title;
  fragment.querySelector('[data-field="projectsTitleMuted"]').textContent = data.projectsOverview.titleMuted;
  fragment.querySelector('[data-field="projectsSummary"]').textContent = data.projectsOverview.summary;

  const filtersRoot = fragment.querySelector('[data-field="projectFilters"]');
  data.projectsOverview.filters.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = index === 0 ? "filter-chip active" : "filter-chip";
    button.type = "button";
    button.textContent = item;
    filtersRoot.append(button);
  });

  const projectsRoot = fragment.querySelector('[data-field="projectsGrid"]');
  data.projectsOverview.projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = `project-card project-card-${project.layout}`;

    if (project.layout === "featured") {
      article.innerHTML = `
        <div class="project-media project-media-wide">
          <img src="${project.image}" alt="${project.imageAlt}">
        </div>
        <div class="project-body">
          <div class="project-tags">${renderTags(project.tags)}</div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a class="project-link" href="${project.link.href}">${project.link.label}</a>
        </div>
      `;
    } else if (project.layout === "stack") {
      article.innerHTML = `
        <div class="project-body project-body-stack">
          <div class="project-tags">${renderTags(project.tags)}</div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-media project-media-nested">
            <img src="${project.image}" alt="${project.imageAlt}">
          </div>
          <a class="project-link" href="${project.link.href}">${project.link.label}</a>
        </div>
      `;
    } else if (project.layout === "code") {
      article.innerHTML = `
        <div class="project-code"><pre><code>${escapeHtml(project.code)}</code></pre></div>
        <div class="project-body">
          <div class="project-tags">${renderTags(project.tags)}</div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
    } else {
      article.innerHTML = `
        <div class="project-shell">
          <div class="project-shell-head">
            <div class="project-tags">${renderTags(project.tags)}</div>
            <span class="project-shell-icon">NE</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-progress">
            <span class="project-progress-active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;
    }

    projectsRoot.append(article);
  });

  fragment.querySelector('[data-field="ctaTitle"]').textContent = data.cta.title;
  fragment.querySelector('[data-field="ctaSummary"]').textContent = data.cta.summary;
  bindLink(fragment.querySelector('[data-field="ctaPrimary"]'), data.cta.primary);
  bindLink(fragment.querySelector('[data-field="ctaSecondary"]'), data.cta.secondary);

  fragment.querySelector('[data-field="footerText"]').textContent = data.footer.text;

  const footerLinksRoot = fragment.querySelector('[data-field="footerLinks"]');
  data.footer.links.forEach((item) => {
    const link = document.createElement("a");
    link.className = "footer-link";
    link.href = item.href;
    link.textContent = item.label;
    footerLinksRoot.append(link);
  });

  contentRoot.replaceChildren(fragment);
}

function bindLink(element, data) {
  element.href = data.href;
  element.textContent = data.label;
}

function renderTags(tags) {
  return tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderError(error) {
  const message = document.createElement("section");
  message.className = "error-state";
  message.innerHTML = `
    <h2>Portfolio data could not be loaded.</h2>
    <p>${error.message}</p>
  `;

  contentRoot.replaceChildren(message);
}

loadPortfolio();
