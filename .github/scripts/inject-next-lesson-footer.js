const fs = require('fs');
const path = require('path');

const lessons = fs.readFileSync('topics/lesson_order.txt', 'utf-8')
  .split(/\r?\n/)
  .filter(Boolean);

lessons.forEach((filename, index) => {
  const filePath = path.join('out', filename.replace('.dita', '.html'));
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf-8');

  const nextLesson = lessons[index + 1];
  const prevLesson = index > 0 ? lessons[index - 1] : null;

  let buttons = `<div class="lesson-nav">`;

  if (prevLesson) {
    const prevHref = prevLesson.replace('.dita', '.html');
    buttons += `<a href="${prevHref}" class="nav-button prev">Previous page</a>`;
  }

  if (nextLesson) {
    const nextHref = nextLesson.replace('.dita', '.html');
    const label = index === 0 ? 'Start' : 'Next page';
    buttons += `<a href="${nextHref}" class="nav-button next">${label}</a>`;
  }

  buttons += `</div>`;

  // Inject before </main>
  html = html.replace('</main>', `${buttons}\n</main>`);
  fs.writeFileSync(filePath, html);
});
