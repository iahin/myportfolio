import { bindLink } from "../shared/dom.js";
import { navOrInternalHref } from "./navigation.js";

function iconForChannel(channel) {
  if (channel.icon === "CODE") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.33 9.33 0 0 1 12 6.83c.85 0 1.71.12 2.51.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.41.2 2.46.1 2.72.64.73 1.03 1.65 1.03 2.78 0 3.97-2.34 4.83-4.57 5.09.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"/>
      </svg>
    `;
  }

  if (channel.icon === "LINK") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.6 9.75h2.67V18H5.6V9.75Zm4.34 0H12.5v1.13h.04c.35-.67 1.2-1.38 2.48-1.38 2.65 0 3.14 1.8 3.14 4.13V18H15.5v-3.9c0-.93-.02-2.13-1.26-2.13-1.27 0-1.47 1.02-1.47 2.06V18H9.94V9.75Z"/>
      </svg>
    `;
  }

  if (channel.icon === "MAIL") return "@";
  return channel.icon;
}

export function renderExperience(fragment, data) {
  const experience = data.experience;
  const contactPage = data.contactPage;

  const experienceTitle = fragment.querySelector('[data-field="experienceTitle"]');
  if (experienceTitle) experienceTitle.textContent = experience.title;

  const experienceSummary = fragment.querySelector('[data-field="experienceSummary"]');
  if (experienceSummary) experienceSummary.textContent = experience.summary;

  const experienceCtaTitle = fragment.querySelector('[data-field="experienceCtaTitle"]');
  if (experienceCtaTitle) experienceCtaTitle.textContent = contactPage.cta.title;

  const experienceCtaSummary = fragment.querySelector('[data-field="experienceCtaSummary"]');
  if (experienceCtaSummary) experienceCtaSummary.textContent = contactPage.cta.summary;

  const contactChannelsRoot = fragment.querySelector('[data-field="experienceContactChannels"]');
  if (contactChannelsRoot) {
    contactChannelsRoot.replaceChildren();
    const emailChannel = contactPage.channels.find((channel) => channel.icon === "MAIL");
    const socialChannels = contactPage.channels.filter((channel) => channel.icon !== "MAIL");

    if (emailChannel) {
      const emailButton = document.createElement("a");
      emailButton.className = "timeline-contact-button";
      emailButton.href = navOrInternalHref(emailChannel.href);
      emailButton.innerHTML = `
        <span class="timeline-contact-icon">${iconForChannel(emailChannel)}</span>
        <span>Email Me</span>
      `;
      contactChannelsRoot.append(emailButton);
    }

    socialChannels.forEach((channel) => {
      const link = document.createElement("a");
      link.className = "timeline-contact-icon-link";
      link.href = navOrInternalHref(channel.href);
      link.setAttribute("aria-label", channel.label);
      link.innerHTML = `<span class="timeline-contact-icon">${iconForChannel(channel)}</span>`;
      contactChannelsRoot.append(link);
    });
  }

  const entriesRoot = fragment.querySelector('[data-field="timelineEntries"]');
  if (!entriesRoot) {
    return;
  }

  experience.entries.forEach((entry, index) => {
    const article = document.createElement("article");
    article.className = index % 2 === 0 ? "timeline-entry" : "timeline-entry timeline-entry-reverse";

    const tags = entry.tags
      .map((tag) => `<span class="timeline-tag">${tag}</span>`)
      .join("");

    article.innerHTML = `
      <div class="timeline-heading">
        <span class="timeline-period timeline-period-${entry.accent}">${entry.period}</span>
        <h3>${entry.role}</h3>
        <p class="timeline-company">${entry.company}</p>
      </div>
      <div class="timeline-card">
        <p class="timeline-entry-summary">${entry.summary || ""}</p>
        <div class="timeline-tags ${index % 2 === 0 ? "" : "timeline-tags-end"}">${tags}</div>
      </div>
      <span class="timeline-node timeline-node-${entry.accent}" aria-hidden="true"></span>
    `;

    entriesRoot.append(article);
  });
}
