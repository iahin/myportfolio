import { projectLinkForHome } from "./navigation.js";
import { trackProjectClick } from "../shared/analytics.js";

function renderTags(tags) {
  return tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");
}

export function renderProjects(fragment, data, projectDetailData) {
  const projectsTitle = fragment.querySelector('[data-field="projectsTitle"]');
  if (projectsTitle) projectsTitle.textContent = data.projectsOverview.title;

  const projectsSummary = fragment.querySelector('[data-field="projectsSummary"]');
  if (projectsSummary) projectsSummary.textContent = data.projectsOverview.summary;

  const projectsRoot = fragment.querySelector('[data-field="projectsGrid"]');
  if (!projectsRoot) {
    return;
  }

  const projectDetails = projectDetailData?.projects || {};

  data.projectsOverview.projects.forEach((project) => {
    const detail = projectDetails[project.slug] || {};
    const projectTitle = detail.title || project.slug;
    const projectTags = detail.hashtags || [];
    const projectSubtitle = detail.subtitle || "";
    const projectImage = detail.heroImage?.src || "./assets/images/profile-placeholder.svg";
    const projectImageAlt = projectTitle;
    const projectHref = `./project.html?project=${project.slug}`;
    const article = document.createElement("a");
    article.className = "project-card project-card-unified project-card-clickable";
    article.href = projectLinkForHome(projectHref);
    const linkLabel = "View More";
    article.innerHTML = `
      <div class="project-media project-media-wide">
        <img src="${projectImage}" alt="${projectImageAlt}">
      </div>
      <div class="project-body">
        <div class="project-tags">${renderTags(projectTags)}</div>
        <h3>${projectTitle}</h3>
        <p>${projectSubtitle}</p>
        <span class="project-link">${linkLabel}</span>
      </div>
    `;
    article.addEventListener("click", () => {
      trackProjectClick(projectTitle, project.slug, {
        page_type: "home",
        destination_page: "project_detail"
      });
    });

    projectsRoot.append(article);
  });
}
