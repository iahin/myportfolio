import { bindLink } from "../shared/dom.js";
import { navOrInternalHref } from "./navigation.js";

export function renderCta(fragment, data) {
  fragment.querySelector('[data-field="ctaTitle"]').textContent = data.cta.title;
  fragment.querySelector('[data-field="ctaSummary"]').textContent = data.cta.summary;
  bindLink(fragment.querySelector('[data-field="ctaPrimary"]'), data.cta.primary, navOrInternalHref);
  bindLink(fragment.querySelector('[data-field="ctaSecondary"]'), data.cta.secondary, navOrInternalHref);
}
