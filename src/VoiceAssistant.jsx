import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VoiceAssistant = ({ lang, setLang, theme, toggleTheme }) => {
  const [text, setText] = useState(lang === 'ru' ? 'Скажите "Привет" для начала' : 'Say "Hello" to start');
  const [isListening, setIsListening] = useState(false);
  const [aiReply, setAiReply] = useState('');
  const [voices, setVoices] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getAIResponse = async (userText) => {
    const API_KEY = 'AIzaSyAOloeZh-P1jDYyzLciFTcnmbkXRIcC3fo';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userText,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return lang === 'ru' ? 'Извините, я не понял. Повторите, пожалуйста.' : 'Sorry, I did not understand. Could you repeat please?';
      }
    } catch (error) {
      console.error('Error fetching Gemini API:', error);
      return lang === 'ru' ? 'Произошла ошибка. Попробуйте еще раз.' : 'An error occurred. Please try again.';
    }
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      setText(lang === 'ru' ? `Вы: ${userText}` : `You: ${userText}`);

      const reply = await getAIResponse(userText);
      setAiReply(lang === 'ru' ? `Ассистент: ${reply}` : `Assistant: ${reply}`);

      speak(reply);
    };

    recognition.start();
    setIsListening(true);
    recognition.onend = () => setIsListening(false);
  };

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = lang === 'ru' ? 'ru-RU' : 'en-US';

    const preferredVoice = voices.find((voice) =>
      voice.name.includes('Google') && voice.lang.includes(lang === 'ru' ? 'ru' : 'en')
    ) || voices.find((voice) =>
      voice.lang.includes(lang === 'ru' ? 'ru' : 'en')
    ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.2;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <div>
      <header>
        <div className="logo">Ayan</div>
        <nav className={isMenuOpen ? 'active' : ''}>
          {[
            { path: '/', label: 'nav_home' },
            { path: '/about', label: 'nav_about' },
            { path: '/skills', label: 'nav_skills' },
            { path: '/resume', label: 'nav_resume' },
            { path: '/contact', label: 'nav_contact' },
            { path: '/assistant', label: 'nav_assistant' }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
            >
              {translations[lang][item.label]}
            </Link>
          ))}
        </nav>
        <div className="social-icons">
          <a href="https://github.com/ayanabdimutalip" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/ayan-abdimutalip-5a5b5a2b5/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://t.me/ayanabdimutalip" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
        </button>
        <select
          className="lang-toggle"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </header>
      <div className="assistant-container" style={{ 
        maxWidth: '800px',
        margin: '150px auto 50px',
        padding: '30px',
        backgroundColor: 'var(--light-color)',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="section-header">
          <h2 className="back-title">{lang === 'ru' ? 'Ассистент' : 'Assistant'}</h2>
          <h2 className="front-title">{lang === 'ru' ? 'Голосовой помощник' : 'Voice Assistant'}</h2>
          <p>{lang === 'ru' ? 'Говорите с вашим ИИ-ассистентом' : 'Talk to your AI assistant'}</p>
        </div>
        <div className="assistant-content" style={{
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <button
            onClick={startListening}
            disabled={isListening}
            className="btn"
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              marginBottom: '30px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <i className={`fas fa-${isListening ? 'microphone-alt' : 'microphone'}`}></i>
            {isListening ? 
              (lang === 'ru' ? 'Слушаю...' : 'Listening...') : 
              (lang === 'ru' ? 'Начать разговор' : 'Start Conversation')}
          </button>
          <div className="conversation" style={{
            backgroundColor: 'var(--white)',
            padding: '25px',
            borderRadius: '10px',
            minHeight: '150px',
            textAlign: 'left',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ 
              marginBottom: '15px',
              color: 'var(--text-color)',
              fontWeight: '500'
            }}>
              <strong>{text}</strong>
            </p>
            {aiReply && <p style={{ 
              color: 'var(--primary-color)',
              fontStyle: 'italic'
            }}>{aiReply}</p>}
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
};

const translations = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_resume: 'Resume',
    nav_skills: 'Skills',
    nav_contact: 'Contact',
    nav_assistant: 'Assistant',
    footer_role: 'Frontend & ChatBot Developer',
    footer_copyright: '© 2023 Abdimutalip Ayan. All rights reserved.'
  },
  ru: {
    nav_home: 'Главная',
    nav_about: 'Обо мне',
    nav_resume: 'Резюме',
    nav_skills: 'Навыки',
    nav_contact: 'Контакты',
    nav_assistant: 'Ассистент',
    footer_role: 'Фронтенд и чат-бот разработчик',
    footer_copyright: '© 2023 Абдимуталип Аян. Все права защищены.'
  }
};

const Footer = ({ lang }) => (
  <footer>
    <div className="footer-content">
      <div className="logo">Ayan</div>
      <p>{translations[lang].footer_role}</p>
      <div className="social-links">
        <a href="https://github.com/ayanabdimutalip" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/ayan-abdimutalip-5a5b5a2b5/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        <a href="https://t.me/ayanabdimutalip" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>
      </div>
    </div>
    <div className="copyright">
      <p>{translations[lang].footer_copyright}</p>
    </div>
  </footer>
);

export default VoiceAssistant;