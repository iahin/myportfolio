const viewedSections = new Set();

function normalizeName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackSectionClick(sectionName, extraParams = {}) {
  if (!sectionName) {
    return;
  }

  trackEvent("section_click", {
    section_name: sectionName,
    section_id: normalizeName(sectionName),
    ...extraParams
  });
}

export function trackProjectClick(projectName, projectSlug, extraParams = {}) {
  trackEvent("project_click", {
    project_name: projectName || projectSlug || "unknown_project",
    project_slug: projectSlug || normalizeName(projectName) || "unknown_project",
    ...extraParams
  });
}

export function trackProjectView(projectName, projectSlug, extraParams = {}) {
  trackEvent("project_view", {
    project_name: projectName || projectSlug || "unknown_project",
    project_slug: projectSlug || normalizeName(projectName) || "unknown_project",
    ...extraParams
  });
}

export function observeSectionViews(elements, extraParams = {}) {
  const sectionElements = [...elements].filter(Boolean);
  if (!sectionElements.length || typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) {
          return;
        }

        const element = entry.target;
        const sectionName =
          element.dataset.analyticsSection ||
          element.getAttribute("data-analytics-section") ||
          element.id;

        if (!sectionName) {
          return;
        }

        const sectionId = normalizeName(sectionName);
        const key = `${window.location.pathname}:${sectionId}`;
        if (viewedSections.has(key)) {
          observer.unobserve(element);
          return;
        }

        viewedSections.add(key);
        trackEvent("section_view", {
          section_name: sectionName,
          section_id: sectionId,
          ...extraParams
        });
        observer.unobserve(element);
      });
    },
    {
      threshold: [0.45]
    }
  );

  sectionElements.forEach((element) => observer.observe(element));
}
