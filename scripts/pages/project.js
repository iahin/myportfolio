import { fetchSiteData } from "../shared/site-data.js";
import { renderError, setText, bindLink } from "../shared/dom.js";

const projectRoot = document.querySelector("#project-app");
const projectTemplate = document.querySelector("#project-template");

async function loadProjectPage() {
  try {
    const data = await fetchSiteData();
    renderProjectPage(data);
  } catch (error) {
    renderError(projectRoot, "Project data could not be loaded.", error);
  }
}

function renderProjectPage(data) {
  document.title = data.site.meta?.projectTitle || data.projectDetail.title || "Project Details";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      data.site.meta?.projectDescription || data.projectDetail.summary || ""
    );
  }

  const fragment = projectTemplate.content.cloneNode(true);
  const detail = data.projectDetail;
  bindLink(fragment.querySelector('[data-field="projectBackLink"]'), detail.backLink);

  setText(fragment, "detailTitle", detail.title);
  setText(fragment, "detailSummary", detail.summary);
  setText(fragment, "detailRoleLabel", detail.labels.role);
  setText(fragment, "detailRole", detail.role);
  setText(fragment, "detailYearLabel", detail.labels.year);
  setText(fragment, "detailYear", detail.year);
  setText(fragment, "detailAchievementsLabel", detail.labels.achievements);
  bindLink(fragment.querySelector('[data-field="detailPrimary"]'), detail.primaryLink);
  bindLink(fragment.querySelector('[data-field="detailSecondary"]'), detail.secondaryLink);

  const heroImage = fragment.querySelector('[data-field="detailHeroImage"]');
  heroImage.src = detail.heroImage.src;
  heroImage.alt = detail.heroImage.alt;

  setText(fragment, "challengeTitle", detail.challenge.title);
  setText(fragment, "challengeText", detail.challenge.text);
  setText(fragment, "solutionTitle", detail.solution.title);
  setText(fragment, "solutionText", detail.solution.text);
  setText(fragment, "blueprintTitle", detail.blueprint.title);
  setText(fragment, "blueprintSummary", detail.blueprint.summary);

  const blueprintCardsRoot = fragment.querySelector('[data-field="blueprintCards"]');
  detail.blueprint.cards.forEach((card) => {
    const item = document.createElement("article");
    item.className = "blueprint-card";
    item.innerHTML = `
      <span class="blueprint-icon">${card.icon}</span>
      <span class="blueprint-label">${card.label}</span>
      <p>${card.value}</p>
    `;
    blueprintCardsRoot.append(item);
  });

  const blueprintTagsRoot = fragment.querySelector('[data-field="blueprintTags"]');
  detail.blueprint.tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "blueprint-tag";
    chip.textContent = tag;
    blueprintTagsRoot.append(chip);
  });

  const achievementsRoot = fragment.querySelector('[data-field="achievements"]');
  detail.achievements.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "achievement-item";
    row.innerHTML = `
      <span class="achievement-index">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <p class="achievement-title">${item.title}</p>
        <p class="achievement-text">${item.text}</p>
      </div>
    `;
    achievementsRoot.append(row);
  });

  setText(fragment, "architectureTitle", detail.architecture.title);
  setText(fragment, "architectureIntro", detail.architecture.intro);
  setText(fragment, "architectureCode", detail.architecture.code);
  setText(fragment, "architectureOutro", detail.architecture.outro);

  projectRoot.replaceChildren(fragment);
}

loadProjectPage();
