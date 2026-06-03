# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

{/* Правая панель - ИИ-Ассистент */}
        <section className="w-full md:w-[420px] bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col h-[500px] md:h-auto shrink-0 z-10">
          
          {/* Хэдер ассистента */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Тьютор по информатике
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  Онлайн • на базе Gemini-2.5
                </p>
              </div>
            </div>

            <button 
              onClick={() => setMessages([
                {
                  role: "assistant",
                  text: "Привет! Диалог очищен. О каком задании или теме ты хочешь поговорить сейчас?",
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ])}
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all"
              title="Очистить чат"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Быстрые вопросы на основе текущего контекста */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
            <button
              onClick={() => handleSendMessage(activeTopic.promptSuggestion)}
              className="text-[10px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 py-1.5 px-3 rounded-full transition-all shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" /> Задать вопрос по теме
            </button>
            <button
              onClick={() => handleSendMessage("Покажи пример решения задания 24 на Python с разбором строк.")}
              className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 py-1.5 px-3 rounded-full transition-all shrink-0"
            >
              Код Задания 24
            </button>
            <button
              onClick={() => handleSendMessage("Дай мне чек-лист тем для подготовки к ЕГЭ с нуля.")}
              className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 py-1.5 px-3 rounded-full transition-all shrink-0"
            >
              План на 100 баллов
            </button>
          </div>

          {/* История сообщений */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/30">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[90%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`p-2 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                    isAssistant ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
                  }`}>
                    {isAssistant ? 'ИИ' : 'Я'}
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isAssistant 
                        ? 'bg-slate-850 text-slate-200 rounded-tl-none border border-slate-800' 
                        : 'bg-indigo-600 text-white rounded-tr-none'
                    }`}>
                      {isAssistant ? renderMessageContent(msg.text) : msg.text}
                    </div>
                    <span className={`text-[10px] text-slate-500 block ${!isAssistant && 'text-right'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto">
                <div className="p-2 h-8 w-8 rounded-lg bg-emerald-600 text-white shrink-0 flex items-center justify-center text-xs animate-pulse">
                  ИИ
                </div>
                <div className="bg-slate-850 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none text-sm text-slate-400 flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs font-medium text-slate-400">Формулирую объяснение...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Форма отправки сообщения */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative"
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Задай вопрос по теме, коду или задаче..."
                rows="2"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 pl-3.5 pr-12 text-sm text-slate-100 placeholder-slate-500 resize-none transition-all outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`absolute right-2.5 bottom-3.5 p-2 rounded-lg transition-all ${
                  inputValue.trim() && !isLoading
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/10'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[10px] text-slate-500">
                Shift + Enter для новой строки
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Code className="w-3 h-3 text-emerald-500" /> Поддерживает Python
              </span>
            </div>
          </div>

        </section>