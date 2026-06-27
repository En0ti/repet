import React from 'react';

// ─── VS Code Dark+ color palette ───
const C = {
  keyword:    '#C586C0', // pink  — def, for, if, return, not, and, or…
  literal:    '#569CD6', // blue  — True, False, None
  builtin:    '#DCDCAA', // gold  — print, len, range, zip…
  funcdef:    '#DCDCAA', // gold  — name right after `def`
  funccall:   '#DCDCAA', // gold  — identifier followed by (
  decorator:  '#DCDCAA', // gold  — @lru_cache
  string:     '#CE9178', // orange-brown
  number:     '#B5CEA8', // light green
  comment:    '#6A9955', // muted green (italic)
  identifier: '#9CDCFE', // light blue
  operator:   '#D4D4D4', // light gray
  punct:      '#D4D4D4',
  default:    '#D4D4D4',
};

const KEYWORDS = new Set([
  'False','None','True',
  'and','as','assert','async','await',
  'break','class','continue',
  'def','del','elif','else','except',
  'finally','for','from',
  'global','if','import','in','is',
  'lambda','nonlocal','not','or',
  'pass','raise','return',
  'try','while','with','yield',
]);

const LITERALS = new Set(['True', 'False', 'None']);

const BUILTINS = new Set([
  'abs','all','any','bin','bool','breakpoint','callable','chr',
  'compile','complex','delattr','dict','dir','divmod','enumerate',
  'eval','exec','filter','float','format','frozenset','getattr',
  'globals','hasattr','hash','help','hex','id','input','int',
  'isinstance','issubclass','iter','len','list','locals','map',
  'max','memoryview','min','next','object','oct','open','ord',
  'pow','print','property','range','repr','reversed','round',
  'set','setattr','slice','sorted','staticmethod','str','sum',
  'super','tuple','type','vars','zip',
  // commonly used imports
  'product','permutations','combinations','combinations_with_replacement',
  'prod','fnmatch','lru_cache','cache',
  'ip_network','ip_address','ip_interface',
  'log','log2','log10','sqrt','ceil','floor','factorial',
  'gcd','lcm','inf','pi','e',
]);

// ─── Tokenizer ───────────────────────────────────────────────────
function tokenize(code) {
  const tokens = [];
  let i = 0;

  while (i < code.length) {
    // ── Comment
    if (code[i] === '#') {
      let j = i;
      while (j < code.length && code[j] !== '\n') j++;
      tokens.push({ t: 'comment', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // ── Triple-quoted string
    if ((code[i] === '"' || code[i] === "'") &&
        code[i + 1] === code[i] && code[i + 2] === code[i]) {
      const q = code.slice(i, i + 3);
      const end = code.indexOf(q, i + 3);
      const val = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      tokens.push({ t: 'string', v: val });
      i += val.length;
      continue;
    }

    // ── Single/double string
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') j++;
        j++;
      }
      tokens.push({ t: 'string', v: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // ── Decorator
    if (code[i] === '@') {
      let j = i + 1;
      while (j < code.length && /[\w.]/.test(code[j])) j++;
      tokens.push({ t: 'decorator', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // ── Number (int, float, hex, bin, oct)
    if (/\d/.test(code[i]) ||
        (code[i] === '.' && i + 1 < code.length && /\d/.test(code[i + 1]))) {
      let j = i;
      if (code[i] === '0' && /[xXbBoO]/.test(code[i + 1])) {
        j += 2;
        while (j < code.length && /[0-9a-fA-F_]/.test(code[j])) j++;
      } else {
        while (j < code.length && /[\d_]/.test(code[j])) j++;
        if (j < code.length && code[j] === '.') {
          j++;
          while (j < code.length && /\d/.test(code[j])) j++;
        }
        if (j < code.length && /[eE]/.test(code[j])) {
          j++;
          if (/[+-]/.test(code[j])) j++;
          while (j < code.length && /\d/.test(code[j])) j++;
        }
      }
      tokens.push({ t: 'number', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // ── Identifier / keyword / builtin
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /\w/.test(code[j])) j++;
      const word = code.slice(i, j);

      // Check previous non-whitespace token
      const prev = [...tokens].reverse().find(t => t.t !== 'ws' && t.t !== 'nl');

      let type;
      if (LITERALS.has(word)) {
        type = 'literal';
      } else if (KEYWORDS.has(word)) {
        type = 'keyword';
      } else if (BUILTINS.has(word)) {
        type = 'builtin';
      } else if (prev && prev.v === 'def') {
        type = 'funcdef';
      } else if (prev && prev.v === 'class') {
        type = 'funcdef';
      } else {
        // peek ahead: function call?
        let k = j;
        while (k < code.length && code[k] === ' ') k++;
        type = code[k] === '(' ? 'funccall' : 'identifier';
      }

      tokens.push({ t: type, v: word });
      i = j;
      continue;
    }

    // ── Newline
    if (code[i] === '\n') {
      tokens.push({ t: 'nl', v: '\n' });
      i++;
      continue;
    }

    // ── Whitespace
    if (code[i] === ' ' || code[i] === '\t') {
      let j = i;
      while (j < code.length && (code[j] === ' ' || code[j] === '\t')) j++;
      tokens.push({ t: 'ws', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // ── Multi-char operators
    const twoChar = code.slice(i, i + 2);
    if (['**', '//', '<=', '>=', '==', '!=', '->', '+=', '-=', '*=', '/=', '%=', ':='].includes(twoChar)) {
      tokens.push({ t: 'op', v: twoChar });
      i += 2;
      continue;
    }

    // ── Single char operator
    if ('+-*/%=<>!&|^~'.includes(code[i])) {
      tokens.push({ t: 'op', v: code[i] });
      i++;
      continue;
    }

    // ── Punctuation
    if ('()[]{},.:;'.includes(code[i])) {
      tokens.push({ t: 'punct', v: code[i] });
      i++;
      continue;
    }

    // ── Fallback
    tokens.push({ t: 'other', v: code[i] });
    i++;
  }

  return tokens;
}

// ─── Color map ────────────────────────────────────────────────────
const getColor = (type) => {
  switch (type) {
    case 'keyword':    return C.keyword;
    case 'literal':    return C.literal;
    case 'builtin':    return C.builtin;
    case 'funcdef':    return C.funcdef;
    case 'funccall':   return C.funccall;
    case 'decorator':  return C.decorator;
    case 'string':     return C.string;
    case 'number':     return C.number;
    case 'comment':    return C.comment;
    case 'identifier': return C.identifier;
    case 'op':         return C.operator;
    case 'punct':      return C.punct;
    default:           return C.default;
  }
};

// ─── React component ─────────────────────────────────────────────
export default function PythonHighlighter({ code }) {
  const tokens = tokenize(code);

  return (
    <>
      {tokens.map((token, i) => {
        // whitespace & newlines — plain
        if (token.t === 'ws' || token.t === 'nl' || token.t === 'other') {
          return token.v;
        }
        const color = getColor(token.t);
        const style = token.t === 'comment'
          ? { color, fontStyle: 'italic' }
          : { color };
        return <span key={i} style={style}>{token.v}</span>;
      })}
    </>
  );
}
