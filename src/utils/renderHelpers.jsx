import React from 'react';
import { Lightbulb, Terminal, FileImage } from 'lucide-react';
import PythonHighlighter from './pythonHighlighter';

// ───────────────────────── Заголовки / якоря ─────────────────────────
// Детерминированный id из текста заголовка (одинаковый и для якоря, и для TOC).
export const slugifyHeading = (raw) =>
  'sec-' + (
    String(raw).replace(/[*`]/g, '').trim().toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );

// Достаём заголовки (##, ###, ####) из markdown, пропуская код-блоки ```...```
export const extractHeadings = (text) => {
  if (!text) return [];
  const out = [];
  let inFence = false;
  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (line.trimStart().startsWith('```')) { inFence = !inFence; continue; }
    if (inFence) continue;
    let level = 0, txt = null;
    if (line.startsWith('#### ')) { level = 4; txt = line.slice(5); }
    else if (line.startsWith('### ')) { level = 3; txt = line.slice(4); }
    else if (line.startsWith('## ')) { level = 2; txt = line.slice(3); }
    if (txt != null) {
      out.push({ level, id: slugifyHeading(txt), text: txt.replace(/[*`]/g, '').trim() });
    }
  }
  return out;
};

// ───────────────────────── INLINE parser ─────────────────────────
export const renderInline = (text, baseKey = 'i') => {
  if (!text) return null;

  const out = [];
  let i = 0;
  let plainStart = 0;
  let nodeIdx = 0;

  const flushPlain = (end) => {
    if (end > plainStart) out.push(text.slice(plainStart, end));
  };

  while (i < text.length) {
    // **bold**
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        flushPlain(i);
        out.push(
          <strong key={`${baseKey}-${nodeIdx++}`} className="text-white font-semibold">
            {text.slice(i + 2, end)}
          </strong>
        );
        i = end + 2;
        plainStart = i;
        continue;
      }
    }
    // `code`
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1);
      if (end !== -1) {
        flushPlain(i);
        out.push(
          <code key={`${baseKey}-${nodeIdx++}`} className="bg-slate-800/70 text-violet-300 px-1.5 py-0.5 rounded font-mono text-[0.85em]">
            {text.slice(i + 1, end)}
          </code>
        );
        i = end + 1;
        plainStart = i;
        continue;
      }
    }
    // [text](url) — ссылка
    if (text[i] === '[') {
      const closeBracket = text.indexOf(']', i + 1);
      if (closeBracket !== -1 && text[closeBracket + 1] === '(') {
        const closeParen = text.indexOf(')', closeBracket + 2);
        if (closeParen !== -1) {
          flushPlain(i);
          const linkText = text.slice(i + 1, closeBracket);
          const linkHref = text.slice(closeBracket + 2, closeParen);
          const isFile = /\.(txt|xls|xlsx|csv|zip|pdf|docx)$/i.test(linkHref);
          out.push(
            <a
              key={`${baseKey}-${nodeIdx++}`}
              href={linkHref}
              download={isFile ? true : undefined}
              target={isFile ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
            >
              {linkText}
            </a>
          );
          i = closeParen + 1;
          plainStart = i;
          continue;
        }
      }
    }
    // $math$ (минимальная поддержка — рендерим курсивом)
    if (text[i] === '$') {
      const end = text.indexOf('$', i + 1);
      if (end !== -1 && end !== i + 1) {
        flushPlain(i);
        out.push(
          <span key={`${baseKey}-${nodeIdx++}`} className="font-serif italic text-amber-300">
            {text.slice(i + 1, end)}
          </span>
        );
        i = end + 1;
        plainStart = i;
        continue;
      }
    }
    i++;
  }
  flushPlain(text.length);
  return out;
};

// ───────────────────────── BLOCK-уровневый markdown ─────────────────────────
export const parseMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-3 space-y-1.5 pl-1">
          {listBuffer}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.replace(/\r$/, '');
    const trimmed = line.trim();

    if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={idx} id={slugifyHeading(line.slice(5))} className="scroll-mt-4 text-base font-semibold text-cyan-300 mt-5 mb-2 uppercase tracking-wide">
          {renderInline(line.slice(5), `h4-${idx}`)}
        </h4>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} id={slugifyHeading(line.slice(4))} className="scroll-mt-4 text-xl font-bold text-white mt-6 mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Lightbulb className="text-amber-400 w-5 h-5 shrink-0" />
          <span>{renderInline(line.slice(4), `h3-${idx}`)}</span>
        </h3>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={idx} id={slugifyHeading(line.slice(3))} className="scroll-mt-4 text-2xl font-bold text-white mt-6 mb-3">
          {renderInline(line.slice(3), `h2-${idx}`)}
        </h2>
      );
    } else if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={idx} className="border-l-4 border-violet-500 bg-violet-500/5 pl-4 pr-3 py-2 my-3 italic text-slate-300 rounded-r">
          {renderInline(trimmed.slice(2), `bq-${idx}`)}
        </blockquote>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuffer.push(
        <li key={idx} className="ml-5 list-disc text-slate-300 leading-relaxed marker:text-violet-400">
          {renderInline(trimmed.slice(2), `li-${idx}`)}
        </li>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const m = trimmed.match(/^(\d+)\.\s(.*)/);
      // Номер берём явно из текста (m[1]), а не из CSS-счётчика — иначе при
      // картинках между пунктами список разбивается и нумерация сбрасывается на 1.
      listBuffer.push(
        <li key={idx} className="ml-5 flex gap-2 text-slate-300 leading-relaxed">
          <span className="font-bold text-violet-400 shrink-0">{m[1]}.</span>
          <span>{renderInline(m[2], `oli-${idx}`)}</span>
        </li>
      );
    } else if (/^!\[.*?\]\(.+?\)$/.test(trimmed)) {
      flushList();
      const m = trimmed.match(/^!\[(.*?)\]\((.+?)\)$/);
      elements.push(
        <figure key={idx} className="my-5 flex flex-col items-center gap-2">
          <img
            src={m[2]}
            alt={m[1]}
            className="rounded-xl border border-slate-700 max-w-full max-h-[420px] shadow-lg"
          />
          {m[1] && <figcaption className="text-xs text-slate-500 italic">{m[1]}</figcaption>}
        </figure>
      );
    } else if (trimmed === '') {
      const nextNonEmpty = lines.slice(idx + 1).find(l => l.trim() !== '');
      const nextIsList = nextNonEmpty && (
        /^\s*[-*]\s/.test(nextNonEmpty) || /^\s*\d+\.\s/.test(nextNonEmpty)
      );
      if (!nextIsList) flushList();
      elements.push(<div key={idx} className="h-1" />);
    } else {
      flushList();
      elements.push(
        <p key={idx} className="text-slate-300 leading-relaxed my-2">
          {renderInline(line, `p-${idx}`)}
        </p>
      );
    }
  });

  flushList();
  return elements;
};

// ───────────────────────── THEORY рендер ─────────────────────────
export const renderTheory = (theoryText) => {
  if (!theoryText) return null;
  const parts = theoryText.split('```');

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const newlineAt = part.indexOf('\n');
      const language = (newlineAt === -1 ? part : part.slice(0, newlineAt)).trim().toLowerCase();
      const code = newlineAt === -1 ? '' : part.slice(newlineAt + 1).replace(/\n$/, '');

      // ```svg → живой SVG
      if (language === 'svg') {
        return (
          <figure key={index} className="my-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <FileImage className="w-4 h-4 text-violet-400" />
              <span className="uppercase tracking-wider font-semibold">Иллюстрация</span>
            </div>
            <div className="flex justify-center w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: code }} />
          </figure>
        );
      }

      // обычный код — добавляем code-theme чтобы оставаться тёмным в светлой теме
      return (
        <div key={index} className="code-theme my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 font-mono text-sm">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              {language.toUpperCase() || 'CODE'}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="hover:text-violet-400 transition-colors"
              title="Копировать код"
            >
              Копировать
            </button>
          </div>
          <pre className="p-4 overflow-x-auto leading-relaxed" style={{ color: '#D4D4D4' }}>
            <code>
              {language === 'python' ? <PythonHighlighter code={code} /> : code}
            </code>
          </pre>
        </div>
      );
    }
    return <div key={index}>{parseMarkdown(part)}</div>;
  });
};

// ───────────────────────── CHAT message ─────────────────────────
export const renderMessageContent = (text) => {
  if (!text) return null;
  const parts = text.split('```');

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const newlineAt = part.indexOf('\n');
      const language = (newlineAt === -1 ? part : part.slice(0, newlineAt)).trim() || 'python';
      const code = newlineAt === -1 ? '' : part.slice(newlineAt + 1).replace(/\n$/, '');
      return (
        <div key={index} className="code-theme my-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs w-full max-w-full">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
            <span>{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300"
            >
              Копировать
            </button>
          </div>
          <pre className="p-3 overflow-x-auto" style={{ color: '#D4D4D4' }}>
            <code>
              {language === 'python' ? <PythonHighlighter code={code} /> : code}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <span key={index} className="whitespace-pre-wrap break-words">
        {renderInline(part, `chat-${index}`)}
      </span>
    );
  });
};
