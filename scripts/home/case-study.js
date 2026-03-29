import { bindLink } from "../shared/dom.js";
import { navOrInternalHref } from "./navigation.js";

export function renderCaseStudy(fragment, data) {
  const detail = data.projectDetail;

  fragment.querySelector('[data-field="detailKicker"]').textContent = detail.kicker;
  fragment.querySelector('[data-field="detailTitle"]').textContent = detail.title;
  fragment.querySelector('[data-field="detailSummary"]').textContent = detail.summary;
  fragment.querySelector('[data-field="detailRole"]').textContent = detail.role;
  fragment.querySelector('[data-field="detailYear"]').textContent = detail.year;
  bindLink(fragment.querySelector('[data-field="detailPrimary"]'), detail.primaryLink, navOrInternalHref);
  bindLink(fragment.querySelector('[data-field="detailSecondary"]'), detail.secondaryLink, navOrInternalHref);

  const detailHeroImage = fragment.querySelector('[data-field="detailHeroImage"]');
  detailHeroImage.src = detail.heroImage.src;
  detailHeroImage.alt = detail.heroImage.alt;

  fragment.querySelector('[data-field="challengeTitle"]').textContent = detail.challenge.title;
  fragment.querySelector('[data-field="challengeText"]').textContent = detail.challenge.text;
  fragment.querySelector('[data-field="solutionTitle"]').textContent = detail.solution.title;
  fragment.querySelector('[data-field="solutionText"]').textContent = detail.solution.text;
  fragment.querySelector('[data-field="blueprintKicker"]').textContent = detail.blueprint.kicker;
  fragment.querySelector('[data-field="blueprintTitle"]').textContent = detail.blueprint.title;
  fragment.querySelector('[data-field="blueprintSummary"]').textContent = detail.blueprint.summary;

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
}
