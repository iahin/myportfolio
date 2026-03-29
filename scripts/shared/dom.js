export function setText(root, field, value) {
  const element = root.querySelector(`[data-field="${field}"]`);
  if (element) {
    element.textContent = value;
  }
}

export function bindLink(element, data, hrefMapper = (href) => href) {
  if (!element || !data) {
    return;
  }

  element.href = hrefMapper(data.href);
  element.textContent = data.label;
}

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderError(root, title, error) {
  const message = document.createElement("section");
  message.className = "error-state";
  message.innerHTML = `
    <h2>${title}</h2>
    <p>${error.message}</p>
  `;

  root.replaceChildren(message);
}
