import React, { useState } from 'react';
import { COURSE_DATA } from './data/topics';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopicView from './components/TopicView';
import ChatWidget from './ChatWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem('activeTab') || COURSE_DATA[0].id
  );

  const handleSetActiveTab = (id) => {
    localStorage.setItem('activeTab', id);
    setActiveTab(id);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [externalMessage, setExternalMessage] = useState(null);

  const activeTopic = COURSE_DATA.find(t => t.id === activeTab);

  const sendToChat = (text) => setExternalMessage(text);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">

      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onWarmup={() => sendToChat("Привет! Дай мне сложную задачу из КЕГЭ по информатике для разминки.")}
      />

      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden min-w-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
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