import { fetchProjectDetailData, fetchSiteData } from "../shared/site-data.js";
import { renderError } from "../shared/dom.js";
import { observeSectionViews } from "../shared/analytics.js";
import { attachNavigationState, renderNavigation } from "./navigation.js";
import { renderHero } from "./hero.js";
import { renderProjects } from "./projects.js";
import { renderSkills } from "./skills.js";
import { renderExperience } from "./experience.js";
import { renderResearch } from "./research.js";

const contentRoot = document.querySelector("#app");
const template = document.querySelector("#portfolio-template");

async function loadPortfolio() {
  try {
    const [siteData, projectDetailData] = await Promise.all([
      fetchSiteData(),
      fetchProjectDetailData()
    ]);
    renderPortfolio(siteData, projectDetailData);
  } catch (error) {
    renderError(contentRoot, "Portfolio data could not be loaded.", error);
  }
}

function renderPortfolio(data, projectDetailData) {
  document.title = data.site.meta?.homeTitle || data.site.brand || "Portfolio";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      data.site.meta?.homeDescription || ""
    );
  }

  const fragment = template.content.cloneNode(true);

  renderNavigation(fragment, data);
  renderHero(fragment, data);
  renderProjects(fragment, data, projectDetailData);
  renderSkills(fragment, data);
  renderExperience(fragment, data);
  renderResearch(fragment, data);

  contentRoot.replaceChildren(fragment);
  attachNavigationState(contentRoot);
  observeSectionViews(contentRoot.querySelectorAll("section[id]"), { page_type: "home" });
}

loadPortfolio();
