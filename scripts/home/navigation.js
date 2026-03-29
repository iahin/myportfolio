export function navHrefForHome(item) {
  return item.href;
}

export function projectLinkForHome(href) {
  return href;
}

export function navOrInternalHref(href) {
  return href;
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
      setActiveLink(links, href);
    });
  });

  const applyFromHash = () => {
    const hash = window.location.hash || "#top";
    setActiveLink(links, hash);
  };

  const updateFromScroll = () => {
    if (!sections.length) {
      return;
    }

    const navOffset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-offset")
    ) || 0;
    const referenceY = window.scrollY + navOffset + 24;
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentBottom = document.documentElement.scrollHeight;

    if (scrollBottom >= documentBottom - 24) {
      const lastSection = sections[sections.length - 1];
      if (lastSection?.id) {
        setActiveLink(links, `#${lastSection.id}`);
      }
      return;
    }

    let activeSection = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= referenceY) {
        activeSection = section;
      }
    });

    const lastSection = sections[sections.length - 1];
    if (
      lastSection &&
      scrollBottom >= lastSection.offsetTop + Math.min(lastSection.offsetHeight * 0.25, 160)
    ) {
      activeSection = lastSection;
    }

    if (pendingHref && Date.now() < pendingUntil) {
      const pendingSection = document.querySelector(pendingHref);
      if (pendingSection) {
        const pendingTop = pendingSection.offsetTop - navOffset;
        if (Math.abs(window.scrollY - pendingTop) > 20) {
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
  window.addEventListener("resize", updateFromScroll);
  applyFromHash();
  updateFromScroll();
}
