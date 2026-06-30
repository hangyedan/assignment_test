import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const QUESTION_URL = process.env.QUESTION_URL;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL_ASSIGNMENT;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const SUBMISSION_FORUM_CHANNEL_ID = process.env.SUBMISSION_FORUM_CHANNEL_ID;

// ---------- 1. 폴더 번호 + 이름 계산 ----------

function getNextAssignmentNumber() {
  const entries = readdirSync(ROOT, { withFileTypes: true });
  const pattern = /^(\d+)-/;
  const numbers = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name.match(pattern))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));

  if (numbers.length === 0) return '01';
  const next = Math.max(...numbers) + 1;
  return String(next).padStart(2, '0');
}

function slugToPascalCase(slug) {
  // image-carousel -> ImageCarousel
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function parseQuestionUrl(url) {
  // https://www.greatfrontend.com/questions/user-interface/image-carousel?...
  const u = new URL(url);
  const parts = u.pathname.split('/').filter(Boolean); // ['questions', 'user-interface', 'image-carousel']
  const slug = parts[parts.length - 1];
  const cleanUrl = `${u.origin}${u.pathname}`;
  return { slug, cleanUrl };
}

// ---------- 2. 문제 페이지에서 본문 가져오기 ----------

function extractProseHtml(html) {
  const startMarker =
    '<div class="prose dark:prose-invert prose-sm break-words">';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) {
    throw new Error(
      '본문 영역(prose div)을 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.',
    );
  }

  // 중첩된 <div>들 때문에 정규식으로는 끝을 못 찾으므로, 직접 태그 개수를 세서 짝이 맞는 닫는 div를 찾는다
  let cursor = startIdx + startMarker.length;
  let depth = 1; // 이미 연 div 하나
  const tagPattern = /<div[^>]*>|<\/div>/g;
  tagPattern.lastIndex = cursor;

  let match;
  while ((match = tagPattern.exec(html)) !== null) {
    if (match[0].startsWith('</div')) {
      depth -= 1;
    } else {
      depth += 1;
    }
    if (depth === 0) {
      return html.slice(cursor, match.index);
    }
  }

  throw new Error('prose div의 닫는 태그를 찾지 못했습니다.');
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function htmlToMarkdown(html) {
  let result = html;

  // 닫는 태그 뒤에 공백 하나 보장 (단어 붙음 방지)
  result = result.replace(/(<\/(p|li|h2|h3|div)>)/g, '$1 ');

  // 링크: <a href="URL">텍스트</a> -> [텍스트](URL)
  result = result.replace(
    /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gs,
    '[$2]($1)',
  );

  // 헤딩
  result = result.replace(/<h2[^>]*>(.*?)<\/h2>/gs, '\n## $1\n');
  result = result.replace(/<h3[^>]*>(.*?)<\/h3>/gs, '\n### $1\n');

  // 강조
  result = result.replace(/<strong[^>]*>(.*?)<\/strong>/gs, '**$1**');
  result = result.replace(/<em[^>]*>(.*?)<\/em>/gs, '*$1*');

  // 리스트 아이템 (중첩 리스트는 들여쓰기 없이 전부 - 처리, 필요시 추후 보강)
  result = result.replace(/<li[^>]*>(.*?)<\/li>/gs, '- $1\n');
  result = result.replace(/<\/?ul[^>]*>/g, '');
  result = result.replace(/<\/?ol[^>]*>/g, '');

  // 문단
  result = result.replace(/<p[^>]*>(.*?)<\/p>/gs, '$1\n\n');

  // 남은 태그 전부 제거
  result = result.replace(/<[^>]+>/g, '');

  // HTML 엔티티 디코딩 + 빈 줄 정리
  result = decodeHtmlEntities(result);
  result = result.replace(/\n{3,}/g, '\n\n');

  // 각 줄 끝 공백 제거 + 빈 줄(공백만 있는 줄) 정리
  result = result
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');

  return result.trim();
}

async function fetchQuestionMarkdown(cleanUrl) {
  const res = await fetch(`${cleanUrl}?tab=coding`);
  if (!res.ok) throw new Error(`fetch 실패: ${res.status}`);
  const html = await res.text();

  const proseHtml = extractProseHtml(html);
  return htmlToMarkdown(proseHtml);
}
// ---------- 3. DeepL 번역 (헤딩과 본문 분리 번역) ----------

async function translateText(text) {
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
      target_lang: 'KO',
      preserve_formatting: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepL 번역 실패 (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.translations[0].text;
}

async function translateMarkdownBlock(markdown) {
  // ## 헤딩 줄과 본문을 분리해서 헤딩은 짧게, 본문은 통으로 번역
  const lines = markdown.split('\n');
  const translatedLines = [];
  let bodyBuffer = [];

  async function flushBody() {
    if (bodyBuffer.length === 0) return;
    const joined = bodyBuffer.join('\n');
    const translated = await translateText(joined);
    translatedLines.push(translated);
    bodyBuffer = [];
  }

  for (const line of lines) {
    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      await flushBody();
      const [, hashes, headingText] = headingMatch;
      const translatedHeading = await translateText(headingText);
      translatedLines.push(`${hashes} ${translatedHeading}`);
    } else {
      bodyBuffer.push(line);
    }
  }
  await flushBody();

  return translatedLines.join('\n');
}

// ---------- 4. README 생성 ----------

function buildReadme({ number, name, url, translatedBody }) {
  return `# No ${parseInt(number, 10)}. ${name}

## 문제 링크

- [GreatFrontEnd - ${name}](${url})

<br />

## 문제 설명

${translatedBody}

<br />

## 기본 제공 코드

(사이트 코드 에디터에서 직접 확인해주세요)
`;
}

// ---------- 5. Discord 알림들 ----------

function getNextMonday() {
  const now = new Date();
  const day = now.getDay(); // 0=일,1=월,...
  let daysUntilNextMonday = (1 - day + 7) % 7;
  if (daysUntilNextMonday === 0) daysUntilNextMonday = 7; // 오늘이 월요일이면 다음주 월요일
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilNextMonday);
  return next;
}

function formatDateKorean(date) {
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}. ${mm}. ${dd}. (월)`;
}

async function notifyAssignmentChannel({ number, name, url }) {
  const nextMonday = formatDateKorean(getNextMonday());
  const message = `@everyone 다음 과제 안내 드립니다🤗

No.${parseInt(number, 10)} ${name}
리뷰 일자: ${nextMonday} 오후 8시
제출 기한: ${nextMonday} 오후 3시까지(스터디 시작 5시간 전)


🔗 과제 링크
${url}`;

  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message }),
  });

  if (!res.ok) {
    throw new Error(`과제선정 채널 알림 실패: ${res.status}`);
  }
}

async function createSubmissionForumPost({ number, name }) {
  const res = await fetch(
    `https://discord.com/api/v10/channels/${SUBMISSION_FORUM_CHANNEL_ID}/threads`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `[진행중] No.${parseInt(number, 10)} ${name} 코드 제출`,
        message: {
          content: `아래 깃허브 레포지토리 링크를 통해 PR 제출 \n https://github.com/hangyedan/assignment_test/tree/main/`,
        },
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `코드제출 포럼 포스트 생성 실패 (${res.status}): ${errText}`,
    );
  }
}

// ---------- 메인 실행 ----------

const { slug, cleanUrl } = parseQuestionUrl(QUESTION_URL);
const number = getNextAssignmentNumber();
const name = slugToPascalCase(slug);

console.log(`다음 과제: No.${number} ${name}`);

const originalMarkdown = await fetchQuestionMarkdown(cleanUrl);
const translatedBody = await translateMarkdownBlock(originalMarkdown);

const folderName = `${number}-${name}`;
mkdirSync(join(ROOT, folderName), { recursive: true });
writeFileSync(
  join(ROOT, folderName, 'README.md'),
  buildReadme({ number, name, url: QUESTION_URL, translatedBody }),
);

console.log(`README 생성 완료: ${folderName}/README.md`);

await notifyAssignmentChannel({ number, name, url: QUESTION_URL });
console.log('과제선정 채널 알림 완료');

await createSubmissionForumPost({ number, name });
console.log('코드제출 포럼 포스트 생성 완료');
