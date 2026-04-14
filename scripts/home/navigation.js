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
  const navShell = fragment.querySelector(".top-nav-inner");
  const navRoot = fragment.querySelector('[data-field="navLinks"]');
  if (!navShell || !navRoot) {
    return;
  }

  const titleWrap = document.createElement("div");
  titleWrap.className = "nav-mobile-summary";

  const currentTitle = document.createElement("span");
  currentTitle.className = "nav-current-title";
  titleWrap.append(currentTitle);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation menu");

  for (let index = 0; index < 3; index += 1) {
    const bar = document.createElement("span");
    bar.className = "nav-toggle-bar";
    toggle.append(bar);
  }

  navRoot.id = "site-nav-drawer";
  toggle.setAttribute("aria-controls", navRoot.id);
  navShell.insertBefore(titleWrap, navRoot);
  navShell.insertBefore(toggle, navRoot);

  data.navigation.links.forEach((item, index) => {
    const link = document.createElement("a");
    link.href = navHrefForHome(item);
    link.textContent = item.label;
    link.dataset.sectionHref = item.href;
    link.className = index === 0 ? "nav-link active" : "nav-link";
    navRoot.append(link);
  });

  currentTitle.textContent = data.navigation.links[0]?.label || "";
}

function setActiveLink(links, href, titleElement) {
  const activeLink =
    links.find((link) => link.dataset.sectionHref === href) ||
    links.find((link) => link.classList.contains("active")) ||
    links[0] ||
    null;

  links.forEach((link) => {
    link.classList.toggle("active", link === activeLink);
  });

  if (titleElement && activeLink) {
    titleElement.textContent = activeLink.textContent || "";
  }

  return activeLink;
}

export function attachNavigationState(root = document) {
  syncNavigationOffset(root);

  const nav = root.querySelector(".top-nav") || document.querySelector(".top-nav");
  const links = [...root.querySelectorAll(".nav-links .nav-link")];
  const titleElement = root.querySelector(".nav-current-title") || document.querySelector(".nav-current-title");
  const toggle = root.querySelector(".nav-toggle") || document.querySelector(".nav-toggle");
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  if (!nav || !links.length) {
    return;
  }

  const sectionLinks = links.filter((link) => link.dataset.sectionHref?.startsWith("#"));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.dataset.sectionHref))
    .filter(Boolean);
  let pendingHref = null;
  let pendingUntil = 0;
  let drawerOpen = false;

  const setDrawerOpen = (nextOpen) => {
    drawerOpen = Boolean(nextOpen) && mobileQuery.matches;
    nav.classList.toggle("is-drawer-open", drawerOpen);
    document.body.classList.toggle("nav-drawer-open", drawerOpen);

    if (toggle) {
      toggle.setAttribute("aria-expanded", drawerOpen ? "true" : "false");
      toggle.setAttribute("aria-label", drawerOpen ? "Close navigation menu" : "Open navigation menu");
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

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
          setActiveLink(links, href, titleElement);
          requestAnimationFrame(() => setActiveLink(links, href, titleElement));
          closeDrawer();

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
      setActiveLink(links, href, titleElement);
      closeDrawer();
    });
  });

  toggle?.addEventListener("click", () => {
    setDrawerOpen(!drawerOpen);
  });

  const applyFromHash = () => {
    const hash = window.location.hash || "#top";
    setActiveLink(links, hash, titleElement);
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
        setActiveLink(links, `#${lastSection.id}`, titleElement);
      }
      return;
    }

    let activeSection = findActiveSection(sections, navOffset) || sections[0];

    if (pendingHref && Date.now() < pendingUntil) {
      const pendingSection = document.querySelector(pendingHref);
      if (pendingSection) {
        const pendingRect = pendingSection.getBoundingClientRect();
        if (pendingRect.top > navOffset + 12 || pendingRect.bottom <= navOffset + 12) {
          setActiveLink(links, pendingHref, titleElement);
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
      setActiveLink(links, `#${activeSection.id}`, titleElement);
    }
  };

  window.addEventListener("hashchange", applyFromHash);
  window.addEventListener("scroll", updateFromScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (!mobileQuery.matches) {
      closeDrawer();
    }
    syncNavigationOffset(root);
    updateFromScroll();
  });

  mobileQuery.addEventListener?.("change", () => {
    if (!mobileQuery.matches) {
      closeDrawer();
    }
    syncNavigationOffset(root);
    updateFromScroll();
  });

  document.addEventListener("click", (event) => {
    if (!drawerOpen || !mobileQuery.matches) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node) || nav.contains(target)) {
      return;
    }

    closeDrawer();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
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
