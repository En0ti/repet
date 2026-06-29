import { Type } from 'lucide-react';

export default {
  id: "task-24",
  title: "Задание 24: Обработка символьной информации",
  description: "Длинная строка из файла — ищем цепочки, подстроки, расстояния. 5 методов решения.",
  icon: Type,
  theory: `### Суть задания

Дан текстовый файл с **очень длинной строкой** (десятки тысяч — миллионы символов). Нужно что-то про неё посчитать. Типичные вопросы:
- самая длинная **цепочка одинаковых** идущих подряд символов;
- самая длинная подстрока, удовлетворяющая правилу;
- сколько раз встречается шаблон, **максимальное расстояние** между символами и т.п.

Строку читаем из файла:

\`\`\`python
s = open('24.txt').readline()  
\`\`\`

> ⚠️ Строка большая — **избегаем лишних вложенных циклов по всей длине**, иначе решение считается минутами. Метод подбираем под конкретный вопрос.

### Пять методов решения (карта)

1. **Разбиение строки** — \`split\`, \`replace\`, срезы; работаем с готовыми кусками.
2. **Динамический метод** — один проход, храним длину текущей цепочки и максимум. 
3. **Метод двух указателей** — два индекса/«окно», для подстрок с ограничением и расстояний.
4. **Регулярные выражения** — модуль \`re\`, шаблон и поиск совпадений.
5. **Метод двойного цикла** — перебор всех подстрок; универсальный, но требует break, иначе медленный.

*Дальше — каждый метод по отдельности.*

### Метод 1. Разбиение строки

Режем строку встроенными средствами и работаем с готовыми кусками. **Как самостоятельный метод сейчас нужен редко**, но приём с \`replace\` (вставить разделитель, чтобы «сломать» нужную подстроку) пригождается и в других методах — его стоит понимать.

**Главный приём — где резать, чтобы каждый кусок оставался максимальным.** Допустим, надо найти самую длинную цепочку, в которой **нет** подстроки \`P\`. Идея: «ломаем» строку на каждом вхождении \`P\`, но так, чтобы по обе стороны от разреза сохранилось как можно больше символов.

Правило: заменяем \`P\` на \`P[:-1] + ' ' + P[1:]\` — левый кусок сохраняет всё, кроме **последнего** символа \`P\`, правый — всё, кроме **первого**. Куски **перекрываются**, поэтому максимум сохраняется с обеих сторон, и при этом ни в одном куске уже нет целого \`P\`.

#### Пример (досрок 2021)

Файл \`24_1.txt\` — не более 1 200 000 символов A, B, C, D, E. Найти **максимальное количество идущих подряд символов, среди которых нет подстроки \`ACCB\`**.

![Задание 24 — условие (досрок 2021)](/tasks/24/ex-split.png)

[📥 Скачать файл 24_1.txt](/tasks/24/24_1.txt) — можно прогнать код и проверить (правильный ответ **1336**).

Здесь \`P = ACCB\`, значит \`P[:-1] = ACC\`, \`P[1:] = CCB\` → заменяем \`ACCB\` на \`ACC CCB\`:

\`\`\`svg
<svg viewBox="0 0 512 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="512" height="300" fill="#0f172a" rx="8"/>
  <text x="256.0" y="28" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Ищем самую длинную цепочку БЕЗ подстроки ACCB. Ломаем строку на каждом ACCB.</text>
  <rect x="24" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="38.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="58" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="72.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D</text>
  <rect x="92" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="106.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">E</text>
  <rect x="126" y="70" width="28" height="36" rx="4" fill="#3b1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="140.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="160" y="70" width="28" height="36" rx="4" fill="#3b1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="174.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="194" y="70" width="28" height="36" rx="4" fill="#3b1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="208.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="228" y="70" width="28" height="36" rx="4" fill="#3b1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="242.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="262" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="276.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="296" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="310.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D</text>
  <rect x="330" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="344.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">E</text>
  <rect x="364" y="70" width="28" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="378.0" y="88" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <text x="177.0" y="126" fill="#f87171" font-family="sans-serif" font-size="11" text-anchor="middle">ACCB — запрещено</text>
  <text x="256.0" y="160" fill="#fbbf24" font-family="monospace" font-size="13" text-anchor="middle">replace('ACCB', 'ACC CCB')  →  split()</text>
  <rect x="24" y="190" width="28" height="36" rx="4" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="38.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="58" y="190" width="28" height="36" rx="4" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="72.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D</text>
  <rect x="92" y="190" width="28" height="36" rx="4" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="106.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">E</text>
  <rect x="126" y="190" width="28" height="36" rx="4" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="140.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="160" y="190" width="28" height="36" rx="4" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="174.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="194" y="190" width="28" height="36" rx="4" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="208.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="250" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="264.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="284" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="298.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="318" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="332.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="352" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="366.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="386" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="400.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D</text>
  <rect x="420" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="434.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">E</text>
  <rect x="454" y="190" width="28" height="36" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="468.0" y="208" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <text x="126" y="246" fill="#4ade80" font-family="sans-serif" font-size="11" text-anchor="middle">кусок 1 = 6</text>
  <text x="369.0" y="246" fill="#818cf8" font-family="sans-serif" font-size="11" text-anchor="middle">кусок 2 = 7 (максимум)</text>
  <text x="256.0" y="288" fill="#94a3b8" font-family="sans-serif" font-size="11" text-anchor="middle">CC повторяются в обоих кусках — это и сохраняет максимум с обеих сторон</text>
</svg>
\`\`\`

\`\`\`python
s = open('24_1.txt').readline()
s = s.replace('ACCB', 'ACC CCB')   # сломали каждое ACCB, сохранив контекст
s = s.split()                      # split() без аргументов режет по пробелам
print(len(max(s, key=len)))        # самый длинный кусок и его длина
\`\`\`

- \`replace('ACCB', 'ACC CCB')\` — в каждом запретном месте вставляем пробел так, что слева остаётся \`...ACC\`, а справа начинается \`CCB...\`. Целого \`ACCB\` больше нет нигде.
- \`split()\` разбивает по пробелам (и выкидывает пустые куски).
- \`max(s, key=len)\` — самый длинный кусок; \`len(...)\` от него — ответ.

**Почему нельзя резать «начисто»** (например \`ACCB → A B\` или \`ACC B\`)? Тогда мы бы потеряли валидные цепочки, которые законно содержат \`ACC\` в конце или \`CCB\` в начале (они не образуют целого \`ACCB\`). Перекрытие \`CC\` как раз и не даёт «отрезать лишнего» — с обеих сторон сохраняется максимально длинный допустимый кусок.


### Метод 2. Динамический метод

Самый частый и универсальный приём. Идём по строке **один раз** и ведём массив \`m\`: в \`m[i]\` храним «сколько у нас сейчас набралось» к позиции i (длину цепочки / число пар). В конце ответ — \`max(m)\`.

Две вещи, которые решают всё: **чем заполнить \`m\` в начале** и **какой диапазон у \`range\`**.

#### Чем заполнять список (стартовое значение)

Стартовое число — это **гарантированный минимум**, который есть всегда, ещё до того как сработает условие:
- считаем **цепочку символов** (по порядку / одинаковых) → \`[1]\`: один символ — это уже цепочка длины 1.
- считаем **пары** (AA, CC…) → \`[0]\`: пока ни одной пары не набрано.
- ищем подстроку **без повтора блока из k символов** → \`[2k−1]\`: подстрока короче 2k физически не может содержать два одинаковых блока подряд, значит такая длина гарантирована. Для троек (k=3, запрет — это 6 символов) старт \`[5]\`.

#### Как считать range и индексы

Диапазон цикла определяется тем, **до какого индекса мы заглядываем**:
- сравниваем \`s[i]\` и \`s[i+1]\` → доходим только до предпоследнего: \`range(len(s)-1)\`.
- читаем \`s[i+5]\` → \`range(len(s)-5)\` (дальше выйдем за строку).
- читаем \`s[i-1]\` → начинаем с 1: \`range(1, len(s))\`.

А «шаг назад» в \`m\` зависит от размера блока: для одиночных символов \`m[i]=m[i-1]+1\`, для **пар** — прыгаем через пару: \`m[i]=m[i-2]+1\`.

#### Пример A. Символы по алфавиту (ДОСРОК 2021)

Файл из символов X, Y, Z. Найти максимальное число подряд идущих символов, **расположенных в алфавитном порядке** (можно с повторами, т.е. неубывающих).

![Задание 24 A — порядок символов](/tasks/24/ex-order.png)

[📥 Скачать файл 24.txt](/tasks/24/24.txt)

\`\`\`python
s = open('24.txt').readline()
m = [1]*len(s)                 # один символ = цепочка длины 1
for i in range(len(s)-1):      # смотрим s[i] и s[i+1] → до предпоследнего
    if s[i] <= s[i+1]:         # порядок не нарушен (<= разрешает повторы)
        m[i] = m[i-1]+1        # цепочка продолжается
print(max(m))                  # 21
\`\`\`

Пока соседи идут по порядку (\`s[i] <= s[i+1]\`), цепочка растёт: \`m[i]=m[i-1]+1\`. Как только порядок сломался — значение остаётся стартовой 1, и счёт начинается заново. На трейсе видно, как растёт и обнуляется цепочка (жёлтым — максимум):

\`\`\`svg
<svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="520" height="210" fill="#0f172a" rx="8"/>
  <text x="260.0" y="26" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Порядок символов: m[i]=m[i-1]+1, если s[i] <= s[i+1]</text>
  <text x="30" y="62" fill="#64748b" font-family="sans-serif" font-size="11">символы s:</text>
  <text x="30" y="150" fill="#64748b" font-family="sans-serif" font-size="11">массив m:</text>
  <rect x="30" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="48.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="30" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="48.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">2</text>
  <rect x="72" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="90.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="72" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="90.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">3</text>
  <rect x="114" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="132.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Y</text>
  <rect x="114" y="122" width="36" height="30" rx="4" fill="#3b2f12" stroke="#fbbf24" stroke-width="1.2"/>
  <text x="132.0" y="138" fill="#fde68a" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">4</text>
  <rect x="156" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="174.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Z</text>
  <rect x="156" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="174.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <rect x="198" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="216.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Y</text>
  <rect x="198" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="216.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">2</text>
  <rect x="240" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="258.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Z</text>
  <rect x="240" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="258.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <text x="30" y="198" fill="#94a3b8" font-family="sans-serif" font-size="11">старт [1] (один символ = цепочка длины 1)  →  ответ = max(m) = 4</text>
</svg>
\`\`\`

**Ответ для файла: 21.**

#### Пример B. Без повтора тройки подряд (Джобс № 1377)

Файл из A–F. Найти максимальную длину подстроки, в которой **ни одна тройка символов не записана два раза подряд** (нельзя фрагмент вида ABCABC).

![Задание 24 B — без повтора тройки](/tasks/24/ex-triple.png)

[📥 Скачать файл 24_1377.txt](/tasks/24/24_1377.txt)

\`\`\`python
s = open('24_1377.txt').readline()
m = [5]*len(s)                                  # старт 5: короче 6 символов повтор тройки невозможен
for i in range(len(s)-5):                       # читаем до s[i+5] → range(len-5)
    if s[i]+s[i+1]+s[i+2] != s[i+3]+s[i+4]+s[i+5]:   # тройка != следующей тройки
        m[i] = m[i-1]+1
print(max(m))                                   # 2278
\`\`\`

Здесь запрещённый фрагмент — это **6** символов (тройка + такая же тройка). Поэтому стартуем с \`[5]\`: подстрока длиной 5 ещё гарантированно «чистая». Сравниваем тройку \`s[i:i+3]\` со следующей \`s[i+3:i+6]\`; раз заглядываем до \`s[i+5]\` — цикл идёт до \`len(s)-5\`.

**Ответ для файла: 2278.**

#### Пример C. Максимум подряд идущих пар AA или CC (Джобс № 5155)

Файл из A, B, C. Найти максимальное количество **подряд идущих пар** AA или CC (подстрока может содержать и AA, и CC).

![Задание 24 C — пары AA/CC](/tasks/24/ex-pair.png)

[📥 Скачать файл 24-204.txt](/tasks/24/24-204.txt)

\`\`\`python
s = open('24-204.txt').readline()
m = [0]*len(s)                                  # пар ещё нет → старт 0
for i in range(1, len(s)):                      # читаем s[i-1] → начинаем с 1
    if s[i]+s[i-1] == 'AA' or s[i]+s[i-1] == 'CC':
        m[i] = m[i-2]+1                          # прыжок через пару: шаг назад на 2
print(max(m))                                   # 1310
\`\`\`

Тут считаем **пары**, поэтому старт \`[0]\`, и при найденной паре прыгаем назад на 2 (\`m[i-2]\`) — это конец предыдущей пары. Трейс показывает, как счётчик пар растёт по обеим зонам (AA и CC соединяются, ведь подстрока может содержать оба вида пар):

\`\`\`svg
<svg viewBox="0 0 564 210" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="564" height="210" fill="#0f172a" rx="8"/>
  <text x="282.0" y="26" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Пары AA/CC: m[i]=m[i-2]+1, если s[i]+s[i-1] это AA или CC</text>
  <text x="30" y="62" fill="#64748b" font-family="sans-serif" font-size="11">символы s:</text>
  <text x="30" y="150" fill="#64748b" font-family="sans-serif" font-size="11">массив m:</text>
  <rect x="30" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="48.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="30" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="48.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">0</text>
  <rect x="72" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="90.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="72" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="90.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <rect x="114" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="132.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="114" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="132.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <rect x="156" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="174.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="156" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="174.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">2</text>
  <rect x="198" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="216.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="198" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="216.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">2</text>
  <rect x="240" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="258.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="240" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="258.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">0</text>
  <rect x="282" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="300.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="282" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="300.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">3</text>
  <rect x="324" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="342.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="324" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="342.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <rect x="366" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="384.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="366" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="384.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">4</text>
  <rect x="408" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="426.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="408" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="426.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">2</text>
  <rect x="450" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="468.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="450" y="122" width="36" height="30" rx="4" fill="#3b2f12" stroke="#fbbf24" stroke-width="1.2"/>
  <text x="468.0" y="138" fill="#fde68a" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">5</text>
  <rect x="492" y="66" width="36" height="30" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="510.0" y="82" fill="#e2e8f0" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="492" y="122" width="36" height="30" rx="4" fill="#0b1220" stroke="#334155" stroke-width="1.2"/>
  <text x="510.0" y="138" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">0</text>
  <text x="30" y="198" fill="#94a3b8" font-family="sans-serif" font-size="11">старт [0] (пар ещё нет); шаг назад на 2 — через пару  →  ответ = max(m) = 5</text>
</svg>
\`\`\`

**Ответ для файла: 1310.**



### Метод 3. Метод двух указателей (скользящее окно)

**Когда применять:** вопрос вида «самая длинная подстрока, в которой чего-то *не больше N*» (не более 5 букв A/B/X, не более k нулей и т.п.). Двойным циклом это медленно — а двумя указателями решается за один проход.

**Идея.** Держим окно \`[l, r]\`. Правый указатель \`r\` на каждом шаге сдвигается вперёд (расширяет окно) и «впускает» новый символ. В \`k\` считаем, сколько в окне «особых» символов. Как только условие нарушилось (особых стало больше лимита) — двигаем левый указатель \`l\` вправо, пока окно снова не станет допустимым. Длина окна = \`r − l + 1\`; максимум этих длин и есть ответ.

**Почему это быстро:** оба указателя двигаются только вперёд и каждый максимум \`len(s)\` раз → суммарно O(n). На миллионе символов работает мгновенно, в отличие от двойного цикла.

#### Пример: не более 5 букв A/B/X подряд

Файл \`24-1.txt\` — только заглавные латинские буквы (A…Z). Найти максимальное количество идущих подряд символов, среди которых буквы A, B и X **суммарно встречаются не более 5 раз**.

![Задание 24 — два указателя](/tasks/24/ex-twopointers.png)

[📥 Скачать файл 24-1.txt](/tasks/24/24-1.txt)

\`\`\`python
s = open('24-1.txt').readline()
k = 0                       # сколько A/B/X сейчас в окне
l = 0                       # левый указатель
m = []
for r in range(len(s)):     # правый указатель — расширяем окно
    if s[r] in 'ABX': k += 1
    while k > 5:             # особых стало больше 5 — сужаем окно слева
        if s[l] in 'ABX': k -= 1
        l += 1
    m.append(r - l + 1)      # длина текущего допустимого окна
print(max(m))                # 64
\`\`\`

По строчкам:
- \`r\` — правый край: на каждом шаге сдвигается на 1 и впускает новый символ; если он из \`ABX\`, увеличиваем \`k\`.
- \`while k > 5\` — пока ограничение нарушено, двигаем \`l\` вправо; если выкинутый символ из \`ABX\`, уменьшаем \`k\`. Так окно снова становится допустимым.
- \`r − l + 1\` — длина окна \`[l..r]\`; складываем в \`m\`, в конце берём \`max(m)\`.

На мини-примере (для наглядности лимит = 3) видно, как окно расширяется вправо, а при переборе лимита подтягивается слева:

\`\`\`svg
<svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="520" height="400" fill="#0f172a" rx="8"/>
  <text x="260.0" y="26" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Окно [l..r]: A/B/X (оранжевые) — не более 3. Длина окна = r − l + 1.</text>
  <text x="40" y="58" fill="#fbbf24" font-family="sans-serif" font-size="12" font-weight="bold">1) r дошёл до 5: в окне 3 спец-символа — ок, длина 6 (максимум)</text>
  <rect x="40" y="78" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="59.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="84" y="78" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="103.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="128" y="78" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="147.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="172" y="78" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="191.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="216" y="78" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="235.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="260" y="78" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="279.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="304" y="78" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="323.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="348" y="78" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="367.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="392" y="78" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="411.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="436" y="78" width="38" height="38" rx="4" fill="#0b1220" stroke="#475569" stroke-width="1.3"/>
  <text x="455.0" y="97" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="38" y="72" width="262" height="50" rx="6" fill="none" stroke="#4ade80" stroke-width="2.5"/>
  <text x="59.0" y="138" fill="#4ade80" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">l=0</text>
  <text x="279.0" y="138" fill="#60a5fa" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">r=5</text>
  <text x="40" y="190" fill="#fbbf24" font-family="sans-serif" font-size="12" font-weight="bold">2) r=6 добавил A → спец-символов стало 4 (&gt; 3): сужаем окно слева</text>
  <rect x="40" y="210" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="59.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="84" y="210" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="103.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="128" y="210" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="147.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="172" y="210" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="191.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="216" y="210" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="235.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="260" y="210" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="279.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="304" y="210" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="323.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="348" y="210" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="367.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="392" y="210" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="411.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="436" y="210" width="38" height="38" rx="4" fill="#0b1220" stroke="#475569" stroke-width="1.3"/>
  <text x="455.0" y="229" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="38" y="204" width="306" height="50" rx="6" fill="none" stroke="#f87171" stroke-width="2.5"/>
  <text x="59.0" y="270" fill="#4ade80" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">l=0</text>
  <text x="323.0" y="270" fill="#60a5fa" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">r=6</text>
  <text x="40" y="300" fill="#4ade80" font-family="sans-serif" font-size="12" font-weight="bold">3) l ушёл за лишний спец-символ (A на позиции 1) → снова 3, окно [2..6], длина 5</text>
  <rect x="40" y="316" width="38" height="38" rx="4" fill="#0b1220" stroke="#475569" stroke-width="1.3"/>
  <text x="59.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="84" y="316" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="103.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="128" y="316" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="147.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="172" y="316" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="191.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="216" y="316" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="235.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="260" y="316" width="38" height="38" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
  <text x="279.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="304" y="316" width="38" height="38" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="1.3"/>
  <text x="323.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="348" y="316" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="367.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="392" y="316" width="38" height="38" rx="4" fill="#3b2412" stroke="#fb923c" stroke-width="1.3"/>
  <text x="411.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>
  <rect x="436" y="316" width="38" height="38" rx="4" fill="#0b1220" stroke="#475569" stroke-width="1.3"/>
  <text x="455.0" y="335" fill="#e2e8f0" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="126" y="310" width="218" height="50" rx="6" fill="none" stroke="#4ade80" stroke-width="2.5"/>
  <text x="147.0" y="376" fill="#4ade80" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">l=2</text>
  <text x="323.0" y="376" fill="#60a5fa" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">r=6</text>
</svg>
\`\`\`

Ключевая мысль: \`l\` **никогда не откатывается назад**. Именно поэтому два указателя — это один проход, а не вложенный перебор.

**Ответ для файла: 64.**


### Метод 4. Регулярные выражения

Самый «теоретический» метод, но часто самый короткий код. Регулярка — это **шаблон**, описывающий искомые подстроки; модуль \`re\` находит все совпадения по шаблону.

#### Когда брать регулярки, а когда — нет

**ДА** — когда шаблон сложный/составной, и другими методами выходит громоздко.

**НЕТ**, если задача узнаётся по приметам других методов:
- есть **запрещённые комбинации** → метод замены (\`replace\`, метод 1);
- нужно **посимвольное сравнение** соседей → динамика (метод 2);
- «**не более N** определённых символов» → два указателя (метод 3).

#### Шпаргалка по синтаксису

\`\`\`svg
<svg viewBox="0 0 560 452" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="560" height="452" fill="#0f172a" rx="8"/>
  <rect x="0" y="0" width="560" height="30" fill="#1e293b"/>
  <text x="20" y="15" fill="#e2e8f0" font-family="monospace" font-size="12" font-weight="bold" dominant-baseline="middle">конструкция</text>
  <text x="170" y="15" fill="#e2e8f0" font-family="sans-serif" font-size="12" font-weight="bold" dominant-baseline="middle">что значит</text>
  <rect x="0" y="24" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="39" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">[ABC]</text>
  <text x="170" y="39" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">один символ из набора: A, B или C</text>
  <text x="20" y="69" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">[A-Z]</text>
  <text x="170" y="69" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">один символ из диапазона (любая заглавная)</text>
  <rect x="0" y="84" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="99" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">[0-9]</text>
  <text x="170" y="99" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">одна цифра</text>
  <text x="20" y="129" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">[^CDE]</text>
  <text x="170" y="129" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">любой символ, КРОМЕ C, D, E</text>
  <rect x="0" y="144" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="159" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">.</text>
  <text x="170" y="159" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">любой одиночный символ</text>
  <text x="20" y="189" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">*</text>
  <text x="170" y="189" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">ноль или больше повторений</text>
  <rect x="0" y="204" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="219" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">+</text>
  <text x="170" y="219" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">одно или больше повторений</text>
  <text x="20" y="249" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">{5}</text>
  <text x="170" y="249" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">ровно 5 повторений</text>
  <rect x="0" y="264" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="279" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">{1,3}</text>
  <text x="170" y="279" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">от 1 до 3 повторений</text>
  <text x="20" y="309" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">[AB]+</text>
  <text x="170" y="309" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">подряд A или B вперемешку: ABBA...</text>
  <rect x="0" y="324" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="339" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">(AB)+</text>
  <text x="170" y="339" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">пары AB подряд: ABAB...</text>
  <text x="20" y="369" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">\+  \.  \*</text>
  <text x="170" y="369" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">служебный символ как обычный (экранир.)</text>
  <rect x="0" y="384" width="560" height="30" fill="#0b1220"/>
  <text x="20" y="399" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold" dominant-baseline="middle">(?=(...))</text>
  <text x="170" y="399" fill="#cbd5e1" font-family="sans-serif" font-size="12" dominant-baseline="middle">поиск с ПЕРЕСЕЧЕНИЯМИ (lookahead)</text>
</svg>
\`\`\`

Что важно не путать:
- \`[AB]+\` — это **любые** A или B вперемешку подряд (ABBA…); \`(AB)+\` — именно повторяющиеся **пары** AB (ABAB…).
- \`(...)\` — группа («запоминающие скобки»), к ней потом обращаются как \`group(1)\`.
- служебные символы (\`. + * [ ] ( ) { }\`) превращаем в обычные через обратный слэш: \`\.\`, \`\+\`, \`\*\`.
- \`(?=(...))\` — опережающая проверка (lookahead); нужна, чтобы ловить **пересекающиеся** совпадения (об этом ниже).

#### Поиск в Python

\`\`\`python
from re import finditer

s = open('24.txt').readline()
reg = r'...'                                    # шаблон; r'' — «сырая» строка
print(len(max((x.group() for x in finditer(reg, s)), key=len)))
\`\`\`

- \`finditer(reg, s)\` возвращает **все** совпадения; у каждого \`x.group()\` — текст совпадения.
- \`r'...'\` — raw-строка: чтобы \`\d\`, \`\+\` и т.п. не воспринимались Python'ом как спецпоследовательности.
- \`max(..., key=len)\` — самое длинное совпадение; \`len(...)\` от него — обычно и есть ответ.

#### Пример 1 (А. Калинин, 24-215): пары «буква + цифра»

Файл из A, B, C и цифр 1, 2, 3. Найти максимальное количество идущих подряд пар вида «буква + цифра».

![Задание 24 — регулярки, пары буква+цифра](/tasks/24/ex-regex1.png)

[📥 Скачать файл 24-215.txt](/tasks/24/24-215.txt)

Пара = \`[ABC][123]\` (буква, затем цифра); подряд таких пар = \`([ABC][123])+\`.

\`\`\`python
from re import finditer
s = open('24-215.txt').readline()
reg = r'([ABC][123])+'
print(len(max((x.group() for x in finditer(reg, s)), key=len)) // 2)   # 183
\`\`\`

\`group()\` — это вся цепочка пар (буква+цифра+буква+цифра…), её длина чётная, а **число пар = длина // 2**. Поэтому в конце делим на 2. **Ответ: 183.**

#### Пример 2 (Демо-2025, 24-319): арифметическое выражение + lookahead

Файл из знаков «-», «*» и цифр 0, 6, 7, 8, 9. Найти макс. длину непрерывного **корректного арифметического выражения** (целые неотрицательные числа, без ведущих нулей, два знака операций не стоят рядом, 0 — без знака).

![Задание 24 — регулярки, арифметическое выражение](/tasks/24/ex-regex2.png)

[📥 Скачать файл 24-319.txt](/tasks/24/24-319.txt)

Собираем шаблон по кусочкам:
- число без ведущих нулей: \`numb = ([1-9][0-9]*|0)\` — либо начинается с 1–9 и дальше любые цифры, либо одиночный \`0\`;
- выражение: число, затем один-или-более раз «(операция)(число)»: \`numb([-*]numb)+\`;
- оборачиваем в lookahead \`(?=(...))\`, чтобы находить пересекающиеся варианты.

\`\`\`python
from re import finditer
s = open('24-319.txt').readline()
numb = r'([1-9][0-9]*|0)'
reg  = rf'{numb}([-*]{numb})+'
reg  = rf'(?=({reg}))'                       # lookahead → ловим пересечения
print(len(max((x.group(1) for x in finditer(reg, s)), key=len)))   # 140
\`\`\`

- \`[-*]\` — дефис или звёздочка (внутри \`[]\` дефис в начале/конце литерален, экранировать не надо).
- \`rf'...'\` — raw + f-строка: можно подставлять \`{numb}\` и при этом не ломать спецсимволы.
- внутри lookahead стоит группа \`(...)\`, поэтому само выражение достаём через \`x.group(1)\`.

**Почему нужен lookahead.** Обычный \`finditer\` ищет **непересекающиеся** совпадения: найдя одно, движется дальше за ним и не пробует старты «внутри» уже найденного. А самое длинное корректное выражение может начинаться в такой «съеденной» позиции. \`(?=(...))\` проверяет **каждую** стартовую позицию, ничего не потребляя, — и подходящая подстрока сохраняется в \`group(1)\`. **Ответ: 140.**


### Метод 5. Метод двойного цикла

«Грубая сила»: перебираем **все подстроки** двумя вложенными циклами (\`l\` — левый край, \`r\` — правый) и проверяем условие. Берём, когда условие сложное/составное и остальные методы неудобны. Но в лоб это O(n²) — на миллионе символов не успеет. **Всё решает правильный \`break\`.**

#### Главный приём — break при необратимом нарушении

Как только подстрока нарушила условие так, что **расширением вправо это уже не исправить** — выходим из внутреннего цикла (\`break\`). Удлинять окно бессмысленно: нарушение никуда не денется. Именно это превращает «медленный квадрат» в рабочее решение.

\`\`\`svg
<svg viewBox="0 0 530 240" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="530" height="240" fill="#0f172a" rx="8"/>
  <text x="265.0" y="28" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Зафиксировали l=0, двигаем r вправо. Как только окно стало НЕВОЗМОЖНО спасти — break.</text>
  <rect x="40" y="80" width="42" height="42" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.4"/>
  <text x="61.0" y="101" fill="#e2e8f0" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="90" y="80" width="42" height="42" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.4"/>
  <text x="111.0" y="101" fill="#e2e8f0" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="140" y="80" width="42" height="42" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.4"/>
  <text x="161.0" y="101" fill="#e2e8f0" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D</text>
  <rect x="190" y="80" width="42" height="42" rx="5" fill="#7c2d12" stroke="#fb923c" stroke-width="1.4"/>
  <text x="211.0" y="101" fill="#e2e8f0" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D</text>
  <rect x="240" y="80" width="42" height="42" rx="5" fill="#7c2d12" stroke="#fb923c" stroke-width="1.4"/>
  <text x="261.0" y="101" fill="#e2e8f0" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">S</text>
  <rect x="290" y="80" width="42" height="42" rx="5" fill="#0b1220" stroke="#334155" stroke-width="1.4"/>
  <text x="311.0" y="101" fill="#64748b" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A</text>
  <rect x="340" y="80" width="42" height="42" rx="5" fill="#0b1220" stroke="#334155" stroke-width="1.4"/>
  <text x="361.0" y="101" fill="#64748b" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B</text>
  <rect x="390" y="80" width="42" height="42" rx="5" fill="#0b1220" stroke="#334155" stroke-width="1.4"/>
  <text x="411.0" y="101" fill="#64748b" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">0</text>
  <rect x="440" y="80" width="42" height="42" rx="5" fill="#0b1220" stroke="#334155" stroke-width="1.4"/>
  <text x="461.0" y="101" fill="#64748b" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C</text>
  <rect x="38" y="74" width="246" height="54" rx="7" fill="none" stroke="#f87171" stroke-width="2.5"/>
  <text x="61.0" y="142" fill="#4ade80" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">l=0</text>
  <text x="261.0" y="142" fill="#60a5fa" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">r=4</text>
  <text x="284" y="101" fill="#f87171" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">⟵</text>
  <text x="308" y="101" fill="#f87171" font-family="sans-serif" font-size="13" font-weight="bold" dominant-baseline="middle">break</text>
  <text x="161.0" y="64" fill="#fb923c" font-family="sans-serif" font-size="11" text-anchor="middle">в окне появилось «DS»</text>
  <text x="265.0" y="196" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">break срабатывает при ПЕРВОМ необратимом нарушении: лишний D, «DS», «SD» или цифра.</text>
  <text x="265.0" y="216" fill="#94a3b8" font-family="sans-serif" font-size="11" text-anchor="middle">Расширять окно дальше бессмысленно — нарушение уже не исчезнет. Серые клетки даже не проверяем.</text>
</svg>
\`\`\`

#### Вторая оптимизация — старт r с l + m

Внутренний цикл начинаем не с \`l\`, а с \`l + m\` (где \`m\` — текущий максимум). Нас интересуют только подстроки **длиннее уже найденной** — более короткие проверять незачем.

#### Пример (А. Минак, 24-293)

Файл — заглавные латинские буквы и цифры. Найти макс. длину подстроки, которая содержит **ровно 100** символов D, **не содержит цифр** и **не содержит** сочетаний DS и SD.

![Задание 24 — двойной цикл](/tasks/24/ex-doubleloop.png)

[📥 Скачать файл 24-293.txt](/tasks/24/24-293.txt)

Сначала упрощаем «нет цифр»: заменяем все цифры 1–9 на 0 — тогда «нет цифр» превращается в «нет \`0\`».

\`\`\`python
s = open('24-293.txt').readline()
for x in '123456789':
    s = s.replace(x, '0')          # любая цифра → '0' (проверять одну '0' проще)
m = 0
for l in range(len(s)):
    for r in range(l + m, len(s)):        # r с l+m: только то, что длиннее текущего max
        c = s[l:r+1]
        if c.count('D') > 100 or 'DS' in c or 'SD' in c or '0' in c:
            break                          # необратимое нарушение — дальше бессмысленно
        elif c.count('D') == 100:
            m = max(m, len(c))
print(m)                                   # 644
\`\`\`

Почему \`break\` именно на этих условиях:
- \`count('D') > 100\` — лишних D расширением не убрать → break.
- \`'DS' / 'SD' in c\` — запретная пара появилась и останется → break.
- \`'0' in c\` — цифра попала в окно и останется → break.

А \`count('D') == 100\` — это **валидный кандидат**: обновляем \`m\` (окно ещё можно тянуть дальше не-D символами, оставаясь на 100 D), поэтому здесь **не** break.

Без \`break\` внутренний цикл всегда доходил бы до конца строки — это O(n²) и таймаут на 10⁶. С \`break\` он обрывается на первом же нарушении, и работы кратно меньше. **Ответ: 644.**
`,

  practice: [
    {
      question: "Строка BDEACCBBDEA, ищем самую длинную цепочку без подстроки ACCB. После s.replace('ACCB','ACC CCB').split() получаются куски — какой ответ?",
      options: [
        { id: "A", text: "11" },
        { id: "B", text: "7" },
        { id: "C", text: "6" },
        { id: "D", text: "4" }
      ],
      correct: "B",
      explanation: "ACCB стоит в середине: BDE|ACCB|BDEA. Замена даёт BDEACC CCBBDEA, split вернёт ['BDEACC' (6), 'CCBBDEA' (7)]. Самый длинный кусок — 7."
    },
    {
      question: "Нужно найти самую длинную подстроку, в которой не более 3 нулей. Какой метод подходит лучше всего?",
      options: [
        { id: "A", text: "Разбиение строки (replace)" },
        { id: "B", text: "Регулярные выражения" },
        { id: "C", text: "Два указателя (скользящее окно)" },
        { id: "D", text: "Динамика по парам" }
      ],
      correct: "C",
      explanation: "Формулировка «не более N определённых символов» — прямой признак метода двух указателей: окно расширяем вправо, а при превышении лимита сужаем слева."
    },
    {
      question: "Динамика: ищем подстроку без повтора блока из 4 символов (запрещён фрагмент из 8 символов). Чем инициализировать массив m?",
      options: [
        { id: "A", text: "[4]*len(s)" },
        { id: "B", text: "[8]*len(s)" },
        { id: "C", text: "[7]*len(s)" },
        { id: "D", text: "[1]*len(s)" }
      ],
      correct: "C",
      explanation: "Запрет — блок длиной 2*4 = 8 символов. Подстрока длиной 7 ещё не может его содержать, поэтому гарантированный минимум — [7] (общая формула [2k-1])."
    },
    {
      question: "Команды +1 и порядок по алфавиту. Для строки XXYZYX чему равно максимальное число подряд идущих символов в алфавитном порядке?",
      options: [
        { id: "A", text: "6" },
        { id: "B", text: "4" },
        { id: "C", text: "3" },
        { id: "D", text: "2" }
      ],
      correct: "B",
      explanation: "Неубывающая цепочка XXYZ имеет длину 4 (X<=X<=Y<=Z). На Z->Y порядок ломается, дальше максимум 1. Ответ 4."
    },
    {
      question: "Метод двух указателей. В строке AABAA ищем макс. число подряд символов, где 'A' встречается не более 2 раз. Чему равен ответ?",
      options: [
        { id: "A", text: "5" },
        { id: "B", text: "2" },
        { id: "C", text: "3" },
        { id: "D", text: "4" }
      ],
      correct: "C",
      explanation: "Любое окно с 3 буквами A недопустимо. Самое длинное допустимое — ABA (две A), длина 3. При попытке захватить третью A окно сужается слева."
    },
    {
      question: "Файл из цифр 0-9 и букв A, B, C. Нужны идущие подряд пары вида «цифра + буква». Какой шаблон верный?",
      options: [
        { id: "A", text: "r'[0-9ABC]+'" },
        { id: "B", text: "r'([0-9][ABC])+'" },
        { id: "C", text: "r'[0-9]+[ABC]+'" },
        { id: "D", text: "r'(0-9)(ABC)+'" }
      ],
      correct: "B",
      explanation: "Пара = цифра, затем буква: [0-9][ABC]. Повторяющиеся пары подряд — это группа в скобках с плюсом: ([0-9][ABC])+. Вариант [0-9ABC]+ ловит любую смесь, а не строгие пары."
    },
    {
      question: "Что выведет код: s='AABBA'; print(len(max(s.replace('AB','A B').split(), key=len)))?",
      options: [
        { id: "A", text: "5" },
        { id: "B", text: "2" },
        { id: "C", text: "3" },
        { id: "D", text: "1" }
      ],
      correct: "C",
      explanation: "В AABBA одно вхождение AB (индексы 1-2). Замена даёт 'AA BBA', split вернёт ['AA' (2), 'BBA' (3)]. Самый длинный кусок — 3."
    },
    {
      question: "Двойной цикл, задача «ровно 100 D, без цифр, без DS и SD». Какое условие НЕ должно вызывать break?",
      options: [
        { id: "A", text: "c.count('D') > 100" },
        { id: "B", text: "'SD' in c" },
        { id: "C", text: "c.count('D') == 100" },
        { id: "D", text: "цифра попала в окно" }
      ],
      correct: "C",
      explanation: "Ровно 100 символов D — валидный кандидат: обновляем максимум и можем тянуть окно дальше не-D символами. break — только для необратимых нарушений (лишний D, запретная пара, цифра)."
    },
    {
      question: "Ученик пишет: for i in range(len(s)): if s[i] <= s[i+1]: ... Что сломается?",
      options: [
        { id: "A", text: "Ничего, всё верно" },
        { id: "B", text: "На последнем i обращение к s[i+1] выйдет за границу строки (ошибка)" },
        { id: "C", text: "Цикл не запустится" },
        { id: "D", text: "Сравнение всегда вернёт False" }
      ],
      correct: "B",
      explanation: "Раз читаем s[i+1], i должен доходить только до предпоследнего символа: range(len(s)-1). Иначе на последней итерации s[i+1] — выход за границу (IndexError)."
    },
    {
      question: "В задаче нужно, чтобы в подстроке НЕ встречалось сочетание 'XYZ'. Какой приём проще всего применить?",
      options: [
        { id: "A", text: "Регулярка с lookahead" },
        { id: "B", text: "Замена: s.replace('XYZ','XY YZ').split() и взять самый длинный кусок" },
        { id: "C", text: "Два указателя по числу X" },
        { id: "D", text: "Двойной цикл без break" }
      ],
      correct: "B",
      explanation: "«Запрещённая комбинация» — признак метода разбиения. Ломаем каждое XYZ на XY и YZ (с перекрытием Y), сохраняя максимум с обеих сторон, и берём len(max(..., key=len))."
    }
  ],

  aiContext: `Задание 24 ЕГЭ — обработка длинной символьной строки из файла. Читаем: s = open('24.txt').readline() (или .read().strip()). Строка большая — избегаем лишних вложенных циклов.

5 методов: 1) разбиение строки (split/replace/срезы); 2) динамический (один проход, длина текущей цепочки + максимум) — самый частый; 3) два указателя; 4) регулярные выражения (re); 5) двойной цикл (медленный).

МЕТОД 1 — разбиение строки. Как самостоятельный метод нужен редко, но приём replace важен. Чтобы найти самую длинную цепочку БЕЗ подстроки P: заменить P на P[:-1] + ' ' + P[1:] (перекрытие сохраняет максимум с обеих сторон), затем split() и взять самый длинный кусок: len(max(s, key=len)).
Пример (досрок 2021): файл 24_1.txt, символы A-E, макс. число подряд идущих символов без подстроки ACCB:
s = open('24_1.txt').readline()
s = s.replace('ACCB','ACC CCB')
s = s.split()
print(len(max(s, key=len)))
Нельзя резать начисто (ACCB->'A B'): потеряются валидные цепочки с ACC в конце или CCB в начале. Перекрытие CC это предотвращает.

МЕТОД 2 — динамический (самый частый). Один проход, массив m, ответ = max(m). Главное: чем инициализировать m и какой range.
Инициализация = гарантированный минимум: цепочка символов → [1] (один символ уже цепочка); пары → [0] (пар нет); подстрока без повтора блока из k символов → [2k-1] (для троек запрет 6 символов → [5]).
range зависит от самого дальнего читаемого индекса: читаем s[i+1] → range(len(s)-1); s[i+5] → range(len(s)-5); s[i-1] → range(1,len(s)). Шаг назад в m: для одиночных m[i]=m[i-1]+1, для пар m[i]=m[i-2]+1 (прыжок через пару).
Примеры:
A) X,Y,Z, макс. подряд по алфавиту (неубыв.): m=[1]*len(s); for i in range(len(s)-1): if s[i]<=s[i+1]: m[i]=m[i-1]+1; print(max(m)) → 21.
B) A-F, без повтора тройки подряд (нет ABCABC): m=[5]*len(s); for i in range(len(s)-5): if s[i]+s[i+1]+s[i+2]!=s[i+3]+s[i+4]+s[i+5]: m[i]=m[i-1]+1; print(max(m)) → 2278.
C) A,B,C, макс. подряд пар AA или CC: m=[0]*len(s); for i in range(1,len(s)): if s[i]+s[i-1] in ('AA','CC'): m[i]=m[i-2]+1; print(max(m)) → 1310.

МЕТОД 3 — два указателя (скользящее окно). Для вопросов «самая длинная подстрока, в которой чего-то НЕ БОЛЬШЕ N». Держим окно [l,r]: r двигается каждый шаг (расширяет окно), в k считаем особые символы; пока k>лимит — двигаем l вправо (и уменьшаем k, если выкинули особый). Длина окна = r-l+1, ответ = max. Оба указателя только вперёд → O(n), быстро. l никогда не откатывается.
Пример: файл 24-1.txt, заглавные A-Z, макс. подряд символов где A,B,X суммарно не более 5 раз:
s=open('24-1.txt').readline()
k=0; l=0; m=[]
for r in range(len(s)):
    if s[r] in 'ABX': k+=1
    while k>5:
        if s[l] in 'ABX': k-=1
        l+=1
    m.append(r-l+1)
print(max(m))  # 64

МЕТОД 4 — регулярные выражения (from re import finditer). Шаблон описывает искомые подстроки. Когда брать: сложный составной паттерн. Когда НЕ брать: запрещённые комбинации (метод замены), посимвольное сравнение (динамика), «не более N символов» (два указателя).
Синтаксис: [ABC] один из; [A-Z] диапазон; [0-9] цифра; [^CDE] кроме; . любой; * ноль+; + один+; {n} ровно n; {n,m} от n до m; \. \+ \* экранирование служебных; (...) группа (group(1)); (?=(...)) lookahead для пересекающихся совпадений. Важно: [AB]+ — любые A/B вперемешку; (AB)+ — пары AB подряд.
Поиск: print(len(max((x.group() for x in finditer(reg,s)), key=len))).
Пример 1 (Калинин 24-215): A,B,C + цифры 1,2,3, макс. подряд пар «буква+цифра»: reg=r'([ABC][123])+'; ответ = len(самой длинной)//2 = 183.
Пример 2 (Демо-2025 24-319): знаки -,* и цифры, макс. длина корректного арифм. выражения (целые неотриц., без ведущих нулей, операции не рядом): numb=r'([1-9][0-9]*|0)'; reg=rf'{numb}([-*]{numb})+'; reg=rf'(?=({reg}))'; print(len(max((x.group(1) for x in finditer(reg,s)),key=len))) = 140. Lookahead нужен для пересекающихся совпадений.

МЕТОД 5 — двойной цикл (грубая сила с оптимизациями). Перебираем все подстроки двумя циклами: for l in range(len(s)): for r in range(l+m, len(s)). Берут, когда условие сложное/составное. В лоб O(n²) — нужен break и старт r с l+m.
Главное — break при ПЕРВОМ необратимом нарушении (расширением вправо не исправить): тогда внутренний цикл обрывается рано, а не идёт до конца строки. Старт r с l+m пропускает подстроки короче текущего максимума.
Приём: «нет цифр» сводят к "0" in c, заменив все цифры 1-9 на 0.
Пример (Минак 24-293): макс. подстрока с ровно 100 D, без цифр, без DS и SD:
s=open('24-293.txt').readline()
for x in '123456789': s=s.replace(x,'0')
m=0
for l in range(len(s)):
    for r in range(l+m,len(s)):
        c=s[l:r+1]
        if c.count('D')>100 or 'DS' in c or 'SD' in c or '0' in c: break
        elif c.count('D')==100: m=max(m,len(c))
print(m)  # 644
count('D')==100 — валидный кандидат (обновляем m), НЕ break, т.к. окно ещё можно тянуть не-D символами.

Все 5 методов задания 24 разобраны.`,

  promptSuggestion: "Объясни метод разбиения строки в задании 24 ЕГЭ: приём с replace, чтобы сломать запрещённую подстроку и сохранить максимум."
};
