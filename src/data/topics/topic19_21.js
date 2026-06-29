import { Gamepad2 } from 'lucide-react';

export default {
  id: "task-19-21",
  title: "Задания 19-21: Теория игр",
  description: "Выигрышные стратегии — решаем рекурсией с any/all.",
  icon: Gamepad2,
  theory: `### Суть задания

Два игрока (Петя и Ваня) ходят по очереди. На каждом ходу — несколько вариантов действий. Побеждает тот, кто **первым достигнет победного условия**. Нужно найти, при каких начальных позициях у кого-то есть гарантированная стратегия выигрыша.

### Шаг 1: Дерево ходов

Любую игру можно представить как дерево. Каждый уровень — чей-то ход. Петя ходит на нечётных уровнях, Ваня — на чётных.

\`\`\`svg
<svg viewBox="0 0 720 410" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .nP{fill:#1e3a5f;stroke:#818cf8;stroke-width:2}
    .nV{fill:#1e1a3a;stroke:#a78bfa;stroke-width:2}
    .nW{fill:#0d2d1a;stroke:#4ade80;stroke-width:2}
    .nL{fill:#3b1e1e;stroke:#f87171;stroke-width:2}
    .nC{fill:#1e293b;stroke:#475569;stroke-width:1.5}
    .tP{fill:#93c5fd;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tV{fill:#c4b5fd;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tW{fill:#4ade80;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tL{fill:#f87171;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tC{fill:#94a3b8;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .ts{fill:#94a3b8;font:10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .edge{stroke:#334155;stroke-width:1.5;fill:none}
    .elbl{fill:#6366f1;font:9px sans-serif;text-anchor:middle}
    .lvl{fill:#475569;font:9px sans-serif;dominant-baseline:middle}
  </style></defs>
  <rect width="720" height="410" class="bg" rx="8"/>

  <!-- Level labels -->
  <text x="8" y="53"  class="lvl">Старт</text>
  <text x="8" y="140" class="lvl">П1</text>
  <text x="8" y="228" class="lvl">В1</text>
  <text x="8" y="328" class="lvl">П2</text>

  <!-- Старт -->
  <rect x="260" y="28" width="200" height="50" class="nP" rx="8"/>
  <text x="360" y="47" class="tP">Начало игры</text>
  <text x="360" y="63" class="ts">(9, S) — Петя ходит</text>

  <!-- П1 nodes -->
  <rect x="80"  y="114" width="160" height="50" class="nV" rx="6"/>
  <text x="160" y="133" class="tV">После хода +2</text>
  <text x="160" y="149" class="ts">(11, S) — Ваня ходит</text>

  <rect x="480" y="114" width="160" height="50" class="nV" rx="6"/>
  <text x="560" y="133" class="tV">После хода ×2</text>
  <text x="560" y="149" class="ts">(18, S) — Ваня ходит</text>

  <!-- Edges Старт → П1 -->
  <line x1="340" y1="78" x2="210" y2="114" class="edge"/>
  <line x1="380" y1="78" x2="510" y2="114" class="edge"/>
  <text x="258" y="99" class="elbl">+2 к куче 1</text>
  <text x="462" y="99" class="elbl">×2 куча 1</text>
  <text x="360" y="96" class="elbl">· · · ещё 2 варианта · · ·</text>

  <!-- В1 nodes -->
  <rect x="18"  y="202" width="148" height="50" class="nP" rx="6"/>
  <text x="92"  y="221" class="tP">После В1</text>
  <text x="92"  y="237" class="ts">(13, S) — Петя ходит</text>

  <rect x="186" y="202" width="148" height="50" class="nP" rx="6"/>
  <text x="260" y="221" class="tP">После В1</text>
  <text x="260" y="237" class="ts">(11, S+2) — Петя ходит</text>

  <rect x="386" y="202" width="148" height="50" class="nP" rx="6"/>
  <text x="460" y="221" class="tP">После В1</text>
  <text x="460" y="237" class="ts">(20, S) — Петя ходит</text>

  <rect x="554" y="202" width="148" height="50" class="nP" rx="6"/>
  <text x="628" y="221" class="tP">После В1</text>
  <text x="628" y="237" class="ts">(18, S+2) — Петя ходит</text>

  <!-- Edges П1 → В1 -->
  <line x1="160" y1="164" x2="92"  y2="202" class="edge"/>
  <line x1="160" y1="164" x2="260" y2="202" class="edge"/>
  <line x1="560" y1="164" x2="460" y2="202" class="edge"/>
  <line x1="560" y1="164" x2="628" y2="202" class="edge"/>

  <!-- П2 leaves -->
  <rect x="18"  y="304" width="148" height="52" class="nW" rx="5"/>
  <text x="92"  y="322" class="tW">ВОЗВРАТ True</text>
  <text x="92"  y="338" class="ts">s+p ≥ 55 при чётном m</text>
  <text x="92"  y="350" class="ts">m%2 == 0 → True</text>

  <rect x="186" y="304" width="148" height="52" class="nL" rx="5"/>
  <text x="260" y="322" class="tL">ВОЗВРАТ False</text>
  <text x="260" y="338" class="ts">s+p ≥ 55 при нечётном m</text>
  <text x="260" y="350" class="ts">m%2 == 0 → False</text>

  <rect x="386" y="304" width="148" height="52" class="nW" rx="5"/>
  <text x="460" y="322" class="tW">ВОЗВРАТ True</text>
  <text x="460" y="338" class="ts">s+p ≥ 55 при чётном m</text>
  <text x="460" y="350" class="ts">m%2 == 0 → True</text>

  <rect x="554" y="304" width="148" height="52" class="nC" rx="5"/>
  <text x="628" y="322" class="tC">продолжают...</text>
  <text x="628" y="338" class="ts">s+p &lt; 55, глубже</text>
  <text x="628" y="350" class="ts">g() вызывает себя</text>

  <!-- Edges В1 → П2 -->
  <line x1="92"  y1="252" x2="92"  y2="304" class="edge"/>
  <line x1="260" y1="252" x2="260" y2="304" class="edge"/>
  <line x1="460" y1="252" x2="460" y2="304" class="edge"/>
  <line x1="628" y1="252" x2="628" y2="304" class="edge"/>

  <!-- Bottom note -->
  <text x="360" y="390" fill="#475569" font-size="10" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">Дерево разворачивается рекурсивно — на каждом узле g() вызывает себя для всех 4 возможных ходов</text>
</svg>
\`\`\`

### Шаг 2: Параметр m — чётность и чей ход

Функция принимает m — глубину просмотра. m убывает с каждым ходом. **Чётность m определяет, чья очередь:**

\`\`\`svg
<svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .bP{fill:#1e3a5f;stroke:#818cf8;stroke-width:2}
    .bV{fill:#1e1a3a;stroke:#a78bfa;stroke-width:2}
    .bE{fill:#1e293b;stroke:#334155;stroke-width:1}
    .tP{fill:#93c5fd;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tV{fill:#c4b5fd;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .ts{fill:#94a3b8;font:10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .arr{stroke:#475569;stroke-width:2;fill:none;marker-end:url(#ma2)}
    .label{fill:#fbbf24;font:bold 9px sans-serif;text-anchor:middle;dominant-baseline:middle}
  </style>
  <marker id="ma2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
    <path d="M0,0 L0,6 L6,3 z" fill="#475569"/>
  </marker></defs>
  <rect width="560" height="160" class="bg" rx="8"/>

  <!-- Nodes -->
  <rect x="8"   y="35" width="92" height="60" class="bP" rx="6"/>
  <text x="54"  y="57" class="tP">m = 5</text>
  <text x="54"  y="73" class="ts">ХОД ПЕТИ</text>
  <text x="54"  y="87" class="label">any(h)</text>

  <rect x="118" y="35" width="92" height="60" class="bV" rx="6"/>
  <text x="164" y="57" class="tV">m = 4</text>
  <text x="164" y="73" class="ts">ХОД ВАНИ</text>
  <text x="164" y="87" class="label">all(h)</text>

  <rect x="228" y="35" width="92" height="60" class="bP" rx="6"/>
  <text x="274" y="57" class="tP">m = 3</text>
  <text x="274" y="73" class="ts">ХОД ПЕТИ</text>
  <text x="274" y="87" class="label">any(h)</text>

  <rect x="338" y="35" width="92" height="60" class="bV" rx="6"/>
  <text x="384" y="57" class="tV">m = 2</text>
  <text x="384" y="73" class="ts">ХОД ВАНИ</text>
  <text x="384" y="87" class="label">all(h)</text>

  <rect x="448" y="35" width="92" height="60" class="bP" rx="6"/>
  <text x="494" y="57" class="tP">m = 1</text>
  <text x="494" y="73" class="ts">ХОД ПЕТИ</text>
  <text x="494" y="87" class="label">any(h)</text>

  <!-- Arrows -->
  <line x1="100" y1="65" x2="118" y2="65" class="arr"/>
  <line x1="210" y1="65" x2="228" y2="65" class="arr"/>
  <line x1="320" y1="65" x2="338" y2="65" class="arr"/>
  <line x1="430" y1="65" x2="448" y2="65" class="arr"/>

  <text x="280" y="132" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">Нечётное m → Петя → any(h)   |   Чётное m → Ваня → all(h)</text>
</svg>
\`\`\`

**Нечётное m (Петя ходит):** Петя выбирает ход сам — ему достаточно **хотя бы одного** выигрышного пути → \`any(h)\`

**Чётное m (Ваня ходит):** Ваня выберет невыгодный для Пети ход — Петя победит только если **все** ходы Вани ведут к победе Пети → \`all(h)\`

### Шаг 3: Разбор примера и кода

![Задача 19-21: Петя и Ваня, кучки камней](/tasks/19/example.png)

\`\`\`python
def g(s, p, m):
    if s+p >= 55: return m%2 == 0
    if m == 0: return 0
    h = [g(s+2,p,m-1), g(s,p+2,m-1), g(s*2,p,m-1), g(s,p*2,m-1)]
    return any(h) if m%2 != 0 else all(h) #any(h)
\`\`\`

**\`g(s, p, m)\`** — анализирует позицию на глубину m ходов. Нечётное m → ход Пети, чётное → ход Вани. С каждым рекурсивным вызовом m уменьшается на 1.

#### Строка 1 — кто выиграл?

**\`if s+p >= 55: return m%2 == 0\`** — Если достигли победного кол-ва камушкев, то проверяем, мы выиграли или нет?

Как это работает? За какого игрока мы не ходили бы, победа игрока всегда достигается при чётном m, то есть m%2==0, если кол-во камней победное, но m нечётное, значит выиграл соперник.

Посмотрим как меняется m при реальных вызовах и убедимся, что победа достигается только при чётных m, независимо от Игрока.

**Петя (нечётный старт) — m=1 или m=3 (5,7 и т.д.):**

\`\`\`svg
<svg viewBox="0 0 790 340" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .nA{fill:#0a2010;stroke:#4ade80;stroke-width:2}
    .nL{fill:#2a0808;stroke:#f87171;stroke-width:2}
    .nB{fill:#1e293b;stroke:#475569;stroke-width:1.5}
    .lnk{stroke:#334155;stroke-width:1.5}
    .tA{fill:#4ade80;font:bold 10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tL{fill:#f87171;font:bold 10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tB{fill:#64748b;font:9px monospace;text-anchor:middle;dominant-baseline:middle}
    .ttl{fill:#e2e8f0;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .dot{fill:#475569;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
  </style></defs>
  <rect width="790" height="340" class="bg" rx="8"/>

  <!-- LEFT: g(s,p,1) -->
  <text x="105" y="20" class="ttl">g(s, p, 1)</text>
  <circle cx="105" cy="62" r="10" class="nA"/>
  <text x="105" y="46" class="tA">g(s,p,1)</text>
  <text x="52" y="62" class="tA">any</text>
  <line x1="98"  y1="70" x2="45"  y2="223" class="lnk"/>
  <line x1="102" y1="71" x2="82"  y2="223" class="lnk"/>
  <line x1="108" y1="71" x2="128" y2="223" class="lnk"/>
  <line x1="112" y1="70" x2="165" y2="223" class="lnk"/>
  <circle cx="45"  cy="228" r="7" class="nB"/>
  <circle cx="82"  cy="228" r="7" class="nB"/>
  <circle cx="128" cy="228" r="7" class="nB"/>
  <circle cx="165" cy="228" r="7" class="nB"/>
  <text x="105" y="252" class="tB">g(s', p', 0)</text>
  <text x="105" y="284" fill="#93c5fd" font-size="10" font-family="sans-serif" text-anchor="middle">Петя берёт any(h):</text>
  <text x="105" y="300" fill="#93c5fd" font-size="10" font-family="sans-serif" text-anchor="middle">Потому что ему достаточно</text>
  <text x="105" y="314" fill="#93c5fd" font-size="10" font-family="sans-serif" text-anchor="middle"> хотя бы одной ветки True</text>

  <!-- DIVIDER -->
  <line x1="215" y1="10" x2="215" y2="330" stroke="#1e293b" stroke-width="2"/>

  <!-- RIGHT: g(s,p,3) -->
  <text x="500" y="20" class="ttl">g(s, p, 3)</text>

  <!-- L0 root [any] -->
  <circle cx="500" cy="58" r="10" class="nA"/>
  <text x="500" y="42" class="tA">g(s,p,3)</text>
  <text x="448" y="58" class="tA">any</text>
  <line x1="492" y1="65" x2="345" y2="123" class="lnk"/>
  <text x="440" y="95" class="dot">···</text>
  <line x1="508" y1="65" x2="655" y2="123" class="lnk"/>

  <!-- L1 [all] -->
  <circle cx="345" cy="130" r="9" class="nL"/>
  <text x="345" y="114" class="tL">g(s,p,2)</text>
  <text x="297" y="130" class="tL">all</text>
  <circle cx="655" cy="130" r="9" class="nL"/>
  <text x="655" y="114" class="tL">g(s,p,2)</text>
  <text x="607" y="130" class="tL">all</text>

  <line x1="338" y1="137" x2="288" y2="198" class="lnk"/>
  <text x="335" y="172" class="dot">···</text>
  <line x1="352" y1="137" x2="402" y2="198" class="lnk"/>
  <line x1="648" y1="137" x2="598" y2="198" class="lnk"/>
  <text x="645" y="172" class="dot">···</text>
  <line x1="662" y1="137" x2="712" y2="198" class="lnk"/>

  <!-- L2 [any] -->
  <circle cx="288" cy="205" r="8" class="nA"/>
  <text x="288" y="189" class="tA">g(s,p,1)</text>
  <circle cx="402" cy="205" r="8" class="nA"/>
  <text x="402" y="189" class="tA">g(s,p,1)</text>
  <circle cx="598" cy="205" r="8" class="nA"/>
  <text x="598" y="189" class="tA">g(s,p,1)</text>
  <circle cx="712" cy="205" r="8" class="nA"/>
  <text x="712" y="189" class="tA">g(s,p,1)</text>

  <line x1="283" y1="212" x2="263" y2="278" class="lnk"/>
  <line x1="293" y1="212" x2="313" y2="278" class="lnk"/>
  <line x1="397" y1="212" x2="377" y2="278" class="lnk"/>
  <line x1="407" y1="212" x2="427" y2="278" class="lnk"/>
  <line x1="593" y1="212" x2="573" y2="278" class="lnk"/>
  <line x1="603" y1="212" x2="623" y2="278" class="lnk"/>
  <line x1="707" y1="212" x2="687" y2="278" class="lnk"/>
  <line x1="717" y1="212" x2="737" y2="278" class="lnk"/>

  <!-- L3 base -->
  <circle cx="263" cy="283" r="6" class="nB"/>
  <circle cx="313" cy="283" r="6" class="nB"/>
  <circle cx="377" cy="283" r="6" class="nB"/>
  <circle cx="427" cy="283" r="6" class="nB"/>
  <circle cx="573" cy="283" r="6" class="nB"/>
  <circle cx="623" cy="283" r="6" class="nB"/>
  <circle cx="687" cy="283" r="6" class="nB"/>
  <circle cx="737" cy="283" r="6" class="nB"/>
  <text x="288" y="302" class="tB">g(·, 0)</text>
  <text x="402" y="302" class="tB">g(·, 0)</text>
  <text x="598" y="302" class="tB">g(·, 0)</text>
  <text x="712" y="302" class="tB">g(·, 0)</text>

  <!-- Legend -->
  <circle cx="262" cy="326" r="5" class="nA"/>
  <text x="272" y="326" fill="#4ade80" font-size="9" font-family="sans-serif" dominant-baseline="middle">any · Петя</text>
  <circle cx="360" cy="326" r="5" class="nL"/>
  <text x="370" y="326" fill="#f87171" font-size="9" font-family="sans-serif" dominant-baseline="middle">all · Ваня</text>
  <circle cx="455" cy="326" r="5" class="nB"/>
  <text x="465" y="326" fill="#64748b" font-size="9" font-family="sans-serif" dominant-baseline="middle">база g(·,0)</text>
</svg>
\`\`\`

Петя делал ход после зелёных кругов, как видно на иллюстрации, последующая m — всегда чётная 
Из m = 3, мы попадаем в m = 2 (Петя победил 1-ым ходом)
Из m = 1, мы попадаем в m = 0 (Петя победил 2-ым ходом)
Из m = 2 в m = 1 был ход Вани, если бы это был победный ход, то m = 1 (нечётный = False)

**Ваня (чётный старт) — m=2 и m=4 (6,8 и т.д.):**

\`\`\`svg
<svg viewBox="0 0 790 360" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .nA{fill:#0a2010;stroke:#4ade80;stroke-width:2}
    .nL{fill:#2a0808;stroke:#f87171;stroke-width:2}
    .nB{fill:#1e293b;stroke:#475569;stroke-width:1.5}
    .lnk{stroke:#334155;stroke-width:1.5}
    .tA{fill:#4ade80;font:bold 10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tL{fill:#f87171;font:bold 10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tB{fill:#64748b;font:9px monospace;text-anchor:middle;dominant-baseline:middle}
    .ttl{fill:#e2e8f0;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .dot{fill:#475569;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
  </style></defs>
  <rect width="790" height="360" class="bg" rx="8"/>

  <!-- LEFT: g(s,p,2) -->
  <text x="105" y="20" class="ttl">g(s, p, 2)</text>
  <circle cx="105" cy="70" r="10" class="nL"/>
  <text x="105" y="54" class="tL">g(s,p,2)</text>
  <text x="55" y="70" class="tL">all</text>
  <line x1="98"  y1="77" x2="62"  y2="148" class="lnk"/>
  <text x="105" y="112" class="dot">···</text>
  <line x1="112" y1="77" x2="148" y2="148" class="lnk"/>

  <!-- L1 [any] -->
  <circle cx="62"  cy="155" r="8" class="nA"/>
  <text x="62"  y="139" class="tA">g(s,p,1)</text>
  <circle cx="148" cy="155" r="8" class="nA"/>
  <text x="148" y="139" class="tA">g(s,p,1)</text>

  <line x1="57"  y1="162" x2="42"  y2="228" class="lnk"/>
  <line x1="67"  y1="162" x2="82"  y2="228" class="lnk"/>
  <line x1="143" y1="162" x2="128" y2="228" class="lnk"/>
  <line x1="153" y1="162" x2="168" y2="228" class="lnk"/>

  <circle cx="42"  cy="233" r="6" class="nB"/>
  <circle cx="82"  cy="233" r="6" class="nB"/>
  <circle cx="128" cy="233" r="6" class="nB"/>
  <circle cx="168" cy="233" r="6" class="nB"/>
  <text x="62"  y="252" class="tB">g(·, 0)</text>
  <text x="148" y="252" class="tB">g(·, 0)</text>

  <text x="105" y="290" fill="#fca5a5" font-size="10" font-family="sans-serif" text-anchor="middle">Ваня берёт all(h):</text>
  <text x="105" y="306" fill="#fca5a5" font-size="10" font-family="sans-serif" text-anchor="middle">т.к. ПЕРВЫМ ходит не он, а Петя</text>
  <text x="105" y="320" fill="#fca5a5" font-size="10" font-family="sans-serif" text-anchor="middle">Который может сходить в победу</text>

  <!-- DIVIDER -->
  <line x1="215" y1="10" x2="215" y2="350" stroke="#1e293b" stroke-width="2"/>

  <!-- RIGHT: g(s,p,4) -->
  <text x="500" y="20" class="ttl">g(s, p, 4)</text>

  <!-- L0 root [all] -->
  <circle cx="500" cy="56" r="10" class="nL"/>
  <text x="500" y="40" class="tL">g(s,p,4)</text>
  <text x="450" y="56" class="tL">all</text>
  <line x1="492" y1="63" x2="345" y2="118" class="lnk"/>
  <text x="440" y="90" class="dot">···</text>
  <line x1="508" y1="63" x2="655" y2="118" class="lnk"/>

  <!-- L1 [any] -->
  <circle cx="345" cy="125" r="9" class="nA"/>
  <text x="345" y="109" class="tA">g(s,p,3)</text>
  <text x="297" y="125" class="tA">any</text>
  <circle cx="655" cy="125" r="9" class="nA"/>
  <text x="655" y="109" class="tA">g(s,p,3)</text>
  <text x="607" y="125" class="tA">any</text>

  <line x1="338" y1="132" x2="288" y2="190" class="lnk"/>
  <text x="335" y="165" class="dot">···</text>
  <line x1="352" y1="132" x2="402" y2="190" class="lnk"/>
  <line x1="648" y1="132" x2="598" y2="190" class="lnk"/>
  <text x="645" y="165" class="dot">···</text>
  <line x1="662" y1="132" x2="712" y2="190" class="lnk"/>

  <!-- L2 [all] -->
  <circle cx="288" cy="197" r="8" class="nL"/>
  <text x="288" y="181" class="tL">g(s,p,2)</text>
  <circle cx="402" cy="197" r="8" class="nL"/>
  <text x="402" y="181" class="tL">g(s,p,2)</text>
  <circle cx="598" cy="197" r="8" class="nL"/>
  <text x="598" y="181" class="tL">g(s,p,2)</text>
  <circle cx="712" cy="197" r="8" class="nL"/>
  <text x="712" y="181" class="tL">g(s,p,2)</text>

  <line x1="283" y1="204" x2="263" y2="270" class="lnk"/>
  <line x1="293" y1="204" x2="313" y2="270" class="lnk"/>
  <line x1="397" y1="204" x2="377" y2="270" class="lnk"/>
  <line x1="407" y1="204" x2="427" y2="270" class="lnk"/>
  <line x1="593" y1="204" x2="573" y2="270" class="lnk"/>
  <line x1="603" y1="204" x2="623" y2="270" class="lnk"/>
  <line x1="707" y1="204" x2="687" y2="270" class="lnk"/>
  <line x1="717" y1="204" x2="737" y2="270" class="lnk"/>

  <!-- L3 [any] small -->
  <circle cx="263" cy="275" r="6" class="nA"/>
  <circle cx="313" cy="275" r="6" class="nA"/>
  <circle cx="377" cy="275" r="6" class="nA"/>
  <circle cx="427" cy="275" r="6" class="nA"/>
  <circle cx="573" cy="275" r="6" class="nA"/>
  <circle cx="623" cy="275" r="6" class="nA"/>
  <circle cx="687" cy="275" r="6" class="nA"/>
  <circle cx="737" cy="275" r="6" class="nA"/>
  <text x="288" y="294" class="tA" font-size="9">g(·,1)</text>
  <text x="402" y="294" class="tA" font-size="9">g(·,1)</text>
  <text x="598" y="294" class="tA" font-size="9">g(·,1)</text>
  <text x="712" y="294" class="tA" font-size="9">g(·,1)</text>
  <text x="500" y="294" class="tB">→ ниже база g(·,0)</text>

  <!-- Legend -->
  <circle cx="262" cy="338" r="5" class="nA"/>
  <text x="272" y="338" fill="#4ade80" font-size="9" font-family="sans-serif" dominant-baseline="middle">any · Петя</text>
  <circle cx="360" cy="338" r="5" class="nL"/>
  <text x="370" y="338" fill="#f87171" font-size="9" font-family="sans-serif" dominant-baseline="middle">all · Ваня</text>
  <circle cx="455" cy="338" r="5" class="nB"/>
  <text x="465" y="338" fill="#64748b" font-size="9" font-family="sans-serif" dominant-baseline="middle">база g(·,0)</text>
</svg>
\`\`\`

Теперь из зелёных кругов идет ход ВАНИ. Из g(s,p,4) ход делает Петя в g(s,p,3), из g(s,p,3) ход делает Ваня в g(s,p,2)
Как видим Ваня сходит из m = 3 в m = 2, возможная победа также на чётной позиции.
Также Ваня делает ход из g(s,p,1) в g(s,p,0), что также по достижению нужного кол-ва кманей будет чётным m/


#### Строка 2 — глубина исчерпана

**\`if m == 0: return 0\`**

Просмотрели m ходов — победное условие \`s+p ≥ 55\` так и не достигнуто в пределах глубины → возвращаем \`False\` (как и 0).

#### Строка 3 — четыре возможных хода

**\`h = [g(s+2,p,m-1), g(s,p+2,m-1), g(s*2,p,m-1), g(s,p*2,m-1)]\`**

Четыре варианта хода: +2 к первой куче, +2 ко второй, ×2 первой, ×2 второй. Каждый — рекурсивный вызов с m−1. Получаем список из четырёх True/False.

#### Строка 4 — чья стратегия, тот и выбирает

**\`return any(h) if m%2 != 0 else all(h)\`**

\`\`\`svg
<svg viewBox="0 0 580 220" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .pnlP{fill:#1e3a5f;stroke:#818cf8;stroke-width:1.5}
    .pnlV{fill:#1e1a3a;stroke:#a78bfa;stroke-width:1.5}
    .hP{fill:#93c5fd;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .hV{fill:#c4b5fd;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .bW{fill:#0d2d1a;stroke:#4ade80;stroke-width:1.5}
    .bL{fill:#3b1e1e;stroke:#f87171;stroke-width:1.5}
    .bLhi{fill:#3b1e1e;stroke:#f87171;stroke-width:3}
    .tW{fill:#4ade80;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tL{fill:#f87171;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .ts{fill:#94a3b8;font:10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .code{fill:#fbbf24;font:11px monospace;text-anchor:middle;dominant-baseline:middle}
    .resW{fill:#4ade80;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .resL{fill:#f87171;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .arr{stroke:#f87171;stroke-width:2;marker-end:url(#ared)}
  </style>
  <marker id="ared" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
    <path d="M0,0 L0,6 L6,3 z" fill="#f87171"/>
  </marker>
  </defs>
  <rect width="580" height="220" class="bg" rx="8"/>

  <!-- Left panel: Петя (odd m) -->
  <rect x="8" y="8" width="270" height="204" class="pnlP" rx="8"/>
  <text x="143" y="30" class="hP">Нечётное m — ход Пети</text>
  <text x="143" y="48" class="ts">any(h) — хватит одной победы</text>
  <rect x="22"  y="60" width="54" height="28" class="bW" rx="4"/>
  <text x="49"  y="74" class="tW">True</text>
  <rect x="82"  y="60" width="54" height="28" class="bL" rx="4"/>
  <text x="109" y="74" class="tL">False</text>
  <rect x="142" y="60" width="54" height="28" class="bW" rx="4"/>
  <text x="169" y="74" class="tW">True</text>
  <rect x="202" y="60" width="54" height="28" class="bL" rx="4"/>
  <text x="229" y="74" class="tL">False</text>
  <text x="143" y="108" class="code">any([T,F,T,F]) = True</text>
  <text x="143" y="130" class="ts">Петя выберет зелёную ветку</text>
  <text x="143" y="150" class="ts">и гарантированно победит</text>
  <text x="143" y="190" class="resW">РЕЗУЛЬТАТ: True</text>

  <!-- Right panel: Ваня (even m) -->
  <rect x="302" y="8" width="270" height="204" class="pnlV" rx="8"/>
  <text x="437" y="30" class="hV">Чётное m — ход Вани</text>
  <text x="437" y="48" class="ts">all(h) — нужна победа при любом ходе Пети</text>
  <rect x="316" y="60" width="54" height="28" class="bW" rx="4"/>
  <text x="343" y="74" class="tW">True</text>
  <rect x="376" y="60" width="54" height="28" class="bLhi" rx="4"/>
  <text x="403" y="74" class="tL">False</text>
  <rect x="436" y="60" width="54" height="28" class="bW" rx="4"/>
  <text x="463" y="74" class="tW">True</text>
  <rect x="496" y="60" width="54" height="28" class="bW" rx="4"/>
  <text x="523" y="74" class="tW">True</text>
  <line x1="403" y1="88" x2="403" y2="104" class="arr"/>
  <text x="437" y="116" class="tL" font-size="10">Петя может выбрать эту ветку!</text>
  <text x="437" y="136" class="code">all([T,F,T,T]) = False</text>
  <text x="437" y="158" class="ts">Петя найдёт единственную</text>
  <text x="437" y="172" class="ts">проигрышную для Вани ветку</text>
  <text x="437" y="196" class="resL">РЕЗУЛЬТАТ: False</text>
</svg>
\`\`\`

**Нечётное m → Петя ходит → \`any(h)\`:** Петя сам выбирает ход. Ему достаточно **хотя бы одного** пути к победе.

**Чётное m → Ваня ходит → \`all(h)\`:** Ваня не может выбрать первый ход. Поэтому ему важно, чтобы любой первый ход Пети приводил к ситуации, когда Ваня одержит победу дальше.

### Тонкость: «неудачный ход Пети» — \`all\` меняется на \`any\`

Самый частый подвох в первом вопросе. Сравните две формулировки про победу Вани первым ходом:

**1. «При ЛЮБОМ ходе Пети Ваня выигрывает своим ходом» → \`all\`.** Каждый первый ход Пети обязан вести к победе Вани. Позиции, где у Пети был выигрышный ход, сюда **не** попадают — ведь тогда не все его ходы ведут к победе Вани.

**2. «Петя сходил НЕУДАЧНО, после чего Ваня выигрывает» → \`any\`.** Здесь нам прямо говорят, что Петя сделал заведомо проигрышный ход. Значит, **не обязательно**, чтобы любой ход Пети гарантировал победу Вани — достаточно, чтобы **существовал** такой неудачный ход Пети, после которого Ваня выигрывает.

**Что меняется:** во втором случае добавляются позиции, где Петя **мог сходить победно, но сходил наоборот**. В строгом \`all\`-варианте они отсекаются (раз у Пети есть выигрышный ход — условие «все ходы за Ваню» ломается), а при \`any\` — учитываются. Поэтому \`all\` заменяем на \`any\`.

\`\`\`python
# «Ваня выигрывает при ЛЮБОМ ходе Пети» (Петя бессилен)
all(g(s2, p2, m-1) ...)   # нужны ВСЕ ветки

# «Петя сходил неудачно, и Ваня выиграл» (Петя ошибся)
any(g(s2, p2, m-1) ...)   # достаточно ОДНОЙ неудачной ветки Пети
\`\`\`

### Типы вопросов и вызовы функции

\`\`\`svg
<svg viewBox="0 0 600 268" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}.hdr{fill:#065f46}.r0{fill:#1e293b}.r1{fill:#0f172a}
    .ht{fill:#fff;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .q{fill:#fbbf24;font:bold 11px sans-serif;dominant-baseline:middle}
    .d{fill:#cbd5e1;font:10px sans-serif;dominant-baseline:middle}
    .c{fill:#86efac;font:bold 11px monospace;text-anchor:middle;dominant-baseline:middle}
    .sep{stroke:#334155;stroke-width:0.5}
  </style></defs>
  <rect width="600" height="268" class="bg" rx="8"/>
  <rect width="600" height="28" class="hdr"/>
  <text x="300" y="14" class="ht">Вопрос → вызов функции</text>
  <line x1="390" y1="28" x2="390" y2="268" class="sep"/>

  <rect y="28"  width="600" height="60" class="r0"/>
  <text x="8"   y="45" class="q">Петя победит первым ходом?</text>
  <text x="8"   y="63" class="d">Может ли Петя выиграть за 1 ход</text>
  <text x="8"   y="77" class="d">из начальной позиции</text>
  <text x="494" y="58" class="c">g(9, p, 1)</text>

  <rect y="88"  width="600" height="60" class="r1"/>
  <text x="8"   y="105" class="q">Ваня победит первым ходом (после хода Пети)?</text>
  <text x="8"   y="123" class="d">Петя сходил неудачно, и Ваня</text>
  <text x="8"   y="137" class="d">выигрывает своим ходом (all → any)</text>
  <text x="494" y="118" class="c">g(9,p,2)</text>

  <rect y="148" width="600" height="60" class="r0"/>
  <text x="8"   y="165" class="q">У Пети стратегия на 2 хода (не первым)?</text>
  <text x="8"   y="183" class="d">Не выиграл за 1 ход,</text>
  <text x="8"   y="197" class="d">но выигрывает за 3 уровня</text>
  <text x="494" y="168" class="c">not g(9,p,1)</text>
  <text x="494" y="186" class="c">and g(9,p,3)</text>

  <rect y="208" width="600" height="60" class="r1"/>
  <text x="8"   y="225" class="q">У Вани стратегия на 2 хода, но не первым?</text>
  <text x="8"   y="243" class="d">Ваня не выиграл первым ходом,</text>
  <text x="8"   y="257" class="d">но выигрывает за 4 уровня</text>
  <text x="494" y="228" class="c">not g(9,p,2)</text>
  <text x="494" y="246" class="c">and g(9,p,4)</text>
</svg>
\`\`\`

Ответы для примера задачи:
- **Вопрос 1:** \`min([p for p in range(1,46) if g(9,p,2)])\` → **12** (Меняли all на any)
- **Вопрос 2:** \`min([p for p in range(1,46) if not g(9,p,1) and g(9,p,3)])\` → **11**
- **Вопрос 3:** \`[p for p in range(1,46) if not g(9,p,2) and g(9,p,4)]\` → **[9, 19]**`,

  practice: [
    {
      question: "От чего зависит, вернёт g(s, p, m) значение True или False в базовом случае s+p ≥ 55?",
      options: [
        { id: "A", text: "От того, кто из игроков — Петя или Ваня" },
        { id: "B", text: "От чётности m в момент достижения s+p ≥ 55 (m%2==0 → True)" },
        { id: "C", text: "От суммы s+p" },
        { id: "D", text: "От того, кто сделал первый ход" }
      ],
      correct: "B",
      explanation: "В базовом случае функция возвращает m%2==0 — значение определяется только чётностью m в момент достижения s+p ≥ 55, а не «именем» игрока. Чётное m → True, нечётное → False."
    },
    {
      question: "При нечётном m — чей ход и какая функция?",
      options: [
        { id: "A", text: "Ваня ходит → all(h)" },
        { id: "B", text: "Петя ходит → any(h)" },
        { id: "C", text: "Ваня ходит → any(h)" },
        { id: "D", text: "Петя ходит → all(h)" }
      ],
      correct: "B",
      explanation: "Нечётное m → Петя ходит. Петя выбирает лучший ход сам → нужен хотя бы один победный путь → any(h). Чётное m → Ваня → all(h)."
    },
    {
      question: "Когда s+p ≥ 55 достигнуто при m=4, что вернёт функция?",
      options: [
        { id: "A", text: "False, потому что m чётное" },
        { id: "B", text: "True, потому что 4%2==0" },
        { id: "C", text: "False, потому что 4%2==0" },
        { id: "D", text: "Зависит от того, чей был ход" }
      ],
      correct: "B",
      explanation: "Базовый случай возвращает m%2==0. При m=4: 4%2==0 → True. Значение зависит только от чётности m, а не от игрока."
    },
    {
      question: "Как найти: 'у Пети есть стратегия за 2 хода, но не за 1'?",
      options: [
        { id: "A", text: "g(9, p, 2)" },
        { id: "B", text: "g(9, p, 1) and not g(9, p, 3)" },
        { id: "C", text: "not g(9, p, 1) and g(9, p, 3)" },
        { id: "D", text: "g(9, p, 3) - g(9, p, 1)" }
      ],
      correct: "C",
      explanation: "not g(9,p,1) — Петя не выигрывает первым ходом. g(9,p,3) — Петя выигрывает при глубине 3 (П1→В1→П2, то есть за 2 хода Пети). Оба вместе = именно то что нужно."
    },
    {
      question: "Что означает not g(9, p, 2)?",
      options: [
        { id: "A", text: "Ваня выигрывает своим первым ходом" },
        { id: "B", text: "Ваня НЕ может выиграть первым ходом — у Пети есть спасающий ход" },
        { id: "C", text: "Петя выигрывает первым ходом" },
        { id: "D", text: "В игре меньше 2 ходов" }
      ],
      correct: "B",
      explanation: "Само g(9,p,2) (без not) означает «Ваня выигрывает своим первым ходом». Приставка not переворачивает смысл: not g(9,p,2) = Ваня НЕ выигрывает первым ходом, то есть у Пети есть ход, спасающий от немедленного поражения. Поэтому not g(9,p,2) входит в условие «Ваня выигрывает не первым, а вторым ходом»: not g(9,p,2) and g(9,p,4)."
    }
  ],

  aiContext: `Задания 19-21 ЕГЭ — теория игр, выигрышные стратегии через рекурсию.

def g(s, p, m):
    if s+p >= 55: return m%2 == 0   # значение зависит только от чётности m в момент достижения цели
    if m == 0: return 0              # никто не победил в пределах глубины
    h = [все 4 хода с m-1]
    return any(h) if m%2 != 0 else all(h)  # нечётное=Петя=any, чётное=Ваня=all

Типовые вызовы:
- Петя первым ходом: g(9,p,1)
- Петя вторым (не первым): not g(9,p,1) and g(9,p,3)
- Ваня первым (после неудачного хода Пети): g(9,p,2)  # all меняем на any
- Ваня вторым (не первым): not g(9,p,2) and g(9,p,4)`,

  promptSuggestion: "Объясни задания 19-21 ЕГЭ по информатике: теория игр и стратегии."
};
