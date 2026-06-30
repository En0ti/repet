import { Boxes } from 'lucide-react';

export default {
  id: "task-27",
  title: "Задание 27: Кластеризация",
  description: "Разбиение точек на кластеры и поиск центроидов — полуанализ через Excel + код.",
  icon: Boxes,
  theory: `### Суть задания 27 (кластеризация)

Дано множество звёзд (точек) на карте. Нужно разбить их на **кластеры** — группы близко расположенных точек. У каждого кластера есть **центроид**: по условию этой задачи — звезда кластера, **сумма расстояний от которой до всех остальных звёзд кластера минимальна**. Расстояние между точками — обычное евклидово \`d = √((x₁−x₂)² + (y₁−y₂)²)\`.

Дано два файла: **А** (две группы кластеров) и **Б** (три). Для каждого файла находим центроиды кластеров и считаем итоговую величину (здесь: Px — среднее абсцисс центроидов, Py — среднее ординат; в ответ — целые части Px·100000 и Py·100000).

![Задание 27 — условие задачи](/tasks/27/ex-task.png)

> 🔑 **Главное:** итоговый вопрос (что именно посчитать про центроиды) может меняться от задачи к задаче, но **сам алгоритм кластеризации — всегда один**. Его и разбираем.

### Метод 1. Полуанализ через Excel (для компактных облаков)

Идея простая: **глазами** на точечной диаграмме видим облака точек, проводим разделяющие **прямые**, и по этим прямым в коде раскидываем точки по кластерам.

#### Шаг 1. Данные в Excel → «текст по столбцам»

Открываем файл (если это \`.xls\` — сразу в Excel; если \`.txt\` — копируем данные в Excel). Делаем **Данные → Текст по столбцам** (как в задании 22), чтобы координата **x** оказалась в одном столбце, а **y** — в соседнем.

![Задание 27 — данные и текст по столбцам](/tasks/27/ex-data.png)

#### Шаг 2. Вставляем точечную диаграмму

Выделяем оба столбца → **Вставка → Диаграммы → Точечная**. Теперь кластеры видны глазами.

![Задание 27 — вставка точечной диаграммы](/tasks/27/ex-chart.png)

#### Шаг 3. Разделяем кластеры прямыми

На диаграмме подбираем прямые, отделяющие облака друг от друга, и записываем их уравнения (\`y = x+2\`, \`y = 2−x\`, \`y = x+3\` …). Именно эти неравенства станут условиями в коде. Для файла Б (3 кластера) нужны **две** прямые:

\`\`\`svg
<svg viewBox="0 0 560 384" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="560" height="384" fill="#0f172a" rx="8"/>
  <text x="280.0" y="20" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Файл Б: 3 кластера. Разделяем прямыми y=2−x и y=x+3, по ним и пишем условия в коде.</text>
  <line x1="50.0" y1="30" x2="50.0" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="50.0" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">-8</text>
  <line x1="111.25" y1="30" x2="111.25" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="111.25" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">-6</text>
  <line x1="172.5" y1="30" x2="172.5" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="172.5" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">-4</text>
  <line x1="233.75" y1="30" x2="233.75" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="233.75" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">-2</text>
  <line x1="295.0" y1="30" x2="295.0" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="295.0" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">0</text>
  <line x1="356.25" y1="30" x2="356.25" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="356.25" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">2</text>
  <line x1="417.5" y1="30" x2="417.5" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="417.5" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">4</text>
  <line x1="478.75" y1="30" x2="478.75" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="478.75" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">6</text>
  <line x1="540.0" y1="30" x2="540.0" y2="350" stroke="#1e293b" stroke-width="1"/>
  <text x="540.0" y="364" fill="#475569" font-family="monospace" font-size="9" text-anchor="middle">8</text>
  <line x1="50" y1="350.0" x2="540" y2="350.0" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="353.0" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">-3</text>
  <line x1="50" y1="300.7692307692308" x2="540" y2="300.7692307692308" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="303.7692307692308" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">-1</text>
  <line x1="50" y1="251.53846153846155" x2="540" y2="251.53846153846155" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="254.53846153846155" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">1</text>
  <line x1="50" y1="202.3076923076923" x2="540" y2="202.3076923076923" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="205.3076923076923" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">3</text>
  <line x1="50" y1="153.07692307692307" x2="540" y2="153.07692307692307" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="156.07692307692307" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">5</text>
  <line x1="50" y1="103.84615384615384" x2="540" y2="103.84615384615384" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="106.84615384615384" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">7</text>
  <line x1="50" y1="54.615384615384585" x2="540" y2="54.615384615384585" stroke="#1e293b" stroke-width="1"/>
  <text x="42" y="57.615384615384585" fill="#475569" font-family="monospace" font-size="9" text-anchor="end">9</text>
  <line x1="50.0" y1="30.0" x2="448.1" y2="350.0" stroke="#ef4444" stroke-width="2"/>
  <text x="435.875" y="334.15384615384613" fill="#ef4444" font-family="sans-serif" font-size="12" font-weight="bold">y = 2 − x</text>
  <line x1="111.2" y1="350.0" x2="509.4" y2="30.0" stroke="#22d3ee" stroke-width="2"/>
  <text x="95.9375" y="356.3076923076923" fill="#22d3ee" font-family="sans-serif" font-size="12" font-weight="bold">y = x + 3</text>
  <circle cx="97.9" cy="263.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="199.8" cy="282.0" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="93.1" cy="272.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="176.1" cy="248.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="98.3" cy="298.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="186.6" cy="261.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="224.6" cy="250.7" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="149.4" cy="277.0" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="272.2" cy="277.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="118.1" cy="295.0" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="158.5" cy="268.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="138.3" cy="272.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="166.7" cy="256.7" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="204.5" cy="266.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="71.9" cy="256.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="88.9" cy="274.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="86.4" cy="271.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="118.4" cy="266.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="305.7" cy="272.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="192.8" cy="298.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="140.9" cy="257.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="149.9" cy="263.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="158.9" cy="292.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="180.0" cy="288.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="240.1" cy="281.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="185.6" cy="271.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="197.9" cy="283.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="200.0" cy="273.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="212.2" cy="258.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="160.6" cy="287.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="189.4" cy="261.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="229.5" cy="279.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="179.6" cy="260.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="167.1" cy="266.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="162.5" cy="283.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="107.5" cy="279.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="181.3" cy="239.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="199.0" cy="249.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="189.8" cy="256.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="162.5" cy="255.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="235.6" cy="278.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="122.3" cy="230.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="165.4" cy="250.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="194.3" cy="295.0" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="265.9" cy="234.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="162.3" cy="255.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="160.0" cy="289.7" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="149.0" cy="263.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="205.4" cy="256.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="156.9" cy="242.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="119.2" cy="254.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="205.2" cy="277.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="71.9" cy="290.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="165.0" cy="260.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="225.2" cy="292.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="154.2" cy="257.7" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="146.9" cy="320.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="191.2" cy="222.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="200.3" cy="290.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="135.2" cy="266.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="268.5" cy="258.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="159.3" cy="238.6" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="150.4" cy="232.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="122.7" cy="281.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="187.2" cy="241.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="184.2" cy="264.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="70.4" cy="286.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="126.1" cy="282.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="181.1" cy="278.2" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="190.3" cy="269.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="138.8" cy="268.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="173.8" cy="253.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="132.2" cy="276.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="91.5" cy="237.7" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="220.8" cy="275.0" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="132.1" cy="297.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="161.9" cy="266.9" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="254.3" cy="266.1" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="118.4" cy="322.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="218.9" cy="267.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="80.2" cy="267.5" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="80.2" cy="198.4" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="205.5" cy="259.3" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="146.1" cy="316.0" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="148.3" cy="303.8" r="2.7" fill="#22c55e" opacity="0.9"/>
  <circle cx="266.1" cy="72.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="233.5" cy="80.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="357.8" cy="124.5" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="277.2" cy="117.6" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="251.5" cy="117.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="378.5" cy="85.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="306.3" cy="124.4" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="306.9" cy="132.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="220.8" cy="85.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="388.4" cy="81.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="382.7" cy="95.5" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="276.0" cy="99.4" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="293.9" cy="127.4" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="225.3" cy="136.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="313.1" cy="97.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="288.7" cy="68.0" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="322.7" cy="87.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="376.8" cy="120.6" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="210.8" cy="83.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="277.5" cy="70.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="330.9" cy="77.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="350.8" cy="117.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="274.0" cy="111.6" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="353.4" cy="80.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="282.6" cy="156.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="308.1" cy="87.4" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="273.6" cy="95.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="325.4" cy="77.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="270.6" cy="120.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="273.6" cy="60.4" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="370.2" cy="104.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="325.1" cy="98.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="323.9" cy="106.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="296.0" cy="130.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="280.0" cy="62.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="341.3" cy="99.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="302.2" cy="99.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="331.8" cy="116.5" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="323.6" cy="95.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="274.4" cy="119.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="261.4" cy="126.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="299.5" cy="115.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="281.1" cy="99.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="372.1" cy="99.6" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="306.1" cy="115.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="306.7" cy="80.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="292.9" cy="128.2" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="247.6" cy="127.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="241.0" cy="75.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="331.9" cy="106.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="352.6" cy="82.7" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="232.9" cy="137.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="265.1" cy="80.2" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="368.0" cy="110.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="292.9" cy="114.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="296.5" cy="143.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="261.2" cy="130.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="338.9" cy="52.5" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="223.8" cy="110.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="264.5" cy="55.0" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="343.1" cy="118.4" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="362.1" cy="88.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="228.8" cy="113.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="300.9" cy="100.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="320.3" cy="109.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="323.3" cy="115.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="266.7" cy="65.9" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="332.1" cy="91.1" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="230.3" cy="105.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="356.0" cy="131.6" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="370.5" cy="110.5" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="334.3" cy="104.5" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="324.8" cy="73.2" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="292.4" cy="64.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="272.7" cy="123.2" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="350.4" cy="126.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="294.1" cy="80.2" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="339.7" cy="57.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="375.6" cy="107.0" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="282.1" cy="108.3" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="253.4" cy="107.6" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="303.6" cy="104.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="374.9" cy="106.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="237.5" cy="76.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="257.5" cy="111.8" r="2.7" fill="#3b82f6" opacity="0.9"/>
  <circle cx="421.2" cy="217.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="385.2" cy="215.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="517.0" cy="223.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="421.1" cy="183.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="457.5" cy="191.8" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="462.3" cy="255.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="391.0" cy="206.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="447.3" cy="179.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="446.1" cy="215.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="428.3" cy="214.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="436.9" cy="193.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="412.6" cy="228.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="391.3" cy="184.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="479.6" cy="186.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="462.1" cy="190.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="426.6" cy="194.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="383.2" cy="214.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="396.4" cy="192.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="402.7" cy="212.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="443.2" cy="178.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="393.9" cy="231.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="460.5" cy="235.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="445.4" cy="223.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="422.3" cy="252.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="456.2" cy="221.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="389.5" cy="161.1" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="456.1" cy="127.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="443.6" cy="217.8" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="431.1" cy="172.1" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="425.6" cy="199.1" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="448.0" cy="231.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="432.0" cy="221.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="375.2" cy="189.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="454.2" cy="207.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="389.2" cy="256.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="446.8" cy="212.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="357.1" cy="211.1" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="363.8" cy="210.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="432.6" cy="201.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="435.7" cy="205.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="379.6" cy="218.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="405.5" cy="215.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="437.9" cy="195.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="494.3" cy="269.8" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="443.3" cy="214.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="520.8" cy="187.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="358.3" cy="200.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="405.2" cy="186.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="383.0" cy="212.1" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="421.2" cy="212.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="402.5" cy="252.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="445.7" cy="186.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="423.9" cy="233.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="435.1" cy="196.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="419.4" cy="210.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="484.9" cy="235.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="403.6" cy="254.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="397.8" cy="227.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="387.0" cy="225.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="501.0" cy="214.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="422.0" cy="158.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="424.2" cy="250.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="443.3" cy="231.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="494.4" cy="238.8" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="402.7" cy="247.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="430.7" cy="233.4" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="424.0" cy="218.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="401.3" cy="187.6" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="465.4" cy="208.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="389.5" cy="234.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="437.8" cy="153.8" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="407.8" cy="228.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="397.9" cy="235.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="386.5" cy="214.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="486.0" cy="209.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="405.6" cy="247.5" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="435.5" cy="210.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="376.0" cy="235.1" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="424.9" cy="186.0" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="452.6" cy="204.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="413.3" cy="202.2" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="426.2" cy="158.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="379.9" cy="218.3" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="479.1" cy="215.9" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="485.6" cy="210.7" r="2.7" fill="#f59e0b" opacity="0.9"/>
  <circle cx="60" cy="372" r="4" fill="#22c55e"/><text x="68" y="376" fill="#cbd5e1" font-family="sans-serif" font-size="10">B[0]: y &lt; 2−x</text>
  <circle cx="180" cy="372" r="4" fill="#3b82f6"/><text x="188" y="376" fill="#cbd5e1" font-family="sans-serif" font-size="10">B[1]: y &gt; x+3</text>
  <circle cx="300" cy="372" r="4" fill="#f59e0b"/><text x="308" y="376" fill="#cbd5e1" font-family="sans-serif" font-size="10">B[2]: остальные</text>
</svg>
\`\`\`

### Код решения

#### Кластеризация файла А (2 кластера, 1 прямая)

[📥 Скачать файл 27a-3.txt](/tasks/27/27a-3.txt)

\`\`\`python
A = [[], []]
for s in open('27a-3.txt'):
    x, y = [float(d) for d in s.replace(',', '.').split()]
    if y < x + 2:
        A[0].append([x, y])
    else:
        A[1].append([x, y])
\`\`\`

- \`s.replace(',', '.')\` — на случай, если координаты записаны через запятую (десятичная); \`.split()\` режет строку по пробелу.
- условие \`y < x + 2\` — это и есть прямая, проведённая на диаграмме.

#### Кластеризация файла Б (3 кластера, 2 прямые)

[📥 Скачать файл 27b-3.txt](/tasks/27/27b-3.txt)

\`\`\`python
B = [[], [], []]
for s in open('27b-3.txt'):
    x, y = [float(d) for d in s.replace(',', '.').split()]
    if y < 2 - x:
        B[0].append([x, y])
    elif y > x + 3:
        B[1].append([x, y])
    else:
        B[2].append([x, y])
\`\`\`

#### (Рекомендуется) Проверка черепашкой

Перед подсчётом полезно **нарисовать кластеры разными цветами** и убедиться глазами, что разделили правильно:

\`\`\`python
from turtle import *
from random import *

tracer(0)
up()
screensize(2000, 2000)
for cl in B:
    color = (random(), random(), random())
    for x, y in cl:
        goto(x * 40, y * 40)   # *40 — просто масштаб, чтобы точки разъехались
        dot(5, color)
done()
\`\`\`

Если каждое облако окрасилось в свой цвет и они не перемешаны — прямые подобраны верно.

#### Функция центроида

Центроид (по условию этой задачи) — точка кластера с **минимальной суммой расстояний** до всех остальных точек кластера:

\`\`\`python
from math import dist

def centr(cl):
    m = []
    for p in cl:
        s = 0
        for p1 in cl:
            s += dist(p, p1)      # суммируем расстояния от p до всех точек
        m.append([s, p])
    return min(m)[1]              # точка с наименьшей суммой
\`\`\`

- для каждой точки \`p\` считаем суммарное расстояние до всех точек кластера;
- \`min(m)[1]\` — у элемента \`[s, p]\` с минимальным \`s\` берём вторую часть, саму точку \`p\`.

> ⚠️ Именно **функция центроида и финальный вопрос** меняются от варианта к варианту (бывает «самая удалённая звезда», «среднее», «количество» и т.п.). Кластеризация при этом остаётся прежней — поэтому её и держим как базу.

#### Вывод ответа (по условию: средние координат центроидов)

\`\`\`python
ca = [centr(cl) for cl in A]
px = sum(x for x, y in ca) / len(ca)
py = sum(y for x, y in ca) / len(ca)
print(int(px * 100000), int(py * 100000))

cb = [centr(cl) for cl in B]
px = sum(x for x, y in cb) / len(cb)
py = sum(y for x, y in cb) / len(cb)
print(int(px * 100000), int(py * 100000))
\`\`\`

Ответ:

\`\`\`
258853 499656
6165 372336
\`\`\`


### Метод 2. Волновой алгоритм (DBSCAN)

Если кластеры **изогнутой формы** — спирали, полумесяцы, кольца — прямыми их не разделить (метод 1 не сработает). Тогда **Excel вообще не открываем**, а кластеризуем чисто алгоритмически: **ищем соседние точки**.

**Идея (волна / заливка):** берём любую точку, находим все точки ближе порога \`eps\` — это её соседи, они в том же кластере. Потом ищем соседей этих соседей — и волна расходится по всей связной группе точек, какой бы формы она ни была. Закончились связанные точки — кластер готов; берём следующую необработанную точку — начинаем новый кластер.

![Задание 27 — кластеры изогнутой формы](/tasks/27/ex-crescent.png)

\`\`\`svg
<svg viewBox="0 0 560 384" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect width="560" height="384" fill="#0f172a" rx="8"/>
  <text x="250" y="22" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Волна: от точки растём к соседям (ближе eps), потом к их соседям — по любой форме.</text>
  <circle cx="109.2" cy="201.6" r="35.2" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="135" y="194" fill="#94a3b8" font-family="monospace" font-size="10">eps</text>
  <circle cx="316.2" cy="148.2" r="4" fill="#f87171"/>
  <circle cx="316.5" cy="139.9" r="4" fill="#f87171"/>
  <circle cx="308.4" cy="136.9" r="4" fill="#f87171"/>
  <circle cx="306.0" cy="129.3" r="4" fill="#f8825f"/>
  <circle cx="299.9" cy="124.6" r="4" fill="#f8825f"/>
  <circle cx="286.7" cy="128.5" r="4" fill="#f8825f"/>
  <circle cx="279.8" cy="126.0" r="4" fill="#f8825f"/>
  <circle cx="280.6" cy="110.6" r="4" fill="#f9934e"/>
  <circle cx="268.2" cy="116.9" r="4" fill="#f9934e"/>
  <circle cx="260.7" cy="115.2" r="4" fill="#f9934e"/>
  <circle cx="256.8" cy="100.9" r="4" fill="#f9934e"/>
  <circle cx="246.4" cy="108.4" r="4" fill="#faa53d"/>
  <circle cx="238.9" cy="101.4" r="4" fill="#faa53d"/>
  <circle cx="230.2" cy="107.2" r="4" fill="#faa53d"/>
  <circle cx="221.9" cy="104.6" r="4" fill="#faa53d"/>
  <circle cx="214.9" cy="113.6" r="4" fill="#fab62c"/>
  <circle cx="205.3" cy="106.6" r="4" fill="#fab62c"/>
  <circle cx="195.8" cy="104.5" r="4" fill="#fab62c"/>
  <circle cx="190.1" cy="112.3" r="4" fill="#fab62c"/>
  <circle cx="180.6" cy="111.5" r="4" fill="#e2bf2a"/>
  <circle cx="173.7" cy="115.7" r="4" fill="#e2bf2a"/>
  <circle cx="173.4" cy="127.9" r="4" fill="#e2bf2a"/>
  <circle cx="158.5" cy="122.1" r="4" fill="#e2bf2a"/>
  <circle cx="154.2" cy="128.7" r="4" fill="#b2c137"/>
  <circle cx="152.6" cy="136.9" r="4" fill="#b2c137"/>
  <circle cx="151.6" cy="144.6" r="4" fill="#b2c137"/>
  <circle cx="133.0" cy="141.1" r="4" fill="#b2c137"/>
  <circle cx="135.1" cy="150.6" r="4" fill="#82c244"/>
  <circle cx="126.6" cy="154.4" r="4" fill="#82c244"/>
  <circle cx="119.9" cy="159.7" r="4" fill="#82c244"/>
  <circle cx="120.0" cy="167.3" r="4" fill="#82c244"/>
  <circle cx="113.4" cy="173.0" r="4" fill="#52c351"/>
  <circle cx="122.2" cy="181.7" r="4" fill="#52c351"/>
  <circle cx="112.7" cy="187.4" r="4" fill="#52c351"/>
  <circle cx="119.4" cy="194.7" r="4" fill="#52c351"/>
  <circle cx="109.2" cy="201.6" r="4" fill="#22c55e"/>
  <circle cx="111.0" cy="208.7" r="4" fill="#52c351"/>
  <circle cx="128.3" cy="213.4" r="4" fill="#52c351"/>
  <circle cx="129.2" cy="219.6" r="4" fill="#52c351"/>
  <circle cx="129.8" cy="226.0" r="4" fill="#82c244"/>
  <circle cx="118.2" cy="236.9" r="4" fill="#82c244"/>
  <circle cx="131.8" cy="239.4" r="4" fill="#82c244"/>
  <circle cx="132.4" cy="246.8" r="4" fill="#82c244"/>
  <circle cx="142.5" cy="249.3" r="4" fill="#b2c137"/>
  <circle cx="144.0" cy="256.6" r="4" fill="#b2c137"/>
  <circle cx="151.3" cy="260.1" r="4" fill="#b2c137"/>
  <circle cx="157.6" cy="264.2" r="4" fill="#b2c137"/>
  <circle cx="160.7" cy="271.5" r="4" fill="#e2bf2a"/>
  <circle cx="167.5" cy="275.5" r="4" fill="#e2bf2a"/>
  <circle cx="171.4" cy="283.7" r="4" fill="#e2bf2a"/>
  <circle cx="181.1" cy="283.6" r="4" fill="#e2bf2a"/>
  <circle cx="187.1" cy="290.2" r="4" fill="#fab62c"/>
  <circle cx="195.9" cy="291.3" r="4" fill="#fab62c"/>
  <circle cx="203.7" cy="295.3" r="4" fill="#fab62c"/>
  <circle cx="213.4" cy="291.2" r="4" fill="#fab62c"/>
  <circle cx="222.5" cy="283.3" r="4" fill="#faa53d"/>
  <circle cx="230.3" cy="295.3" r="4" fill="#faa53d"/>
  <circle cx="239.1" cy="296.8" r="4" fill="#faa53d"/>
  <circle cx="247.7" cy="294.9" r="4" fill="#faa53d"/>
  <circle cx="254.8" cy="288.0" r="4" fill="#f9934e"/>
  <circle cx="263.7" cy="288.6" r="4" fill="#f9934e"/>
  <circle cx="267.9" cy="278.3" r="4" fill="#f9934e"/>
  <circle cx="280.5" cy="285.4" r="4" fill="#f9934e"/>
  <circle cx="285.5" cy="278.2" r="4" fill="#f8825f"/>
  <circle cx="289.2" cy="270.6" r="4" fill="#f8825f"/>
  <circle cx="292.7" cy="263.8" r="4" fill="#f8825f"/>
  <circle cx="309.5" cy="269.8" r="4" fill="#f8825f"/>
  <circle cx="317.8" cy="266.4" r="4" fill="#f87171"/>
  <circle cx="309.1" cy="251.2" r="4" fill="#f87171"/>
  <circle cx="325.8" cy="253.2" r="4" fill="#f87171"/>
  <circle cx="109.2" cy="201.6" r="5.5" fill="none" stroke="#fff" stroke-width="1.6"/>
  <text x="109" y="222" fill="#e2e8f0" font-family="sans-serif" font-size="10" text-anchor="middle">старт</text>
  <text x="447" y="108" fill="#cbd5e1" font-family="sans-serif" font-size="12" font-weight="bold">Шаги волны</text>
  <rect x="455" y="120.0" width="16" height="4.3" fill="#22c55e"/>
  <rect x="455" y="123.8" width="16" height="4.3" fill="#2dc45b"/>
  <rect x="455" y="127.7" width="16" height="4.3" fill="#38c458"/>
  <rect x="455" y="131.5" width="16" height="4.3" fill="#43c455"/>
  <rect x="455" y="135.4" width="16" height="4.3" fill="#4ec352"/>
  <rect x="455" y="139.2" width="16" height="4.3" fill="#59c34f"/>
  <rect x="455" y="143.1" width="16" height="4.3" fill="#64c34c"/>
  <rect x="455" y="146.9" width="16" height="4.3" fill="#6fc249"/>
  <rect x="455" y="150.8" width="16" height="4.3" fill="#7bc246"/>
  <rect x="455" y="154.6" width="16" height="4.3" fill="#86c243"/>
  <rect x="455" y="158.5" width="16" height="4.3" fill="#91c140"/>
  <rect x="455" y="162.3" width="16" height="4.3" fill="#9cc13d"/>
  <rect x="455" y="166.2" width="16" height="4.3" fill="#a7c13a"/>
  <rect x="455" y="170.0" width="16" height="4.3" fill="#b2c137"/>
  <rect x="455" y="173.8" width="16" height="4.3" fill="#bdc034"/>
  <rect x="455" y="177.7" width="16" height="4.3" fill="#c8c031"/>
  <rect x="455" y="181.5" width="16" height="4.3" fill="#d4c02e"/>
  <rect x="455" y="185.4" width="16" height="4.3" fill="#dfbf2b"/>
  <rect x="455" y="189.2" width="16" height="4.3" fill="#eabf28"/>
  <rect x="455" y="193.1" width="16" height="4.3" fill="#f5bf25"/>
  <rect x="455" y="196.9" width="16" height="4.3" fill="#fabd25"/>
  <rect x="455" y="200.8" width="16" height="4.3" fill="#fab929"/>
  <rect x="455" y="204.6" width="16" height="4.3" fill="#fab52d"/>
  <rect x="455" y="208.5" width="16" height="4.3" fill="#fab131"/>
  <rect x="455" y="212.3" width="16" height="4.3" fill="#faad35"/>
  <rect x="455" y="216.2" width="16" height="4.3" fill="#faa939"/>
  <rect x="455" y="220.0" width="16" height="4.3" fill="#faa53d"/>
  <rect x="455" y="223.8" width="16" height="4.3" fill="#f9a141"/>
  <rect x="455" y="227.7" width="16" height="4.3" fill="#f99d45"/>
  <rect x="455" y="231.5" width="16" height="4.3" fill="#f99949"/>
  <rect x="455" y="235.4" width="16" height="4.3" fill="#f9954d"/>
  <rect x="455" y="239.2" width="16" height="4.3" fill="#f99151"/>
  <rect x="455" y="243.1" width="16" height="4.3" fill="#f98d55"/>
  <rect x="455" y="246.9" width="16" height="4.3" fill="#f88959"/>
  <rect x="455" y="250.8" width="16" height="4.3" fill="#f8855d"/>
  <rect x="455" y="254.6" width="16" height="4.3" fill="#f88161"/>
  <rect x="455" y="258.5" width="16" height="4.3" fill="#f87c65"/>
  <rect x="455" y="262.3" width="16" height="4.3" fill="#f87969"/>
  <rect x="455" y="266.2" width="16" height="4.3" fill="#f8756d"/>
  <rect x="455" y="270.0" width="16" height="4.3" fill="#f87171"/>
  <text x="479" y="126" fill="#94a3b8" font-family="monospace" font-size="10">0 — старт</text>
  <text x="479" y="270" fill="#94a3b8" font-family="monospace" font-size="10">9 — край</text>
  <text x="447" y="304" fill="#86efac" font-family="sans-serif" font-size="11">Форма любая —</text>
  <text x="447" y="320" fill="#86efac" font-family="sans-serif" font-size="11">прямые не нужны.</text>
</svg>
\`\`\`

#### Код

[📥 Скачать файл 2a.txt](/tasks/27/2a.txt) (файл А, 2 кластера) · [📥 Скачать файл 2b.txt](/tasks/27/2b.txt) (файл Б, 3 кластера)

\`\`\`python
data = []
for s in open('2b.txt'):
    x, y = [float(d) for d in s.replace(',', '.').split()]
    data.append([x, y])

from math import dist

clusters = []
while data:                                       # пока остались необработанные точки
    cl = [data.pop()]                             # новый кластер из одной точки
    for p in cl:                                  # идём по РАСТУЩЕМУ списку cl
        sosed = [p1 for p1 in data if dist(p, p1) < 0.5]   # соседи p (ближе 0.5)
        cl.extend(sosed)                          # добавляем их в кластер
        for p1 in sosed:
            data.remove(p1)                       # и убираем из data, чтобы не взять дважды
    clusters.append(cl)
\`\`\`

Разбор по строкам.

**Чтение файла.**
- \`for s in open('2b.txt'):\` — читаем файл построчно, \`s\` — одна строка вида \`"3,5 7,1"\`.
- \`s.replace(',', '.')\` — меняем запятую на точку (вдруг координаты дробные через запятую — иначе \`float\` выдаст ошибку).
- \`.split()\` — режем строку по пробелу на два куска: x и y.
- \`[float(d) for d in ...]\` — превращаем оба куска в числа.
- \`data.append([x, y])\` — кладём точку как список \`[x, y]\`. В итоге \`data\` — список всех точек.

**Подготовка.**
- \`from math import dist\` — готовая функция: \`dist(a, b)\` сразу считает евклидово расстояние между точками \`a\` и \`b\`.
- \`clusters = []\` — сюда будем складывать готовые кластеры.

**Внешний цикл — нарезаем кластеры.**
- \`while data:\` — повторяем, пока в \`data\` остались неразобранные точки. Каждый проход тела даёт ровно один новый кластер.
- \`cl = [data.pop()]\` — берём любую оставшуюся точку как «зерно» нового кластера. \`pop()\` забирает точку с конца и **сразу убирает** её из \`data\`.

**Внутренний цикл — волна по соседям.**
- \`for p in cl:\` — идём по точкам текущего кластера. Список \`cl\` растёт прямо во время перебора, поэтому новые точки тоже будут обработаны — это и есть распространение волны.
- \`sosed = [p1 for p1 in data if dist(p, p1) < 0.5]\` — собираем все ещё-не-разобранные точки ближе \`0.5\` к \`p\`. Это «новый слой» соседей. \`0.5\` — порог \`eps\`, подбирается под плотность данных.
- \`cl.extend(sosed)\` — присоединяем соседей к кластеру (и они попадут в перебор \`for p in cl\`).
- \`for p1 in sosed: data.remove(p1)\` — выкидываем этих соседей из \`data\`, чтобы они не нашлись повторно и не было зацикливания.

**Завершение кластера.**
- когда у очередной точки соседей в \`data\` больше нет, \`for\`-цикл доходит до конца \`cl\` и завершается — кластер собран.
- \`clusters.append(cl)\` — кладём готовый кластер в общий список и возвращаемся к \`while\`.

Число кластеров получается **само** — \`len(clusters)\`, его не нужно знать заранее.

#### Проверка черепашкой (как в методе 1)

\`\`\`python
from turtle import *
from random import *

tracer(0)
up()
screensize(2000, 2000)
for cl in clusters:
    color = random(), random(), random()
    for x, y in cl:
        goto(x * 50, y * 50)
        dot(5, color)
done()

# print([len(cl) for cl in clusters])   # сколько точек в каждом кластере
\`\`\`

#### Центроид и ответ — те же, что в методе 1

\`\`\`python
def centr(cl):
    m = []
    for p in cl:
        s = sum(dist(p, p1) for p1 in cl)
        m.append([s, p])
    return min(m)[1]

cen = [centr(cl) for cl in clusters]
px = sum(x for x, y in cen) / len(cen)     # делим на число найденных кластеров
py = sum(y for x, y in cen) / len(cen)
print(int(px * 100000), int(py * 100000))
\`\`\`

Ответ для примера с изогнутыми кластерами:

\`\`\`
342486 490371
497620 549061
\`\`\`

> 📌 **На практике DBSCAN — универсальный метод**: работает для кластеров любой формы и не требует Excel, поэтому его можно использовать почти всегда. Есть буквально единичные задачи, где он не справляется (например, кластеры «слиплись» и порог eps не подобрать), — но это редкость. Метод 1 (прямые) держим как простую запасную идею для компактных, явно разделимых облаков.

`,

  practice: [
    {
      question: "Что такое центроид кластера по условию этой задачи?",
      options: [
        { id: "A", text: "Геометрический центр (среднее всех координат)" },
        { id: "B", text: "Звезда кластера, сумма расстояний от которой до всех остальных звёзд кластера минимальна" },
        { id: "C", text: "Самая яркая звезда" },
        { id: "D", text: "Первая точка в файле" }
      ],
      correct: "B",
      explanation: "Здесь центроид — реальная точка кластера с минимальной суммой расстояний до всех остальных точек этого кластера. Это не среднее арифметическое, а конкретная звезда (медоида). В других вариантах определение может быть иным."
    },
    {
      question: "Как из точечной диаграммы переходят к коду кластеризации?",
      options: [
        { id: "A", text: "Считают количество точек" },
        { id: "B", text: "Проводят разделяющие прямые, а их уравнения записывают условиями if (например y < x+2)" },
        { id: "C", text: "Сортируют точки по x" },
        { id: "D", text: "Меняют местами столбцы x и y" }
      ],
      correct: "B",
      explanation: "Глазами на диаграмме видно облака точек. Между ними проводят прямые (y = x+2 и т.п.) и в коде по этим неравенствам раскидывают точки: if y < x+2 → один кластер, else → другой."
    },
    {
      question: "Зачем в коде пишут s.replace(',', '.') перед split()?",
      options: [
        { id: "A", text: "Чтобы удалить пробелы" },
        { id: "B", text: "На случай, если в файле дробные координаты записаны через запятую — заменяем на точку, иначе float() не сработает" },
        { id: "C", text: "Чтобы разделить x и y" },
        { id: "D", text: "Это ускоряет чтение файла" }
      ],
      correct: "B",
      explanation: "Если координаты вида 3,5 (запятая как десятичный разделитель), float('3,5') выдаст ошибку. Замена запятой на точку делает строку пригодной для float."
    },
    {
      question: "Зачем рекомендуется проверка черепашкой (turtle) перед подсчётом?",
      options: [
        { id: "A", text: "Без неё код не запустится" },
        { id: "B", text: "Чтобы НАГЛЯДНО увидеть, что прямые разделили облака правильно (каждый кластер своим цветом, без перемешивания)" },
        { id: "C", text: "Чтобы ускорить вычисления" },
        { id: "D", text: "Чтобы посчитать центроид" }
      ],
      correct: "B",
      explanation: "Turtle рисует точки каждого кластера своим случайным цветом. Если облака окрасились раздельно — разбиение верное. Если цвета перемешались — прямые подобраны неудачно, надо поправить условия."
    },
    {
      question: "В функции центроида возвращают min(m)[1], где m состоит из элементов [s, p]. Почему [1]?",
      options: [
        { id: "A", text: "Чтобы взять сумму расстояний s" },
        { id: "B", text: "min(m) найдёт элемент с наименьшим s (первый в паре), а [1] берёт вторую часть — саму точку p" },
        { id: "C", text: "Это второй кластер" },
        { id: "D", text: "Чтобы пропустить первую точку" }
      ],
      correct: "B",
      explanation: "Каждый элемент m — это [сумма_расстояний, точка]. min сравнивает по первому полю (s) и возвращает пару с минимальной суммой. Индекс [1] достаёт из неё саму точку — это и есть центроид."
    },
    {
      question: "В каком случае метод 2 (волновой/DBSCAN) подходит лучше метода 1 (разделение прямыми)?",
      options: [
        { id: "A", text: "Когда точек очень мало" },
        { id: "B", text: "Когда кластеры изогнутой формы (спирали, полумесяцы) — прямыми их не разделить" },
        { id: "C", text: "Когда нет Excel" },
        { id: "D", text: "Когда нужен только один кластер" }
      ],
      correct: "B",
      explanation: "Прямые делят плоскость на полуплоскости, поэтому годятся только для компактных облаков. Волновой алгоритм растит кластер по соседним точкам и повторяет любую форму — спираль, полумесяц, кольцо."
    },
    {
      question: "Что задаёт условие dist(p, p1) < 0.5 в волновом алгоритме?",
      options: [
        { id: "A", text: "Количество кластеров" },
        { id: "B", text: "Порог соседства eps: точки ближе 0.5 считаются одним кластером" },
        { id: "C", text: "Радиус вывода черепашки" },
        { id: "D", text: "Номер точки" }
      ],
      correct: "B",
      explanation: "0.5 — это eps, максимальное расстояние, при котором две точки считаются соседями (одним кластером). Его подбирают под плотность данных: чтобы внутри кластера точки связывались, а разные кластеры — нет."
    },
    {
      question: "Почему цикл for p in cl работает, хотя cl расширяется (cl.extend) прямо внутри него?",
      options: [
        { id: "A", text: "Это ошибка, цикл зациклится" },
        { id: "B", text: "Цикл по списку подхватывает добавленные элементы — поэтому обрабатываются и новые соседи, и волна доходит до края кластера" },
        { id: "C", text: "extend не меняет список" },
        { id: "D", text: "Python копирует список в начале" }
      ],
      correct: "B",
      explanation: "Перебор списка идёт по индексам, а добавленные в конец элементы тоже попадают в перебор. Так каждая новая точка кластера, в свою очередь, ищет своих соседей — кластер разрастается по всей связной группе."
    }
  ],

  aiContext: `Задание 27 ЕГЭ — кластеризация точек (звёзд) на плоскости. Центроид (в этой задаче) — точка кластера с минимальной суммой расстояний до остальных точек кластера. Файл А — 2 кластера, файл Б — 3. Итоговый вопрос меняется, но алгоритм кластеризации один.\n\nБАЗОВЫЙ МЕТОД (полуанализ через Excel): 1) открыть файл (xls или txt->Excel); 2) Данные->Текст по столбцам, x и y в разные столбцы (как в задании 22); 3) Вставка->Диаграмма->Точечная; 4) глазами провести разделяющие прямые, их уравнения -> условия if в коде.\n\nКод. Кластеризация А (2 кластера, 1 прямая):\nA=[[],[]]; for s in open('27a-3.txt'): x,y=[float(d) for d in s.replace(',','.').split()]; if y<x+2: A[0].append([x,y]) else: A[1].append([x,y]).\nКластеризация Б (3 кластера, 2 прямые): B=[[],[],[]]; if y<2-x: B[0]; elif y>x+3: B[1]; else: B[2].\nПроверка черепашкой (рекомендуется): from turtle import *; from random import *; tracer(0); up(); for cl in B: color=(random(),random(),random()); for x,y in cl: goto(x*40,y*40); dot(5,color); done().\nЦентроид: from math import dist; def centr(cl): m=[]; for p in cl: s=sum(dist(p,p1) for p1 in cl); m.append([s,p]); return min(m)[1].\nВывод (Px,Py — средние координат центроидов): ca=[centr(cl) for cl in A]; px=sum(x for x,y in ca)/len(ca); py=sum(y for x,y in ca)/len(ca); print(int(px*100000),int(py*100000)); аналогично для B.\ns.replace(",",".") — на случай дробных через запятую. Ответ примера: А -> 258853 499656, Б -> 6165 372336. \n\nМЕТОД 2 — волновой алгоритм (DBSCAN), без Excel, для кластеров ЛЮБОЙ формы (спирали, полумесяцы). Суть — поиск соседних точек. Код: data=[...]; from math import dist; clusters=[]; while data: cl=[data.pop()]; for p in cl: sosed=[p1 for p1 in data if dist(p,p1)<0.5]; cl.extend(sosed); for p1 in sosed: data.remove(p1); clusters.append(cl). Хитрость: for p in cl идёт по растущему списку — волна доходит до края. dist<0.5 — порог eps (подбирается под плотность). Число кластеров = len(clusters) (само). Центроид и вывод те же (px=sum/len(cen)). Метод 2 универсальнее метода 1; метод 1 проще для компактных облаков, разделимых прямыми. Ответ примера с изогнутыми кластерами: 342486 490371 / 497620 549061.`,

  promptSuggestion: "Объясни задание 27 ЕГЭ по информатике: кластеризация точек, разделение прямыми и поиск центроида."
};
