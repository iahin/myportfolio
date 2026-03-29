import { bindLink } from "../shared/dom.js";
import { navOrInternalHref } from "./navigation.js";

function iconForChannel(channel) {
  if (channel.label.toLowerCase().includes("github")) return "GH";
  if (channel.label.toLowerCase().includes("linkedin")) return "in";
  if (channel.href.startsWith("mailto:")) return "@";
  return channel.icon;
}

export function renderExperience(fragment, data) {
  const experience = data.experience;

  const experienceTitle = fragment.querySelector('[data-field="experienceTitle"]');
  if (experienceTitle) experienceTitle.textContent = experience.title;

  const experienceTitleMuted = fragment.querySelector('[data-field="experienceTitleMuted"]');
  if (experienceTitleMuted) experienceTitleMuted.textContent = experience.titleMuted;

  const experienceSummary = fragment.querySelector('[data-field="experienceSummary"]');
  if (experienceSummary) experienceSummary.textContent = experience.summary;

  const experienceCtaTitle = fragment.querySelector('[data-field="experienceCtaTitle"]');
  if (experienceCtaTitle) experienceCtaTitle.textContent = experience.cta.title;

  const experienceCtaSummary = fragment.querySelector('[data-field="experienceCtaSummary"]');
  if (experienceCtaSummary) experienceCtaSummary.textContent = experience.cta.summary;

  const contactChannelsRoot = fragment.querySelector('[data-field="experienceContactChannels"]');
  if (contactChannelsRoot) {
    contactChannelsRoot.replaceChildren();
    const emailChannel = data.contactPage.channels.find((channel) => channel.href.startsWith("mailto:"));
    const socialChannels = data.contactPage.channels.filter((channel) => !channel.href.startsWith("mailto:"));

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

    const points = entry.points
      .map((point) => `<li><span class="point-mark">${entry.marker}</span><span>${point}</span></li>`)
      .join("");

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
        <ul class="timeline-points">${points}</ul>
        <div class="timeline-tags ${index % 2 === 0 ? "" : "timeline-tags-end"}">${tags}</div>
      </div>
      <span class="timeline-node timeline-node-${entry.accent}" aria-hidden="true"></span>
    `;

    entriesRoot.append(article);
  });
}
