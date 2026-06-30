import React from 'react';
import { Sparkles, ChevronRight, LayoutList, Target, X, Trophy } from 'lucide-react';
import { COURSE_DATA } from '../data/topics';
import { LEVELS } from '../data/levels';

// Явные класс-строки (чтобы Tailwind их не вырезал)
const LEVEL_STYLE = {
  porog: { active: 'bg-emerald-500/25 border-emerald-400 text-emerald-100', idle: 'border-emerald-500/30 text-emerald-300/80', ring: 'ring-emerald-500/70', dot: 'bg-emerald-400', box: 'border-emerald-500/40', trophy: 'text-emerald-400' },
  legko: { active: 'bg-teal-500/25 border-teal-400 text-teal-100',           idle: 'border-teal-500/30 text-teal-300/80',       ring: 'ring-teal-500/70',    dot: 'bg-teal-400',    box: 'border-teal-500/40',    trophy: 'text-teal-400' },
  baza:  { active: 'bg-sky-500/25 border-sky-400 text-sky-100',              idle: 'border-sky-500/30 text-sky-300/80',         ring: 'ring-sky-500/70',     dot: 'bg-sky-400',     box: 'border-sky-500/40',     trophy: 'text-sky-400' },
  prodv: { active: 'bg-violet-500/25 border-violet-400 text-violet-100',     idle: 'border-violet-500/30 text-violet-300/80',   ring: 'ring-violet-500/70',  dot: 'bg-violet-400',  box: 'border-violet-500/40',  trophy: 'text-violet-400' },
  bog:   { active: 'bg-amber-500/25 border-amber-400 text-amber-100',        idle: 'border-amber-500/30 text-amber-300/80',     ring: 'ring-amber-500/70',   dot: 'bg-amber-400',   box: 'border-amber-500/40',   trophy: 'text-amber-400' },
};

export default function Sidebar({
  activeTab, setActiveTab,
  mobileMenuOpen, setMobileMenuOpen,
  desktopSidebarOpen, toggleDesktopSidebar,
  levelId, setLevelId,
}) {
  return (
    <>
      {/* ── MOBILE sidebar ─────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300 ease-in-out pt-16
        md:hidden
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={(id) => { setActiveTab(id); setMobileMenuOpen(false); }}
          levelId={levelId}
          setLevelId={setLevelId}
        />
      </aside>

      {/* ── DESKTOP sidebar + pull-tab ────────────────────────────── */}
      <div className="hidden md:flex flex-row h-full relative shrink-0 overflow-hidden">
        <aside className={`
          h-full bg-slate-900 border-r border-slate-800 overflow-hidden
          transition-all duration-300 ease-in-out
          ${desktopSidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0'}
        `}>
          <div className="w-72 h-full">
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              levelId={levelId}
              setLevelId={setLevelId}
            />
          </div>
        </aside>

        <button
          onClick={toggleDesktopSidebar}
          title={desktopSidebarOpen ? 'Свернуть навигацию' : 'Открыть навигацию'}
          className="group relative flex flex-col items-center justify-center gap-2 w-5 shrink-0 h-full border-r border-slate-800 bg-slate-900 hover:bg-slate-800 hover:border-violet-500/30 transition-all duration-200 cursor-pointer"
        >
          <div className="p-1 rounded-full bg-slate-800 border border-slate-700 group-hover:bg-violet-500/20 group-hover:border-violet-500/50 transition-all duration-200">
            <ChevronRight className={`w-3 h-3 text-slate-500 group-hover:text-violet-400 transition-all duration-300 ${desktopSidebarOpen ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover:text-violet-400 transition-colors select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {desktopSidebarOpen ? 'Скрыть' : 'Навигация'}
          </span>
          <div className="w-1 h-1 rounded-full bg-violet-500/60 group-hover:bg-violet-400 transition-colors" />
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
        />
      )}
    </>
  );
}

/* ── Общий контент сайдбара ──────────────────────────────────────── */
function SidebarContent({ activeTab, setActiveTab, levelId, setLevelId }) {
  const level = LEVELS.find((l) => l.id === levelId) || null;
  const style = level ? LEVEL_STYLE[level.id] : null;

  return (
    <div className="p-4 h-full flex flex-col justify-between overflow-y-auto">
      <div>
        {/* ── Статус подготовки ─────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <Target className="w-4 h-4 text-amber-400" />
              Статус подготовки
            </div>
            {level && (
              <button
                onClick={() => setLevelId(null)}
                className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-0.5"
              >
                <X className="w-3 h-3" /> сброс
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {LEVELS.map((l) => {
              const st = LEVEL_STYLE[l.id];
              const on = levelId === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLevelId(on ? null : l.id)}
                  title={`${l.tagline} · ≈${l.points} баллов`}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                    on ? `${st.active} shadow-sm` : `bg-slate-800/60 ${st.idle} hover:bg-slate-800`
                  }`}
                >
                  {l.name}
                </button>
              );
            })}
          </div>

          {level && (
            <div className={`mt-2.5 p-2.5 rounded-lg border bg-slate-800/40 ${style.box}`}>
              <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                <Trophy className={`w-4 h-4 ${style.trophy}`} />
                ≈ {level.points} баллов
                <span className="text-xs font-normal text-slate-400">· {level.count} заданий</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">{level.tagline}</p>
              <p className="text-[10px] text-slate-500 mt-1">Подсвечены задания этого уровня →</p>
            </div>
          )}
        </div>

        {/* ── Список заданий ─────────────────────────────── */}
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
          <LayoutList className="w-4 h-4 text-cyan-400" />
          Разделы методички
        </div>

        <nav className="space-y-1.5">
          {COURSE_DATA.map((topic) => {
            const TopicIcon = topic.icon;
            const isActive = activeTab === topic.id;
            const inLevel = level ? level.ids.has(topic.id) : false;
            const dimmed = level && !inLevel;

            return (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all flex gap-3 group border ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-950 to-slate-900 border-violet-500/40 text-white shadow-md shadow-violet-950/30'
                    : 'bg-transparent border-transparent text-slate-450 hover:bg-slate-800 hover:text-slate-200'
                } ${inLevel ? `ring-2 ${style.ring}` : ''} ${dimmed ? 'opacity-35 hover:opacity-100' : ''}`}
              >
                <div className={`relative p-2 rounded-lg transition-colors shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
                    : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
                }`}>
                  <TopicIcon className="w-5 h-5" />
                  {inLevel && (
                    <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${style.dot} ring-2 ring-slate-900`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm truncate ${
                    isActive ? 'bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent' : ''
                  }`}>
                    {topic.title}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{topic.description}</p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-violet-950 to-slate-900 border border-violet-500/20 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-bold text-violet-300 mb-1">
          <Sparkles className="w-4 h-4" /> Как использовать ИИ?
        </div>
        Нажми на кнопку чата снизу-справа! ИИ видит выбранный тобой урок и поможет написать Python-код, исправить ошибки или объяснить теорию.
      </div>
    </div>
  );
}
