import { GlobeLock } from 'lucide-react';

export default {
  id: "task-13",
  title: "Задание 13: IP-адресация",
  description: "IP-адреса, маски сети, адреса узлов и сетей.",
  icon: GlobeLock,
  theory: `### Что такое IP-адрес

**IPv4-адрес** — 32-битный идентификатор компьютера в глобальной сети.

Записывается в виде 4 чисел от 0 до 255 через точку. Каждое число — один байт (8 бит).

Пример: **192.168.0.1** = \`11000000.10101000.00000000.00000001\`

### Маска сети

IP-адреса делят на группы — **IP-сети**. В каждой сети начальная часть адресов одинакова — это **постоянная часть**. Остальные биты меняются от узла к узлу — это **переменная часть**.

Размер постоянной части задаётся **маской сети** — двоичным числом вида **111...110...0**.

Маска записывается двумя способами:
- Как IP-адрес: **255.255.255.240**
- Как количество единиц: **/28**

Пример: \`192.168.0.1/255.255.255.240\` = \`192.168.0.1/28\`

### Все адреса сети 192.168.0.0/28

Маска /28 — это 28 единиц и **4 нуля** → 2⁴ = **16 адресов** в сети.

\`\`\`svg
<svg viewBox="0 0 460 468" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .hdr{fill:#065f46}.sub{fill:#1e3a5f}.ch{fill:#0c2340}.fml{fill:#0f2a1e}
    .r0{fill:#1e293b}.r1{fill:#0f172a}.rS{fill:#1e3a5f}.rB{fill:#3b1e1e}
    .ht{fill:#fff;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .st{fill:#a5b4fc;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .col{fill:#94a3b8;font:bold 10px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .ip{font:10px monospace;dominant-baseline:middle}
    .fix{fill:#64748b;font:10px monospace;text-anchor:middle;dominant-baseline:middle}
    .vN{fill:#34d399;font:bold 10px monospace;text-anchor:middle;dominant-baseline:middle}
    .vS{fill:#60a5fa;font:bold 10px monospace;text-anchor:middle;dominant-baseline:middle}
    .vB{fill:#f87171;font:bold 10px monospace;text-anchor:middle;dominant-baseline:middle}
    .tN{fill:#34d399;font:11px sans-serif;dominant-baseline:middle}
    .tS{fill:#60a5fa;font:bold 11px sans-serif;dominant-baseline:middle}
    .tB{fill:#f87171;font:bold 11px sans-serif;dominant-baseline:middle}
    .ft{fill:#86efac;font:11px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .sep{stroke:#334155;stroke-width:0.5}
  </style></defs>

  <rect width="460" height="36" class="hdr"/>
  <text x="230" y="18" class="ht">Сеть 192.168.0.0 / 255.255.255.240 (/28)</text>

  <rect y="36" width="460" height="24" class="sub"/>
  <text x="230" y="48" class="st">28 бит фиксированы маской · 4 бита переменные → 2⁴ = 16 адресов</text>

  <rect y="60" width="460" height="24" class="ch"/>
  <text x="62"  y="72" class="col">IP-адрес</text>
  <text x="178" y="72" class="col">постоянная (28 бит)</text>
  <text x="310" y="72" class="col">перем.</text>
  <text x="400" y="72" class="col">тип</text>

  <line x1="124" y1="60" x2="124" y2="444" class="sep"/>
  <line x1="280" y1="60" x2="280" y2="444" class="sep"/>
  <line x1="342" y1="60" x2="342" y2="444" class="sep"/>

  <!-- row 0: network addr -->
  <rect y="84"  width="460" height="22" class="rS"/>
  <text x="8"  y="95" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#60a5fa">0</tspan></text>
  <text x="202" y="95" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="95" class="vS">0000</text>
  <text x="348" y="95" class="tS">адрес сети</text>

  <!-- rows 1-14: nodes -->
  <rect y="106" width="460" height="22" class="r0"/>
  <text x="8"  y="117" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">1</tspan></text>
  <text x="202" y="117" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="117" class="vN">0001</text>
  <text x="348" y="117" class="tN">узел</text>

  <rect y="128" width="460" height="22" class="r1"/>
  <text x="8"  y="139" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">2</tspan></text>
  <text x="202" y="139" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="139" class="vN">0010</text>
  <text x="348" y="139" class="tN">узел</text>

  <rect y="150" width="460" height="22" class="r0"/>
  <text x="8"  y="161" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">3</tspan></text>
  <text x="202" y="161" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="161" class="vN">0011</text>
  <text x="348" y="161" class="tN">узел</text>

  <rect y="172" width="460" height="22" class="r1"/>
  <text x="8"  y="183" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">4</tspan></text>
  <text x="202" y="183" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="183" class="vN">0100</text>
  <text x="348" y="183" class="tN">узел</text>

  <rect y="194" width="460" height="22" class="r0"/>
  <text x="8"  y="205" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">5</tspan></text>
  <text x="202" y="205" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="205" class="vN">0101</text>
  <text x="348" y="205" class="tN">узел</text>

  <rect y="216" width="460" height="22" class="r1"/>
  <text x="8"  y="227" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">6</tspan></text>
  <text x="202" y="227" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="227" class="vN">0110</text>
  <text x="348" y="227" class="tN">узел</text>

  <rect y="238" width="460" height="22" class="r0"/>
  <text x="8"  y="249" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">7</tspan></text>
  <text x="202" y="249" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="249" class="vN">0111</text>
  <text x="348" y="249" class="tN">узел</text>

  <rect y="260" width="460" height="22" class="r1"/>
  <text x="8"  y="271" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">8</tspan></text>
  <text x="202" y="271" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="271" class="vN">1000</text>
  <text x="348" y="271" class="tN">узел</text>

  <rect y="282" width="460" height="22" class="r0"/>
  <text x="8"  y="293" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">9</tspan></text>
  <text x="202" y="293" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="293" class="vN">1001</text>
  <text x="348" y="293" class="tN">узел</text>

  <rect y="304" width="460" height="22" class="r1"/>
  <text x="8"  y="315" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">10</tspan></text>
  <text x="202" y="315" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="315" class="vN">1010</text>
  <text x="348" y="315" class="tN">узел</text>

  <rect y="326" width="460" height="22" class="r0"/>
  <text x="8"  y="337" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">11</tspan></text>
  <text x="202" y="337" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="337" class="vN">1011</text>
  <text x="348" y="337" class="tN">узел</text>

  <rect y="348" width="460" height="22" class="r1"/>
  <text x="8"  y="359" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">12</tspan></text>
  <text x="202" y="359" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="359" class="vN">1100</text>
  <text x="348" y="359" class="tN">узел</text>

  <rect y="370" width="460" height="22" class="r0"/>
  <text x="8"  y="381" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">13</tspan></text>
  <text x="202" y="381" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="381" class="vN">1101</text>
  <text x="348" y="381" class="tN">узел</text>

  <rect y="392" width="460" height="22" class="r1"/>
  <text x="8"  y="403" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#34d399">14</tspan></text>
  <text x="202" y="403" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="403" class="vN">1110</text>
  <text x="348" y="403" class="tN">узел</text>

  <!-- row 15: broadcast -->
  <rect y="414" width="460" height="22" class="rB"/>
  <text x="8"  y="425" class="ip"><tspan fill="#64748b">192.168.0.</tspan><tspan fill="#f87171">15</tspan></text>
  <text x="202" y="425" class="fix">11000000.10101000.00000000.0000</text>
  <text x="311" y="425" class="vB">1111</text>
  <text x="348" y="425" class="tB">broadcast</text>

  <rect y="436" width="460" height="32" class="fml"/>
  <text x="230" y="452" class="ft">Узлов: 2⁴ − 2 = 14  |  адрес сети = маска AND IP  |  broadcast = все 1 в перем. части</text>

  <rect x="0" y="0" width="460" height="468" fill="none" stroke="#1e293b" stroke-width="1.5" rx="6"/>
</svg>
\`\`\`

### Типы адресов в сети

\`\`\`svg
<svg viewBox="0 0 560 188" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><style>
    .hdr{fill:#065f46}.r0{fill:#1e3a5f}.r1{fill:#1e293b}.rB{fill:#3b1e1e}
    .ht{fill:#fff;font:bold 12px sans-serif;text-anchor:middle;dominant-baseline:middle}
    .typ{font:bold 12px sans-serif}
    .d1{fill:#cbd5e1;font:11px sans-serif;dominant-baseline:middle}
    .d2{fill:#94a3b8;font:10px monospace;dominant-baseline:middle}
    .sep{stroke:#334155;stroke-width:0.5}
  </style></defs>

  <!-- header -->
  <rect width="560" height="30" class="hdr"/>
  <text x="95"  y="15" class="ht">Тип</text>
  <text x="355" y="15" class="ht">Описание и пример</text>

  <!-- row: адрес сети -->
  <rect y="30"  width="560" height="50" class="r0"/>
  <text x="8"   y="51"  class="typ" fill="#60a5fa">Адрес сети</text>
  <text x="195" y="47"  class="d1">Переменная часть = все нули. Вычисляется: Маска AND IP.</text>
  <text x="195" y="64"  class="d2">Пример: 192.168.0.0  (биты 25–28 = 0000)</text>

  <!-- row: адреса узлов -->
  <rect y="80"  width="560" height="50" class="r1"/>
  <text x="8"   y="101" class="typ" fill="#34d399">Адреса узлов</text>
  <text x="195" y="97"  class="d1">Переменная часть от 0001 до 1110 — реальные устройства.</text>
  <text x="195" y="114" class="d2">Пример: 192.168.0.1 — 192.168.0.14  (итого 14 узлов)</text>

  <!-- row: broadcast -->
  <rect y="130" width="560" height="50" class="rB"/>
  <text x="8"   y="151" class="typ" fill="#f87171">Broadcast</text>
  <text x="195" y="147" class="d1">Переменная часть = все единицы. Пакет всем в сети.</text>
  <text x="195" y="164" class="d2">Пример: 192.168.0.15  (биты 25–28 = 1111)</text>

  <line x1="186" y1="30" x2="186" y2="180" class="sep"/>
  <rect width="560" height="188" fill="none" stroke="#1e293b" stroke-width="1.5" rx="6"/>
</svg>
\`\`\`

### Решение на Python — модуль ipaddress

#### Базовые операции с сетью

\`\`\`python
from ipaddress import *

net = ip_network('192.168.0.5/28', 0)

print(net)               # 192.168.0.0/28
print(net.netmask)       # 255.255.255.240
print(net[0])            # 192.168.0.0
print(net[-1])           # 192.168.0.15
print(net.num_addresses) # 16
\`\`\`

**ip_network('IP/маска', 0)** — создаёт сеть. Второй аргумент 0 означает strict=False: разрешает передавать IP с ненулевыми битами узла (например, .5), не выбрасывая ошибку.

**str(net)** — возвращает строку вида \`"192.168.0.0/28"\` (адрес сети + длина маски).

**net[0]** — первый адрес в сети = адрес сети. **net[-1]** — последний = broadcast.

**net.netmask** — маска в 4-байтовом виде, например \`255.255.255.240\`.

#### Найти маску по адресу сети

![Задача: найти маску по адресу сети](/tasks/13/mask.png)

\`\`\`python
from ipaddress import *

for mask in range(33):
    net = ip_network(f'111.81.208.27/{mask}', 0)
    if str(net) == f'111.81.192.0/{mask}':
        print(net, net.netmask)
\`\`\`

**for mask in range(33)** — перебираем все возможные длины маски от /0 до /32.

**str(net) == f'111.81.192.0/{mask}'** — проверяем, что адрес сети при данной маске совпадает с нужным.

#### Найти количество адресов в общей сети двух IP

![Задача: найти количество адресов в общей сети](/tasks/13/count.png)

\`\`\`python
from ipaddress import *

for mask in range(33):
    net1 = ip_network(f'112.117.107.70/{mask}', 0)
    net2 = ip_network(f'112.117.121.80/{mask}', 0)
    if net1 == net2:
        print(2 ** (32 - mask))
\`\`\`

**net1 == net2** — два объекта сети равны, если у них одинаковый адрес сети и одинаковая маска, то есть оба IP оказались в одной сети.

**2 ** (32 - mask)** — количество адресов в сети: количество нулей в маске = 32 − длина маски.

#### Проверка что IP является узлом

![Задача: проверка что IP является узлом](/tasks/13/node.png)

\`\`\`python
from ipaddress import *

ip1 = ip_address('123.20.103.136')
ip2 = ip_address('123.20.103.151')

for mask in range(33):
    net1 = ip_network(f'{ip1}/{mask}', 0)
    net2 = ip_network(f'{ip2}/{mask}', 0)
    if net1 != net2 and net1[0] < ip1 < net1[-1] and net2[0] < ip2 < net2[-1]:
        print(net1, net2, net2.netmask)
\`\`\`

**ip_address('...')** — создаёт объект IP-адреса, его можно подставлять в f-строки и сравнивать с net[0], net[-1].

**net1[0] < ip1 < net1[-1]** — строгие неравенства (не ≤): исключают адрес сети (net[0]) и broadcast (net[-1]), проверяя что ip1 является именно узлом.

#### Перебор адресов в сети + проверка двоичного условия

![Задача: перебор адресов с двоичным условием](/tasks/13/binary.png)

\`\`\`python
from ipaddress import *

net = ip_network('214.96.0.0/255.240.0.0')

k = 0
for ip in net:
    b = f'{int(ip):032b}'
    if b.count('0') % 3 == 0:
        k += 1
print(k)
\`\`\`

**for ip in net** — перебирает все IP-адреса в сети по одному.

**int(ip)** — переводит IP-адрес в целое число (192.168.0.1 → 3232235521).

**f'{int(ip):032b}'** — форматирует число как 32-битную двоичную строку без пробелов. Например: \`"11000000101010000000000000000101"\`. После этого можно брать срезы по байтам: \`b[0:8]\`, \`b[8:16]\`, \`b[16:24]\`, \`b[24:32]\` — или подсчитывать единицы/нули через \`.count()\`.

### Задачи с неизвестным A

#### A — количество единиц в маске

![Задача: A в маске](/tasks/13/a-mask.png)

\`\`\`python
from ipaddress import *

for mask in range(16, 25):
    net = ip_network(f'99.8.254.232/{mask}', 0)
    if all(
        f'{int(ip):032b}'[0:16].count('1') <= f'{int(ip):032b}'[16:32].count('1')
        for ip in net
    ):
        print(net.netmask)
\`\`\`

**range(16, 25)** — перебираем только разумный диапазон A (из условия задачи видно, что маска не может быть короче /16 или длиннее /24).

**all(условие for ip in net)** — возвращает True только если условие выполняется для каждого IP в сети. Как только находим первое подходящее — это и есть минимальное A, потому что перебираем по возрастанию.

**[0:16].count('1')** — количество единиц в первых 16 битах (левые 2 байта). Срез \`[16:32]\` — правые 2 байта.

#### A — байт в IP-адресе

![Задача: A в IP-адресе](/tasks/13/a-ip.png)

\`\`\`python
from ipaddress import *

for a in range(256):
    net = ip_network(f'250.113.{a}.197/255.255.255.192', 0)
    if all(
        f'{int(ip):032b}'[:16].count('1') >= f'{int(ip):032b}'[16:].count('1')
        for ip in net
    ):
        print(a)
\`\`\`

**for a in range(256)** — A стоит на месте одного байта IP-адреса, поэтому перебираем все 256 значений (0–255). Подставляем в f-строку и строим сеть для каждого варианта.`,

  practice: [
    {
      question: "Маска сети /26. Сколько IP-адресов (всего, включая адрес сети и broadcast) в этой сети?",
      options: [
        { id: "A", text: "26" },
        { id: "B", text: "32" },
        { id: "C", text: "64" },
        { id: "D", text: "128" }
      ],
      correct: "C",
      explanation: "Маска /26 означает 26 единиц и 32−26 = 6 нулей. Количество адресов = 2⁶ = 64. Из них адресов узлов: 64−2 = 62 (вычитаем адрес сети и broadcast)."
    },
    {
      question: "IP-адрес 192.168.0.200, маска 255.255.255.192. Чему равен адрес сети?",
      options: [
        { id: "A", text: "192.168.0.192" },
        { id: "B", text: "192.168.0.0" },
        { id: "C", text: "192.168.0.255" },
        { id: "D", text: "192.168.0.128" }
      ],
      correct: "A",
      explanation: "Адрес сети = Маска AND IP. 255.255.255.192 в двоичном: последний байт = 11000000. 200 = 11001000. AND: 11000000 AND 11001000 = 11000000 = 192. Адрес сети: 192.168.0.192."
    },
    {
      question: "Маска 255.255.255.240 — как она записывается через /N?",
      options: [
        { id: "A", text: "/24" },
        { id: "B", text: "/240" },
        { id: "C", text: "/28" },
        { id: "D", text: "/16" }
      ],
      correct: "C",
      explanation: "240 в двоичном: 11110000 — четыре единицы. Итого единиц в маске: 8+8+8+4 = 28. Запись: /28."
    },
    {
      question: "Два компьютера с адресами 10.0.0.100 и 10.0.0.130 — находятся ли они в одной сети /25?",
      options: [
        { id: "A", text: "Да, оба в сети 10.0.0.0/25" },
        { id: "B", text: "Нет, они в разных /25 сетях" },
        { id: "C", text: "Да, если добавить ещё один адрес" },
        { id: "D", text: "Нет, потому что .130 — broadcast" }
      ],
      correct: "B",
      explanation: "Маска /25 — 7 переменных бит → 128 адресов на сеть. Сети: 10.0.0.0–10.0.0.127 и 10.0.0.128–10.0.0.255. Адрес .100 ≤ 127 → первая сеть. Адрес .130 ≥ 128 → вторая сеть. Разные."
    },
    {
      question: "Сколько адресов УЗЛОВ (без адреса сети и broadcast) в сети /22?",
      options: [
        { id: "A", text: "1024" },
        { id: "B", text: "1022" },
        { id: "C", text: "2046" },
        { id: "D", text: "512" }
      ],
      correct: "B",
      explanation: "Переменных бит: 32−22 = 10. Всего адресов: 2¹⁰ = 1024. Вычитаем адрес сети и broadcast: 1024−2 = 1022 адреса узлов."
    }
  ],

  aiContext: `Это задание 13 ЕГЭ по информатике — IP-адресация, маски сети, адреса узлов.

Ключевые факты:
1. IPv4 = 32 бита = 4 байта по 0-255 через точку
2. Маска делит адрес на постоянную и переменную части
3. Маска: сначала единицы, потом нули. /N = N единиц
4. Адрес сети = Маска AND IP (побитовое И)
5. Количество адресов = 2^(32-N) где N — длина маски
6. Адресов узлов = 2^(32-N) − 2 (без адреса сети и broadcast)
7. Broadcast = все 1 в переменной части

Python: from ipaddress import *
- ip_network(f'ip/{mask}', 0) — строим сеть (0 = strict=False)
- net[0] — адрес сети, net[-1] — broadcast
- net.netmask — маска в виде 4 байт
- str(net) — строка вида "192.168.0.0/28"
- f'{int(ip):032b}' — IP как 32-битная двоичная строка
- Проверка узла: net[0] < ip < net[-1] (строгие неравенства)

Типичные задачи:
- Найти маску по адресу сети (перебор mask в range(33))
- Два IP в одной сети? (перебор, проверить net1 == net2)
- Найти количество адресов в общей сети (2**(32-mask))
- Задачи с неизвестным A в маске или IP (перебор range(33) или range(256))`,

  promptSuggestion: "Объясни задание 13 ЕГЭ по информатике: IP-адреса и маски сети."
};
