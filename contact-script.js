const contactRoot = document.querySelector("#contact-app");
const contactTemplate = document.querySelector("#contact-template");

async function loadContactPage() {
  try {
    const response = await fetch("./data/site.json");

    if (!response.ok) {
      throw new Error(`Failed to load site data: ${response.status}`);
    }

    const data = await response.json();
    renderContactPage(data);
  } catch (error) {
    renderContactError(error);
  }
}

function renderContactPage(data) {
  const fragment = contactTemplate.content.cloneNode(true);
  const contact = data.contactPage;

  fragment.querySelector('[data-field="brandName"]').textContent = data.site.brand;
  fragment.querySelector('[data-field="brandNameFooter"]').textContent = data.site.brand;

  const avatar = fragment.querySelector('[data-field="avatarImage"]');
  avatar.src = contact.avatar.image;
  avatar.alt = contact.avatar.alt;

  const navRoot = fragment.querySelector('[data-field="navLinks"]');
  data.navigation.links.forEach((item) => {
    const link = document.createElement("a");
    let href = item.href;

    if (item.label === "Timeline") {
      href = "./experience.html";
    } else if (item.label === "Contact") {
      href = "./contact.html";
    } else if (item.href.startsWith("#")) {
      href = `./index.html${item.href}`;
    }

    link.href = href;
    link.textContent = item.label;
    link.className = item.label === "Contact" ? "nav-link active" : "nav-link";
    navRoot.append(link);
  });

  setText(fragment, "availabilityText", contact.availability);
  setText(fragment, "contactTitlePrefix", contact.titlePrefix);
  setText(fragment, "contactTitleAccent", contact.titleAccent);
  setText(fragment, "contactTitleSuffix", contact.titleSuffix);
  setText(fragment, "contactSummary", contact.summary);
  setText(fragment, "responseWindow", contact.response.window);
  setText(fragment, "responseUnit", contact.response.unit);
  setText(fragment, "responseText", contact.response.text);
  setText(fragment, "footerText", data.footer.text);

  const channelsRoot = fragment.querySelector('[data-field="contactChannels"]');
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
    channelsRoot.append(link);
  });

  const mapImage = fragment.querySelector('[data-field="mapImage"]');
  mapImage.src = contact.map.image;
  mapImage.alt = contact.map.alt;

  const footerLinksRoot = fragment.querySelector('[data-field="footerLinks"]');
  data.footer.links.slice(0, 3).forEach((item) => {
    const link = document.createElement("a");
    link.className = "footer-link";
    link.href = item.href;
    link.textContent = item.label;
    footerLinksRoot.append(link);
  });

  contactRoot.replaceChildren(fragment);
}

function setText(fragment, field, value) {
  fragment.querySelector(`[data-field="${field}"]`).textContent = value;
}

function renderContactError(error) {
  const message = document.createElement("section");
  message.className = "error-state";
  message.innerHTML = `
    <h2>Contact data could not be loaded.</h2>
    <p>${error.message}</p>
  `;

  contactRoot.replaceChildren(message);
}

loadContactPage();
