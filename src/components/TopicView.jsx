import React, { useState, useEffect } from 'react';
import {
  BookMarked, HelpCircle, CheckCircle2, XCircle, RefreshCw, Lightbulb, Clock,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { renderTheory, renderInline } from '../utils/renderHelpers';

// Если practice — объект, превращаем в массив из одного элемента
const normalizePractice = (p) => {
  if (!p) return null;
  return Array.isArray(p) ? p : [p];
};

export default function TopicView({ activeTopic, onAskAI }) {
  const practiceList = normalizePractice(activeTopic.practice);
  const hasPractice = !!practiceList && practiceList.length > 0;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});   // { 0: 'A', 1: 'C', ... }
  const [checked, setChecked] = useState({});   // { 0: true, ... }

  // Сброс при смене темы
  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setChecked({});
  }, [activeTopic.id]);

  const currentQuestion = hasPractice ? practiceList[currentIdx] : null;
  const currentAnswer   = answers[currentIdx];
  const isChecked       = !!checked[currentIdx];

  const selectAnswer = (id) => {
    if (isChecked) return;
    setAnswers(prev => ({ ...prev, [currentIdx]: id }));
  };

  const checkAnswer = () => {
    if (!currentAnswer) return;
    setChecked(prev => ({ ...prev, [currentIdx]: true }));
  };

  const resetCurrent = () => {
    setAnswers(prev => ({ ...prev, [currentIdx]: null }));
    setChecked(prev => ({ ...prev, [currentIdx]: false }));
  };

  // Счёт правильных ответов
  const correctCount = practiceList?.reduce((acc, q, i) =>
    answers[i] === q.correct && checked[i] ? acc + 1 : acc, 0) ?? 0;

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto w-full pb-24">

      {/* Заголовок */}
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

      {/* Практика */}
      {hasPractice ? (
        <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-7 shadow-xl backdrop-blur-sm relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />

          {/* Заголовок + счётчик */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Практика</h3>
              {practiceList.length > 1 && (
                <span className="text-xs text-slate-400">
                  · вопрос {currentIdx + 1} из {practiceList.length}
                </span>
              )}
            </div>
            <span className="text-xs bg-indigo-500/15 text-indigo-300 font-semibold px-2.5 py-1 rounded-lg">
              Решено: {correctCount} / {practiceList.length}
            </span>
          </div>

          {/* Прогресс-бар по вопросам */}
          {practiceList.length > 1 && (
            <div className="flex gap-1.5 mb-6">
              {practiceList.map((_, i) => {
                const isCorrect = answers[i] === practiceList[i].correct && checked[i];
                const isWrong   = checked[i] && !isCorrect;
                const isCurrent = i === currentIdx;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`flex-1 h-1.5 rounded-full transition-all ${
                      isCorrect ? 'bg-emerald-500' :
                      isWrong   ? 'bg-rose-500' :
                      isCurrent ? 'bg-indigo-500' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    title={`Вопрос ${i + 1}`}
                  />
                );
              })}
            </div>
          )}

          {/* Вопрос */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-medium text-slate-200 leading-relaxed">
              {renderInline(currentQuestion.question, `q-${currentIdx}`)}
            </div>

            {/* Варианты */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option.id;
                let optionClass = "bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-350";
                if (isSelected) optionClass = "bg-indigo-950/40 border-indigo-500 text-indigo-200";
                if (isChecked) {
                  if (option.id === currentQuestion.correct) {
                    optionClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200";
                  } else if (isSelected) {
                    optionClass = "bg-rose-950/40 border-rose-500 text-rose-200";
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={isChecked}
                    onClick={() => selectAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 font-medium text-sm ${optionClass}`}
                  >
                    <span className="flex-1">{renderInline(option.text, `o-${currentIdx}-${option.id}`)}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {isChecked && option.id === currentQuestion.correct && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {isChecked && isSelected && option.id !== currentQuestion.correct && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {option.id}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Кнопки управления */}
            <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {!isChecked ? (
                  <button
                    onClick={checkAnswer}
                    disabled={!currentAnswer}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      currentAnswer
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Проверить
                  </button>
                ) : (
                  <button
                    onClick={resetCurrent}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-2 border border-slate-700"
                  >
                    <RefreshCw className="w-4 h-4" /> Сбросить
                  </button>
                )}

                <button
                  onClick={() => onAskAI(`У меня вопрос по теме "${activeTopic.title}". Задача: "${currentQuestion.question}". Помоги разобраться, какой подход использовать.`)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline px-2"
                >
                  <Lightbulb className="w-4 h-4" /> Подсказка ИИ
                </button>
              </div>

              {/* Навигация между вопросами */}
              {practiceList.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                    disabled={currentIdx === 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentIdx(Math.min(practiceList.length - 1, currentIdx + 1))}
                    disabled={currentIdx === practiceList.length - 1}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Объяснение */}
            {isChecked && (
              <div className={`p-4 rounded-xl border mt-4 text-sm animate-fadeIn ${
                currentAnswer === currentQuestion.correct
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              }`}>
                <div className="font-bold mb-1.5">
                  {currentAnswer === currentQuestion.correct ? "🎉 Правильно!" : "😢 Неверно."}
                </div>
                <div className="opacity-90 leading-relaxed">
                  {renderInline(currentQuestion.explanation, `ex-${currentIdx}`)}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-slate-900/40 rounded-2xl border border-dashed border-slate-700 p-6 text-center">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="p-3 bg-slate-800 rounded-xl">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Практика скоро появится</h3>
            <p className="text-sm max-w-md">
              Тестовое задание для этой темы ещё в разработке. Пока можешь задать вопрос ИИ-ассистенту.
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
          <h4 className="font-bold text-sm text-white">Совет:</h4>
          <p className="text-xs text-slate-400 mt-1">
            Если застрял — нажми «Подсказка ИИ». Ассистент видит выбранную тему и поможет с подходом, не выдавая сразу ответ.
          </p>
        </div>
      </div>

    </main>
  );
}