const experienceRoot = document.querySelector("#experience-app");
const experienceTemplate = document.querySelector("#experience-template");

async function loadExperiencePage() {
  try {
    const response = await fetch("./data/site.json");

    if (!response.ok) {
      throw new Error(`Failed to load site data: ${response.status}`);
    }

    const data = await response.json();
    renderExperiencePage(data);
  } catch (error) {
    renderExperienceError(error);
  }
}

function renderExperiencePage(data) {
  const fragment = experienceTemplate.content.cloneNode(true);
  const experience = data.experience;

  fragment.querySelector('[data-field="brandName"]').textContent = data.site.brand;
  fragment.querySelector('[data-field="brandNameFooter"]').textContent = data.site.brand;

  const avatar = fragment.querySelector('[data-field="avatarImage"]');
  avatar.src = experience.avatar.image;
  avatar.alt = experience.avatar.alt;

  const navRoot = fragment.querySelector('[data-field="navLinks"]');
  data.navigation.links.forEach((item) => {
    const link = document.createElement("a");
    let href = item.href;

    if (item.label === "Timeline") {
      href = "./experience.html";
    } else if (item.href.startsWith("#")) {
      href = `./index.html${item.href}`;
    }

    link.href = href;
    link.textContent = item.label;
    link.className = item.label === "Timeline" ? "nav-link active" : "nav-link";
    navRoot.append(link);
  });

  setText(fragment, "experienceKicker", experience.kicker);
  setText(fragment, "experienceTitle", experience.title);
  setText(fragment, "experienceTitleMuted", experience.titleMuted);
  setText(fragment, "experienceSummary", experience.summary);
  setText(fragment, "ctaTitle", experience.cta.title);
  setText(fragment, "ctaSummary", experience.cta.summary);
  bindLink(fragment.querySelector('[data-field="ctaPrimary"]'), experience.cta.primary);
  bindLink(fragment.querySelector('[data-field="ctaSecondary"]'), experience.cta.secondary);
  setText(fragment, "footerText", data.footer.text);

  const entriesRoot = fragment.querySelector('[data-field="timelineEntries"]');
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

  const footerLinksRoot = fragment.querySelector('[data-field="footerLinks"]');
  data.footer.links.slice(0, 3).forEach((item) => {
    const link = document.createElement("a");
    link.className = "footer-link";
    link.href = item.href;
    link.textContent = item.label;
    footerLinksRoot.append(link);
  });

  experienceRoot.replaceChildren(fragment);
}

function setText(fragment, field, value) {
  fragment.querySelector(`[data-field="${field}"]`).textContent = value;
}

function bindLink(element, data) {
  element.href = data.href;
  element.textContent = data.label;
}

function renderExperienceError(error) {
  const message = document.createElement("section");
  message.className = "error-state";
  message.innerHTML = `
    <h2>Experience data could not be loaded.</h2>
    <p>${error.message}</p>
  `;

  experienceRoot.replaceChildren(message);
}

loadExperiencePage();
