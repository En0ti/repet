import { BarChart3 } from 'lucide-react';

export default {
  id: "task-26",
  title: "Задание 26: Обработка данных с сортировкой",
  description: "Выбор и отбор данных: жадная сортировка, сортировка словарей, места в зале, расписание.",
  icon: BarChart3,
  theory: `### Суть задания 26

Одно из самых «алгоритмических» заданий: дан большой набор чисел, и из него нужно **выбрать оптимальное подмножество** по некоторому правилу — обычно «как можно больше элементов» и заодно какую-то крайнюю величину (минимальный/максимальный из выбранных). За **два верных ответа — 2 первичных балла**. Решаем **программой на Python**.

Данные читаем из файла: первая строка — количество N, дальше по одному числу в строке.

\`\`\`python
with open('26.txt') as file:
    N = int(file.readline())        # первая строка — количество
    data = list(map(int, file))     # остальные строки → список чисел
\`\`\`

### Тип 1. Жадная сортировка («матрёшка», «коржи»)

**Жадный алгоритм** — на каждом шаге делаем локально оптимальный выбор в надежде, что он приведёт к глобально оптимальному. Здесь это работает идеально, если предварительно **отсортировать данные**.

**Алгоритм (5 шагов):**
1. Отсортировать значения **по убыванию**.
2. Взять первый (самый большой) — он точно входит в ответ.
3. Идти по остальным по очереди.
4. Брать очередной элемент, только если он **меньше последнего взятого** не менее чем на заданную величину D.
5. Вывести **количество** взятых и **последний** (самый маленький) взятый элемент.

\`\`\`svg
<svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="620" height="250" fill="#0f172a" rx="8"/>
  <text x="310.0" y="26" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Сортируем по убыванию. Берём первый. Каждый следующий — если он меньше последнего взятого не менее чем на 9.</text>
  <text x="40" y="60" fill="#cbd5e1" font-family="monospace" font-size="13">отсортировано ↓:</text>
  <rect x="40" y="90" width="90" height="46" rx="6" fill="#0d2d1a" stroke="#4ade80" stroke-width="2"/>
  <text x="85.0" y="113" fill="#4ade80" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" dominant-baseline="middle">50</text>
  <text x="85.0" y="80" fill="#4ade80" font-family="sans-serif" font-size="11" text-anchor="middle">старт (взяли)</text>
  <text x="85.0" y="154" fill="#4ade80" font-family="sans-serif" font-size="10" text-anchor="middle">в результате</text>
  <rect x="150" y="90" width="90" height="46" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2"/>
  <text x="195.0" y="113" fill="#94a3b8" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" dominant-baseline="middle">43</text>
  <text x="195.0" y="68" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">50−43=7</text>
  <text x="195.0" y="82" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">7 &lt; 9 → пропуск</text>
  <text x="195.0" y="154" fill="#64748b" font-family="sans-serif" font-size="10" text-anchor="middle">пропущена</text>
  <rect x="260" y="90" width="90" height="46" rx="6" fill="#0d2d1a" stroke="#4ade80" stroke-width="2"/>
  <text x="305.0" y="113" fill="#4ade80" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" dominant-baseline="middle">40</text>
  <text x="305.0" y="68" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">50−40=10</text>
  <text x="305.0" y="82" fill="#4ade80" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">10 ≥ 9 → взять</text>
  <text x="305.0" y="154" fill="#4ade80" font-family="sans-serif" font-size="10" text-anchor="middle">в результате</text>
  <rect x="370" y="90" width="90" height="46" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2"/>
  <text x="415.0" y="113" fill="#94a3b8" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" dominant-baseline="middle">32</text>
  <text x="415.0" y="68" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">40−32=8</text>
  <text x="415.0" y="82" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">8 &lt; 9 → пропуск</text>
  <text x="415.0" y="154" fill="#64748b" font-family="sans-serif" font-size="10" text-anchor="middle">пропущена</text>
  <rect x="480" y="90" width="90" height="46" rx="6" fill="#0d2d1a" stroke="#4ade80" stroke-width="2"/>
  <text x="525.0" y="113" fill="#4ade80" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" dominant-baseline="middle">20</text>
  <text x="525.0" y="68" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">40−20=20</text>
  <text x="525.0" y="82" fill="#4ade80" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">20 ≥ 9 → взять</text>
  <text x="525.0" y="154" fill="#4ade80" font-family="sans-serif" font-size="10" text-anchor="middle">в результате</text>
  <text x="310.0" y="224" fill="#fbbf24" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Результат: взяты 50, 40, 20</text>
  <text x="310.0" y="242" fill="#fbbf24" font-family="sans-serif" font-size="12" text-anchor="middle">количество = 3,   минимальная сторона = 20   → print(len(res), res[-1])</text>
</svg>
\`\`\`

Почему жадность тут оптимальна: после сортировки по убыванию мы всегда оставляем «как можно больше места» для следующих элементов, беря наибольший подходящий. Сравниваем именно с **последним взятым** (\`res[-1]\`), а не с соседом по списку.

#### Пример 1. Коробки-матрёшки (задание 2601)

В магазине N кубических коробок. Коробку можно вложить в другую, если её сторона **меньше не менее чем на 9**. Определить наибольшее число вложенных коробок и максимально возможную сторону самой маленькой.

![Задание 26 — коробки матрёшка](/tasks/26/ex-2601.png)

[📥 Скачать файл 2601.txt](/tasks/26/2601.txt)

\`\`\`python
with open('2601.txt') as file:
    N = int(file.readline())
    data = list(map(int, file))

data = sorted(data, reverse=True)   # по убыванию
res = [data[0]]                     # самая большая точно подходит

for i in data[1:]:
    if res[-1] - i >= 9:            # меньше последней взятой не менее чем на 9
        res.append(i)

print(len(res), res[-1])            # количество и сторона самой маленькой
\`\`\`

На разборном примере выше (\`[50, 43, 40, 32, 20]\`) получаем 3 коробки и сторону 20: 43 и 32 пропускаются, потому что отличаются от последней взятой меньше чем на 9. **Ответ для файла задания: 1040 и 57.**

#### Пример 2. Коржи для торта (задание 2607)

То же самое, **только порог другой**: корж кладётся на другой, если его диаметр меньше **не менее чем на 4**. Меняется лишь число в условии сравнения.

![Задание 26 — коржи для торта](/tasks/26/ex-2607.png)

[📥 Скачать файл 2607.txt](/tasks/26/2607.txt)

\`\`\`python
with open('2607.txt') as file:
    N = int(file.readline())
    data = list(map(int, file))

data = sorted(data, reverse=True)
res = [data[0]]

for i in data[1:]:
    if res[-1] - i >= 4:           # порог 4 вместо 9
        res.append(i)

print(len(res), res[-1])
\`\`\`

**Ответ для файла задания: 2172 и 50.**

> 📌 Главное в типе 1: правильно прочитать файл, **отсортировать по убыванию**, сравнивать каждый кандидат с **последним взятым** (\`res[-1]\`) и помнить, что разница должна быть **«не менее чем»** — то есть \`>=\`, а не \`>\`. Всё задание сводится к замене одного числа-порога под конкретное условие.


### Тип 2. Многоуровневая сортировка (список словарей)

Здесь **никаких хитрых алгоритмов** — только аккуратная сортировка и отбор по условиям (рейтинги, отбор кандидатов). Всё решает правильно заданный **ключ сортировки**.

**Техника:**
1. Каждую запись храним как **словарь** {поле: значение} — чтобы не путаться, где какой столбец.
2. Считаем **производные поля** (сумма баллов, среднее, число двоек) и кладём в тот же словарь.
3. Сортируем \`sorted(data, key=lambda x: (кортеж критериев))\`. Кортеж = **многоуровневая** сортировка: сначала по первому критерию, при равенстве — по второму и т.д.
4. **Минус** перед значением → этот критерий по убыванию: \`-x["result"]\`.

#### Пример 1. Отбор матросов (задание 2603)

На S мест отбирают кандидатов с наибольшей **суммой трёх экзаменов**. При равенстве — у кого выше балл за собеседование, затем по ID. Вывести **ID последнего прошедшего** и **сколько набрали полупроходной балл**.

![Задание 26 — отбор матросов](/tasks/26/ex-2603.png)

[📥 Скачать файл 2603.txt](/tasks/26/2603.txt)

\`\`\`python
data = []
with open('2603.txt') as file:
    N, S = map(int, file.readline().split())
    for line in file:
        p = line.split()
        c = {"id": int(p[0]), "e1": int(p[1]), "e2": int(p[2]),
              "e3": int(p[3]), "iv": int(p[4])}
        c["result"] = c["e1"] + c["e2"] + c["e3"]
        data.append(c)

data = sorted(data, key=lambda x: (-x["result"], -x["iv"], x["id"]))

mark = data[S]["result"]          # полупроходной балл — сумма на позиции S
last_pass = {}
half = 0
for c in data:
    if c["result"] > mark: last_pass = c     # точно прошёл
    if c["result"] == mark: half += 1        # полупроходной балл
    if c["result"] < mark: break
print(last_pass["id"], half)      # 8 2
\`\`\`

\`\`\`svg
<svg viewBox="0 0 470 326" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="470" height="326" fill="#0f172a" rx="8"/>
  <text x="235.0" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Сортируем по ключу (−сумма, −собес, id). Мест S = 3.</text>
  <rect x="24" y="38" width="422" height="24" fill="#1e293b" rx="4"/>
  <text x="70" y="50" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">место</text>
  <text x="165" y="50" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">ID</text>
  <text x="285" y="50" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">сумма</text>
  <text x="400" y="50" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">собес.</text>
  <rect x="24" y="64" width="422" height="28" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="70" y="78.0" fill="#cbd5e1" font-family="monospace" font-size="13" text-anchor="middle" dominant-baseline="middle">1</text>
  <text x="165" y="78.0" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">1</text>
  <text x="285" y="78.0" fill="#e2e8f0" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">270</text>
  <text x="400" y="78.0" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">10</text>
  <rect x="24" y="98" width="422" height="28" rx="5" fill="#0d2d1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="70" y="112.0" fill="#cbd5e1" font-family="monospace" font-size="13" text-anchor="middle" dominant-baseline="middle">2</text>
  <text x="165" y="112.0" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">8</text>
  <text x="285" y="112.0" fill="#e2e8f0" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">230</text>
  <text x="400" y="112.0" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">4</text>
  <rect x="24" y="132" width="422" height="28" rx="5" fill="#3b2f12" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="70" y="146.0" fill="#cbd5e1" font-family="monospace" font-size="13" text-anchor="middle" dominant-baseline="middle">3</text>
  <text x="165" y="146.0" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">4</text>
  <text x="285" y="146.0" fill="#e2e8f0" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">215</text>
  <text x="400" y="146.0" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">7</text>
  <rect x="24" y="166" width="422" height="28" rx="5" fill="#3b2f12" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="70" y="180.0" fill="#cbd5e1" font-family="monospace" font-size="13" text-anchor="middle" dominant-baseline="middle">4</text>
  <text x="165" y="180.0" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">11</text>
  <text x="285" y="180.0" fill="#e2e8f0" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">215</text>
  <text x="400" y="180.0" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">6</text>
  <rect x="24" y="200" width="422" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="70" y="214.0" fill="#cbd5e1" font-family="monospace" font-size="13" text-anchor="middle" dominant-baseline="middle">5</text>
  <text x="165" y="214.0" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">5</text>
  <text x="285" y="214.0" fill="#e2e8f0" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">213</text>
  <text x="400" y="214.0" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">6</text>
  <rect x="24" y="234" width="422" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="70" y="248.0" fill="#cbd5e1" font-family="monospace" font-size="13" text-anchor="middle" dominant-baseline="middle">6</text>
  <text x="165" y="248.0" fill="#e2e8f0" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle" dominant-baseline="middle">3</text>
  <text x="285" y="248.0" fill="#e2e8f0" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">210</text>
  <text x="400" y="248.0" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">8</text>
  <text x="446" y="92" fill="#4ade80" font-family="sans-serif" font-size="10" text-anchor="end"></text>
  <text x="24" y="292" fill="#4ade80" font-family="sans-serif" font-size="11">● проходной (сумма &gt; 215): ID 1, 8 → последний = 8</text>
  <text x="24" y="308" fill="#fbbf24" font-family="sans-serif" font-size="11">● полупроходной (сумма = 215, это data[S]): ID 4, 11 → их 2</text>
  <text x="24" y="322" fill="#64748b" font-family="sans-serif" font-size="11">● ниже порога (сумма &lt; 215): не проходят. Ответ: 8 и 2</text>
</svg>
\`\`\`

Как это читать: \`data[S]\` (нумерация с нуля) — первый кандидат «за чертой» из S мест; его сумма и есть **полупроходной балл**. У кого сумма строго больше — точно проходят (последний из них — ответ 1). У кого ровно столько же — это полупроходники (их количество — ответ 2). На типовом примере → **8 и 2**.

#### Пример 2. Рейтинг студентов (задание 2604)

Считаем **средний балл** по 4 предметам. Студенты без двоек («сдавшие») идут в рейтинге по **убыванию среднего**; затем «не сдавшие» (хотя бы одна 2) — по **возрастанию числа двоек**. Вывести ID на **последней позиции первых 25%** и ID **первого студента с более чем двумя двойками**.

![Задание 26 — рейтинг студентов](/tasks/26/ex-2604.png)

[📥 Скачать файл 2604.txt](/tasks/26/2604.txt)

> ⚠️ Ключевой момент: «не сдавшие» идут **после всех сдавших**. Поэтому в ключе сортировки **первым уровнем разделяем по наличию двойки** (\`x["twos"] > 0\`: у сдавших это False и они идут раньше). Если просто отсортировать по \`(-mean, twos)\`, двоечник с высоким средним ошибочно окажется наверху.

\`\`\`python
import statistics

data = []
with open('2604.txt') as file:
    N = int(file.readline())
    for line in file:
        p = line.split()
        marks = tuple(map(int, p[1:5]))
        data.append({"id": int(p[0]),
                      "twos": marks.count(2),
                      "mean": statistics.mean(marks)})

# сдавшие (twos==0) — по убыв. среднего; затем не сдавшие — по возр. числа двоек
data = sorted(data, key=lambda x: (x["twos"] > 0,
                                   -x["mean"] if x["twos"] == 0 else 0,
                                   x["twos"], x["id"]))

quart = N // 4
print(data[quart - 1]["id"])      # последний в первых 25%

for s in data:
    if s["twos"] > 2:
        print(s["id"])            # первый, у кого больше двух двоек
        break
\`\`\`

Разбор ключа: \`x["twos"] > 0\` даёт False(=0) сдавшим и True(=1) не сдавшим — значит сдавшие идут первыми. Внутри сдавших \`-x["mean"]\` сортирует по убыванию среднего, внутри не сдавших \`x["twos"]\` — по возрастанию двоек. На типовом примере рейтинг получается \`[4, 6, 10, 1, 3, 7, 13, 2]\` → **6 и 13**. **Ответ для файла задания: 52326 и 635.**

### Тип 3. Поиск мест в зале (анализ по столбцам)

Данные — список **занятых** мест (ряд, место). Нужно купить **два билета на соседние места**, чтобы **перед ними** (в рядах ближе к сцене, с теми же номерами мест) все кресла были **свободны**, и ряд был **как можно дальше от сцены**. Если подходящих пар несколько — берём с наименьшими (2602) или наибольшими (2606) номерами.

**Идея.** Для каждого номера места считаем **первый занятый ряд** \`min_row[seat]\`. Тогда сесть на это место «с чистым обзором» можно максимум в ряду \`min_row[seat] - 1\` (всё перед ним свободно). Для пары соседних мест (s, s+1) берём более «мелкий» из двух первых занятых:

\`accept = min(min_row[s], min_row[s+1]) - 1\`

Ищем пару с **максимальным** \`accept\` (самый дальний от сцены ряд).

**Нюансы:**
- массив \`min_row\` размером \`K+2\` — чтобы безопасно обращаться к \`seat+1\`;
- стартовое значение \`M+1\` — сигнал «в этом столбце нет занятых» (можно сесть в самый дальний ряд M);
- при равном ряде выбираем меньший номер (2602) или больший (2606).

#### Пример (задание 2602 — наименьшие номера)

Первая строка файла — N (занятых мест), M (рядов), K (мест в ряду). Дальше N строк «ряд место».

![Задание 26 — места в зале](/tasks/26/ex-2602.png)

[📥 Скачать файл 2602.txt](/tasks/26/2602.txt)

\`\`\`python
with open('2602.txt') as file:
    N, M, K = map(int, file.readline().split())
    data = [list(map(int, line.split())) for line in file]

max_row = 0
min_seat = 0

min_row = [M + 1] * (K + 2)          # первый занятый ряд для каждого места (M+1 = нет занятых)

for row, seat in data:
    if row < min_row[seat]:
        min_row[seat] = row

for seat in range(1, K):
    accept_row = min(min_row[seat], min_row[seat + 1]) - 1   # самый дальний ряд для пары
    if accept_row > max_row or (accept_row == max_row and seat < min_seat):
        max_row = accept_row
        min_seat = seat

print(max_row, min_seat)             # 5 6
\`\`\`

\`\`\`svg
<svg viewBox="0 0 468 366" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="468" height="366" fill="#0f172a" rx="8"/>
  <rect x="70" y="22" width="368" height="16" fill="#312e81" rx="3"/>
  <text x="254.0" y="31" fill="#c7d2fe" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" dominant-baseline="middle">СЦЕНА</text>
  <text x="93.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">1</text>
  <text x="139.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">2</text>
  <text x="185.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">3</text>
  <text x="231.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">4</text>
  <text x="277.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">5</text>
  <text x="323.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">6</text>
  <text x="369.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">7</text>
  <text x="415.0" y="48" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">8</text>
  <text x="58" y="72.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 1</text>
  <rect x="73" y="59" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="93.0" y="72.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="119" y="59" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="165" y="59" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="211" y="59" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="257" y="59" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="303" y="59" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="323.0" y="72.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="349" y="59" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="369.0" y="72.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="395" y="59" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="58" y="104.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 2</text>
  <rect x="73" y="91" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="119" y="91" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="139.0" y="104.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="165" y="91" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="211" y="91" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="257" y="91" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="303" y="91" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="323.0" y="104.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="349" y="91" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="369.0" y="104.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="395" y="91" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="58" y="136.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 3</text>
  <rect x="73" y="123" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="119" y="123" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="165" y="123" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="185.0" y="136.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="211" y="123" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="257" y="123" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="303" y="123" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="323.0" y="136.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="349" y="123" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="369.0" y="136.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="395" y="123" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="58" y="168.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 4</text>
  <rect x="73" y="155" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="119" y="155" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="165" y="155" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="211" y="155" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="231.0" y="168.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="257" y="155" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="303" y="155" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="323.0" y="168.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="349" y="155" width="40" height="26" rx="4" fill="#0f2a1a" stroke="#334155" stroke-width="1.2"/>
  <text x="369.0" y="168.0" fill="#4ade80" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">·</text>
  <rect x="395" y="155" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="58" y="200.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 5</text>
  <rect x="73" y="187" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="119" y="187" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="165" y="187" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="211" y="187" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="257" y="187" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="277.0" y="200.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="303" y="187" width="40" height="26" rx="4" fill="#14532d" stroke="#4ade80" stroke-width="1.2"/>
  <text x="323.0" y="200.0" fill="#86efac" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">♥</text>
  <rect x="349" y="187" width="40" height="26" rx="4" fill="#14532d" stroke="#4ade80" stroke-width="1.2"/>
  <text x="369.0" y="200.0" fill="#86efac" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">♥</text>
  <rect x="395" y="187" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="58" y="232.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 6</text>
  <rect x="73" y="219" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="119" y="219" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="165" y="219" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="211" y="219" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="257" y="219" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="303" y="219" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="323.0" y="232.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="349" y="219" width="40" height="26" rx="4" fill="#7f1d1d" stroke="#f87171" stroke-width="1.2"/>
  <text x="369.0" y="232.0" fill="#fecaca" font-family="sans-serif" font-size="13" text-anchor="middle" dominant-baseline="middle">✕</text>
  <rect x="395" y="219" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="58" y="264.0" fill="#64748b" font-family="monospace" font-size="11" text-anchor="end" dominant-baseline="middle">ряд 7</text>
  <rect x="73" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="119" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="165" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="211" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="257" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="303" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="349" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <rect x="395" y="251" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
  <text x="70" y="302" fill="#f87171" font-family="sans-serif" font-size="11">✕ занято</text>
  <text x="160" y="302" fill="#4ade80" font-family="sans-serif" font-size="11">♥ выбранная пара (ряд 5, места 6–7)</text>
  <text x="70" y="320" fill="#94a3b8" font-family="sans-serif" font-size="11">Перед местами 6 и 7 все ряды (1–4) свободны; первый занятый — ряд 6 → можно сесть в ряд 5.</text>
  <text x="70" y="338" fill="#fbbf24" font-family="sans-serif" font-size="11" font-weight="bold">Самый дальний такой ряд = 5. 2602 → 5 6 (мин. место),  2606 → 5 8 (макс. место).</text>
</svg>
\`\`\`

Трассировка примера: \`min_row[1..8] = [1, 2, 3, 4, 5, 6, 6, 8]\`. Для пар получаем accept = 0, 1, 2, 3, 4, **5**, **5**. Максимум 5 у пар (6, 7) и (7, 8). При равном ряде 2602 берёт меньший левый номер → пара (6, 7), место **6**. Ответ: **5 6**.

#### Вариант (задание 2606 — наибольшие номера)

Всё то же, но при равном ряде берём пару с **бо́льшими** номерами (знак \`>\` вместо \`<\`) и выводим \`max_seat + 1\` — правое (большее) место пары.

\`\`\`python
with open('2606.txt') as file:
    N, M, K = map(int, file.readline().split())
    data = [list(map(int, line.split())) for line in file]

max_row = 0
max_seat = 0
min_row = [M + 1] * (K + 2)

for row, seat in data:
    if row < min_row[seat]:
        min_row[seat] = row

for seat in range(1, K):
    accept_row = min(min_row[seat], min_row[seat + 1]) - 1
    if accept_row > max_row or (accept_row == max_row and seat > max_seat):
        max_row = accept_row
        max_seat = seat

print(max_row, max_seat + 1)         # 5 8
\`\`\`

На том же примере максимум 5 у пар (6, 7) и (7, 8); 2606 берёт пару с большими номерами (7, 8) и выводит большее место **8**. Ответ: **5 8**.

**Ответы для файлов задания:** 2602 → 21028 6660; 2606 → 9991 5643.

> 📌 Вся разница между «наименьшими» и «наибольшими» — это знак сравнения мест (\`<\` ↔ \`>\`) и то, какой край пары выводить (левый \`seat\` или правый \`seat+1\`).



### Тип 4. Составление расписания (жадный по окончанию)

Классическая задача о выборе максимума **непересекающихся** мероприятий. Дан список (начало, конец). Нужно провести как можно больше так, чтобы они не пересекались (если конец одного **совпадает** с началом другого — можно оба), и заодно найти **максимально возможный перерыв между двумя последними**.

**Алгоритм (жадный):**
1. Сортируем по времени **окончания** (по возрастанию); при равном конце — по началу по убыванию.
2. Берём первое — оно заканчивается раньше всех.
3. Каждое следующее берём, если его **начало ≥ конца последнего взятого**.
4. Количество взятых — ответ 1.

Почему по окончанию: чем раньше заканчивается выбранное, тем больше места остаётся для следующих. Это и даёт глобальный максимум.

#### Пример (задание 2609)

В каждой заявке — время начала и окончания (в минутах от начала суток). Если начало одного меньше конца другого — провести можно только одно. Если конец одного равен началу другого — можно оба.

![Задание 26 — расписание мероприятий](/tasks/26/ex-2609.png)

[📥 Скачать файл 2609.txt](/tasks/26/2609.txt)

\`\`\`python
data = []
with open('2609.txt') as file:
    N = int(file.readline())
    for line in file:
        p = line.split()
        data.append({"start": int(p[0]), "end": int(p[1])})

events = sorted(data, key=lambda e: (e["end"], -e["start"]))   # по окончанию ↑, при равенстве по началу ↓

approved = [events[0]]
for e in events[1:]:
    if e["start"] >= approved[-1]["end"]:    # начало не раньше конца последнего взятого
        approved.append(e)

# максимальный перерыв между двумя последними
longest_break = 0
for e in events:
    if e["start"] >= approved[-2]["end"]:
        longest_break = max(longest_break, e["start"] - approved[-2]["end"])

print(len(approved), longest_break)          # 3 20
\`\`\`

\`\`\`svg
<svg viewBox="0 0 512 312" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="512" height="312" fill="#0f172a" rx="8"/>
  <text x="256.0" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Сортируем по времени окончания. Жадно берём непересекающиеся мероприятия.</text>
  <line x1="46.0" y1="58" x2="46.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="46.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">0</text>
  <line x1="92.0" y1="58" x2="92.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="92.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">20</text>
  <line x1="138.0" y1="58" x2="138.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="138.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">40</text>
  <line x1="184.0" y1="58" x2="184.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="184.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">60</text>
  <line x1="230.0" y1="58" x2="230.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="230.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">80</text>
  <line x1="276.0" y1="58" x2="276.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="276.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">100</text>
  <line x1="322.0" y1="58" x2="322.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="322.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">120</text>
  <line x1="368.0" y1="58" x2="368.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="368.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">140</text>
  <line x1="414.0" y1="58" x2="414.0" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="414.0" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">160</text>
  <line x1="459.99999999999994" y1="58" x2="459.99999999999994" y2="216" stroke="#1e293b" stroke-width="1"/>
  <text x="459.99999999999994" y="52" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">180</text>
  <rect x="276.0" y="69" width="46.0" height="21" rx="4" fill="#14532d" stroke="#4ade80" stroke-width="1.6"/>
  <text x="299.0" y="79.5" fill="#86efac" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" dominant-baseline="middle">A: 100–120</text>
  <rect x="322.0" y="99" width="23.0" height="21" rx="4" fill="#14532d" stroke="#4ade80" stroke-width="1.6"/>
  <text x="333.5" y="109.5" fill="#86efac" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" dominant-baseline="middle">B: 120–130</text>
  <rect x="69.0" y="129" width="322.0" height="21" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.6"/>
  <text x="230.0" y="139.5" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" dominant-baseline="middle">C: 10–150</text>
  <rect x="347.29999999999995" y="159" width="89.69999999999999" height="21" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.6"/>
  <text x="392.15" y="169.5" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" dominant-baseline="middle">D: 131–170</text>
  <rect x="391.0" y="189" width="68.99999999999994" height="21" rx="4" fill="#14532d" stroke="#4ade80" stroke-width="1.6"/>
  <text x="425.5" y="199.5" fill="#86efac" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" dominant-baseline="middle">E: 150–180</text>
  <line x1="345.0" y1="224" x2="391.0" y2="224" stroke="#fbbf24" stroke-width="2"/>
  <line x1="345.0" y1="219" x2="345.0" y2="229" stroke="#fbbf24" stroke-width="2"/>
  <line x1="391.0" y1="219" x2="391.0" y2="229" stroke="#fbbf24" stroke-width="2"/>
  <text x="368.0" y="242" fill="#fbbf24" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">перерыв 150−130 = 20</text>
  <text x="46" y="286" fill="#4ade80" font-family="sans-serif" font-size="11">Взяты A, B и E (3 мероприятия). C и D пропущены (пересекаются / даёт меньший перерыв).</text>
  <text x="46" y="304" fill="#fbbf24" font-family="sans-serif" font-size="11" font-weight="bold">Ответ: 3 мероприятия, максимальный перерыв 20.</text>
</svg>
\`\`\`

Разбор: после сортировки берём A (100–120), затем B (120–130, начало 120 = конец 120 → можно), дальше нужно третье. Для **количества** подойдёт D (131–170), итого 3. Для **перерыва** последним можно взять любое мероприятие, начинающееся не раньше конца предпоследнего (130); самое позднее такое — E (150–180), перерыв 150 − 130 = **20**. Ответ: **3 20**.

#### Вариант (задание 2610 — задана длительность)

То же самое, но во входных данных вместо времени окончания указана **длительность**. Просто считаем конец сами: \`end = start + длительность\`.

![Задание 26 — мероприятия директора](/tasks/26/ex-2610.png)

[📥 Скачать файл 2610.txt](/tasks/26/2610.txt)

\`\`\`python
data = []
with open('2610.txt') as file:
    N = int(file.readline())
    for line in file:
        p = line.split()
        start = int(p[0])
        end = start + int(p[1])          # конец = начало + длительность
        data.append({"start": start, "end": end})

events = sorted(data, key=lambda e: (e["end"], -e["start"]))
approved = [events[0]]
for e in events[1:]:
    if e["start"] >= approved[-1]["end"]:
        approved.append(e)

longest_break = 0
for e in events:
    if e["start"] >= approved[-2]["end"]:
        longest_break = max(longest_break, e["start"] - approved[-2]["end"])

print(len(approved), longest_break)          # 3 10
\`\`\`

**Ответы для файлов задания:** 2609 → 32 15; 2610 → 26 20.

> 📌 Запомни связку: задача про расписание ⇒ **сортировка по времени окончания** + жадный отбор «начало ≥ конца предыдущего». Условие именно **≥** (нестрогое), потому что «конец == начало» разрешает оба мероприятия. Если дана длительность — сначала переводим её в время окончания.
`,

  practice: [
    {
      question: "Дан набор [50, 43, 40, 32, 20], коробку можно вложить, если сторона меньше не менее чем на 9. Сколько коробок и какая минимальная сторона?",
      options: [
        { id: "A", text: "3 и 20" },
        { id: "B", text: "5 и 20" },
        { id: "C", text: "2 и 32" },
        { id: "D", text: "4 и 20" }
      ],
      correct: "A",
      explanation: "Сортируем: 50,43,40,32,20. Берём 50. 43 (разница 7<9) — пропуск. 40 (10>=9) — берём. 32 (40-32=8<9) — пропуск. 20 (20>=9) — берём. Итог: 50,40,20 → 3 коробки, минимальная 20."
    },
    {
      question: "Почему перед жадным проходом массив сортируют именно ПО УБЫВАНИЮ?",
      options: [
        { id: "A", text: "Так быстрее работает сортировка" },
        { id: "B", text: "Чтобы начинать с самого большого и оставлять максимум «места» для следующих вложений" },
        { id: "C", text: "Это требование Python" },
        { id: "D", text: "Чтобы ответ всегда был чётным" }
      ],
      correct: "B",
      explanation: "Самый большой элемент точно войдёт (в него можно вложить остальные). Идя по убыванию и беря наибольший подходящий, мы сохраняем максимальную свободу для последующих — это и даёт оптимум."
    },
    {
      question: "С чем сравнивают очередной элемент i при проверке условия?",
      options: [
        { id: "A", text: "С предыдущим элементом списка data" },
        { id: "B", text: "С последним ВЗЯТЫМ элементом res[-1]" },
        { id: "C", text: "С первым элементом data[0]" },
        { id: "D", text: "Со средним значением" }
      ],
      correct: "B",
      explanation: "Важно сравнивать с последним добавленным в результат (res[-1]), а не с соседом по отсортированному списку, ведь соседа мы могли пропустить."
    },
    {
      question: "Условие «меньше НЕ МЕНЕЕ ЧЕМ на 9» в коде записывается как...",
      options: [
        { id: "A", text: "res[-1] - i > 9" },
        { id: "B", text: "res[-1] - i >= 9" },
        { id: "C", text: "res[-1] - i <= 9" },
        { id: "D", text: "i - res[-1] >= 9" }
      ],
      correct: "B",
      explanation: "«Не менее чем на 9» означает разницу 9 или больше, то есть >= 9. Строгое > 9 потеряло бы случаи с разницей ровно 9."
    },
    {
      question: "В задаче про коржи всё то же, что в матрёшке, но порог равен 4. Что нужно поменять в коде из примера 1?",
      options: [
        { id: "A", text: "Переписать весь алгоритм" },
        { id: "B", text: "Поменять сортировку на по возрастанию" },
        { id: "C", text: "Заменить число 9 на 4 в условии res[-1] - i >= 9" },
        { id: "D", text: "Убрать res = [data[0]]" }
      ],
      correct: "C",
      explanation: "Тип 1 одинаков для всех таких задач — отличается только порог в условии сравнения. Для коржей это >= 4 вместо >= 9."
    },
    {
      question: "Что означает минус в ключе сортировки: sorted(data, key=lambda x: -x['result'])?",
      options: [
        { id: "A", text: "Ошибка, минус так нельзя" },
        { id: "B", text: "Сортировку по этому критерию по УБЫВАНИЮ" },
        { id: "C", text: "Удаление отрицательных значений" },
        { id: "D", text: "Сортировку по возрастанию" }
      ],
      correct: "B",
      explanation: "sorted всегда сортирует по возрастанию ключа. Если ключ — это -x['result'], то по возрастанию -result означает по убыванию result. Так задают сортировку по убыванию внутри кортежа-ключа."
    },
    {
      question: "Ключ key=lambda x: (-x['sum'], -x['iv'], x['id']) — как сравниваются записи?",
      options: [
        { id: "A", text: "Только по сумме" },
        { id: "B", text: "Сначала по сумме (убыв.), при равной сумме по собеседованию (убыв.), затем по id (возр.)" },
        { id: "C", text: "По всем трём сразу как по среднему" },
        { id: "D", text: "Случайным образом" }
      ],
      correct: "B",
      explanation: "Кортеж в ключе задаёт многоуровневую сортировку: элементы сравниваются по первому полю, при равенстве — по второму, потом по третьему. Это и есть удобный способ задать несколько критериев сразу."
    },
    {
      question: "В рейтинге студентов 'не сдавшие' (есть двойка) должны идти ПОСЛЕ сдавших. Как это заложить в ключ сортировки?",
      options: [
        { id: "A", text: "Отсортировать только по -mean" },
        { id: "B", text: "Первым уровнем ключа поставить x['twos'] > 0 (False у сдавших → они раньше)" },
        { id: "C", text: "Поставить id первым уровнем" },
        { id: "D", text: "Использовать reverse=True" }
      ],
      correct: "B",
      explanation: "Булево x['twos']>0 даёт 0 сдавшим и 1 не сдавшим. Поставив его первым в кортеж-ключ, мы гарантируем, что все сдавшие идут перед всеми не сдавшими, а уже внутри групп — по своим критериям."
    },
    {
      question: "Задача про матросов: mark = data[S]['result'] (S — число мест). Что это за число?",
      options: [
        { id: "A", text: "Максимальная сумма баллов" },
        { id: "B", text: "Полупроходной балл — сумма у первого кандидата за чертой S мест" },
        { id: "C", text: "Средний балл всех кандидатов" },
        { id: "D", text: "Сумма последнего в списке" }
      ],
      correct: "B",
      explanation: "После сортировки по убыванию data[S] (нумерация с нуля) — это (S+1)-й кандидат, первый не попавший в S мест. Его сумма — полупроходной балл: у кого больше, тот точно прошёл; у кого ровно столько — полупроходники."
    },
    {
      question: "Тип 3 (места в зале): что хранит массив min_row[seat]?",
      options: [
        { id: "A", text: "Количество занятых мест в столбце" },
        { id: "B", text: "Номер ПЕРВОГО занятого ряда для этого места (или M+1, если занятых нет)" },
        { id: "C", text: "Последний свободный ряд" },
        { id: "D", text: "Сумму номеров рядов" }
      ],
      correct: "B",
      explanation: "min_row[seat] — первый (ближайший к сцене) занятый ряд для данного номера места. Если в столбце никто не сидит, остаётся стартовое M+1. От этого значения считается самый дальний ряд, где перед местом всё свободно: min_row[seat]-1."
    },
    {
      question: "Почему допустимый ряд для пары (s, s+1) считается как min(min_row[s], min_row[s+1]) - 1?",
      options: [
        { id: "A", text: "Берут максимум, чтобы сесть дальше" },
        { id: "B", text: "Перед ОБОИМИ местами всё должно быть свободно, поэтому ограничивает более близкий занятый ряд (минимум), а сесть можно на 1 ряд раньше него" },
        { id: "C", text: "Минус 1 — это случайная поправка" },
        { id: "D", text: "Складывают оба первых занятых ряда" }
      ],
      correct: "B",
      explanation: "Пара годится только если перед обоими местами свободно. Ограничивает тот столбец, где занятое кресло ближе (меньший номер ряда), — берём min. А сесть можно в ряд на 1 меньше первого занятого, отсюда -1."
    },
    {
      question: "В чём отличие задания 2606 от 2602 в коде?",
      options: [
        { id: "A", text: "Полностью другой алгоритм" },
        { id: "B", text: "При равном ряде сравнение мест меняется с < на > и выводится seat+1 (правое место пары) вместо seat" },
        { id: "C", text: "Меняется сортировка данных" },
        { id: "D", text: "Используется heapq" }
      ],
      correct: "B",
      explanation: "Алгоритм одинаков. Для «наибольших номеров» при равном дальнем ряде берут пару с большим номером (> вместо <) и выводят больший край пары seat+1, а не левый seat."
    },
    {
      question: "Тип 4 (расписание): по какому полю сортируют мероприятия в жадном алгоритме?",
      options: [
        { id: "A", text: "По времени начала (возрастание)" },
        { id: "B", text: "По времени окончания (возрастание)" },
        { id: "C", text: "По длительности (убывание)" },
        { id: "D", text: "По времени начала (убывание)" }
      ],
      correct: "B",
      explanation: "Сортируем по времени окончания: чем раньше заканчивается выбранное мероприятие, тем больше места остаётся для следующих. Это и даёт максимум непересекающихся событий."
    },
    {
      question: "Условие включения следующего мероприятия записано как e['start'] >= approved[-1]['end']. Почему именно >=, а не >?",
      options: [
        { id: "A", text: "Это опечатка" },
        { id: "B", text: "По условию, если конец одного совпадает с началом другого, провести можно оба — значит граница допустима (>=)" },
        { id: "C", text: "Чтобы код был короче" },
        { id: "D", text: "Чтобы захватить пересекающиеся события" }
      ],
      correct: "B",
      explanation: "«Конец == начало» по условию разрешает провести оба мероприятия подряд без перерыва. Поэтому начало нового может быть равно концу предыдущего — нестрогое >=."
    },
    {
      question: "В задании 2610 вместо времени окончания дана длительность. Как получить поле end?",
      options: [
        { id: "A", text: "end = длительность" },
        { id: "B", text: "end = start + длительность" },
        { id: "C", text: "end = start - длительность" },
        { id: "D", text: "end = start * длительность" }
      ],
      correct: "B",
      explanation: "Конец мероприятия = время начала плюс его длительность: end = start + dur. Дальше алгоритм полностью совпадает с задачей 2609."
    }
  ],

  aiContext: `Задание 26 ЕГЭ — выбор оптимального подмножества из большого набора чисел (2 балла), решается программой на Python. ТИП 1 — жадная сортировка (задачи «коробки-матрёшки», «коржи для торта»).

Чтение файла: with open('f.txt') as file: N=int(file.readline()); data=list(map(int,file)).
Алгоритм: 1) data=sorted(data,reverse=True) — по убыванию; 2) res=[data[0]] — самый большой точно входит; 3) for i in data[1:]: if res[-1]-i>=D: res.append(i); 4) print(len(res), res[-1]) — количество и минимальный взятый.
Ключевое: сравнивать с последним ВЗЯТЫМ res[-1] (не с соседом), условие «не менее чем на D» это >= D (не >), сортировка ПО УБЫВАНИЮ. Разные задачи отличаются только порогом D.
Пример 2601 (матрёшка, D=9): ответ 1040 и 57. Пример 2607 (коржи, D=4): ответ 2172 и 50.
На разборном примере [50,43,40,32,20], D=9 → берутся 50,40,20 → 3 и 20.

ТИП 2 — многоуровневая сортировка через список словарей (задачи на отбор/рейтинги, без хитрых алгоритмов). Каждую запись храним как dict, считаем производные поля (сумма, среднее statistics.mean, число двоек marks.count(2)), сортируем sorted(data, key=lambda x: (кортеж)). Минус перед полем = по убыванию. Кортеж = многоуровневая сортировка.
Пример 2603 (матросы): сорт по (-result,-iv,id); mark=data[S]["result"] — полупроходной балл; ID последнего с result>mark и количество с result==mark. Типовой пример → 8 2.
Пример 2604 (рейтинг): ВАЖНО — не сдавшие (есть двойка) идут после сдавших, поэтому первый уровень ключа x["twos"]>0; ключ (x["twos"]>0, -x["mean"] if twos==0 else 0, x["twos"], x["id"]). quart=N//4; data[quart-1]["id"] — последний в первых 25%; первый с twos>2. Типовой пример → 6 13, ответ файла 52326 и 635. (Простой ключ (-mean,twos,id) тут даёт неверный результат, т.к. не отделяет не сдавших.)

ТИП 3 — поиск мест в зале (концертный зал). Данные: первая строка N M K (занятых мест, рядов, мест в ряду), далее N строк "ряд место". Нужны два соседних места, перед которыми (с теми же номерами, в рядах ближе к сцене) всё свободно, ряд как можно дальше.
Алгоритм: min_row=[M+1]*(K+2); для каждого занятого (row,seat): min_row[seat]=min(...); для seat в range(1,K): accept=min(min_row[seat],min_row[seat+1])-1; ищем max accept. При равном accept: 2602 берёт меньший seat и печатает max_row, min_seat; 2606 берёт больший seat и печатает max_row, max_seat+1.
Массив размера K+2 для безопасного seat+1; M+1 — сигнал «нет занятых». Типовой пример (7 7 8) → 2602: 5 6, 2606: 5 8. Файлы: 2602 → 21028 6660, 2606 → 9991 5643.

ТИП 4 — составление расписания (interval scheduling, жадный). Данные: мероприятия (начало, конец). Цель: максимум непересекающихся + макс. перерыв между двумя последними.
Алгоритм: events=sorted(data,key=lambda e:(e["end"],-e["start"])); approved=[events[0]]; for e in events[1:]: if e["start"]>=approved[-1]["end"]: approved.append(e). Условие >= (нестрогое: конец==начало разрешает оба). Перерыв: для e с e["start"]>=approved[-2]["end"] берём max(e["start"]-approved[-2]["end"]). print(len(approved), longest_break).
Вариант 2610: вместо конца дана длительность → end=start+dur, дальше всё то же.
Типовые примеры: 2609 → 3 20, 2610 → 3 10. Файлы: 2609 → 32 15, 2610 → 26 20.
`,

  promptSuggestion: "Объясни задание 26 ЕГЭ по информатике: 4 типа — жадная сортировка, сортировка словарей, места в зале, составление расписания."
};
