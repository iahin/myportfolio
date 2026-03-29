export function renderResearch(fragment, data) {
  const research = data.researchOverview;
  if (!research) {
    return;
  }

  const title = fragment.querySelector('[data-field="researchTitle"]');
  if (title) title.textContent = research.title;

  const summary = fragment.querySelector('[data-field="researchSummary"]');
  if (summary) summary.textContent = research.summary;

  const itemsRoot = fragment.querySelector('[data-field="researchItems"]');
  if (!itemsRoot) {
    return;
  }

  itemsRoot.replaceChildren();

  research.items.forEach((item, index) => {
    const article = document.createElement("a");
    article.className = "research-item research-item-featured";
    article.href = item.href || "#";
    article.target = "_blank";
    article.rel = "noreferrer";
    article.innerHTML = `
      <div class="research-copy">
        <p class="research-meta">${item.publisher} · ${item.date}</p>
        <h3>${item.title}</h3>
        <div class="research-footer">
          <span class="research-accent">${item.authorship || item.publisher}</span>
          <span class="research-link">View</span>
        </div>
      </div>
    `;
    itemsRoot.append(article);
  });
}
