export function renderContact(fragment, data) {
  const contact = data.contactPage;

  const availabilityText = fragment.querySelector('[data-field="availabilityText"]');
  if (availabilityText) availabilityText.textContent = contact.availability;

  const contactTitlePrefix = fragment.querySelector('[data-field="contactTitlePrefix"]');
  if (contactTitlePrefix) contactTitlePrefix.textContent = contact.titlePrefix;

  const contactTitleAccent = fragment.querySelector('[data-field="contactTitleAccent"]');
  if (contactTitleAccent) contactTitleAccent.textContent = contact.titleAccent;

  const contactTitleSuffix = fragment.querySelector('[data-field="contactTitleSuffix"]');
  if (contactTitleSuffix) contactTitleSuffix.textContent = contact.titleSuffix;

  const contactSummary = fragment.querySelector('[data-field="contactSummary"]');
  if (contactSummary) contactSummary.textContent = contact.summary;

  const responseWindow = fragment.querySelector('[data-field="responseWindow"]');
  if (responseWindow) responseWindow.textContent = contact.response.window;

  const responseUnit = fragment.querySelector('[data-field="responseUnit"]');
  if (responseUnit) responseUnit.textContent = contact.response.unit;

  const responseText = fragment.querySelector('[data-field="responseText"]');
  if (responseText) responseText.textContent = contact.response.text;

  const contactChannelsRoot = fragment.querySelector('[data-field="contactChannels"]');
  if (contactChannelsRoot) {
    contact.channels.forEach((channel) => {
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

  const mapImage = fragment.querySelector('[data-field="mapImage"]');
  if (mapImage) {
    mapImage.src = contact.map.image;
    mapImage.alt = contact.map.alt;
  }
}
