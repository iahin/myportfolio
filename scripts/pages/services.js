import { observeSectionViews, trackEvent } from "../shared/analytics.js";

const servicesRoot = document.querySelector("#services-app");
const servicesLinks = servicesRoot?.querySelectorAll('a[href^="mailto:"]') || [];

function initServicesPage() {
  servicesLinks.forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("services_cta_click", {
        page_type: "services",
        destination: link.href
      });
    });
  });

  trackEvent("services_page_view", { page_type: "services" });
  observeSectionViews(servicesRoot.querySelectorAll("[data-analytics-section]"), {
    page_type: "services"
  });
}

initServicesPage();
