async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load data from ${path}: ${response.status}`);
  }

  return response.json();
}

export function fetchSiteData() {
  return fetchJson("./data/site.json");
}

export function fetchProjectDetailData() {
  return fetchJson("./data/project-detail.json");
}
