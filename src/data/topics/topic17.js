import { ListOrdered } from 'lucide-react';

export default {
  id: "task-17",
  title: "Задание 17: Обработка числовой последовательности",
  description: "Поиск троек, сумм, максимумов по условию в файле с числами.",
  icon: ListOrdered,
  theory: `### Суть задания

Дан файл с числами (по одному на строку). Нужно найти количество и/или максимальное/минимальное значение среди пар, троек или отдельных элементов, удовлетворяющих условию.

### Чтение файла

\`\`\`python
a = [int(x) for x in open('17-346.txt')]
\`\`\`

**Файл и скрипт должны лежать в одной папке.** Иначе Python выдаст \`FileNotFoundError\`.

### Вспомогательные функции

Отдельные проверки и вычисления всегда выносим в функции — код становится чище и не повторяется.

**Произведение цифр числа:**

\`\`\`python
from math import *

def pr(x):
    return prod([int(i) for i in str(x)])
\`\`\`

**\`str(x)\`** — переводит число в строку: \`86104\` → \`'86104'\`. Тогда можно перебирать символы.

**\`int(i) for i in str(x)\`** — каждый символ обратно в цифру: \`['8','6','1','0','4']\` → \`[8,6,1,0,4]\`.

**\`prod([...])\`** — произведение всех элементов списка (из модуля \`math\`).

> ⚠️ **ABS WARNING:** если числа могут быть **отрицательными**, \`str(-123)\` = \`'-123'\` — знак «минус» не является цифрой, \`int('-')\` вызовет ошибку. Всегда пиши \`str(abs(x))\`:
> \`\`\`python
> def pr(x):
>     return prod([int(i) for i in str(abs(x))])
> \`\`\`

**Сумма цифр числа:**

\`\`\`python
def s(x):
    return sum(int(i) for i in str(abs(x)))
\`\`\`

### Паттерн fnmatch

\`fnmatch(строка, паттерн)\` — проверяет строку по шаблону, как в поиске файлов.

\`\`\`python
from fnmatch import *

fnmatch('43567862', '43*6*')   # True  — начинается с 43, содержит 6
fnmatch('12345',    '1?3*')    # True  — 1, любой символ, 3, что угодно
fnmatch('9999',     '[0-4]*')  # False — не начинается с 0-4
\`\`\`

\`\`\`svg
<svg viewBox="0 0 500 136" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .hdr{fill:#065f46}.r0{fill:#1e293b}.r1{fill:#0f172a}
    .ht{fill:#fff;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .pat{fill:#fbbf24;font:bold 12px monospace;dominant-baseline:middle}
    .desc{fill:#cbd5e1;font:11px sans-serif;dominant-baseline:middle}
    .ex{fill:#94a3b8;font:10px monospace;dominant-baseline:middle}
    .sep{stroke:#334155;stroke-width:0.5}
  </style></defs>
  <rect width="500" height="28" class="hdr"/>
  <text x="60"  y="14" class="ht">Символ</text>
  <text x="200" y="14" class="ht">Значение</text>
  <text x="390" y="14" class="ht">Пример</text>
  <rect y="28"  width="500" height="27" class="r0"/>
  <text x="60"  y="41" class="pat">*</text>
  <text x="110" y="41" class="desc">Любое количество любых символов</text>
  <text x="340" y="41" class="ex">'43*' → начинается с 43</text>
  <rect y="55"  width="500" height="27" class="r1"/>
  <text x="60"  y="68" class="pat">?</text>
  <text x="110" y="68" class="desc">Ровно один любой символ</text>
  <text x="340" y="68" class="ex">'1?3' → 1, символ, 3</text>
  <rect y="82"  width="500" height="27" class="r0"/>
  <text x="60"  y="95" class="pat">[abc]</text>
  <text x="110" y="95" class="desc">Один из перечисленных символов</text>
  <text x="340" y="95" class="ex">'[135]*' → нечётная цифра</text>
  <rect y="109" width="500" height="27" class="r1"/>
  <text x="60"  y="122" class="pat">[0-9]</text>
  <text x="110" y="122" class="desc">Один символ из диапазона</text>
  <text x="340" y="122" class="ex">'[5-9]*' → ≥ 5 в начале</text>
  <line x1="100" y1="0" x2="100" y2="136" class="sep"/>
  <line x1="320" y1="0" x2="320" y2="136" class="sep"/>
  <rect width="500" height="136" fill="none" stroke="#1e293b" stroke-width="1.5" rx="6"/>
</svg>
\`\`\`

### Как zip делает тройки подряд идущих элементов

\`zip(a, a[1:], a[2:])\` — берёт три смещённые копии списка и соединяет их поэлементно.

\`\`\`svg
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .box{fill:#1e293b;stroke:#334155;stroke-width:1}
    .hbox{fill:#065f46;stroke:#334155;stroke-width:1}
    .tri{fill:#1e3a5f;stroke:#3b82f6;stroke-width:1.5}
    .ht{fill:#fff;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .num{fill:#34d399;font:11px monospace;text-anchor:middle;dominant-baseline:middle}
    .lbl{fill:#94a3b8;font:11px sans-serif;dominant-baseline:middle}
    .arr{stroke:#fbbf24;stroke-width:1.5;fill:none;stroke-dasharray:4,2}
  </style></defs>

  <rect width="560" height="210" class="bg" rx="8"/>

  <!-- Row labels -->
  <text x="45"  y="48"  class="lbl" fill="#60a5fa">a</text>
  <text x="28"  y="88"  class="lbl" fill="#c084fc">a[1:]</text>
  <text x="28"  y="128" class="lbl" fill="#f97316">a[2:]</text>
  <text x="32"  y="175" class="lbl" fill="#fbbf24">zip →</text>

  <!-- Elements: a -->
  <rect x="70"  y="36" width="52" height="24" class="hbox" rx="3"/>
  <rect x="128" y="36" width="52" height="24" class="box" rx="3"/>
  <rect x="186" y="36" width="52" height="24" class="box" rx="3"/>
  <rect x="244" y="36" width="52" height="24" class="box" rx="3"/>
  <rect x="302" y="36" width="52" height="24" class="box" rx="3"/>
  <text x="96"  y="48" class="num" fill="#60a5fa">73597</text>
  <text x="154" y="48" class="num" fill="#60a5fa">42306</text>
  <text x="212" y="48" class="num" fill="#60a5fa">86104</text>
  <text x="270" y="48" class="num" fill="#60a5fa">15112</text>
  <text x="328" y="48" class="num" fill="#60a5fa">40650</text>
  <text x="370" y="48" class="lbl">...</text>

  <!-- Elements: a[1:] -->
  <rect x="128" y="76" width="52" height="24" class="hbox" rx="3"/>
  <rect x="186" y="76" width="52" height="24" class="box" rx="3"/>
  <rect x="244" y="76" width="52" height="24" class="box" rx="3"/>
  <rect x="302" y="76" width="52" height="24" class="box" rx="3"/>
  <text x="154" y="88" class="num" fill="#c084fc">42306</text>
  <text x="212" y="88" class="num" fill="#c084fc">86104</text>
  <text x="270" y="88" class="num" fill="#c084fc">15112</text>
  <text x="328" y="88" class="num" fill="#c084fc">40650</text>
  <text x="370" y="88" class="lbl">...</text>

  <!-- Elements: a[2:] -->
  <rect x="186" y="116" width="52" height="24" class="hbox" rx="3"/>
  <rect x="244" y="116" width="52" height="24" class="box" rx="3"/>
  <rect x="302" y="116" width="52" height="24" class="box" rx="3"/>
  <text x="212" y="128" class="num" fill="#f97316">86104</text>
  <text x="270" y="128" class="num" fill="#f97316">15112</text>
  <text x="328" y="128" class="num" fill="#f97316">40650</text>
  <text x="370" y="128" class="lbl">...</text>

  <!-- Bracket: first triple -->
  <rect x="68" y="155" width="172" height="28" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="154" y="169" fill="#fbbf24" font-size="10" font-family="monospace" text-anchor="middle" dominant-baseline="middle">(73597, 42306, 86104)</text>

  <!-- Bracket: second triple -->
  <rect x="126" y="155" width="172" height="28" fill="#1e2d1e" stroke="#34d399" stroke-width="1.5" rx="4"/>
  <text x="212" y="169" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle" dominant-baseline="middle">(42306, 86104, 15112)</text>

  <!-- Bracket: third triple -->
  <rect x="184" y="155" width="172" height="28" fill="#2d1e1e" stroke="#f97316" stroke-width="1.5" rx="4"/>
  <text x="270" y="169" fill="#f97316" font-size="10" font-family="monospace" text-anchor="middle" dominant-baseline="middle">(86104, 15112, 40650)</text>

  <text x="370" y="169" class="lbl">...</text>
</svg>
\`\`\`

**\`a[1:]\`** — список без первого элемента (сдвиг на 1).

**\`a[2:]\`** — список без первых двух (сдвиг на 2).

**\`zip(...)\`** — берёт по одному элементу из каждого списка и объединяет в кортеж. Заканчивается на самом коротком — то есть автоматически не выходит за границы.

Для **пар** используй \`zip(a, a[1:])\`, для **четвёрок** — \`zip(a, a[1:], a[2:], a[3:])\`.

### Разбор примера

![Задача: тройки чисел, произведение цифр, маска](/task17-example.png)

[📥 Скачать файл 17-346.txt](/17-346.txt)

\`\`\`python
from math import *
from fnmatch import *

a = [int(x) for x in open('17-346.txt')]

def pr(x):
    return prod([int(i) for i in str(x)])

def f(x, y, z):
    p = pr(x) * pr(y) * pr(z)
    return p <= 2*10**9 and fnmatch(str(p), '43*6*')

res = []
for x, y, z in zip(a, a[1:], a[2:]):
    if f(x, y, z):
        res.append(pr(x) * pr(y) * pr(z))

print(len(res), max(res))
\`\`\`

**\`def pr(x)\`** — произведение цифр числа x. Вынесено в функцию, чтобы не повторять три раза.

**\`def f(x, y, z)\`** — проверка тройки. Сначала вычисляем произведение цифр всех трёх чисел, потом проверяем два условия: \`p <= 2·10⁹\` и паттерн \`'43*6*'\`.

**\`p <= 2*10**9 and fnmatch(str(p), '43*6*')\`** — два условия объединены через \`and\`. Если первое ложно — второе не проверяется. Порядок важен: сначала проверка числового ограничения (дёшево), потом строкового паттерна.

**\`res.append(pr(x) * pr(y) * pr(z))\`** — добавляем произведение (не само число!). В условии задано «наибольшее произведение цифр» — именно оно нас интересует.

**\`print(len(res), max(res))\`** — два ответа: количество таких троек и максимальное произведение.`,

  practice: [
    {
      question: "Что вернёт prod([int(i) for i in str(204)]) ?",
      options: [
        { id: "A", text: "6" },
        { id: "B", text: "0" },
        { id: "C", text: "8" },
        { id: "D", text: "Ошибку" }
      ],
      correct: "B",
      explanation: "str(204) = '204', цифры [2, 0, 4], prod([2,0,4]) = 2×0×4 = 0. Если в числе есть цифра 0 — произведение всегда 0."
    },
    {
      question: "Зачем писать str(abs(x)) вместо str(x) при работе с цифрами числа?",
      options: [
        { id: "A", text: "abs() ускоряет работу" },
        { id: "B", text: "str(-123) = '-123', знак '-' не является цифрой и вызовет ошибку при int('-')" },
        { id: "C", text: "Отрицательные числа не встречаются в ЕГЭ" },
        { id: "D", text: "str() не работает с отрицательными числами" }
      ],
      correct: "B",
      explanation: "str(-123) даёт строку '-123'. Когда мы делаем int(i) для каждого символа, встретим '-' и получим ValueError. abs() убирает знак до преобразования."
    },
    {
      question: "Сколько троек вернёт zip(a, a[1:], a[2:]) для списка из 5 элементов?",
      options: [
        { id: "A", text: "5" },
        { id: "B", text: "4" },
        { id: "C", text: "3" },
        { id: "D", text: "6" }
      ],
      correct: "C",
      explanation: "zip заканчивается на самом коротком списке: a[2:] содержит 3 элемента (из 5 убрали первые 2). Значит троек будет 3: (a[0],a[1],a[2]), (a[1],a[2],a[3]), (a[2],a[3],a[4])."
    },
    {
      question: "fnmatch('4386', '43*6*') вернёт:",
      options: [
        { id: "A", text: "False — нет цифры между 43 и 6" },
        { id: "B", text: "True — начинается с 43, содержит 6" },
        { id: "C", text: "Ошибку — нужны только строки" },
        { id: "D", text: "False — * не может быть пустым" }
      ],
      correct: "B",
      explanation: "'4386' проверяем по '43*6*': начинается с '43' ✓, после 43 стоит '8' (это *), потом '6' ✓, после 6 пусто (это тоже * — он может быть пустым) ✓. Результат: True."
    }
  ],

  aiContext: `Задание 17 ЕГЭ — обработка числовой последовательности из файла.

Структура решения:
1. a = [int(x) for x in open('file.txt')]
2. Функции-помощники: pr(x) = prod цифр, s(x) = sum цифр
3. Функция f(x,y,z) для проверки тройки
4. zip(a, a[1:], a[2:]) для троек подряд (пар: zip(a, a[1:]))
5. Собираем res = [], print(len(res), max(res))

ABS WARNING: если числа отрицательные → str(abs(x)), не str(x)!
fnmatch: * = любые символы, ? = один символ, [abc] = один из
prod([int(i) for i in str(x)]) — произведение цифр
Проверки выносить в отдельные функции, не дублировать`,

  promptSuggestion: "Объясни задание 17 ЕГЭ по информатике: обработка числовой последовательности."
};
