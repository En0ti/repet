import { Sigma } from 'lucide-react';

export default {
  id: "task-25",
  title: "Задание 25: Маски и делители чисел",
  description: "Перебор чисел: маски (fnmatch) и поиск делителей. Проверка простоты.",
  icon: Sigma,
  theory: `### Суть задания 25

Программа **перебирает натуральные числа** в заданном диапазоне и ищет те, что обладают нужным свойством (делятся на что-то, подходят под маску, имеют определённые делители, простые и т.п.). Для каждого найденного числа выводят его и какую-то связанную величину. Решается на Python.

Два основных прототипа: **маски** и **делители**.

### Прототип 1. Маски

**Маска** числа — последовательность цифр, в которой также могут встречаться:
- \`?\` — ровно **одна** произвольная цифра;
- \`*\` — **любая** последовательность цифр произвольной длины, **в том числе пустая**.

Проверять соответствие удобно функцией \`fnmatch\` из модуля \`fnmatch\`: \`fnmatch(str(x), 'маска')\` возвращает True/False.

#### Пример (маска 3?1*57, делятся на 3123)

Среди натуральных чисел, не превышающих 10⁸, найти все числа, соответствующие маске \`3?1*57\` и делящиеся на 3123 без остатка. Вывести число и результат деления.

![Задание 25 — маска](/tasks/25/ex-mask.png)

\`\`\`svg
<svg viewBox="0 0 486 250" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="486" height="250" fill="#0f172a" rx="8"/>
  <text x="243.0" y="26" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Маска 3?1*57: ? — одна цифра, * — любая (в т.ч. пустая) последовательность.</text>
  <text x="22" y="72" fill="#64748b" font-family="sans-serif" font-size="11" text-anchor="end">маска</text>
  <rect x="40" y="56" width="46" height="30" rx="5" fill="#1e293b" stroke="#4ade80" stroke-width="1.6"/>
  <text x="63.0" y="71" fill="#4ade80" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">3</text>
  <rect x="98" y="56" width="46" height="30" rx="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.6"/>
  <text x="121.0" y="71" fill="#fbbf24" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">?</text>
  <rect x="156" y="56" width="46" height="30" rx="5" fill="#1e293b" stroke="#4ade80" stroke-width="1.6"/>
  <text x="179.0" y="71" fill="#4ade80" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <rect x="214" y="56" width="104" height="30" rx="5" fill="#1e293b" stroke="#f5a623" stroke-width="1.6"/>
  <text x="266.0" y="71" fill="#f5a623" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">*</text>
  <rect x="330" y="56" width="46" height="30" rx="5" fill="#1e293b" stroke="#4ade80" stroke-width="1.6"/>
  <text x="353.0" y="71" fill="#4ade80" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">5</text>
  <rect x="388" y="56" width="46" height="30" rx="5" fill="#1e293b" stroke="#4ade80" stroke-width="1.6"/>
  <text x="411.0" y="71" fill="#4ade80" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">7</text>
  <text x="22" y="148" fill="#64748b" font-family="sans-serif" font-size="11" text-anchor="end">число</text>
  <rect x="40" y="132" width="46" height="34" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.6"/>
  <text x="63.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">3</text>
  <line x1="63.0" y1="86" x2="63.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="98" y="132" width="46" height="34" rx="5" fill="#3b2f12" stroke="#fbbf24" stroke-width="1.6"/>
  <text x="121.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">6</text>
  <line x1="121.0" y1="86" x2="121.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="156" y="132" width="46" height="34" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.6"/>
  <text x="179.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <line x1="179.0" y1="86" x2="179.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="214" y="132" width="46" height="34" rx="5" fill="#3b2f12" stroke="#f5a623" stroke-width="1.6"/>
  <text x="237.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">9</text>
  <line x1="237.0" y1="86" x2="237.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="272" y="132" width="46" height="34" rx="5" fill="#3b2f12" stroke="#f5a623" stroke-width="1.6"/>
  <text x="295.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">5</text>
  <line x1="295.0" y1="86" x2="295.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="330" y="132" width="46" height="34" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.6"/>
  <text x="353.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">5</text>
  <line x1="353.0" y1="86" x2="353.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="388" y="132" width="46" height="34" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.6"/>
  <text x="411.0" y="150" fill="#e2e8f0" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">7</text>
  <line x1="411.0" y1="86" x2="411.0" y2="132" stroke="#334155" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="243.0" y="200" fill="#cbd5e1" font-family="sans-serif" font-size="11" text-anchor="middle">3619557 = 3 · ?(6) · 1 · *(«95») · 5 · 7  — подходит ✓</text>
  <text x="243.0" y="222" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">fnmatch(str(x), '3?1*57') = True</text>
</svg>
\`\`\`

\`\`\`python
from fnmatch import fnmatch

for x in range(0, 10**8, 3123):     # сразу шагаем по кратным 3123
    if fnmatch(str(x), '3?1*57'):
        print(x, x // 3123)
\`\`\`

**Главная оптимизация:** вместо того чтобы перебирать все числа и проверять \`x % 3123 == 0\`, мы сразу идём с **шагом 3123** — \`range(0, 10**8, 3123)\`. Так перебираются только кратные 3123, и это в тысячи раз быстрее.

Ответ:

\`\`\`
3619557 1159
30165057 9659
31101957 9959
35161857 11259
\`\`\`

> Помни: \`*\` может быть и **пустым**. Поэтому маске \`12*34\` соответствует и число \`1234\` (между 12 и 34 — пустая последовательность).

### Прототип 2. Делители

Ключевой инструмент — функция, собирающая делители числа. Перебираем \`i\` от 2 до корня из x; если \`i\` делит x, то это сразу **два** делителя: \`i\` и \`x // i\`.

\`\`\`python
def divisors(x):
    d = set()
    for i in range(2, int(x**0.5) + 1):   # с 2 — чтобы НЕ включать 1 и само число
        if x % i == 0:
            d |= {i, x // i}             # добавляем оба делителя пары
    return sorted(d)
\`\`\`

- Перебор только **до корня из x** — потому что делители идут парами \`i * (x // i) = x\`, и один из пары всегда не больше корня.
- \`d |= {i, x // i}\` — кладём оба делителя в множество (\`set\` убирает дубликаты, например когда \`i == x // i\` у полного квадрата).
- Старт с **2** (а не с 1) исключает делители **1 и само число** — именно это нужно в большинстве задач 25.

\`\`\`svg
<svg viewBox="0 0 560 276" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="560" height="276" fill="#0f172a" rx="8"/>
  <text x="280.0" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Делители x=36: перебираем i от 2 до корня, каждый делитель i даёт пару x//i.</text>
  <text x="40" y="60" fill="#cbd5e1" font-family="monospace" font-size="13" dominant-baseline="middle">i = 2</text>
  <rect x="110" y="47" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="137" y="60" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">2</text>
  <text x="180" y="60" fill="#64748b" font-family="monospace" font-size="13" dominant-baseline="middle">и x//i =</text>
  <rect x="250" y="47" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="277" y="60" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">18</text>
  <text x="320" y="60" fill="#475569" font-family="monospace" font-size="12" dominant-baseline="middle">в набор: 2 и 18</text>
  <text x="40" y="98" fill="#cbd5e1" font-family="monospace" font-size="13" dominant-baseline="middle">i = 3</text>
  <rect x="110" y="85" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="137" y="98" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">3</text>
  <text x="180" y="98" fill="#64748b" font-family="monospace" font-size="13" dominant-baseline="middle">и x//i =</text>
  <rect x="250" y="85" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="277" y="98" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">12</text>
  <text x="320" y="98" fill="#475569" font-family="monospace" font-size="12" dominant-baseline="middle">в набор: 3 и 12</text>
  <text x="40" y="136" fill="#cbd5e1" font-family="monospace" font-size="13" dominant-baseline="middle">i = 4</text>
  <rect x="110" y="123" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="137" y="136" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">4</text>
  <text x="180" y="136" fill="#64748b" font-family="monospace" font-size="13" dominant-baseline="middle">и x//i =</text>
  <rect x="250" y="123" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="277" y="136" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">9</text>
  <text x="320" y="136" fill="#475569" font-family="monospace" font-size="12" dominant-baseline="middle">в набор: 4 и 9</text>
  <text x="40" y="174" fill="#cbd5e1" font-family="monospace" font-size="13" dominant-baseline="middle">i = 6</text>
  <rect x="110" y="161" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="137" y="174" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">6</text>
  <text x="180" y="174" fill="#64748b" font-family="monospace" font-size="13" dominant-baseline="middle">и x//i =</text>
  <rect x="250" y="161" width="54" height="26" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="277" y="174" fill="#86efac" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">6</text>
  <text x="320" y="174" fill="#475569" font-family="monospace" font-size="12" dominant-baseline="middle">в набор: 6 и 6</text>
  <text x="40" y="224" fill="#cbd5e1" font-family="monospace" font-size="13">делители (без 1 и 36): 2, 3, 4, 6, 9, 12, 18</text>
  <text x="40" y="250" fill="#fbbf24" font-family="sans-serif" font-size="12" font-weight="bold">M = max − min = 18 − 2 = 16</text>
</svg>
\`\`\`

> 🔑 **Проверка простоты тем же приёмом.** Возьмём функцию **без модификации** — с \`range(1, …)\`, то есть со всеми делителями. Если у числа ровно **2** делителя (1 и оно само) — число **простое**:

\`\`\`python
def all_divisors(x):
    d = set()
    for i in range(1, int(x**0.5) + 1):
        if x % i == 0:
            d |= {i, x // i}
    return sorted(d)

# x простое  <=>  len(all_divisors(x)) == 2
\`\`\`

#### Пример (ЕГЭ 2024: M кратно 17)

M — разность максимального и минимального натуральных делителей числа, **не считая 1 и самого числа**. Если таких делителей нет, M = 0. Перебрать целые числа меньше 700000 **по убыванию**, найти первые 5, у которых M **кратно 17** (нуль числу 17 не кратен). Вывести число и M.

![Задание 25 — делители](/tasks/25/ex-div.png)

\`\`\`python
def f(x):
    d = set()
    for i in range(2, int(x**0.5) + 1):
        if x % i == 0:
            d |= {i, x // i}
    return sorted(d)

k = 0
for x in range(700_000 - 1, 1, -1):    # по убыванию
    d = f(x)
    if len(d) > 1:                     # есть собственные делители -> есть и max, и min
        M = max(d) - min(d)
        if M % 17 == 0 and k < 5:
            k += 1
            print(x, M)
\`\`\`

- \`range(700_000 - 1, 1, -1)\` — перебор по убыванию.
- \`len(d) > 1\` гарантирует, что есть и max, и min (иначе собственных делителей нет -> M = 0, а 0 на 17 не кратно).
- \`M % 17 == 0\` — условие задачи; \`k < 5\` — берём только первые пять.

Ответ:

\`\`\`
699996 349996
699962 349979
699933 233308
699928 349962
699894 349945
\`\`\`
`,

  practice: [
    {
      question: "Какое из чисел соответствует маске 12*34? (? — одна цифра, * — любая последовательность, в т.ч. пустая)",
      options: [
        { id: "A", text: "1234" },
        { id: "B", text: "1243" },
        { id: "C", text: "1334" },
        { id: "D", text: "5234" }
      ],
      correct: "A",
      explanation: "Маска требует начало 12 и конец 34, между ними — любая (в т.ч. пустая) последовательность. 1234 = «12» + «» + «34». Остальные либо не начинаются на 12, либо не заканчиваются на 34."
    },
    {
      question: "Нужны числа до 10**8, делящиеся на 3123. Почему пишут range(0, 10**8, 3123), а не перебирают все числа с проверкой x % 3123 == 0?",
      options: [
        { id: "A", text: "Иначе fnmatch не работает" },
        { id: "B", text: "Шаг 3123 сразу перебирает только кратные — это в тысячи раз быстрее" },
        { id: "C", text: "Так требует синтаксис Python" },
        { id: "D", text: "Чтобы числа были по возрастанию" }
      ],
      correct: "B",
      explanation: "range(0, N, 3123) идёт по числам 0, 3123, 6246, … — это сразу все кратные 3123. Проверять делимость не нужно, и перебор короче в 3123 раза."
    },
    {
      question: "В функции делителей цикл идёт for i in range(2, int(x**0.5)+1). Почему достаточно дойти только до корня из x?",
      options: [
        { id: "A", text: "Так быстрее печатается" },
        { id: "B", text: "Делители идут парами i*(x//i)=x, и один из пары всегда не больше корня — второй получаем как x//i" },
        { id: "C", text: "После корня делителей не бывает" },
        { id: "D", text: "Это ограничение set" }
      ],
      correct: "B",
      explanation: "Для каждого делителя i не больше корня есть парный x//i не меньше корня. Перебрав i до корня и добавляя оба, мы соберём все делители, не проходя весь диапазон до x."
    },
    {
      question: "Почему в задачах про «делители, не считая 1 и самого числа» цикл начинают с i = 2, а не с i = 1?",
      options: [
        { id: "A", text: "С 1 будет деление на ноль" },
        { id: "B", text: "При i = 1 в набор попали бы 1 и x//1 = x — то есть 1 и само число, которые исключаются" },
        { id: "C", text: "Это ускоряет цикл вдвое" },
        { id: "D", text: "С 1 функция вернёт пустой список" }
      ],
      correct: "B",
      explanation: "i = 1 даёт пару {1, x}, то есть единицу и само число. По условию их учитывать нельзя, поэтому стартуют с 2 — остаются только собственные делители."
    },
    {
      question: "Как с помощью функции ВСЕХ делителей (range с 1) проверить, что число x простое?",
      options: [
        { id: "A", text: "len(all_divisors(x)) == 0" },
        { id: "B", text: "len(all_divisors(x)) == 1" },
        { id: "C", text: "len(all_divisors(x)) == 2 (только 1 и само число)" },
        { id: "D", text: "max(all_divisors(x)) == x" }
      ],
      correct: "C",
      explanation: "У простого числа ровно два делителя — 1 и оно само. Если функция со стартом с 1 вернула список длиной 2, число простое."
    },
    {
      question: "Для x = 12 делители, не считая 1 и 12, это {2, 3, 4, 6}. Чему равно M = max − min?",
      options: [
        { id: "A", text: "10" },
        { id: "B", text: "4" },
        { id: "C", text: "8" },
        { id: "D", text: "6" }
      ],
      correct: "B",
      explanation: "max = 6, min = 2, M = 6 − 2 = 4."
    }
  ],

  aiContext: `Задание 25 ЕГЭ — программа перебирает натуральные числа в диапазоне и ищет удовлетворяющие свойству (делимость, маска, делители, простота), выводит число + связанную величину. Python.\n\nПРОТОТИП 1 — МАСКИ. Маска: ? = ровно одна цифра, * = любая последовательность цифр (в т.ч. пустая). Проверка: from fnmatch import fnmatch; fnmatch(str(x), 'маска'). Оптимизация делимости: range(0, N, D) — сразу кратные D.\nПример: маска 3?1*57, делятся на 3123, x<=10**8: for x in range(0,10**8,3123): if fnmatch(str(x),'3?1*57'): print(x, x//3123). Ответ: 3619557 1159 / 30165057 9659 / 31101957 9959 / 35161857 11259.\n\nПРОТОТИП 2 — ДЕЛИТЕЛИ. Функция: def f(x): d=set(); for i in range(2,int(x**0.5)+1): if x%i==0: d|={i,x//i}; return sorted(d). До корня — делители парами i*(x//i)=x. Старт с 2 исключает 1 и само число. Проверка простоты: если range НЕ менять (с 1) и len(делителей)==2 — число простое.\nПример ЕГЭ 2024: M=max-min делителей (без 1 и числа), M=0 если нет; числа <700000 по убыванию, первые 5 с M%17==0 (0 не кратно 17). Ответ: 699996 349996 / 699962 349979 / 699933 233308 / 699928 349962 / 699894 349945.`,

  promptSuggestion: "Объясни задание 25 ЕГЭ по информатике: маски чисел (fnmatch) и поиск делителей, проверка простоты."
};
