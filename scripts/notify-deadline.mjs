import { readdirSync } from 'node:fs';

const ROOT = process.cwd();

function getLatestAssignmentFolder() {
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
  return assignments[0];
}

async function notifyDiscord(message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error('DISCORD_WEBHOOK_URL 환경변수가 설정되지 않았습니다.');
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord webhook 전송 실패: ${res.status} ${text}`);
  }
}

const latest = getLatestAssignmentFolder();
const message = `--- **${latest.number}. ${latest.name}** 마감됐습니다 ---`;

await notifyDiscord(message);
console.log(`알림 전송 완료: ${message}`);
