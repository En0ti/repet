import React from 'react';
import { Sparkles, Award, BrainCircuit, Menu, X } from 'lucide-react';

export default function Header({ mobileMenuOpen, setMobileMenuOpen, onWarmup }) {
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
          <div className="bg-gradient-to-tr from-emerald-500 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight flex items-center gap-1.5 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              ЕГЭ Информатика{' '}
              <span className="hidden sm:inline text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                ИИ-Тьютор
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Интерактивный учебник с умным ассистентом</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <Award className="text-amber-400 w-4 h-4" />
          <span className="text-slate-300 font-medium">Статус: Подготовка к 100 баллам</span>
        </div>
        <button
          onClick={onWarmup}
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
        >
          <BrainCircuit className="w-4 h-4" />
          <span className="hidden sm:inline">Разминка</span>
        </button>
      </div>
    </header>
  );
}