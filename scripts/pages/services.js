import { observeSectionViews, trackEvent } from "../shared/analytics.js";

const servicesRoot = document.querySelector("#services-app");
const servicesLinks = servicesRoot?.querySelectorAll("a") || [];

function initServicesPage() {
  servicesLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const action = link.dataset.analyticsAction || "services_link_click";
      const packageName = link.dataset.packageName || null;
      const href = link.getAttribute("href") || "";
      const isEmail = href.startsWith("mailto:");

      trackEvent(isEmail ? "services_cta_click" : "services_navigation_click", {
        page_type: "services",
        action,
        destination: link.href,
        package_name: packageName || undefined
      });
    });
  });

  trackEvent("services_page_view", { page_type: "services" });
  observeSectionViews(servicesRoot.querySelectorAll("[data-analytics-section]"), {
    page_type: "services"
  });
}

initServicesPage();
