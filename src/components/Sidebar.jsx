import React from 'react';
import { BookOpen, Sparkles, ChevronRight, LayoutList } from 'lucide-react';
import { COURSE_DATA } from '../data/topics';

export default function Sidebar({
  activeTab, setActiveTab,
  mobileMenuOpen, setMobileMenuOpen,
  desktopSidebarOpen, toggleDesktopSidebar,
}) {
  return (
    <>
      {/* ── MOBILE sidebar (гамбургер из хедера) ─────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300 ease-in-out pt-16
        md:hidden
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={(id) => { setActiveTab(id); setMobileMenuOpen(false); }}
        />
      </aside>

      {/* ── DESKTOP sidebar + pull-tab ────────────────────────────── */}
      <div className="hidden md:flex flex-row h-full relative shrink-0 overflow-hidden">

        {/* Сама панель */}
        <aside className={`
          h-full bg-slate-900 border-r border-slate-800 overflow-hidden
          transition-all duration-300 ease-in-out
          ${desktopSidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0'}
        `}>
          {/* Минимальная ширина внутри, чтобы контент не ломался при сжатии */}
          <div className="w-72 h-full">
            <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </aside>

        {/* Вертикальная кнопка-вкладка */}
        <button
          onClick={toggleDesktopSidebar}
          title={desktopSidebarOpen ? 'Свернуть навигацию' : 'Открыть навигацию'}
          className={`
            group relative flex flex-col items-center justify-center gap-2
            w-5 shrink-0 h-full
            border-r border-slate-800 bg-slate-900
            hover:bg-slate-800 hover:border-violet-500/30
            transition-all duration-200 cursor-pointer
          `}
        >
          {/* Иконка-стрелка */}
          <div className={`
            p-1 rounded-full bg-slate-800 border border-slate-700
            group-hover:bg-violet-500/20 group-hover:border-violet-500/50
            transition-all duration-200
          `}>
            <ChevronRight className={`
              w-3 h-3 text-slate-500 group-hover:text-violet-400
              transition-all duration-300
              ${desktopSidebarOpen ? 'rotate-180' : 'rotate-0'}
            `} />
          </div>

          {/* Вертикальный текст */}
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover:text-violet-400 transition-colors select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {desktopSidebarOpen ? 'Скрыть' : 'Навигация'}
          </span>

          {/* Индикатор активной темы (цветная точка) */}
          <div className="w-1 h-1 rounded-full bg-violet-500/60 group-hover:bg-violet-400 transition-colors" />

          {/* Tooltip при hover */}
          <div className={`
            absolute left-full ml-2 top-1/2 -translate-y-1/2
            px-2.5 py-1.5 rounded-lg
            bg-slate-800 border border-slate-700
            text-xs text-slate-200 font-medium whitespace-nowrap
            shadow-lg shadow-black/30
            pointer-events-none
            opacity-0 group-hover:opacity-100
            translate-x-1 group-hover:translate-x-0
            transition-all duration-200 z-50
          `}>
            {desktopSidebarOpen ? '← Скрыть меню' : '→ Открыть меню'}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-700" />
          </div>
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
function SidebarContent({ activeTab, setActiveTab }) {
  return (
    <div className="p-4 h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2">
          <LayoutList className="w-4 h-4 text-cyan-400" />
          Разделы методички
        </div>

        <nav className="space-y-1.5">
          {COURSE_DATA.map((topic) => {
            const TopicIcon = topic.icon;
            const isActive = activeTab === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all flex gap-3 group border ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-950 to-slate-900 border-violet-500/40 text-white shadow-md shadow-violet-950/30'
                    : 'bg-transparent border-transparent text-slate-450 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
                    : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
                }`}>
                  <TopicIcon className="w-5 h-5" />
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
