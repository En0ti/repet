import React from 'react';
import { Sparkles, Award, BrainCircuit, Menu, X, Sun, Moon } from 'lucide-react';

// Логотип: пробуем /logo.png (или .svg), при отсутствии — градиентная иконка по умолчанию.
function Logo() {
  const [err, setErr] = React.useState(false);
  if (err) {
    return (
      <div className="bg-gradient-to-tr from-cyan-400 via-violet-500 to-fuchsia-500 p-2 rounded-xl text-white shadow-lg shadow-violet-500/20">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg shadow-violet-500/20 bg-slate-800 flex items-center justify-center shrink-0">
      <img
        src="/logo.png"
        alt="Логотип"
        className="w-full h-full object-contain"
        onError={() => setErr(true)}
      />
    </div>
  );
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, onWarmup, level, theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white md:hidden hover:bg-slate-800 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-2.5">
          <Logo />
          <div>
            <h1 className="font-bold text-lg leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                ЕГЭ Информатика
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Методичка по информатике</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Статус подготовки — берётся из выбранного уровня в меню */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          <Award className={`w-4 h-4 ${level ? 'text-amber-400' : 'text-slate-500'}`} />
          {level ? (
            <span className="text-slate-200 font-medium">
              Статус: {level.name} <span className="text-slate-400">· ≈{level.points} б</span>
            </span>
          ) : (
            <span className="text-slate-500 font-medium">Статус не выбран</span>
          )}
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
