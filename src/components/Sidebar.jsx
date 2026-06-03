import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { COURSE_DATA } from '../data/courseData';

export default function Sidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out pt-16 md:pt-0 md:static md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 h-full flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Разделы методички
            </div>

            <nav className="space-y-1.5">
              {COURSE_DATA.map((topic) => {
                const TopicIcon = topic.icon;
                const isActive = activeTab === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveTab(topic.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex gap-3 group border ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-950 to-slate-900 border-emerald-500/40 text-white shadow-md shadow-emerald-950/20'
                        : 'bg-transparent border-transparent text-slate-450 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
                    }`}>
                      <TopicIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{topic.title}</div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{topic.description}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/20 text-slate-350 text-xs">
            <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
              <Sparkles className="w-4 h-4" /> Как использовать ИИ?
            </div>
            Нажми на кнопку чата снизу-справа! ИИ видит выбранный тобой урок и поможет написать Python-код, исправить ошибки или объяснить сложную теорию.
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
        />
      )}
    </>
  );
}