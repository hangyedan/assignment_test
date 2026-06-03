const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function JobStories() {
  const response = await fetch(`${BASE_URL}/jobstories.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

async function JobDetail(id: number) {
  const response = await fetch(`${BASE_URL}/item/${id}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

export { JobStories, JobDetail };
