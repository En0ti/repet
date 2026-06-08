import React from 'react';
import {
  BookMarked, HelpCircle, CheckCircle2, XCircle, RefreshCw, Lightbulb, Clock
} from 'lucide-react';
import { renderTheory } from '../utils/renderHelpers';

export default function TopicView({
  activeTopic,
  quizAnswer,
  setQuizAnswer,
  quizChecked,
  checkQuizAnswer,
  resetQuiz,
  onAskAI,
}) {
  const hasPractice = !!activeTopic.practice;

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto w-full pb-24">

      {/* Заголовок темы */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
          <span>Методическая база</span>
          <span className="text-slate-600">›</span>
          <span>{activeTopic.title.split(":")[0]}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{activeTopic.title}</h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">{activeTopic.description}</p>
      </div>

      {/* Теория */}
      <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-7 shadow-xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
        <div className="flex items-center gap-2.5 mb-6">
          <BookMarked className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Теоретический минимум</h3>
        </div>
        <div className="prose prose-invert max-w-none text-slate-300">
          {renderTheory(activeTopic.theory)}
        </div>
      </section>

      {/* Квиз (только если есть practice) */}
      {hasPractice ? (
        <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-7 shadow-xl backdrop-blur-sm relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Быстрый тест для самопроверки</h3>
            </div>
            <span className="text-xs bg-indigo-500/15 text-indigo-300 font-semibold px-2.5 py-1 rounded-lg">1 балл ЕГЭ</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-medium text-slate-200">
              {activeTopic.practice.question}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {activeTopic.practice.options.map((option) => {
                const isSelected = quizAnswer === option.id;
                let optionClass = "bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-350";
                if (isSelected) optionClass = "bg-indigo-950/40 border-indigo-500 text-indigo-200";
                if (quizChecked) {
                  if (option.id === activeTopic.practice.correct) {
                    optionClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200";
                  } else if (isSelected) {
                    optionClass = "bg-rose-950/40 border-rose-500 text-rose-200";
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={quizChecked}
                    onClick={() => setQuizAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between font-medium text-sm ${optionClass}`}
                  >
                    <span>{option.text}</span>
                    <div className="flex items-center gap-2">
                      {quizChecked && option.id === activeTopic.practice.correct && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {quizChecked && isSelected && option.id !== activeTopic.practice.correct && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Вариант {option.id}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              {!quizChecked ? (
                <button
                  onClick={checkQuizAnswer}
                  disabled={!quizAnswer}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                    quizAnswer
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Проверить ответ
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-2 border border-slate-700"
                >
                  <RefreshCw className="w-4 h-4" /> Попробовать снова
                </button>
              )}

              <button
                onClick={() => onAskAI(`Я решаю задачу в теме "${activeTopic.title}". Вот условие: "${activeTopic.practice.question}". Подскажи, какой правильный подход использовать для решения?`)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Lightbulb className="w-4 h-4" /> Спросить у ИИ подсказку
              </button>
            </div>

            {quizChecked && (
              <div className={`p-4 rounded-xl border mt-4 text-sm animate-fadeIn ${
                quizAnswer === activeTopic.practice.correct
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              }`}>
                <div className="font-bold mb-1">
                  {quizAnswer === activeTopic.practice.correct ? "🎉 Правильно! Отличный результат." : "😢 К сожалению, ответ неверный."}
                </div>
                <p className="opacity-90">{activeTopic.practice.explanation}</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        // Плейсхолдер для тем без квиза
        <section className="bg-slate-900/40 rounded-2xl border border-dashed border-slate-700 p-6 text-center">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="p-3 bg-slate-800 rounded-xl">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Практика скоро появится</h3>
            <p className="text-sm max-w-md">
              Тестовое задание для этой темы ещё в разработке. Пока можешь задать вопрос ИИ-ассистенту по этой теме.
            </p>
            <button
              onClick={() => onAskAI(activeTopic.promptSuggestion || `Расскажи про "${activeTopic.title}".`)}
              className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Lightbulb className="w-4 h-4" /> Спросить у ИИ
            </button>
          </div>
        </section>
      )}

      {/* Совет эксперта */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-white">Совет эксперта ЕГЭ по этой теме:</h4>
          <p className="text-xs text-slate-400 mt-1">
            Всегда проверяйте граничные значения переменных в циклах Python. Ошибки на "плюс-минус один" в рекурсии и интервалах — самые частые причины потери баллов в заданиях {activeTopic.title.split(':')[0]}.
          </p>
        </div>
      </div>

    </main>
  );
}