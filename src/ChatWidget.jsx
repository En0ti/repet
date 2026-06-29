import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { getSystemPrompt } from './promptManager';
import { renderMessageContent } from './utils/renderHelpers';

export default function ChatWidget({ activeTopic, externalMessage, onExternalMessageConsumed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([{
    role: "assistant",
    text: "Привет! Я твой персональный ИИ-ассистент по ЕГЭ по информатике. 🤖\n\nВыбери тему слева или задай свой вопрос!",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalMessage) {
      setIsOpen(true);
      handleSendMessage(externalMessage);
      onExternalMessageConsumed?.();
    }
  }, [externalMessage]);

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;
    if (!textToSend) setInputValue("");

    const userMessage = {
      role: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const systemPrompt = getSystemPrompt(activeTopic, messageText);

    try {
      const recentMessages = messages.slice(-4).map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));
      recentMessages.push({ role: "user", parts: [{ text: messageText }] });

      const response = await fetch('/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: recentMessages,
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

      const data = await response.json();
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.choices?.[0]?.message?.content ||
        // Лимит исчерпан — показываем дружелюбное сообщение как есть, без префикса «Ошибка»
        (data.limited ? data.error
          : data.error ? `⚠️ Ошибка нейросети: ${data.error}`
          : "Извини, не удалось получить корректный ответ.");

      setMessages(prev => [...prev, {
        role: "assistant",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "Произошла ошибка при запросе к ИИ. Попробуй ещё раз.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => setMessages([{
    role: "assistant",
    text: "Привет! Диалог очищен. О чём хочешь поговорить?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);

  return (
    <div className={`fixed z-50 ${isOpen && isExpanded ? 'inset-0 flex items-center justify-center p-2 sm:p-6' : 'bottom-4 right-3 sm:bottom-6 sm:right-6'}`}>
      {/* Кнопка открытия */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white p-4 rounded-full shadow-2xl shadow-violet-700/30 transition-all hover:scale-105 flex items-center gap-2"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-sm font-bold pr-2">Нужна помощь?</span>
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div className={`bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all ${
          isExpanded
            ? 'w-full h-full max-w-[1100px] max-h-[900px]'
            : 'w-[calc(100vw-1.5rem)] sm:w-[460px] h-[85vh] sm:h-[680px] max-h-[85vh]'
        }`}>

          {/* Хедер */}
          <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-950">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-violet-500/20 p-2 rounded-xl text-violet-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-violet-500 border-2 border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <Sparkles className="text-fuchsia-400 w-4 h-4" /> Тьютор по информатике
                </span>
                <p className="text-[11px] text-slate-400">Онлайн • тема: {activeTopic?.title || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={resetChat} className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all" title="Очистить чат">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={() => setIsExpanded(e => !e)} className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all" title={isExpanded ? 'Свернуть' : 'Развернуть на весь экран'}>
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Быстрые вопросы */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 overflow-x-auto whitespace-nowrap flex gap-2">
            <button
              onClick={() => handleSendMessage("Дай мне чек-лист тем для подготовки к ЕГЭ с нуля.")}
              className="text-[10px] font-semibold bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 py-1.5 px-3 rounded-full transition-all shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-violet-400" /> План на 100 баллов
            </button>
            <button
              onClick={() => handleSendMessage("Покажи пример решения задания 24 на Python с разбором строк.")}
              className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-full transition-all shrink-0"
            >
              Код Задания 24
            </button>
            <button
              onClick={() => handleSendMessage("Привет! Дай мне сложную задачу из КЕГЭ по информатике для разминки.")}
              className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-full transition-all shrink-0"
            >
              Разминка
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/30">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div key={index} className={`flex gap-3 max-w-[90%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                  <div className={`p-2 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs text-white ${
                    isAssistant
                      ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600'
                      : 'bg-violet-600'
                  }`}>
                    {isAssistant ? 'ИИ' : 'Я'}
                  </div>
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                        : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-none'
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
                <div className="p-2 h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shrink-0 flex items-center justify-center text-xs animate-pulse">
                  ИИ
                </div>
                <div className="bg-slate-800 border border-slate-700 p-3.5 rounded-2xl rounded-tl-none text-sm text-slate-400 flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs font-medium">Формулирую объяснение...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Инпут */}
          <div className="p-3 bg-slate-950 border-t border-slate-700">
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Вопрос по заданию..."
                rows="2"
                className="w-full bg-slate-800 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl py-2.5 pl-3.5 pr-12 text-sm text-slate-100 placeholder-slate-500 resize-none transition-all outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`absolute right-2.5 bottom-3.5 p-2 rounded-lg transition-all ${
                  inputValue.trim() && !isLoading
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 px-1">Shift + Enter для новой строки</p>
          </div>

        </div>
      )}
    </div>
  );
}
