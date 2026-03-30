const DATA_VERSION = "20260330-1";

async function fetchJson(path) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${path}${separator}v=${DATA_VERSION}`);

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
