import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from './data/topics';
import { LEVELS } from './data/levels';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopicView from './components/TopicView';
import ChatWidget from './ChatWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem('activeTab') || COURSE_DATA[0].id
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(
    () => localStorage.getItem('desktopSidebar') !== 'closed'
  );
  const [externalMessage, setExternalMessage] = useState(null);

  // Уровень подготовки (статус) — общий для сайдбара и шапки
  const [levelId, setLevelIdState] = useState(() => localStorage.getItem('levelId') || null);
  const setLevelId = (id) => {
    if (id) localStorage.setItem('levelId', id);
    else localStorage.removeItem('levelId');
    setLevelIdState(id);
  };
  const currentLevel = LEVELS.find((l) => l.id === levelId) || null;

  const toggleDesktopSidebar = () => setDesktopSidebarOpen(prev => {
    localStorage.setItem('desktopSidebar', prev ? 'closed' : 'open');
    return !prev;
  });

  // Theme: 'dark' | 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const handleSetActiveTab = (id) => {
    localStorage.setItem('activeTab', id);
    setActiveTab(id);
  };

  const activeTopic = COURSE_DATA.find(t => t.id === activeTab);
  const sendToChat = (text) => setExternalMessage(text);

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-violet-500 selection:text-white">

      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onWarmup={() => sendToChat(
          activeTopic?.title
            ? `Дай мне одну тренировочную задачу строго в стиле реального ЕГЭ по информатике по теме «${activeTopic.title}». Сформулируй ТОЛЬКО условие с конкретными данными, без решения и ответа. Я решу сам, потом проверишь.`
            : "Дай мне одну тренировочную задачу строго в стиле реального ЕГЭ по информатике — выбери конкретный номер. Сформулируй ТОЛЬКО условие с конкретными данными, без решения. Я решу сам, потом проверишь."
        )}
        level={currentLevel}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 min-w-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          desktopSidebarOpen={desktopSidebarOpen}
          toggleDesktopSidebar={toggleDesktopSidebar}
          levelId={levelId}
          setLevelId={setLevelId}
        />

        <TopicView
          activeTopic={activeTopic}
          onAskAI={sendToChat}
        />
      </div>

      <ChatWidget
        activeTopic={activeTopic}
        externalMessage={externalMessage}
        onExternalMessageConsumed={() => setExternalMessage(null)}
      />

    </div>
  );
}
