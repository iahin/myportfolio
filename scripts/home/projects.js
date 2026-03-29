import { projectLinkForHome } from "./navigation.js";

function renderTags(tags) {
  return tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");
}

export function renderProjects(fragment, data) {
  const projectsTitle = fragment.querySelector('[data-field="projectsTitle"]');
  if (projectsTitle) projectsTitle.textContent = data.projectsOverview.title;

  const projectsTitleMuted = fragment.querySelector('[data-field="projectsTitleMuted"]');
  if (projectsTitleMuted) projectsTitleMuted.textContent = data.projectsOverview.titleMuted;

  const projectsSummary = fragment.querySelector('[data-field="projectsSummary"]');
  if (projectsSummary) projectsSummary.textContent = data.projectsOverview.summary;

  const projectsRoot = fragment.querySelector('[data-field="projectsGrid"]');
  if (!projectsRoot) {
    return;
  }

  data.projectsOverview.projects.forEach((project) => {
    const article = document.createElement("a");
    article.className = "project-card project-card-unified project-card-clickable";
    article.href = projectLinkForHome(project.link?.href || "./project.html");
    const linkLabel = project.link?.label || "View Details";
    article.innerHTML = `
      <div class="project-media project-media-wide">
        <img src="${project.image || "./assets/images/profile-placeholder.svg"}" alt="${project.imageAlt || project.title}">
      </div>
      <div class="project-body">
        <div class="project-tags">${renderTags(project.tags || [])}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="project-link">${linkLabel}</span>
      </div>
    `;

    projectsRoot.append(article);
  });
}
