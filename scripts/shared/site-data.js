export async function fetchSiteData() {
  const response = await fetch("./data/site.json");

  if (!response.ok) {
    throw new Error(`Failed to load site data: ${response.status}`);
  }

  return response.json();
}
