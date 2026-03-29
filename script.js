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

  fragment.querySelector('[data-field="eyebrow"]').textContent = data.hero.eyebrow;
  fragment.querySelector('[data-field="name"]').textContent = data.hero.name;
  fragment.querySelector('[data-field="tagline"]').textContent = data.hero.tagline;
  fragment.querySelector('[data-field="summary"]').textContent = data.hero.summary;
  fragment.querySelector('[data-field="focus"]').textContent = data.hero.focus;

  const profileImage = fragment.querySelector('[data-field="image"]');
  profileImage.src = data.hero.image;
  profileImage.alt = data.hero.imageAlt;

  const primaryLink = fragment.querySelector('[data-field="primaryLink"]');
  primaryLink.href = data.hero.primaryLink.href;
  primaryLink.textContent = data.hero.primaryLink.label;

  const secondaryLink = fragment.querySelector('[data-field="secondaryLink"]');
  secondaryLink.href = data.hero.secondaryLink.href;
  secondaryLink.textContent = data.hero.secondaryLink.label;

  const emailLink = fragment.querySelector('[data-field="emailLink"]');
  emailLink.href = `mailto:${data.contact.email}`;
  emailLink.textContent = data.contact.label;

  const highlightsRoot = fragment.querySelector('[data-field="highlights"]');
  data.highlights.forEach((item) => {
    const article = document.createElement("article");
    article.className = "highlight-card";
    article.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    highlightsRoot.append(article);
  });

  const projectsRoot = fragment.querySelector('[data-field="projects"]');
  data.projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";

    const tags = project.tags
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");

    article.innerHTML = `
      <div class="project-meta">${tags}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a class="button button-secondary" href="${project.link.href}">${project.link.label}</a>
    `;

    projectsRoot.append(article);
  });

  contentRoot.replaceChildren(fragment);
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
