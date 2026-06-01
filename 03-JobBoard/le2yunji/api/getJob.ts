const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export async function fetchJobIds() {
  const res = await fetch(`${BASE_URL}/jobstories.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch job ids");
  }

  return res.json();
}

export async function fetchJobDetail(id: number) {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);

  if (!res.ok) {
    throw new Error(`Failed to fetch job ${id}`);
  }

  return res.json();
}
