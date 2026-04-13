import { fetchProjectDetailData, fetchSiteData } from "../shared/site-data.js";
import { renderError, setText, escapeHtml } from "../shared/dom.js";
import { observeSectionViews, trackProjectView } from "../shared/analytics.js";

const projectRoot = document.querySelector("#project-app");
const projectTemplate = document.querySelector("#project-template");
const PROJECT_BACK_LINK = {
  href: "./index.html#projects",
  label: "Back to Portfolio"
};

function getLinkIconSvg(item) {
  const icon = item.icon || "";
  const href = item.href || "";
  const label = item.label || "";
  const normalized = `${icon} ${label} ${href}`.toLowerCase();

  if (normalized.includes("github")) {
    return `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M12 .5C5.65.5.5 5.7.5 12.12c0 5.14 3.29 9.5 7.85 11.03.57.11.78-.25.78-.56 0-.28-.01-1.2-.02-2.18-3.19.71-3.86-1.37-3.86-1.37-.52-1.35-1.28-1.71-1.28-1.71-1.05-.73.08-.71.08-.71 1.16.08 1.78 1.21 1.78 1.21 1.04 1.79 2.72 1.28 3.38.98.11-.76.4-1.28.73-1.57-2.55-.29-5.23-1.3-5.23-5.76 0-1.27.45-2.31 1.18-3.13-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.17 1.2a10.9 10.9 0 0 1 5.78 0c2.2-1.51 3.17-1.2 3.17-1.2.62 1.59.23 2.77.11 3.06.73.82 1.18 1.86 1.18 3.13 0 4.47-2.68 5.47-5.24 5.76.41.36.77 1.05.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.2.68.79.56A11.66 11.66 0 0 0 23.5 12.12C23.5 5.7 18.35.5 12 .5Z"/>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path fill="currentColor" d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3Zm5 16H5V5h6V3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-6h-2v6Z"/>
    </svg>
  `;
}

function getRequestedProjectSlug(projectData) {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("project");
  const projects = projectData?.projects || {};

  if (requestedSlug && projects[requestedSlug]) {
    return requestedSlug;
  }

  return Object.keys(projects)[0] || null;
}

function setOptionalText(root, field, value) {
  const element = root.querySelector(`[data-field="${field}"]`);
  if (!element) {
    return;
  }

  if (typeof value === "string" && value.trim()) {
    element.textContent = value;
    element.hidden = false;
    return;
  }

  element.textContent = "";
  element.hidden = true;
}

function getGlanceRows(glance) {
  if (Array.isArray(glance?.items) && glance.items.length) {
    return glance.items.filter((item) => item?.label && item?.value);
  }

  const company = glance?.company || null;
  const rows = [];

  if (company?.role) {
    rows.push({ label: "Role", value: company.role });
  }
  if (company?.name) {
    rows.push({ label: "Company", value: company.name });
  }
  if (company?.deliveredFor) {
    rows.push({
      label: company.deliveredForLabel || "Delivered for",
      value: company.deliveredFor
    });
  }

  return rows;
}

function syncProjectSectionOrder(root = document) {
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  const contentGrid = root.querySelector(".project-content-grid");
  const primaryColumn = root.querySelector(".project-primary-column");
  const sidebarColumn = root.querySelector(".project-sidebar-column");
  const sections = {
    glance: root.querySelector('[data-field="glanceSection"]'),
    overview: root.querySelector('[data-field="overviewSection"]'),
    technical: root.querySelector('[data-field="technicalSection"]'),
    impact: root.querySelector('[data-field="impactSection"]'),
    stacks: root.querySelector('[data-field="stacksSection"]'),
    gallery: root.querySelector('[data-field="gallerySection"]')
  };

  if (!contentGrid || !primaryColumn || !sidebarColumn || Object.values(sections).some((section) => !section)) {
    return;
  }

  if (mobileQuery.matches) {
    contentGrid.append(
      sections.glance,
      sections.impact,
      sections.overview,
      sections.technical,
      sections.stacks,
      sections.gallery
    );
    return;
  }

  primaryColumn.append(sections.overview, sections.technical, sections.gallery);
  sidebarColumn.append(sections.glance, sections.impact, sections.stacks);
}

async function loadProjectPage() {
  try {
    const [siteData, projectDetail] = await Promise.all([
      fetchSiteData(),
      fetchProjectDetailData()
    ]);
    const slug = getRequestedProjectSlug(projectDetail);
    const detail = slug ? projectDetail.projects[slug] : null;

    if (!detail) {
      throw new Error("Requested project detail was not found.");
    }

    renderProjectPage(siteData, detail, slug);
  } catch (error) {
    renderError(projectRoot, "Project data could not be loaded.", error);
  }
}

function renderProjectPage(data, detail, slug) {
  document.title = data.site.meta?.projectTitle || detail.title || "Project Details";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      data.site.meta?.projectDescription || detail.subtitle || detail.title || ""
    );
  }

  const fragment = projectTemplate.content.cloneNode(true);

  const backLink = fragment.querySelector('[data-field="projectBackLink"]');
  if (backLink) {
    backLink.href = PROJECT_BACK_LINK.href;
    backLink.innerHTML = `
      <span class="project-back-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M14.5 6 8.5 12l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span>${escapeHtml(PROJECT_BACK_LINK.label)}</span>
    `;
  }
  backLink?.addEventListener("click", () => {
    window.gtag?.("event", "navigation_click", {
      page_type: "project_detail",
      destination: "home_projects",
      project_name: detail.title,
      project_slug: slug
    });
  });

  setText(fragment, "detailTitle", detail.title);
  setOptionalText(fragment, "detailSubtitle", detail.subtitle);
  setOptionalText(fragment, "overviewSummary", detail.overview?.summary);
  setOptionalText(fragment, "overviewBody", detail.overview?.body);
  setOptionalText(fragment, "architectureIntro", detail.architecture?.intro);
  setOptionalText(fragment, "impactTitle", detail.impact?.title);
  setOptionalText(fragment, "stacksTitle", detail.stacks?.title);
  setOptionalText(fragment, "stacksSummary", detail.stacks?.summary);

  const heroBanner = fragment.querySelector('[data-field="projectHeroBanner"]');
  if (heroBanner && detail.heroImage?.src) {
    heroBanner.style.setProperty("--project-hero-image", `url("${detail.heroImage.src}")`);
  }

  const hashtagsRoot = fragment.querySelector('[data-field="detailHashtags"]');
  (detail.hashtags || []).forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "detail-hashtag";
    chip.textContent = tag;
    hashtagsRoot.append(chip);
  });

  const glance = detail.glance || null;
  const glanceRowsRoot = fragment.querySelector('[data-field="detailGlanceRows"]');
  const glanceRows = getGlanceRows(glance);
  if (glanceRowsRoot) {
    glanceRowsRoot.innerHTML = "";
    glanceRows.forEach((item) => {
      const row = document.createElement("div");
      row.className = "project-side-meta-row";
      row.innerHTML = `
        <span class="project-side-label">${escapeHtml(item.label)}</span>
        <strong class="project-side-value">${escapeHtml(item.value)}</strong>
      `;
      glanceRowsRoot.append(row);
    });
  }

  const architectureImage = detail.architecture?.image;
  const architectureImageSrc = fragment.querySelector('[data-field="architectureImageSrc"]');
  const architectureImageWrap = fragment.querySelector('[data-field="architectureImage"]');
  const architectureImageTrigger = fragment.querySelector('[data-field="architectureImageTrigger"]');
  if (architectureImage && architectureImageSrc && architectureImageWrap) {
    architectureImageSrc.src = architectureImage.src;
    architectureImageSrc.alt = "";
  } else if (architectureImageWrap) {
    architectureImageWrap.remove();
  }

  const linksBlock = fragment.querySelector('[data-field="detailLinksBlock"]');
  const linksTitle = fragment.querySelector('[data-field="detailLinksTitle"]');
  const linksList = fragment.querySelector('[data-field="detailLinksList"]');
  const projectLinks = glance?.links;
  if (linksBlock && linksTitle && linksList) {
    const items = projectLinks?.items || [];
    if (!items.length) {
      linksBlock.remove();
    } else {
      linksList.innerHTML = "";
      if (projectLinks?.title) {
        linksTitle.textContent = projectLinks.title;
      }
      items.forEach((item) => {
        const link = document.createElement("a");
        link.className = "detail-link-chip";
        link.href = item.href;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.innerHTML = `
          <span class="detail-link-chip-icon">${getLinkIconSvg(item)}</span>
          <span>${escapeHtml(item.label)}</span>
        `;
        linksList.append(link);
      });
    }
  }

  const metricsRoot = fragment.querySelector('[data-field="impactMetrics"]');
  (detail.impact?.metrics || []).forEach((metric) => {
    const row = document.createElement("div");
    row.className = "impact-metric-card";
    row.innerHTML = `
      <strong>${escapeHtml(metric.value)}</strong>
      <span>${escapeHtml(metric.label)}</span>
    `;
    metricsRoot.append(row);
  });

  const impactItemsRoot = fragment.querySelector('[data-field="impactItems"]');
  (detail.impact?.items || []).forEach((item) => {
    const bullet = document.createElement("div");
    bullet.className = "impact-item";
    bullet.innerHTML = `<p>${escapeHtml(item.text)}</p>`;
    impactItemsRoot.append(bullet);
  });

  const stackBadgesRoot = fragment.querySelector('[data-field="stackBadges"]');
  (detail.stacks?.badges || []).forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "detail-stack-badge";
    chip.textContent = tag;
    stackBadgesRoot.append(chip);
  });

  const galleryRoot = fragment.querySelector('[data-field="galleryItems"]');
  const lightbox = fragment.querySelector('[data-field="galleryLightbox"]');
  const lightboxImage = fragment.querySelector('[data-field="galleryLightboxImage"]');
  const lightboxTitle = fragment.querySelector('[data-field="galleryLightboxTitle"]');
  const lightboxDescription = fragment.querySelector('[data-field="galleryLightboxDescription"]');
  const lightboxCopy = fragment.querySelector(".gallery-lightbox-copy");
  const lightboxClose = fragment.querySelector('[data-field="galleryLightboxClose"]');

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  };

  const openLightbox = (item) => {
    lightbox.hidden = false;
    lightboxImage.src = item.src;
    lightboxImage.alt = "";
    lightboxTitle.textContent = item.title || "";
    lightboxTitle.hidden = !item.title;
    lightboxDescription.textContent = item.description || "";
    lightboxDescription.hidden = !item.description;
    if (lightboxCopy) {
      lightboxCopy.hidden = !item.title && !item.description;
    }
    document.body.classList.add("lightbox-open");
  };

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  (detail.gallery?.items || []).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-card gallery-card-project";
    button.innerHTML = `<img src="${escapeHtml(item.src)}" alt="">`;
    button.addEventListener("click", () => openLightbox({ src: item.src }));
    galleryRoot.append(button);
  });

  if (architectureImage && architectureImageTrigger) {
    architectureImageTrigger.addEventListener("click", () =>
      openLightbox({
        src: architectureImage.src,
        alt: "",
        title: "",
        description: ""
      })
    );
  }

  projectRoot.replaceChildren(fragment);
  syncProjectSectionOrder(projectRoot);

  const mobileOrderQuery = window.matchMedia("(max-width: 720px)");
  const handleViewportChange = () => syncProjectSectionOrder(projectRoot);
  if (typeof mobileOrderQuery.addEventListener === "function") {
    mobileOrderQuery.addEventListener("change", handleViewportChange);
  } else if (typeof mobileOrderQuery.addListener === "function") {
    mobileOrderQuery.addListener(handleViewportChange);
  }

  trackProjectView(detail.title, slug, { page_type: "project_detail" });
  observeSectionViews(projectRoot.querySelectorAll("[data-analytics-section]"), {
    page_type: "project_detail",
    project_name: detail.title,
    project_slug: slug
  });
}

loadProjectPage();
