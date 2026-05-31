export const getJobIds = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json",
  );
  if (!response.ok) {
    throw new Error(`Request getJobIds failed: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getJobDetails = async (id: number) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );
  if (!response.ok) {
    throw new Error(`Request getJobDetails failed: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
