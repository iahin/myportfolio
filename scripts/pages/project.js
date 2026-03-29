import { fetchProjectDetailData, fetchSiteData } from "../shared/site-data.js";
import { renderError, setText, bindLink, escapeHtml } from "../shared/dom.js";

const projectRoot = document.querySelector("#project-app");
const projectTemplate = document.querySelector("#project-template");

async function loadProjectPage() {
  try {
    const [siteData, projectDetail] = await Promise.all([
      fetchSiteData(),
      fetchProjectDetailData()
    ]);
    renderProjectPage(siteData, projectDetail);
  } catch (error) {
    renderError(projectRoot, "Project data could not be loaded.", error);
  }
}

function renderProjectPage(data, detail) {
  document.title = data.site.meta?.projectTitle || detail.title || "Project Details";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      data.site.meta?.projectDescription || detail.subtitle || detail.title || ""
    );
  }

  const fragment = projectTemplate.content.cloneNode(true);
  bindLink(fragment.querySelector('[data-field="projectBackLink"]'), detail.backLink);
  const backLink = fragment.querySelector('[data-field="projectBackLink"]');
  if (backLink) {
    backLink.innerHTML = `
      <span class="project-back-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M14.5 6 8.5 12l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span>${escapeHtml(detail.backLink.label)}</span>
    `;
  }

  setText(fragment, "detailTitle", detail.title);
  setText(fragment, "detailSubtitle", detail.subtitle);
  setText(fragment, "overviewTitle", detail.overview.title);
  setText(fragment, "overviewSummary", detail.overview.summary);
  setText(fragment, "problemTitle", detail.overview.problemTitle);
  setText(fragment, "problemText", detail.overview.problem);
  setText(fragment, "solutionTitle", detail.overview.solutionTitle);
  setText(fragment, "solutionText", detail.overview.solution);

  const heroImage = fragment.querySelector('[data-field="detailHeroImage"]');
  heroImage.src = detail.heroImage.src;
  heroImage.alt = detail.heroImage.alt;

  const hashtagsRoot = fragment.querySelector('[data-field="detailHashtags"]');
  detail.hashtags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "detail-hashtag";
    chip.textContent = tag;
    hashtagsRoot.append(chip);
  });

  setText(fragment, "architectureTitle", detail.architecture.title);
  setText(fragment, "architectureIntro", detail.architecture.intro);
  setText(fragment, "architectureCode", detail.architecture.code);
  setText(fragment, "architectureOutro", detail.architecture.outro);

  setText(fragment, "stacksTitle", detail.stacks.title);
  setText(fragment, "stacksSummary", detail.stacks.summary);
  const stackBadgesRoot = fragment.querySelector('[data-field="stackBadges"]');
  detail.stacks.badges.forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "detail-stack-badge";
    chip.textContent = tag;
    stackBadgesRoot.append(chip);
  });

  setText(fragment, "impactTitle", detail.impact.title);
  setText(fragment, "impactSummary", detail.impact.summary);

  const metricsRoot = fragment.querySelector('[data-field="impactMetrics"]');
  detail.impact.metrics.forEach((metric) => {
    const row = document.createElement("div");
    row.className = "impact-metric-card";
    row.innerHTML = `
      <strong>${escapeHtml(metric.value)}</strong>
      <span>${escapeHtml(metric.label)}</span>
    `;
    metricsRoot.append(row);
  });

  const impactItemsRoot = fragment.querySelector('[data-field="impactItems"]');
  detail.impact.items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "impact-item";
    article.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    `;
    impactItemsRoot.append(article);
  });

  setText(fragment, "galleryTitle", detail.gallery.title);
  setText(fragment, "gallerySummary", detail.gallery.summary);

  const galleryRoot = fragment.querySelector('[data-field="galleryItems"]');
  const lightbox = fragment.querySelector('[data-field="galleryLightbox"]');
  const lightboxImage = fragment.querySelector('[data-field="galleryLightboxImage"]');
  const lightboxTitle = fragment.querySelector('[data-field="galleryLightboxTitle"]');
  const lightboxDescription = fragment.querySelector('[data-field="galleryLightboxDescription"]');
  const lightboxClose = fragment.querySelector('[data-field="galleryLightboxClose"]');

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  };

  const openLightbox = (item) => {
    lightbox.hidden = false;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt || item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    document.body.classList.add("lightbox-open");
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  detail.gallery.items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-card";
    button.innerHTML = `
      <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || item.title)}">
      <div class="gallery-card-copy">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    `;
    button.addEventListener("click", () => openLightbox(item));
    galleryRoot.append(button);
  });

  projectRoot.replaceChildren(fragment);
}

loadProjectPage();
