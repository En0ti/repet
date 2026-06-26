import React from 'react';
import { Lightbulb, Terminal, FileImage } from 'lucide-react';

// ───────────────────────── INLINE parser ─────────────────────────
// Обрабатывает **bold**, *italic*, `code`, $math$ внутри строки.
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
          <code key={`${baseKey}-${nodeIdx++}`} className="bg-slate-800/70 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-[0.85em]">
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
          const isFile = /\.(xls|xlsx|csv|zip|pdf|docx)$/i.test(linkHref);
          out.push(
            <a
              key={`${baseKey}-${nodeIdx++}`}
              href={linkHref}
              download={isFile ? true : undefined}
              target={isFile ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
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
    const line = rawLine.replace(/\r$/, ''); // защита от windows-окончаний
    const trimmed = line.trim();

    // ВАЖНО: порядок — от более длинных к более коротким
    if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={idx} className="text-base font-semibold text-teal-300 mt-5 mb-2 uppercase tracking-wide">
          {renderInline(line.slice(5), `h4-${idx}`)}
        </h4>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Lightbulb className="text-amber-400 w-5 h-5 shrink-0" />
          <span>{renderInline(line.slice(4), `h3-${idx}`)}</span>
        </h3>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={idx} className="text-2xl font-bold text-white mt-6 mb-3">
          {renderInline(line.slice(3), `h2-${idx}`)}
        </h2>
      );
    } else if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={idx} className="border-l-4 border-indigo-500 bg-indigo-500/5 pl-4 pr-3 py-2 my-3 italic text-slate-300 rounded-r">
          {renderInline(trimmed.slice(2), `bq-${idx}`)}
        </blockquote>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuffer.push(
        <li key={idx} className="ml-5 list-disc text-slate-300 leading-relaxed marker:text-emerald-500">
          {renderInline(trimmed.slice(2), `li-${idx}`)}
        </li>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const m = trimmed.match(/^(\d+)\.\s(.*)/);
      listBuffer.push(
        <li key={idx} className="ml-5 list-decimal text-slate-300 leading-relaxed marker:text-indigo-400 marker:font-bold">
          {renderInline(m[2], `oli-${idx}`)}
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
      // Не сбрасываем список если следующая непустая строка — тоже элемент списка
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
// Делит на блоки по ``` , поддерживает ```svg как живой SVG.
export const renderTheory = (theoryText) => {
  if (!theoryText) return null;
  const parts = theoryText.split('```');

  return parts.map((part, index) => {
    // нечётные индексы — код-блок
    if (index % 2 === 1) {
      const newlineAt = part.indexOf('\n');
      const language = (newlineAt === -1 ? part : part.slice(0, newlineAt)).trim().toLowerCase();
      const code = newlineAt === -1 ? '' : part.slice(newlineAt + 1).replace(/\n$/, '');

      // ```svg → живой SVG в figure
      if (language === 'svg') {
        return (
          <figure key={index} className="my-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <FileImage className="w-4 h-4 text-indigo-400" />
              <span className="uppercase tracking-wider font-semibold">Иллюстрация</span>
            </div>
            <div className="flex justify-center w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: code }} />
          </figure>
        );
      }

      // обычный код
      return (
        <div key={index} className="my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 font-mono text-sm">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              {language.toUpperCase() || 'CODE'}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="hover:text-emerald-400 transition-colors"
              title="Копировать код"
            >
              Копировать
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-emerald-300 leading-relaxed"><code>{code}</code></pre>
        </div>
      );
    }
    // чётные — обычный markdown
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
        <div key={index} className="my-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs w-full max-w-full">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
            <span>{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300"
            >
              Копировать
            </button>
          </div>
          <pre className="p-3 overflow-x-auto text-emerald-300"><code>{code}</code></pre>
        </div>
      );
    }

    // Inline-разметка в чате
    return (
      <span key={index} className="whitespace-pre-wrap break-words">
        {renderInline(part, `chat-${index}`)}
      </span>
    );
  });
};