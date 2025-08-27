import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/main.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthModal from './AuthModal';
import AuthPromptModal from './AuthPromptModal';

export default function Navbar() {
  const { currentLanguage, switchLanguage, t } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const userFirstName = useSelector((state) => state.user.userFirstName);
  const userLastName = useSelector((state) => state.user.userLastName);
  const isSignedIn = !!useSelector((state) => state.user.token);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(clearUser());
    setShowUserDropdown(false);
    toast.info('Signed out successfully.', { position: 'top-center' });
    navigate('/');
  };

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const selectLanguage = (lang) => {
    switchLanguage(lang);
    setShowLangDropdown(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="/nanas.png"
            alt="Nana's Rooms Logo"
            style={{
              height: 'clamp(50px, 8vw, 70px)',
              width: 'clamp(90px, 15vw, 130px)',
              borderRadius: 8,
              background: '#fff'
            }}
          />
          {/* Mobile Hamburger Menu - now next to logo */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#fff', // Set to white
              marginLeft: 10
            }}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>

        <ul className={`navbar-links ${showMobileMenu ? 'mobile-active' : ''}`}>
          <li className="navbar-item">
            <div className="language-selector">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="lang-button"
                title={t.navbar.selectLang}
              >
                {t.navbar.language}
                <span className="dropdown-arrow">
                  {showLangDropdown ? '▲' : '▼'}
                </span>
              </button>
              {showLangDropdown && (
                <div className="dropdown">
                  <button
                    onClick={() => selectLanguage('en')}
                    className={`dropdown-item ${currentLanguage === 'en' ? 'active-language' : ''}`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => selectLanguage('gr')}
                    className={`dropdown-item ${currentLanguage === 'gr' ? 'active-language' : ''}`}
                  >
                    🇬🇷 Ελληνικά
                  </button>
                  <button
                    onClick={() => selectLanguage('it')}
                    className={`dropdown-item ${currentLanguage === 'it' ? 'active-language' : ''}`}
                  >
                    🇮🇹 Italiano
                  </button>
                  <button
                    onClick={() => selectLanguage('de')}
                    className={`dropdown-item ${currentLanguage === 'de' ? 'active-language' : ''}`}
                  >
                    🇩🇪 Deutsch
                  </button>
                  <button
                    onClick={() => selectLanguage('es')}
                    className={`dropdown-item ${currentLanguage === 'es' ? 'active-language' : ''}`}
                  >
                    🇪🇸 Español
                  </button>
                  <button
                    onClick={() => selectLanguage('ar')}
                    className={`dropdown-item ${currentLanguage === 'ar' ? 'active-language' : ''}`}
                  >
                    🇸🇦 العربية
                  </button>
                  <button
                    onClick={() => selectLanguage('fr')}
                    className={`dropdown-item ${currentLanguage === 'fr' ? 'active-language' : ''}`}
                  >
                    🇫🇷 Français
                  </button>
                </div>
              )}
            </div>
          </li>
          <li className="navbar-item">
            {/* Render both mobile numbers if available */}
            {t.footer?.contactInfo?.phone && (
              <a
                href={`tel:${t.footer.contactInfo.phone.replace(/[^+\d]/g, '')}`}
                className="nav-link"
                title={t.navbar.callUs}
              >
                📱 {t.footer.contactInfo.phone}
              </a>
            )}
            {t.footer?.contactInfo?.phone2 && (
              <a
                href={`tel:${t.footer.contactInfo.phone2.replace(/[^+\d]/g, '')}`}
                className="nav-link"
                title={t.navbar.callUs}
              >
                📱 {t.footer.contactInfo.phone2}
              </a>
            )}
          </li>
          <li className="navbar-item">
            <a
              href="https://www.google.com/maps/place/nanasroooms+Town+1/@37.4401481,25.3166531,14.13z/data=!4m13!1m2!2m1!1sNana's+Rooms+Mykonos+Chora+Greece!3m9!1s0x14a2bfbe1317b0dd:0xf8aa5ffd5a3297ef!5m2!4m1!1i2!8m2!3d37.4467706!4d25.3274205!15sCiFOYW5hJ3MgUm9vbXMgTXlrb25vcyBDaG9yYSBHcmVlY2WSARZzZXJ2aWNlZF9hY2NvbW1vZGF0aW9u4AEA!16s%2Fg%2F11kqs3tn93?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              title={t.navbar.viewOnMaps}
            >
              {t.navbar.maps}
            </a>
          </li>
          {isSignedIn ? (
            <li className="navbar-item" style={{ position: 'relative' }}>
              <span
                className="nav-link"
                style={{ fontWeight: 600, color: '#3498db', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                onClick={() => setShowUserDropdown((prev) => !prev)}
                tabIndex={0}
                onBlur={() => setTimeout(() => setShowUserDropdown(false), 150)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
                </svg>
                {userFirstName} {userLastName}
                <span style={{ marginLeft: 6, fontSize: 14 }}>▼</span>
              </span>
              {showUserDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  borderRadius: 8,
                  minWidth: 120,
                  zIndex: 1001,
                  padding: '8px 0',
                }}>
                  <button
                    onClick={handleSignOut}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      color: '#e74c3c',
                      fontWeight: 500,
                      fontSize: 16,
                      padding: '8px 16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="navbar-item" style={{ position: 'relative' }}>
              <span
                className="nav-link"
                style={{ fontWeight: 600, color: '#3498db', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                onClick={() => setShowAuthPrompt(true)}
                tabIndex={0}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
                </svg>
                <span style={{ marginLeft: 6, fontSize: 14 }}>▼</span>
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Auth Prompt Modal (initial small modal) */}
      {showAuthPrompt && (
        <AuthPromptModal
          onClose={() => setShowAuthPrompt(false)}
          onSignIn={() => { setShowAuthPrompt(false); setAuthMode('signin'); setShowAuthModal(true); }}
          onSignUp={() => { setShowAuthPrompt(false); setAuthMode('signup'); setShowAuthModal(true); }}
        />
      )}
      {/* Auth Modal for Sign In/Sign Up */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} initialMode={authMode} />
      )}

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block !important;
            color: #fff !important;
          }
          
          .navbar-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: white;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding-top: 0 !important;
            gap: 0 !important;
            row-gap: 0 !important;
          }
          
          .navbar-links.mobile-active {
            left: 0;
          }
          
          .navbar-item {
            margin: 0 !important;
            padding: 0 !important;
            width: 100%;
            text-align: center;
          }
          
          .nav-link {
            font-size: 18px;
            padding: 12px;
            display: block;
            border-radius: 8px;
            background: #f8f9fa;
          }
          
          .language-selector {
            width: 100%;
          }
          
          .lang-button {
            width: 100%;
            padding: 12px;
            font-size: 18px;
          }
          
          .dropdown {
            position: static;
            width: 100%;
            box-shadow: none;
            border: 1px solid #ddd;
            margin-top: 8px;
          }
        }
        
        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 1rem;
          }
          
          .nav-link {
            font-size: 16px;
          }
        }
      `}</style>
  <ToastContainer />
  </nav>

  );
}
