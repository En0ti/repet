import { Move } from 'lucide-react';

export default {
  id: "task-18",
  title: "Задание 18: Динамическое программирование",
  description: "Оптимальный путь робота по таблице — решаем в LibreOffice.",
  icon: Move,
  theory: `### Суть задания

![Задача 18: Робот на сетке](/task18-example.png)

[📥 Скачать файл 18-85.xls](/18-85.xls)

Дан файл **XLS** с таблицей N×N (1 < N < 20). В каждой клетке — стоимость посещения (1–100). Робот идёт из левой верхней в правую нижнюю, двигаясь только **вправо** или **вниз**. Пересекать жирные границы нельзя — Робот разрушается.

Нужно найти **минимальную** и **максимальную** денежную сумму маршрута.

### Алгоритм решения (шаг за шагом)

\`\`\`svg
<svg viewBox="0 0 580 310" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}.hdr{fill:#065f46}.step{fill:#1e293b;stroke:#334155;stroke-width:1}
    .num{fill:#fbbf24;font:bold 20px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .ttl{fill:#fff;font:bold 12px sans-serif;dominant-baseline:middle}
    .sub{fill:#94a3b8;font:11px sans-serif;dominant-baseline:middle}
    .arr{stroke:#6366f1;stroke-width:2;fill:none;marker-end:url(#a)}
  </style>
  <marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/>
  </marker></defs>

  <rect width="580" height="310" class="bg" rx="8"/>
  <rect width="580" height="30" class="hdr"/>
  <text x="290" y="15" fill="#fff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Алгоритм решения задания 18 в LibreOffice Calc</text>

  <!-- Step 1 -->
  <rect x="10" y="42"  width="260" height="66" class="step" rx="6"/>
  <text x="38"  y="60"  class="num">1</text>
  <text x="55"  y="57"  class="ttl">Раскраска для удобства</text>
  <text x="20"  y="74"  class="sub">Красим границы и стартовую/</text>
  <text x="20"  y="88"  class="sub">конечную клетку — чтобы не</text>
  <text x="20"  y="101" class="sub">путаться при расстановке формул.</text>

  <!-- Step 2 -->
  <rect x="310" y="42"  width="260" height="66" class="step" rx="6"/>
  <text x="338" y="60"  class="num">2</text>
  <text x="355" y="57"  class="ttl">Копируем таблицу форматом</text>
  <text x="320" y="74"  class="sub">Выделяем таблицу → Ctrl+C.</text>
  <text x="320" y="88"  class="sub">Встаём рядом → Ctrl+Shift+V →</text>
  <text x="320" y="101" class="sub">«Вставить только формат».</text>

  <!-- Arrow 1→2 -->
  <line x1="272" y1="75" x2="308" y2="75" class="arr"/>

  <!-- Step 3 -->
  <rect x="10" y="128" width="260" height="66" class="step" rx="6"/>
  <text x="38"  y="146" class="num">3</text>
  <text x="55"  y="143" class="ttl">Расставляем формулы ДП</text>
  <text x="20"  y="160" class="sub">В верхней строке и левом столбце —</text>
  <text x="20"  y="174" class="sub">накопительная сумма вдоль края.</text>
  <text x="20"  y="188" class="sub">В остальных: =MIN(сверху;слева)+тек.</text>

  <!-- Step 4 -->
  <rect x="310" y="128" width="260" height="66" class="step" rx="6"/>
  <text x="338" y="146" class="num">4</text>
  <text x="355" y="143" class="ttl">Копируем формулы</text>
  <text x="320" y="160" class="sub">Первую строку тянем вправо.</text>
  <text x="320" y="174" class="sub">Первый столбец тянем вниз.</text>
  <text x="320" y="188" class="sub">Угловую ячейку тянем вниз-вправо.</text>

  <!-- Arrow 3→4 -->
  <line x1="272" y1="161" x2="308" y2="161" class="arr"/>

  <!-- Step 5 -->
  <rect x="10" y="214" width="260" height="66" class="step" rx="6"/>
  <text x="38"  y="232" class="num">5</text>
  <text x="55"  y="229" class="ttl">Читаем ответ</text>
  <text x="20"  y="246" class="sub">Правая нижняя клетка таблицы ДП —</text>
  <text x="20"  y="260" class="sub">это минимальная сумма маршрута.</text>
  <text x="20"  y="274" class="sub">Записываем первый ответ.</text>

  <!-- Step 6 -->
  <rect x="310" y="214" width="260" height="66" class="step" rx="6"/>
  <text x="338" y="232" class="num">6</text>
  <text x="355" y="229" class="ttl">Находим максимум</text>
  <text x="320" y="246" class="sub">Ctrl+H → заменить MIN на MAX.</text>
  <text x="320" y="260" class="sub">Нажать «Заменить всё».</text>
  <text x="320" y="274" class="sub">Правая нижняя — второй ответ.</text>

  <!-- Arrow 5→6 -->
  <line x1="272" y1="247" x2="308" y2="247" class="arr"/>
</svg>
\`\`\`

### Шаг 1 — Раскраска исходной таблицы

Открываем XLS-файл в LibreOffice Calc. Раскрашиваем для ориентации:
- **Старт** (левая верхняя) — один цвет
- **Финиш** (правая нижняя) — другой цвет
- **Жирные границы** — они уже есть, просто замечаем их

Раскраска не влияет на ответ, просто помогает не ошибиться.

### Шаг 2 — Создаём вторую таблицу (только формат)

Нужна чистая таблица с теми же границами, но без чисел — туда запишем формулы ДП.

1. Выделяем всю таблицу (Ctrl+A или мышью)
2. Копируем (Ctrl+C)
3. Кликаем на пустую ячейку рядом (с запасом — хотя бы на 2 столбца правее)
4. **Ctrl+Shift+V** → откроется диалог «Специальная вставка»
5. Снимаем все галки, оставляем только **«Форматы»** → ОК

Получаем таблицу с теми же жирными границами, но пустую.

### Шаг 3 — Формулы динамического программирования

Идея ДП: в каждую клетку записываем **минимальную стоимость пути** от старта до неё.

\`\`\`svg
<svg viewBox="0 0 470 390" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .cS{fill:#1e3a5f;stroke:#3b82f6;stroke-width:2}
    .cE{fill:#0d2d1a;stroke:#22c55e;stroke-width:1.5}
    .cM{fill:#2d1a2d;stroke:#a855f7;stroke-width:1.5}
    .cF{fill:#3b1e1e;stroke:#f87171;stroke-width:2}
    .tS{fill:#60a5fa;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tE{fill:#4ade80;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tM{fill:#d8b4fe;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .tF{fill:#f87171;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .hd{fill:#94a3b8;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .lg{fill:#cbd5e1;font:11px sans-serif;dominant-baseline:middle}
  </style></defs>

  <rect width="470" height="390" class="bg" rx="8"/>

  <!-- Column headers -->
  <text x="108" y="20" class="hd">A</text>
  <text x="198" y="20" class="hd">B</text>
  <text x="288" y="20" class="hd">C</text>
  <text x="378" y="20" class="hd">D</text>
  <!-- Row headers -->
  <text x="22" y="68"  class="hd">1</text>
  <text x="22" y="128" class="hd">2</text>
  <text x="22" y="188" class="hd">3</text>
  <text x="22" y="248" class="hd">4</text>

  <!-- Row 1 -->
  <rect x="32"  y="30" width="80" height="60" class="cS" rx="3"/>
  <text x="72"  y="54" class="tS">СТАРТ</text>
  <text x="72"  y="70" class="tS" font-size="9">=A1_исх</text>

  <rect x="118" y="30" width="80" height="60" class="cE" rx="3"/>
  <text x="158" y="54" class="tE">→ + исх</text>
  <text x="158" y="70" class="tE" font-size="9">=A1дп+B1исх</text>

  <rect x="204" y="30" width="80" height="60" class="cE" rx="3"/>
  <text x="244" y="54" class="tE">→ + исх</text>
  <text x="244" y="70" class="tE" font-size="9">=B1дп+C1исх</text>

  <rect x="290" y="30" width="80" height="60" class="cE" rx="3"/>
  <text x="330" y="54" class="tE">→ + исх</text>
  <text x="330" y="70" class="tE" font-size="9">=C1дп+D1исх</text>

  <!-- Row 2 -->
  <rect x="32"  y="96" width="80" height="60" class="cE" rx="3"/>
  <text x="72"  y="120" class="tE">↓ + исх</text>
  <text x="72"  y="136" class="tE" font-size="9">=A1дп+A2исх</text>

  <rect x="118" y="96" width="80" height="60" class="cM" rx="3"/>
  <text x="158" y="117" class="tM">MIN(←, ↑)</text>
  <text x="158" y="133" class="tM" font-size="9">+ B2исх</text>

  <rect x="204" y="96" width="80" height="60" class="cM" rx="3"/>
  <text x="244" y="117" class="tM">MIN(←, ↑)</text>
  <text x="244" y="133" class="tM" font-size="9">+ C2исх</text>

  <rect x="290" y="96" width="80" height="60" class="cM" rx="3"/>
  <text x="330" y="117" class="tM">MIN(←, ↑)</text>
  <text x="330" y="133" class="tM" font-size="9">+ D2исх</text>

  <!-- Row 3 -->
  <rect x="32"  y="162" width="80" height="60" class="cE" rx="3"/>
  <text x="72"  y="186" class="tE">↓ + исх</text>
  <text x="72"  y="202" class="tE" font-size="9">=A2дп+A3исх</text>

  <rect x="118" y="162" width="80" height="60" class="cM" rx="3"/>
  <text x="158" y="183" class="tM">MIN(←, ↑)</text>
  <text x="158" y="199" class="tM" font-size="9">+ B3исх</text>

  <rect x="204" y="162" width="80" height="60" class="cM" rx="3"/>
  <text x="244" y="183" class="tM">MIN(←, ↑)</text>
  <text x="244" y="199" class="tM" font-size="9">+ C3исх</text>

  <rect x="290" y="162" width="80" height="60" class="cM" rx="3"/>
  <text x="330" y="183" class="tM">MIN(←, ↑)</text>
  <text x="330" y="199" class="tM" font-size="9">+ D3исх</text>

  <!-- Row 4 -->
  <rect x="32"  y="228" width="80" height="60" class="cE" rx="3"/>
  <text x="72"  y="252" class="tE">↓ + исх</text>
  <text x="72"  y="268" class="tE" font-size="9">=A3дп+A4исх</text>

  <rect x="118" y="228" width="80" height="60" class="cM" rx="3"/>
  <text x="158" y="249" class="tM">MIN(←, ↑)</text>
  <text x="158" y="265" class="tM" font-size="9">+ B4исх</text>

  <rect x="204" y="228" width="80" height="60" class="cM" rx="3"/>
  <text x="244" y="249" class="tM">MIN(←, ↑)</text>
  <text x="244" y="265" class="tM" font-size="9">+ C4исх</text>

  <rect x="290" y="228" width="80" height="60" class="cF" rx="3"/>
  <text x="330" y="249" class="tF">ФИНИШ</text>
  <text x="330" y="265" class="tF" font-size="10">= ОТВЕТ</text>

  <!-- Legend (below grid, y=305+) -->
  <line x1="10" y1="300" x2="460" y2="300" stroke="#1e293b" stroke-width="1"/>

  <rect x="10"  y="310" width="14" height="14" class="cS" rx="2"/>
  <text x="30"  y="317" class="lg">Старт — просто равен исходной клетке</text>

  <rect x="10"  y="330" width="14" height="14" class="cE" rx="2"/>
  <text x="30"  y="337" class="lg">Края — накопительная сумма вдоль строки/столбца</text>

  <rect x="10"  y="350" width="14" height="14" class="cM" rx="2"/>
  <text x="30"  y="357" class="lg">Основные — MIN(сосед слева; сосед сверху) + исх</text>

  <rect x="10"  y="370" width="14" height="14" class="cF" rx="2"/>
  <text x="30"  y="377" class="lg">Финиш — значение = минимальная сумма пути</text>
</svg>
\`\`\`

**Правила расстановки формул:**

**Стартовая клетка (A1)** — просто равна себе из исходной таблицы:
\`\`\`
= исх_A1
\`\`\`

**Верхняя строка (B1, C1, D1, ...)** — идти можно только слева, поэтому просто накапливаем:
\`\`\`
B1 = дп_A1 + исх_B1
C1 = дп_B1 + исх_C1
\`\`\`

**Левый столбец (A2, A3, ...)** — идти можно только сверху:
\`\`\`
A2 = дп_A1 + исх_A2
A3 = дп_A2 + исх_A3
\`\`\`

**Все остальные клетки** — берём минимум из верхней и левой соседей, добавляем текущее значение:
\`\`\`
B2 = MIN(дп_A2; дп_B1) + исх_B2
C3 = MIN(дп_B3; дп_C2) + исх_C3
\`\`\`

> **Важно:** формула ссылается на ячейки **двух таблиц** — из ДП-таблицы берём соседей (сверху и слева), из исходной таблицы берём значение текущей клетки.

### Шаг 4 — Жирные границы = стены

Жирные линии означают, что переход через них запрещён. Если граница стоит **справа** от клетки — Робот не может двигаться вправо. Если **снизу** — нельзя вниз.

В этом случае в формуле убираем соответствующего соседа:
- Нельзя прийти **сверху** → формула: = дп_слева + исх_текущей
- Нельзя прийти **слева** → формула: = дп_сверху + исх_текущей

Именно поэтому на Шаге 1 важно разметить границы.

### Шаг 5 — Читаем ответ и находим максимум

1. Правая нижняя клетка ДП-таблицы = **минимальная сумма**. Записываем.

2. Чтобы найти максимум — заменяем MIN на MAX во всей таблице:
   - **Ctrl+H** → «Найти»: \`MIN\`, «Заменить на»: \`MAX\` → «Заменить всё»
   - Правая нижняя клетка теперь = **максимальная сумма**

3. Вписываем оба числа в ответ (сначала минимум, потом максимум).

### Разбор примера

![Разбор: готовые таблицы с формулами](/task18-solution.png)

> При записи ответа **ВНИМАТЕЛЬНО** смотрим какую именно сумму просят указать в ответе, минимальную или максимальную.

Ответ: 949 | 1945
`,

  practice: [
    {
      question: "Зачем делать Ctrl+Shift+V вместо обычного Ctrl+V для создания второй таблицы?",
      options: [
        { id: "A", text: "Ctrl+V вставит числа и перезапишет границы" },
        { id: "B", text: "Нужно скопировать только форматирование (границы), без чисел — чтобы вписать туда формулы ДП" },
        { id: "C", text: "Ctrl+Shift+V работает быстрее" },
        { id: "D", text: "Иначе формулы не будут работать" }
      ],
      correct: "B",
      explanation: "Ctrl+Shift+V → «Вставить только формат» копирует жирные границы без чисел. Это нужно, чтобы создать чистую таблицу с правильными стенами, куда можно вписать формулы MIN/MAX."
    },
    {
      question: "Формула для клетки B2 в ДП-таблице (можно прийти и сверху и слева):",
      options: [
        { id: "A", text: "=B2_исх" },
        { id: "B", text: "=MIN(A2_дп; B1_дп)" },
        { id: "C", text: "=MIN(A2_дп; B1_дп) + B2_исх" },
        { id: "D", text: "=A2_дп + B1_дп + B2_исх" }
      ],
      correct: "C",
      explanation: "Формула ДП: из возможных предшественников берём наилучший (MIN для минимума), и добавляем стоимость текущей клетки. B2 достижима из A2 (левая) и B1 (верхняя), поэтому MIN(A2_дп; B1_дп) + B2_исх."
    },
    {
      question: "Какая формула у клетки A1 (стартовая, левый верхний угол)?",
      options: [
        { id: "A", text: "=MIN(0; 0) + A1_исх" },
        { id: "B", text: "=0" },
        { id: "C", text: "=A1_исх (просто равна исходной)" },
        { id: "D", text: "=MAX(A1_исх; 0)" }
      ],
      correct: "C",
      explanation: "Стартовая клетка — просто ссылка на исходную таблицу. До неё никак не добраться, кроме как с самого начала — у неё нет предшественников."
    },
    {
      question: "В клетку C3 можно попасть только сверху (слева жирная стена). Как выглядит формула?",
      options: [
        { id: "A", text: "=MIN(B3_дп; C2_дп) + C3_исх" },
        { id: "B", text: "=C2_дп + C3_исх" },
        { id: "C", text: "=B3_дп + C3_исх" },
        { id: "D", text: "=MIN(B3_дп; C2_дп)" }
      ],
      correct: "B",
      explanation: "Жирная стена слева означает, что прийти из B3 нельзя. Единственный путь — сверху из C2. Формула: =C2_дп + C3_исх. MIN не нужен — выбирать не из чего."
    },
    {
      question: "Как найти максимальную сумму маршрута, уже зная минимальную?",
      options: [
        { id: "A", text: "Ввести формулы заново, заменив MIN на MAX вручную в каждой ячейке" },
        { id: "B", text: "Ctrl+H → заменить MIN на MAX → Заменить всё — автоматически обновит все формулы" },
        { id: "C", text: "Скопировать таблицу ещё раз" },
        { id: "D", text: "Посчитать сумму всех клеток минус минимум" }
      ],
      correct: "B",
      explanation: "Ctrl+H (Найти и заменить) заменяет MIN на MAX сразу во всей ДП-таблице. После этого правая нижняя клетка автоматически покажет максимальную сумму. Быстро и без ошибок."
    }
  ],

  aiContext: `Задание 18 ЕГЭ — динамическое программирование в LibreOffice Calc.

Алгоритм:
1. Открыть XLS, разметить старт/финиш/границы цветом
2. Ctrl+C таблицу → Ctrl+Shift+V → "Только форматы" рядом = пустая таблица с границами
3. Расставить формулы ДП:
   - Старт (A1): = A1_исх
   - Верхняя строка: = предыдущая_дп + текущая_исх
   - Левый столбец: = клетка_выше_дп + текущая_исх
   - Остальные: = MIN(сверху_дп; слева_дп) + текущая_исх
4. Жирная стена = нельзя прийти с той стороны → убрать из MIN
5. Ответ = правая нижняя клетка ДП-таблицы (минимум)
6. Ctrl+H: MIN→MAX → ответ = максимум`,

  promptSuggestion: "Объясни задание 18 ЕГЭ по информатике: динамическое программирование в Excel."
};
