import { Calculator } from 'lucide-react';

export default {
  id: "task-14",
  title: "Задание 14: Системы счисления",
  description: "Перевод чисел, сумма цифр, действия в разных СС.",
  icon: Calculator,
  theory: `### Суть задания

Дано число в какой-то системе счисления (СС). Нужно перевести его, найти цифры, сумму, или что-то с ним сделать. Решается через Python.

### Лайфхак: как запомнить направление перевода

\`\`\`svg
<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .ht{fill:#fff;font:bold 14px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .sub{fill:#94a3b8;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .up{fill:#34d399;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .dn{fill:#f87171;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
  </style>
  <marker id="arrowG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
  </marker>
  <marker id="arrowR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
  </marker>
  </defs>

  <rect width="500" height="220" class="bg" rx="8"/>

  <rect x="185" y="20" width="130" height="52" fill="#065f46" rx="8"/>
  <text x="250" y="42" class="ht">10</text>
  <text x="250" y="60" class="sub">десятичная</text>

  <rect x="185" y="148" width="130" height="52" fill="#1e3a5f" rx="8"/>
  <text x="250" y="170" class="ht">N</text>
  <text x="250" y="188" class="sub">другая СС</text>

  <line x1="232" y1="148" x2="232" y2="76" stroke="#34d399" stroke-width="2.5" marker-end="url(#arrowG)"/>
  <line x1="268" y1="76" x2="268" y2="148" stroke="#f87171" stroke-width="2.5" marker-end="url(#arrowR)"/>

  <rect x="20" y="90" width="170" height="40" fill="#0d2d1a" rx="6"/>
  <text x="105" y="106" class="up">↑ В десятичную</text>
  <text x="105" y="122" class="up">= УМНОЖАЕМ</text>

  <rect x="310" y="90" width="170" height="40" fill="#2d0d0d" rx="6"/>
  <text x="395" y="106" class="dn">↓ Из десятичной</text>
  <text x="395" y="122" class="dn">= ДЕЛИМ</text>
</svg>
\`\`\`

Идём **вверх** (в десятичную) — **умножаем** цифры на степени основания.

Идём **вниз** (из десятичной) — **делим** с остатком на основание.

### Карта методов

\`\`\`svg
<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .bg{fill:#0f172a}
    .ctr{fill:#065f46}
    .lft{fill:#1e3a5f}
    .rgt{fill:#1e3a5f}
    .sub{fill:#0f2a1e}
    .warn{fill:#2d1a00}
    .ht{fill:#fff;font:bold 13px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .sm{fill:#cbd5e1;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .gr{fill:#34d399;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .rd{fill:#f87171;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .am{fill:#fbbf24;font:bold 11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .ln{stroke:#334155;stroke-width:1.5;fill:none}
    .lnG{stroke:#34d399;stroke-width:1.5;fill:none}
    .lnR{stroke:#f87171;stroke-width:1.5;fill:none}
  </style></defs>

  <rect width="700" height="290" class="bg" rx="8"/>

  <!-- CENTER: Задание 14 -->
  <rect x="270" y="115" width="160" height="44" class="ctr" rx="8"/>
  <text x="350" y="137" class="ht">Задание 14</text>

  <!-- LEFT: Из 10 сс -->
  <rect x="30" y="115" width="140" height="44" class="lft" rx="8"/>
  <text x="100" y="133" class="ht">Из 10 сс</text>
  <text x="100" y="149" class="sm">↓ ДЕЛИМ</text>
  <line x1="170" y1="137" x2="270" y2="137" class="lnR"/>

  <!-- LEFT sub: функция деления -->
  <rect x="15" y="200" width="170" height="56" class="warn" rx="6"/>
  <text x="100" y="218" class="am">def cc(x, n)</text>
  <text x="100" y="234" class="sm">while x > 0: a.append(x%n)</text>
  <text x="100" y="248" class="rd">⚠ возвращает только список</text>
  <line x1="100" y1="159" x2="100" y2="200" class="lnR"/>

  <!-- RIGHT: В 10 сс -->
  <rect x="530" y="115" width="140" height="44" class="rgt" rx="8"/>
  <text x="600" y="133" class="ht">В 10 сс</text>
  <text x="600" y="149" class="sm">↑ УМНОЖАЕМ</text>
  <line x1="430" y1="137" x2="530" y2="137" class="lnG"/>

  <!-- RIGHT sub 1: int() -->
  <rect x="510" y="25" width="175" height="44" class="sub" rx="6"/>
  <text x="597" y="43" class="gr">СС от 2 до 36</text>
  <text x="597" y="59" class="sm">int('1A3', 16)</text>
  <line x1="597" y1="115" x2="597" y2="69" class="lnG"/>

  <!-- RIGHT sub 2: printable -->
  <rect x="510" y="200" width="175" height="56" class="warn" rx="6"/>
  <text x="597" y="218" class="am">Двузначная цифра x</text>
  <text x="597" y="234" class="sm">int(f'5{printable[x]}3', 19)</text>
  <text x="597" y="250" class="am">или функция со списком</text>
  <line x1="597" y1="159" x2="597" y2="200" class="lnG"/>

</svg>
\`\`\`

### Перевод В десятичную (из любой СС)

#### СС от 2 до 36 — встроенная функция int()

\`\`\`python
int('1A3', 16)   # 419  — из 16-ричной в 10
int('1011', 2)   # 11   — из двоичной в 10
int('ZA', 36)    # 1270 — из 36-ричной в 10
\`\`\`

**int(строка, основание)** — переводит строку с записью числа в заданной СС в десятичное. Работает для оснований 2–36. Цифры больше 9 записываются буквами: A=10, B=11, ..., Z=35.

#### Когда цифра в числе неизвестна — перебираем через printable

![Задача: перевод в 10 СС с неизвестной цифрой](/task14-to10.png)

Когда в задаче неизвестна одна цифра x в числе, записанном в СС ≤ 36, — перебираем её через \`printable\`, подставляя символ в строку для \`int()\`.

\`\`\`python
from string import *

def f(a, n):
    a = a[::-1]
    s = 0
    for i in range(len(a)):
        s += a[i] * n**i
    return s

for x in range(1, 19):
    k = int(f'55{printable[x]}36', 19) + int(f'{printable[x]}2724', 19)
    s = f([5,5,x,3,6], 19) + f([x,2,7,2,4], 19)
    if s % 11 == 0:
        print(x, s // 11)
        print(x, k // 11)
\`\`\`

**for x in range(1, 19)** — перебираем все допустимые цифры 19-ричной СС (от 1 до 18).

**printable[x]** — возвращает символ с индексом x из строки всех печатаемых ASCII-символов. Например, \`printable[10]\` = \`'2'\`, \`printable[15]\` = \`'7'\`. Это нужно для \`int()\`, который принимает строку, а не число.

**f([5,5,x,3,6], 19)** — то же самое, но через функцию перевода с числовым списком. Здесь x — просто целое число, не символ. Оба подхода дают одинаковый результат.

**if s % 11 == 0** — проверяем кратность 11. Нас просят наименьшее x → перебираем с 1, первое подходящее и есть ответ.

#### СС больше 36 — своя функция (список цифр)

Когда основание > 36, букв уже не хватает. Цифры передаём списком целых чисел.

\`\`\`python
def cc10(a, n):
    a = a[::-1]
    s = 0
    for i in range(len(a)):
        s += a[i] * n**i
    return s
\`\`\`

**a[::-1]** — разворот списка: теперь a[0] — цифра единиц, a[1] — цифра n¹, a[2] — цифра n², и т.д.

**a[i] \* n\*\*i** — вклад i-го разряда. Это и есть то самое «умножение» из правила выше.

### Перевод ИЗ десятичной (в любую СС)

![Задача: перевод из 10 СС](/task14-from10.png)

\`\`\`python
def cc(x, n):
    a = []
    while x > 0:
        a.append(x % n)
        x = x // n
    return a[::-1]

for n in range(2, 10):
    if cc(71, n)[-2:] == [1, 3]:
        print(n)
        break
\`\`\`

**a.append(x % n)** — остаток от деления — это очередная цифра числа в новой СС (добавляется с конца).

**x = x // n** — целочисленное деление: «отрезаем» уже извлечённый разряд и идём к следующему.

**a[::-1]** — после цикла цифры идут от младшего к старшему, разворот исправляет порядок.

**cc(71, n)[-2:]** — последние два элемента списка = последние две цифры числа 71 в СС n. Проверяем, равны ли они [1, 3] (то есть запись оканчивается на «13»).

> **Важно:** функция возвращает **только список**. Если нужна строка — делай \`''.join(map(str, cc(x, n)))\`.`,

  practice: [
    {
      question: "Чему равно int('1F', 16)?",
      options: [
        { id: "A", text: "16" },
        { id: "B", text: "31" },
        { id: "C", text: "1F" },
        { id: "D", text: "25" }
      ],
      correct: "B",
      explanation: "int('1F', 16) — перевод из 16-ричной. 1×16¹ + 15×16⁰ = 16 + 15 = 31. Буква F = 15 в 16-ричной СС."
    },
    {
      question: "Наименьшее основание СС, в которой запись числа 71 оканчивается на 13 — это:",
      options: [
        { id: "A", text: "3" },
        { id: "B", text: "4" },
        { id: "C", text: "8" },
        { id: "D", text: "68" }
      ],
      correct: "B",
      explanation: "71 в основании 4: 71 = 1×4³ + 0×4² + 1×4 + 3 = 1013₄. Последние две цифры — 1 и 3. Функция cc(71,4)[-2:] == [1,3]. Ответ: 4."
    },
    {
      question: "Что вернёт функция cc(10, 2) (перевод из 10 в 2)?",
      options: [
        { id: "A", text: "'1010'" },
        { id: "B", text: "[0, 1, 0, 1]" },
        { id: "C", text: "[1, 0, 1, 0]" },
        { id: "D", text: "10" }
      ],
      correct: "C",
      explanation: "10 в двоичной: 10 = 1010₂. Функция cc возвращает список цифр от старшего к младшему: [1, 0, 1, 0]. Строкой не является — только список!"
    },
    {
      question: "Для перевода числа из 50-ричной СС в 10-ричную нужно использовать:",
      options: [
        { id: "A", text: "int('число', 50)" },
        { id: "B", text: "свою функцию cc10(a, n) со списком цифр" },
        { id: "C", text: "hex(число)" },
        { id: "D", text: "bin(число)" }
      ],
      correct: "B",
      explanation: "int() работает только для оснований 2–36. Основание 50 > 36, поэтому нужна своя функция cc10(a, n), которая принимает список цифр и основание."
    },
    {
      question: "Зачем в переборе неизвестной цифры используется printable[x], а не просто x?",
      options: [
        { id: "A", text: "Потому что int() не принимает числа" },
        { id: "B", text: "Потому что int() принимает строку, а printable[x] даёт символ-цифру для подстановки" },
        { id: "C", text: "Потому что printable ускоряет перебор" },
        { id: "D", text: "Потому что x может быть больше 36" }
      ],
      correct: "B",
      explanation: "int(f'5{x}3', 19) не работает, если x=10 — получится '5103', три цифры вместо одной. printable[x] даёт одиночный символ: printable[10]='2', printable[18]=':', и int() интерпретирует его как одну цифру в данной СС."
    }
  ],

  aiContext: `Это задание 14 ЕГЭ по информатике — системы счисления, перевод чисел через Python.

Ключевой лайфхак: В 10 сс = умножаем (идём вверх), Из 10 сс = делим (идём вниз).

Методы:
1. В 10 сс, СС 2-36: int('число', основание)
2. В 10 сс, СС > 36: def cc10(a,n): a=a[::-1]; return sum(a[i]*n**i for i in range(len(a)))
3. Из 10 сс: def cc(x,n): a=[]; while x>0: a.append(x%n); x=x//n; return a[::-1]
4. Неизвестная цифра x: перебор range(1, основание), подстановка через printable[x] в int()
   ИЛИ через числовой список в cc10

Важно: cc() возвращает только список, не строку. Для строки: ''.join(map(str, cc(x,n))).
Проверка последних цифр: cc(x,n)[-2:] == [1,3]`,

  promptSuggestion: "Объясни задание 14 ЕГЭ по информатике: системы счисления."
};
