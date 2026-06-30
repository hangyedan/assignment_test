import { readdirSync } from 'node:fs';

const ROOT = process.cwd();
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CHANNEL_ID = process.env.SUBMISSION_FORUM_CHANNEL_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

function getLatestAssignmentNumber() {
  const entries = readdirSync(ROOT, { withFileTypes: true });
  const pattern = /^(\d+)-(.+)$/;

  const assignments = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .map((name) => {
      const match = name.match(pattern);
      if (!match) return null;
      return { number: parseInt(match[1], 10), name: match[2] };
    })
    .filter(Boolean);

  if (assignments.length === 0) {
    throw new Error('숫자-과제명 형태의 폴더를 찾을 수 없습니다.');
  }

  assignments.sort((a, b) => b.number - a.number);
  return assignments[0].number;
}

async function discordFetch(path, options = {}) {
  const res = await fetch(`https://discord.com/api/v10${path}`, {
    ...options,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord API 오류 (${res.status}): ${text}`);
  }

  return res.json();
}

async function findActiveThread(number) {
  // 서버 전체의 활성 스레드 목록을 가져옴
  const data = await discordFetch(`/guilds/${GUILD_ID}/threads/active`);

  // 그중 "코드제출" 채널 소속이면서 [진행중] + No.{number} 가 제목에 포함된 것만 필터
  const target = data.threads.find(
    (thread) =>
      thread.parent_id === CHANNEL_ID &&
      thread.name.includes('[진행중]') &&
      thread.name.includes(`No.${number}`),
  );

  if (!target) {
    throw new Error(
      `No.${number} 에 해당하는 [진행중] 포스트를 찾지 못했습니다.`,
    );
  }

  return target;
}

async function closeThread(thread) {
  const newName = thread.name.replace('[진행중]', '[마감]');
  await discordFetch(`/channels/${thread.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: newName }),
  });
  console.log(`제목 변경 완료: "${thread.name}" → "${newName}"`);
}

const number = getLatestAssignmentNumber();
const thread = await findActiveThread(number);
await closeThread(thread);
