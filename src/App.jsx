import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VoiceAssistant from './VoiceAssistant';
import Loadingscreen from './WelcomeAnimation.jsx';
import SignUp from './components/auth/SignUp.jsx';
import SignIn from './components/auth/SignIn.jsx';
import SignOut from './components/auth/SignOut.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

const translations = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_resume: 'Resume',
    nav_skills: 'Skills',
    nav_contact: 'Contact',
    nav_assistant: 'Assistant',
    welcome_hello: 'Hello!',
    welcome_title: 'I\'m Abdimutalip Ayan',
    welcome_subtitle: 'Frontend & ChatBot Developer',
    welcome_contact: 'Contact Me',
    about_title: 'About me',
    about_content: 'I am a front-end developer who creates websites quickly and efficiently. Passionate about building interactive and user-friendly web applications.',
    about_fullname: 'Fullname:',
    about_dob: 'Date of birth:',
    about_address: 'Address:',
    about_telegram: 'Telegram',
    about_stats: 'Projects complete',
    about_download_cv: 'Download CV',
    about_my_projects: 'My Projects',
    skills_title: 'My Skills',
    skills_desc: 'I have expertise in various web technologies and frameworks that help me build modern web applications.',
    resume_title: 'My Resume',
    resume_desc: 'My education and professional experience',
    resume_certificates: 'Certificates',
    resume_skills: 'Skills',
    resume_professional: 'Professional Certificate',
    contact_title: 'Get In Touch',
    contact_desc: 'Feel free to reach out to me for any questions or opportunities.',
    contact_location: 'Location:',
    contact_email: 'Email:',
    contact_phone: 'Phone:',
    contact_form_name: 'Your Name',
    contact_form_phone: 'Your Phone',
    contact_form_email: 'Your Email',
    contact_form_telegram: 'Telegram username (optional)',
    contact_form_subject: 'Subject',
    contact_form_message: 'Your Message',
    contact_form_submit: 'Send Message',
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
    welcome_hello: 'Привет!',
    welcome_title: 'Я Абдимуталип Аян',
    welcome_subtitle: 'Фронтенд и чат-бот разработчик',
    welcome_contact: 'Связаться со мной',
    about_title: 'Обо мне',
    about_content: 'Я фронтенд-разработчик, создающий веб-сайты быстро и эффективно. Увлечен созданием интерактивных и удобных веб-приложений.',
    about_fullname: 'Полное имя:',
    about_dob: 'Дата рождения:',
    about_address: 'Адрес:',
    about_telegram: 'Телеграм',
    about_stats: 'Завершено проектов',
    about_download_cv: 'Скачать резюме',
    about_my_projects: 'Мои проекты',
    skills_title: 'Мои навыки',
    skills_desc: 'У меня есть опыт работы с различными веб-технологиями и фреймворками, которые помогают мне создавать современные веб-приложения.',
    resume_title: 'Мое резюме',
    resume_desc: 'Мое образование и профессиональный опыт',
    resume_certificates: 'Сертификаты',
    resume_skills: 'Навыки',
    resume_professional: 'Профессиональный сертификат',
    contact_title: 'Связаться со мной',
    contact_desc: 'Не стесняйтесь обращаться ко мне с любыми вопросами или предложениями.',
    contact_location: 'Местоположение:',
    contact_email: 'Электронная почта:',
    contact_phone: 'Телефон:',
    contact_form_name: 'Ваше имя',
    contact_form_phone: 'Ваш телефон',
    contact_form_email: 'Ваш email',
    contact_form_telegram: 'Имя пользователя в Telegram (необязательно)',
    contact_form_subject: 'Тема',
    contact_form_message: 'Ваше сообщение',
    contact_form_submit: 'Отправить сообщение',
    footer_role: 'Фронтенд и чат-бот разработчик',
    footer_copyright: '© 2023 Абдимуталип Аян. Все права защищены.'
  }
};

const certificateData = {
  'Advanced-React': { image: '/Advanced-React.png' },
  'Front-End-Developer-Capstone': { image: '/Front-End-Developer-Capstone.png' },
  'Coding-Interview-Preparation': { image: '/Coding-Interview.png' },
  'HTML-and-CSS-in-depth': { image: '/HTML-and-CSS-in-depth.png' },
  'Introduction-to-Front-End-Development': { image: '/Introduction-to-Front-End-Development.png' },
  'Version-Control': { image: '/Version-Control.png' },
  'Principles-of-UX-UI-Design': { image: '/Principles-of-UX-UI-Design.png' },
  'Programming-with-JavaScript': { image: '/Programming-with-JavaScript.png' },
  'React-Basics': { image: '/React-Basics.png' },
  'Meta-Front-End-Developer': { image: '/Meta-Front-End-Developer.png' }
};

const Header = ({ lang, setLang, theme, toggleTheme, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
            onClick={() => setIsMenuOpen(false)}
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
      {isAuthenticated && <SignOut />}
    </header>
  );
};

const Welcome = ({ lang }) => (
  <section id="home" className="welcome">
    <div className="content">
      <p>{translations[lang].welcome_hello}</p>
      <h1>{translations[lang].welcome_title}</h1>
      <h2>{translations[lang].welcome_subtitle}</h2>
      <div className="buttons">
        <Link to="/contact" className="btn">{translations[lang].welcome_contact}</Link>
        <Link to="/about" className="btn outline">Learn More</Link>
      </div>
    </div>
    <img src="/ghibli-photo2.png" alt="Profile Image" className="profile-img" />
  </section>
);

const About = ({ lang }) => (
  <section id="about" className="about">
    <img src="/myPhoto" alt="About Image" className="about-img" />
    <div className="about-content">
      <h2 className="backSide-about">{translations[lang].about_title}</h2>
      <h2 className="frontSide-about">{translations[lang].about_title}</h2>
      <p className="content">{translations[lang].about_content}</p>
      <div className="myDate">
        <div className="date">
          <div className="left-side">
            <h3>{translations[lang].about_fullname}</h3>
            <h3>{translations[lang].about_dob}</h3>
            <h3>{translations[lang].about_address}</h3>
            <h3>{translations[lang].about_telegram}</h3>
          </div>
          <div className="right-side">
            <h3>Abdimutalip Ayan</h3>
            <h3>June 18, 2009</h3>
            <h3>Kazakhstan, Almaty</h3>
            <h3><a href="https://t.me/ayanabdimutalip" target="_blank" rel="noopener noreferrer">@ayanabdimutalip</a></h3>
          </div>
        </div>
        <div className="stats">
          <div className="stat-item">
            <span className="number">10+</span>
            <span className="label">{translations[lang].about_stats}</span>
          </div>
        </div>
        <div className="dateButtons">
          <a href="https://drive.google.com/file/d/1uW5i5i5i5i5i5i5i5i5i5i5i5i5i5i5i/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="checkProjects">{translations[lang].about_download_cv}</a>
          <a href="https://github.com/ayanabdimutalip?tab=repositories" target="_blank" rel="noopener noreferrer" className="checkCertificate">{translations[lang].about_my_projects}</a>
        </div>
      </div>
    </div>
  </section>
);

const Skills = ({ lang }) => {
  const skills = [
    { name: 'HTML', percent: 99, className: 'html' },
    { name: 'CSS', percent: 94, className: 'css' },
    { name: 'JavaScript', percent: 97, className: 'js' },
    { name: 'React', percent: 85, className: 'react' },
    { name: 'ChatBot Development', percent: 90, className: 'chatbot' }
  ];

  const skillRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      skillRefs.current.forEach((progress, index) => {
        if (progress) {
          const rect = progress.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            progress.style.width = progress.dataset.width;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="back-title">{translations[lang].skills_title}</h2>
        <h2 className="front-title">{translations[lang].skills_title}</h2>
        <p>{translations[lang].skills_desc}</p>
      </div>
      <div className="skills-container">
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-item">
            <div className="skill-info">
              <span>{skill.name}</span>
              <span>{skill.percent}%</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress ${skill.className}`}
                ref={(el) => (skillRefs.current[idx] = el)}
                data-width={`${skill.percent}%`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Resume = ({ lang, openModal }) => {
  const certificates = [
    { name: 'Advanced-React', date: 'Meta - Mar 2025' },
    { name: 'Front-End-Developer-Capstone', date: 'Meta - Mar 2025' },
    { name: 'Coding-Interview-Preparation', date: 'Meta - Mar 2025' },
    { name: 'HTML-and-CSS-in-depth', date: 'Meta - Mar 2025' },
    { name: 'Introduction-to-Front-End-Development', date: 'Meta - Mar 2025' },
    { name: 'Version-Control', date: 'Meta - Mar 2025' },
    { name: 'Principles-of-UX-UI-Design', date: 'Meta - Mar 2025' },
    { name: 'Programming-with-JavaScript', date: 'Meta - Mar 2025' },
    { name: 'React-Basics', date: 'Meta - Mar 2025' }
  ];

  const skillsList = ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'ChatBot Development', 'Responsive Design', 'APIs'];

  const certificateRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      certificateRefs.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="resume" className="resume-section">
      <div className="section-header">
        <h2 className="back-title">{translations[lang].resume_title}</h2>
        <h2 className="front-title">{translations[lang].resume_title}</h2>
        <p>{translations[lang].resume_desc}</p>
      </div>
      <div className="resume-container">
        <div className="resume-column">
          <h3>{translations[lang].resume_certificates}</h3>
          <div className="certificates-grid">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="certificate-card"
                ref={(el) => (certificateRefs.current[idx] = el)}
                onClick={() => openModal(cert.name)}
                style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.3s ease' }}
              >
                <h4>{cert.name.replace(/-/g, ' ')}</h4>
                <span>{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="resume-column">
          <h3>{translations[lang].resume_skills}</h3>
          <div className="skills-tags">
            {skillsList.map((skill, idx) => (
              <span key={idx}>{skill}</span>
            ))}
          </div>
          <h3>{translations[lang].resume_professional}</h3>
          <div
            className="professional-cert"
            ref={(el) => (certificateRefs.current[certificates.length] = el)}
            onClick={() => openModal('Meta-Front-End-Developer')}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.3s ease' }}
          >
            <img src="/Meta-Front-End-Developer.png" alt="Meta Front-End Developer Certificate" />
            <h4>Meta Front-End Developer</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    telegram: '',
    subject: '',
    message: ''
  });

  const infoRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      infoRefs.current.forEach((item) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `New Client Inquiry:\n\nName: ${formData.name}\nPhone: ${formData.phone || 'Not provided'}\nEmail: ${formData.email}\nTelegram: ${formData.telegram || 'Not provided'}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    const BOT_TOKEN = '8156472399:AAE8bC_yX9JcylpFD7wMXKPWo_5gLhElIXE';
    const CHAT_ID = '6768870909';
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      const data = await response.json();
      if (data.ok) {
        alert('Thank you for your message! I will contact you soon.');
        setFormData({ name: '', phone: '', email: '', telegram: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please check your Telegram bot settings and try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later or contact me directly.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="back-title">{translations[lang].contact_title}</h2>
        <h2 className="front-title">{translations[lang].contact_title}</h2>
        <p>{translations[lang].contact_desc}</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          {[
            { icon: 'fas fa-map-marker-alt', title: translations[lang].contact_location, content: 'Almaty, Kazakhstan' },
            { icon: 'fas fa-envelope', title: translations[lang].contact_email, content: 'ayanabdimutalip@gmail.com' },
            { icon: 'fas fa-phone', title: translations[lang].contact_phone, content: '+7 (747) 123-45-67' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="info-item"
              ref={(el) => (infoRefs.current[idx] = el)}
              style={{ opacity: 0, transform: 'translateX(-20px)', transition: 'all 0.3s ease' }}
            >
              <i className={item.icon}></i>
              <div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={translations[lang].contact_form_name}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder={translations[lang].contact_form_phone}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={translations[lang].contact_form_email}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telegram"
              placeholder={translations[lang].contact_form_telegram}
              value={formData.telegram}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder={translations[lang].contact_form_subject}
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder={translations[lang].contact_form_message}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">{translations[lang].contact_form_submit}</button>
        </form>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => (
  <footer>
    <div className="footer-content">
      <div className='left-footer'>
        <div className="logo">Ayan</div>
        <p>{translations[lang].footer_role}</p>
      </div>
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

const CertificateModal = ({ isOpen, onClose, certName }) => {
  if (!isOpen) return null;
  const cert = certificateData[certName];

  return (
    <div id="certificateModal" className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>×</span>
        <h2 id="modalTitle">{certName.replace(/-/g, ' ')}</h2>
        <div className="modal-body">
          <img
            id="modalImage"
            src={cert?.image}
            alt="Certificate Image"
            onError={() => alert(`Certificate image "${certName}" not found in public folder`)}
          />
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ lang }) => (
  <div>
    <Welcome lang={lang} />
    <Footer lang={lang} />
  </div>
);

const AboutPage = ({ lang }) => (
  <div>
    <About lang={lang} />
    <Footer lang={lang} />
  </div>
);

const SkillsPage = ({ lang }) => (
  <div>
    <Skills lang={lang} />
    <Footer lang={lang} />
  </div>
);

const ResumePage = ({ lang, openModal }) => (
  <div>
    <Resume lang={lang} openModal={openModal} />
    <Footer lang={lang} />
  </div>
);

const ContactPage = ({ lang }) => (
  <div>
    <Contact lang={lang} />
    <Footer lang={lang} />
  </div>
);

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState('');
  const [showPostAuthAnimation, setShowPostAuthAnimation] = useState(!!localStorage.getItem('showAnimation'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!JSON.parse(localStorage.getItem('currentUser')));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const openModal = (certName) => {
    if (certificateData[certName]) {
      setCurrentCert(certName);
      setModalOpen(true);
    } else {
      alert('Certificate not found: ' + certName);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCert('');
  };

  return (
    <Router>
      <Routes>
        {showPostAuthAnimation ? (
          <Route
            path="*"
            element={
              <Loadingscreen
                onComplete={() => {
                  localStorage.removeItem('showAnimation');
                  setShowPostAuthAnimation(false);
                }}
              />
            }
          />
        ) : (
          <>
            <Route path="/signup" element={<SignUp setShowAnimation={() => setShowPostAuthAnimation(true)} />} />
            <Route path="/signin" element={<SignIn setShowAnimation={() => setShowPostAuthAnimation(true)} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
                  <HomePage lang={lang} />
                  <CertificateModal isOpen={modalOpen} onClose={closeModal} certName={currentCert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
                  <AboutPage lang={lang} />
                  <CertificateModal isOpen={modalOpen} onClose={closeModal} certName={currentCert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skills"
              element={
                <ProtectedRoute>
                  <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
                  <SkillsPage lang={lang} />
                  <CertificateModal isOpen={modalOpen} onClose={closeModal} certName={currentCert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
                  <ResumePage lang={lang} openModal={openModal} />
                  <CertificateModal isOpen={modalOpen} onClose={closeModal} certName={currentCert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
                  <ContactPage lang={lang} />
                  <CertificateModal isOpen={modalOpen} onClose={closeModal} certName={currentCert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assistant"
              element={
                <ProtectedRoute>
                  <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
                  <VoiceAssistant lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
                  <CertificateModal isOpen={modalOpen} onClose={closeModal} certName={currentCert} />
                </ProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;