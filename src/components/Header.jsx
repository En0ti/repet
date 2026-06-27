import React from 'react';
import { Sparkles, Award, BrainCircuit, Menu, X, Sun, Moon } from 'lucide-react';

export default function Header({ mobileMenuOpen, setMobileMenuOpen, onWarmup, theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white md:hidden hover:bg-slate-800 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-cyan-400 via-violet-500 to-fuchsia-500 p-2 rounded-xl text-white shadow-lg shadow-violet-500/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                ЕГЭ Информатика
              </span>{' '}
              <span className="hidden sm:inline text-xs bg-violet-500/20 text-violet-300 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                ИИ-Тьютор
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Интерактивный учебник с умным ассистентом</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <Award className="text-amber-400 w-4 h-4" />
          <span className="text-slate-300 font-medium">Статус: Подготовка к 100 баллам</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
          title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
          {theme === 'dark'
            ? <Sun className="w-4 h-4 text-amber-400" />
            : <Moon className="w-4 h-4 text-violet-400" />
          }
        </button>

        <button
          onClick={onWarmup}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 active:from-violet-700 active:to-fuchsia-700 transition-all text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-violet-600/25"
        >
          <BrainCircuit className="w-4 h-4" />
          <span className="hidden sm:inline">Разминка</span>
        </button>
      </div>
    </header>
  );
}
