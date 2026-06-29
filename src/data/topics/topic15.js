import { Binary } from 'lucide-react';

export default {
  id: "task-15",
  title: "Задание 15: Логические выражения",
  description: "Анализ логических формул: числа, отрезки, множества.",
  icon: Binary,
  theory: `### Суть задания

Дана логическая формула F(x, A, ...). Нужно найти значение A (число, длину отрезка или размер множества), при котором F тождественно истинна (= 1 при любом x).

### Логические операции в Python

\`\`\`svg
<svg viewBox="0 0 600 222" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .hdr{fill:#065f46}.r0{fill:#1e293b}.r1{fill:#0f172a}
    .ht{fill:#fff;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .m{fill:#f9a8d4;font:13px serif;text-anchor:middle;dominant-baseline:middle}
    .n{fill:#cbd5e1;font:11px sans-serif;dominant-baseline:middle}
    .c{fill:#34d399;font:11px monospace;text-anchor:middle;dominant-baseline:middle}
    .ex{fill:#94a3b8;font:10px monospace;dominant-baseline:middle}
    .pr{fill:#fbbf24;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .sep{stroke:#334155;stroke-width:0.5}
  </style></defs>

  <rect width="600" height="28" class="hdr"/>
  <text x="55"  y="14" class="ht">Математика</text>
  <text x="170" y="14" class="ht">Операция</text>
  <text x="295" y="14" class="ht">Python</text>
  <text x="435" y="14" class="ht">Пример</text>
  <text x="565" y="14" class="ht">Приор.</text>

  <rect y="28"  width="600" height="34" class="r0"/>
  <text x="55"  y="45" class="m">¬A</text>
  <text x="102" y="45" class="n">Отрицание (НЕ)</text>
  <text x="295" y="45" class="c">not A</text>
  <text x="342" y="45" class="ex">not True → False</text>
  <text x="565" y="45" class="pr">2</text>

  <rect y="62"  width="600" height="34" class="r1"/>
  <text x="55"  y="79" class="m">A ∧ B</text>
  <text x="102" y="79" class="n">Конъюнкция (И)</text>
  <text x="295" y="79" class="c">A and B</text>
  <text x="342" y="79" class="ex">True and False → False</text>
  <text x="565" y="79" class="pr">3</text>

  <rect y="96"  width="600" height="34" class="r0"/>
  <text x="55"  y="113" class="m">A ∨ B</text>
  <text x="102" y="113" class="n">Дизъюнкция (ИЛИ)</text>
  <text x="295" y="113" class="c">A or B</text>
  <text x="342" y="113" class="ex">False or True → True</text>
  <text x="565" y="113" class="pr">4</text>

  <rect y="130" width="600" height="34" class="r1"/>
  <text x="55"  y="147" class="m">A → B</text>
  <text x="102" y="147" class="n">Импликация (ЕСЛИ)</text>
  <text x="295" y="147" class="c">A &lt;= B</text>
  <text x="342" y="147" class="ex">True &lt;= False → False</text>
  <text x="565" y="147" class="pr">1 ⚠</text>

  <rect y="164" width="600" height="34" class="r0"/>
  <text x="55"  y="181" class="m">A ↔ B</text>
  <text x="102" y="181" class="n">Эквивалентность</text>
  <text x="295" y="181" class="c">A == B</text>
  <text x="342" y="181" class="ex">True == True → True</text>
  <text x="565" y="181" class="pr">1 ⚠</text>

  <rect y="198" width="600" height="24" fill="#2d1a00"/>
  <text x="300" y="210" fill="#fbbf24" font-size="10" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">⚠ Приоритет 1 (высший): &lt;= и == выполняются ДО not, and, or — всегда расставляй скобки явно!</text>

  <line x1="92"  y1="0" x2="92"  y2="198" class="sep"/>
  <line x1="240" y1="0" x2="240" y2="198" class="sep"/>
  <line x1="348" y1="0" x2="348" y2="198" class="sep"/>
  <line x1="538" y1="0" x2="538" y2="198" class="sep"/>
  <rect width="600" height="222" fill="none" stroke="#1e293b" stroke-width="1.5" rx="6"/>
</svg>
\`\`\`

> **Главная ловушка:** \`not A <= B\` — Python вычислит сначала \`A <= B\`, потом \`not\`. То есть это \`not (A <= B)\`, а не \`(not A) <= B\`. **Всегда ставь скобки явно.**

### Три типа задач

\`\`\`svg
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}.ctr{fill:#065f46}
    .ht{fill:#fff;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .sm{fill:#94a3b8;font:10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .c1{fill:#34d399;font:10px monospace;text-anchor:middle;dominant-baseline:middle}
    .c2{fill:#60a5fa;font:10px monospace;text-anchor:middle;dominant-baseline:middle}
    .c3{fill:#c084fc;font:10px monospace;text-anchor:middle;dominant-baseline:middle}
    .ln1{stroke:#34d399;stroke-width:1.5;fill:none}
    .ln2{stroke:#60a5fa;stroke-width:1.5;fill:none}
    .ln3{stroke:#c084fc;stroke-width:1.5;fill:none}
  </style></defs>
  <rect width="660" height="230" class="bg" rx="8"/>

  <!-- center -->
  <rect x="240" y="90" width="180" height="44" class="ctr" rx="8"/>
  <text x="330" y="112" class="ht">Задание 15</text>

  <!-- type 1 -->
  <rect x="20" y="25" width="160" height="44" fill="#1e3a5f" rx="6"/>
  <text x="100" y="43" class="ht" fill="#34d399">Тип 1: Числа</text>
  <text x="100" y="58" class="sm">найти min/max A ∈ ℕ</text>
  <line x1="180" y1="47" x2="240" y2="102" class="ln1"/>
  <rect x="10" y="105" width="180" height="50" fill="#0d2d1a" rx="5"/>
  <text x="100" y="122" class="c1">for a in range(...):</text>
  <text x="100" y="138" class="c1">  all(f(x,a) for x...)</text>
  <line x1="100" y1="69" x2="100" y2="105" class="ln1"/>

  <!-- type 2 -->
  <rect x="250" y="172" width="160" height="44" fill="#1e3a5f" rx="6"/>
  <text x="330" y="190" class="ht" fill="#60a5fa">Тип 2: Отрезки</text>
  <text x="330" y="205" class="sm">найти min длину A=[a1,a2]</text>
  <line x1="330" y1="134" x2="330" y2="172" class="ln2"/>
  <rect x="248" y="172" width="7" height="44" fill="none"/>

  <!-- type 3 -->
  <rect x="480" y="25" width="170" height="44" fill="#1e3a5f" rx="6"/>
  <text x="565" y="43" class="ht" fill="#c084fc">Тип 3: Множества</text>
  <text x="565" y="58" class="sm">найти min/max |A|</text>
  <line x1="480" y1="47" x2="420" y2="102" class="ln3"/>
  <rect x="460" y="105" width="190" height="80" fill="#1e0f2d" rx="5"/>
  <text x="555" y="122" class="c3">МИН: a = set()</text>
  <text x="555" y="138" class="c3">  f(x)==0 → a.add(x)</text>
  <text x="555" y="158" class="c3">МАКС: a = set(range(...))</text>
  <text x="555" y="174" class="c3">  f(x)==0 → a.remove(x)</text>
  <line x1="565" y1="69" x2="565" y2="105" class="ln3"/>
</svg>
\`\`\`

### Тип 1 — Числа: найти min/max A

![Задача тип 1: тождественно истинная формула с числами](/tasks/15/type1.png)

\`\`\`python
def f(x, a):
    return ((x % 2 == 0) <= (x % 5 != 0)) or (x + a >= 70)

for a in range(1, 1001):
    if all(f(x, a) == 1 for x in range(1, 10001)):
        print(a)
\`\`\`

**def f(x, a)** — логическая функция из условия. Возвращает True/False.

**\`(x % 2 == 0) <= (x % 5 != 0)\`** — импликация «x чётное → x не делится на 5». Скобки обязательны: \`<=\` имеет приоритет выше \`or\`, поэтому без них логика сломается.

**\`for a in range(1, 1001)\`** — перебираем кандидатов на A. Диапазон подбирай по условию (обычно до 1000–10000). Ищем наименьшее — первый \`print\` и выходим.

**\`all(f(x, a) == 1 for x in range(1, 10001))\`** — True только если f = 1 для абсолютно каждого x. Как только найдёт хоть один x, где f=0 — сразу вернёт False.

### Тип 2 — Отрезки: найти min длину A

![Задача тип 2: отрезки на числовой прямой](/tasks/15/type2.png)

\`\`\`python
def f(x):
    P = 55 <= x <= 80
    Q = 20 <= x <= 105
    A = a1 <= x <= a2
    return Q <= ((P == Q) or ((not P) <= A))

d = [y for x in (55, 80, 20, 105) for y in (x, x + 0.01, x - 0.01)]

m = []
for a1 in d:
    for a2 in d:
        if a2 >= a1 and all(f(x) == 1 for x in d):
            m.append(a2 - a1)
print(min(m))
\`\`\`

**P = 55 <= x <= 80** — двойное неравенство в Python работает напрямую. P равно True если x внутри [55, 80].

**\`d = [y for x in (55,80,20,105) for y in (x, x+0.01, x-0.01)]\`** — берём все граничные точки и добавляем ±0.01 к каждой. Получается 12 контрольных точек.

**Зачем ±0.01?** Логическое выражение с отрезками меняет значение только в граничных точках. Проверить точку, чуть левее и чуть правее — достаточно, чтобы охватить все зоны.

**\`for a1 in d: for a2 in d:\`** — перебираем все пары возможных границ отрезка A из тех же контрольных точек.

**\`m.append(a2 - a1)\`** — запоминаем длину каждого подходящего отрезка. \`min(m)\` — наименьшая длина.

### Тип 3 — Множества: найти min количество элементов A

![Задача тип 3 (минимум): множества](/tasks/15/type3min.png)

\`\`\`python
a = set()

def f(x):
    P = x in {1, 2, 3, 4}
    Q = x in {1, 2, 3, 4, 5, 6}
    A = x in a
    return (not A) <= (not P or not Q)

for x in range(1, 1000):
    if f(x) == 0:
        a.add(x)
print(len(a))
\`\`\`

**a = set()** — начинаем с пустого A. Добавляем только тех, кто нужен.

**A = x in a** — проверяет принадлежность x текущему множеству A.

**\`if f(x) == 0: a.add(x)\`** — если без x в A формула даёт 0, значит x **обязан** быть в A. Добавляем. Это даёт минимально необходимый набор.

### Тип 3 — Множества: найти max количество элементов A

![Задача тип 3 (максимум): множества](/tasks/15/type3max.png)

\`\`\`python
a = set(range(1, 1001))

def f(x):
    P = x in {2, 4, 6, 8, 10, 12, 14, 16, 18, 20}
    Q = x in {5, 10, 15, 20, 25, 30, 35, 40, 45, 50}
    A = x in a
    return (A <= P) or ((not Q) <= (not A))

for x in range(1, 1001):
    if f(x) == 0:
        a.remove(x)
print(len(a))
\`\`\`

**a = set(range(1, 1001))** — начинаем с максимально полного A (все числа 1–1000). Убираем только «запрещённые».

**\`if f(x) == 0: a.remove(x)\`** — если x в A ломает формулу, удаляем его. Всё остальное остаётся — получаем максимум.`,

  practice: [
    {
      question: "Что вернёт выражение `True <= False` в Python?",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" },
        { id: "C", text: "Ошибку" },
        { id: "D", text: "None" }
      ],
      correct: "B",
      explanation: "True <= False — это импликация A→B: из истины следует ложь = ложь. True=1, False=0, 1<=0 = False."
    },
    {
      question: "Что вычислится первым в выражении `not A <= B`?",
      options: [
        { id: "A", text: "not A, потом сравнение с B" },
        { id: "B", text: "A <= B, потом not к результату" },
        { id: "C", text: "Зависит от значений A и B" },
        { id: "D", text: "Синтаксическая ошибка" }
      ],
      correct: "B",
      explanation: "<= имеет ВЫСШИЙ приоритет (1) среди логических, not — приоритет 2. Сначала вычисляется A <= B, потом not к результату. Чтобы получить (not A) <= B — нужны явные скобки."
    },
    {
      question: "В задаче типа 3 на МИНИМУМ — с чего начинаем?",
      options: [
        { id: "A", text: "a = set(range(1, 1001)) и удаляем лишние" },
        { id: "B", text: "a = set() и добавляем x где f(x)==0" },
        { id: "C", text: "a = set() и добавляем x где f(x)==1" },
        { id: "D", text: "Перебираем все подмножества" }
      ],
      correct: "B",
      explanation: "На минимум: a = set(). Перебираем x — если f(x)==0 (формула ложна без x в A), то x обязан быть в A → добавляем. Так собираем ровно необходимый минимум."
    },
    {
      question: "Зачем в типе 2 используется d = [x, x+0.01, x-0.01] для каждой граничной точки?",
      options: [
        { id: "A", text: "Для точности float-арифметики" },
        { id: "B", text: "Формула меняет значение только на границах — ±0.01 проверяет поведение внутри и снаружи каждого отрезка" },
        { id: "C", text: "Чтобы перебрать все действительные числа" },
        { id: "D", text: "Это обязательный синтаксис Python" }
      ],
      correct: "B",
      explanation: "Между границами отрезков логическое выражение постоянно. Достаточно проверить каждую границу и точки чуть левее/правее — это покрывает все возможные зоны поведения формулы."
    },
    {
      question: "all(f(x) for x in range(1,5)) при f(1)=1, f(2)=1, f(3)=0, f(4)=1 вернёт:",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" },
        { id: "C", text: "3" },
        { id: "D", text: "[True, True, False, True]" }
      ],
      correct: "B",
      explanation: "all() возвращает True только если ВСЕ элементы истинны. f(3)=0 (False) — значит all() немедленно вернёт False, не проверяя f(4)."
    }
  ],

  aiContext: `Задание 15 ЕГЭ — анализ логических выражений, поиск параметра A.

Три типа:
1. Числа: for a in range(...): if all(f(x,a)==1 for x in range(...)): print(a)
2. Отрезки: d=[граничные ±0.01], перебор a1,a2 из d, all(f(x) for x in d), min длины
3. Множества мин: a=set(), добавлять x если f(x)==0
   Множества макс: a=set(range(...)), удалять x если f(x)==0

Приоритет Python: <= и == имеют приоритет ВЫШЕ not (not > and > or, но <= и == выше всех).
Всегда расставлять скобки явно!`,

  promptSuggestion: "Объясни задание 15 ЕГЭ по информатике: логические выражения."
};
