import React from 'react';
import { Lightbulb, Terminal } from 'lucide-react';

export const parseMarkdown = (text) => {
  if (!text) return "";
  return text.split('\n').map((line, idx) => {
    if (line.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-xl font-bold text-slate-100 mt-6 mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Lightbulb className="text-amber-400 w-5 h-5" /> {line.replace('### ', '')}
        </h3>
      );
    }
    if (line.startsWith('#### ')) {
      return <h4 key={idx} className="text-lg font-semibold text-teal-400 mt-4 mb-2">{line.replace('#### ', '')}</h4>;
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={idx} className="font-bold text-slate-200 mt-2">{line.replaceAll('**', '')}</p>;
    }
    if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
      return <li key={idx} className="ml-6 list-disc text-slate-300 my-1">{line.replace(/^[\s*-]+/, '')}</li>;
    }
    if (line.trim().startsWith('```')) return null;
    return line.trim()
      ? <p key={idx} className="text-slate-300 leading-relaxed my-2">{line}</p>
      : <div key={idx} className="h-2" />;
  });
};

export const renderTheory = (theoryText) => {
  const parts = theoryText.split('```');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const lines = part.split('\n');
      const language = lines[0].trim();
      const code = lines.slice(1).join('\n');
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
          <pre className="p-4 overflow-x-auto text-emerald-400"><code>{code}</code></pre>
        </div>
      );
    }
    return <div key={index}>{parseMarkdown(part)}</div>;
  });
};

export const renderMessageContent = (text) => {
  const parts = text.split('```');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const lines = part.split('\n');
      const language = lines[0].trim() || 'python';
      const code = lines.slice(1).join('\n');
      return (
        <div key={index} className="my-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs w-full max-w-full">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
            <span>{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-[10px] bg-slate-800 hover:bg-slate-750 px-2 py-0.5 rounded text-slate-300"
            >
              Копировать
            </button>
          </div>
          <pre className="p-3 overflow-x-auto text-emerald-300"><code>{code}</code></pre>
        </div>
      );
    }
    const inlineParts = part.split('`');
    return (
      <span key={index} className="whitespace-pre-wrap">
        {inlineParts.map((subPart, subIdx) => {
          if (subIdx % 2 === 1) {
            return (
              <code key={subIdx} className="bg-slate-800/80 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs">
                {subPart}
              </code>
            );
          }
          return subPart;
        })}
      </span>
    );
  });
};