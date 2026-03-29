export function renderFooter(fragment, data) {
  const footerContactSummary = fragment.querySelector('[data-field="contactSummary"]');
  if (footerContactSummary) footerContactSummary.textContent = data.contactPage.summary;

  const contactChannelsRoot = fragment.querySelector('[data-field="contactChannels"]');
  if (contactChannelsRoot) {
    data.contactPage.channels.forEach((channel) => {
      const link = document.createElement("a");
      link.className = "channel-link";
      link.href = channel.href;
      link.innerHTML = `
        <span class="channel-icon">${channel.icon}</span>
        <span class="channel-copy">
          <span class="channel-label">${channel.label}</span>
          <span class="channel-value">${channel.value}</span>
        </span>
      `;
      contactChannelsRoot.append(link);
    });
  }
}
