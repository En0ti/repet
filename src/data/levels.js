// Уровни подготовки (накопительно). Каждый следующий включает все предыдущие задания.
// Номера → id топиков (19-21 — один топик task-19-21).
const numToId = (n) => (n === 19 || n === 20 || n === 21) ? 'task-19-21' : `task-${n}`;

const RAW = [
  { id: 'porog', name: 'Порог',       tagline: 'полный ноль — вообще без кода',         points: 48,  add: [1, 3, 4, 7, 10, 11, 12, 18, 22] },
  { id: 'legko', name: 'На лёгке',     tagline: 'чуть-чуть базового кода',               points: 56,  add: [2, 16, 23] },
  { id: 'baza',  name: 'База',         tagline: 'Python на уровне «база + чуть больше»',  points: 72,  add: [5, 6, 8, 9, 14, 15] },
  { id: 'prodv', name: 'Продвинутый',  tagline: 'код пишется, алгоритмы понятны',         points: 88,  add: [13, 17, 19, 25] },
  { id: 'bog',   name: 'Бог',          tagline: 'соточка: новые задания + повтор базы',   points: 100, add: [24, 26, 27] },
];

// Накопительно собираем множества id топиков для каждого уровня
export const LEVELS = RAW.map((lvl, i) => {
  const nums = RAW.slice(0, i + 1).flatMap((l) => l.add);
  const ids = new Set(nums.map(numToId));
  return {
    id: lvl.id,
    name: lvl.name,
    tagline: lvl.tagline,
    points: lvl.points,
    addNums: lvl.add,   // что добавляется именно на этом уровне
    ids,                // все id топиков уровня (накопительно)
    count: ids.size,
  };
});
