import { trackSectionClick } from "../shared/analytics.js";

export function navHrefForHome(item) {
  return item.href;
}

export function projectLinkForHome(href) {
  return href;
}

export function navOrInternalHref(href) {
  return href;
}

function syncNavigationOffset(root = document) {
  const nav = root.querySelector(".top-nav") || document.querySelector(".top-nav");
  if (!nav) {
    return;
  }

  const navHeight = Math.ceil(nav.getBoundingClientRect().height);
  const navOffset = Math.max(navHeight + 8, 60);
  document.documentElement.style.setProperty("--nav-offset", `${navOffset}px`);
}

export function renderNavigation(fragment, data) {
  const navRoot = fragment.querySelector('[data-field="navLinks"]');
  data.navigation.links.forEach((item, index) => {
    const link = document.createElement("a");
    link.href = navHrefForHome(item);
    link.textContent = item.label;
    link.dataset.sectionHref = item.href;
    link.className = index === 0 ? "nav-link active" : "nav-link";
    navRoot.append(link);
  });
}

function setActiveLink(links, href) {
  links.forEach((link) => {
    link.classList.toggle("active", link.dataset.sectionHref === href);
  });
}

export function attachNavigationState(root = document) {
  syncNavigationOffset(root);

  const links = [...root.querySelectorAll(".nav-links .nav-link")];
  if (!links.length) {
    return;
  }

  const sectionLinks = links.filter((link) => link.dataset.sectionHref?.startsWith("#"));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.dataset.sectionHref))
    .filter(Boolean);
  let pendingHref = null;
  let pendingUntil = 0;

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.dataset.sectionHref || link.getAttribute("href");
      if (href?.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          trackSectionClick(link.textContent || href, {
            page_type: "home",
            destination_section: href.replace(/^#/, "")
          });
          pendingHref = href;
          pendingUntil = Date.now() + 1200;
          setActiveLink(links, href);
          requestAnimationFrame(() => setActiveLink(links, href));

          const navOffset = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--nav-offset")
          ) || 0;
          const top = Math.max(0, target.offsetTop - navOffset + 2);
          window.scrollTo({ top, behavior: "smooth" });
          window.history.replaceState(null, "", href);
          return;
        }
      }
      if (href) {
        trackSectionClick(link.textContent || href, {
          page_type: "home",
          destination_section: href.replace(/^#/, "")
        });
      }
      setActiveLink(links, href);
    });
  });

  const applyFromHash = () => {
    const hash = window.location.hash || "#top";
    setActiveLink(links, hash);
  };

  const findActiveSection = (sections, navOffset) => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const anchorY = Math.min(navOffset + Math.max(viewportHeight * 0.28, 96), viewportHeight - 48);
    const sectionMetrics = sections.map((section) => {
      const rect = section.getBoundingClientRect();
      return {
        section,
        top: rect.top,
        bottom: rect.bottom
      };
    });

    const containingSection = sectionMetrics.find(({ top, bottom }) => top <= anchorY && bottom > anchorY);
    if (containingSection) {
      return containingSection.section;
    }

    const passedSections = sectionMetrics.filter(({ top }) => top <= anchorY);
    if (passedSections.length) {
      return passedSections[passedSections.length - 1].section;
    }

    return sectionMetrics[0]?.section || null;
  };

  const updateFromScroll = () => {
    if (!sections.length) {
      return;
    }

    const navOffset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-offset")
    ) || 0;
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentBottom = document.documentElement.scrollHeight;

    if (scrollBottom >= documentBottom - 24) {
      const lastSection = sections[sections.length - 1];
      if (lastSection?.id) {
        setActiveLink(links, `#${lastSection.id}`);
      }
      return;
    }

    let activeSection = findActiveSection(sections, navOffset) || sections[0];

    if (pendingHref && Date.now() < pendingUntil) {
      const pendingSection = document.querySelector(pendingHref);
      if (pendingSection) {
        const pendingRect = pendingSection.getBoundingClientRect();
        if (pendingRect.top > navOffset + 12 || pendingRect.bottom <= navOffset + 12) {
          setActiveLink(links, pendingHref);
          return;
        }
      }
      pendingHref = null;
      pendingUntil = 0;
    } else if (pendingHref) {
      pendingHref = null;
      pendingUntil = 0;
    }

    if (activeSection?.id) {
      setActiveLink(links, `#${activeSection.id}`);
    }
  };

  window.addEventListener("hashchange", applyFromHash);
  window.addEventListener("scroll", updateFromScroll, { passive: true });
  window.addEventListener("resize", () => {
    syncNavigationOffset(root);
    updateFromScroll();
  });

  document.fonts?.ready
    ?.then(() => {
      syncNavigationOffset(root);
      updateFromScroll();
    })
    .catch(() => {});

  applyFromHash();
  updateFromScroll();
}
