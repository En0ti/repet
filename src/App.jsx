import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from './data/topics';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopicView from './components/TopicView';
import ChatWidget from './ChatWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState(COURSE_DATA[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [externalMessage, setExternalMessage] = useState(null);

  const activeTopic = COURSE_DATA.find(t => t.id === activeTab);

  // Сброс квиза при смене темы
  useEffect(() => {
    setQuizAnswer(null);
    setQuizChecked(false);
  }, [activeTab]);

  const checkQuizAnswer = () => {
    if (quizAnswer) setQuizChecked(true);
  };

  const resetQuiz = () => {
    setQuizAnswer(null);
    setQuizChecked(false);
  };

  // Открывает виджет и отправляет сообщение (из TopicView или Header)
  const sendToChat = (text) => {
    setExternalMessage(text);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">

      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onWarmup={() => sendToChat("Привет! Дай мне сложную задачу из КЕГЭ по информатике для разминки.")}
      />

      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <TopicView
          activeTopic={activeTopic}
          quizAnswer={quizAnswer}
          setQuizAnswer={setQuizAnswer}
          quizChecked={quizChecked}
          checkQuizAnswer={checkQuizAnswer}
          resetQuiz={resetQuiz}
          onAskAI={sendToChat}
        />
      </div>

      <ChatWidget
        activeTopicId={activeTab}
        activeTopicTitle={activeTopic?.title}
        externalMessage={externalMessage}
        onExternalMessageConsumed={() => setExternalMessage(null)}
      />

    </div>
  );
}