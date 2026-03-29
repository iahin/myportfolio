const projectRoot = document.querySelector("#project-app");
const projectTemplate = document.querySelector("#project-template");

async function loadProjectPage() {
  try {
    const response = await fetch("./data/site.json");

    if (!response.ok) {
      throw new Error(`Failed to load site data: ${response.status}`);
    }

    const data = await response.json();
    renderProjectPage(data);
  } catch (error) {
    renderProjectError(error);
  }
}

function renderProjectPage(data) {
  const fragment = projectTemplate.content.cloneNode(true);
  const detail = data.projectDetail;

  fragment.querySelector('[data-field="brandName"]').textContent = data.site.brand;
  fragment.querySelector('[data-field="brandNameFooter"]').textContent = data.site.brand;

  const avatar = fragment.querySelector('[data-field="avatarImage"]');
  avatar.src = detail.avatar.image;
  avatar.alt = detail.avatar.alt;

  const navRoot = fragment.querySelector('[data-field="navLinks"]');
  data.navigation.links.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href.startsWith("#") ? `./index.html${item.href}` : item.href;
    link.textContent = item.label;
    link.className = item.label === "Projects" ? "nav-link active" : "nav-link";
    navRoot.append(link);
  });

  setText(fragment, "detailKicker", detail.kicker);
  setText(fragment, "detailTitle", detail.title);
  setText(fragment, "detailSummary", detail.summary);
  setText(fragment, "detailRole", detail.role);
  setText(fragment, "detailYear", detail.year);
  bindLink(fragment.querySelector('[data-field="detailPrimary"]'), detail.primaryLink);
  bindLink(fragment.querySelector('[data-field="detailSecondary"]'), detail.secondaryLink);

  const heroImage = fragment.querySelector('[data-field="detailHeroImage"]');
  heroImage.src = detail.heroImage.src;
  heroImage.alt = detail.heroImage.alt;

  setText(fragment, "challengeTitle", detail.challenge.title);
  setText(fragment, "challengeText", detail.challenge.text);
  setText(fragment, "solutionTitle", detail.solution.title);
  setText(fragment, "solutionText", detail.solution.text);

  setText(fragment, "blueprintKicker", detail.blueprint.kicker);
  setText(fragment, "blueprintTitle", detail.blueprint.title);
  setText(fragment, "blueprintSummary", detail.blueprint.summary);

  const blueprintCardsRoot = fragment.querySelector('[data-field="blueprintCards"]');
  detail.blueprint.cards.forEach((card) => {
    const item = document.createElement("article");
    item.className = "blueprint-card";
    item.innerHTML = `
      <span class="blueprint-icon">${card.icon}</span>
      <span class="blueprint-label">${card.label}</span>
      <p>${card.value}</p>
    `;
    blueprintCardsRoot.append(item);
  });

  const blueprintTagsRoot = fragment.querySelector('[data-field="blueprintTags"]');
  detail.blueprint.tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "blueprint-tag";
    chip.textContent = tag;
    blueprintTagsRoot.append(chip);
  });

  const achievementsRoot = fragment.querySelector('[data-field="achievements"]');
  detail.achievements.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "achievement-item";
    row.innerHTML = `
      <span class="achievement-index">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <p class="achievement-title">${item.title}</p>
        <p class="achievement-text">${item.text}</p>
      </div>
    `;
    achievementsRoot.append(row);
  });

  setText(fragment, "architectureTitle", detail.architecture.title);
  setText(fragment, "architectureIntro", detail.architecture.intro);
  setText(fragment, "architectureCode", detail.architecture.code);
  setText(fragment, "architectureOutro", detail.architecture.outro);
  setText(fragment, "footerText", data.footer.text);

  const footerLinksRoot = fragment.querySelector('[data-field="footerLinks"]');
  data.footer.links.slice(0, 3).forEach((item) => {
    const link = document.createElement("a");
    link.className = "footer-link";
    link.href = item.href;
    link.textContent = item.label;
    footerLinksRoot.append(link);
  });

  projectRoot.replaceChildren(fragment);
}

function setText(fragment, field, value) {
  fragment.querySelector(`[data-field="${field}"]`).textContent = value;
}

function bindLink(element, data) {
  element.href = data.href;
  element.textContent = data.label;
}

function renderProjectError(error) {
  const message = document.createElement("section");
  message.className = "error-state";
  message.innerHTML = `
    <h2>Project data could not be loaded.</h2>
    <p>${error.message}</p>
  `;

  projectRoot.replaceChildren(message);
}

loadProjectPage();
