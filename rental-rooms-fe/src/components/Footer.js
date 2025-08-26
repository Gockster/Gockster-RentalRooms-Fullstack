import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/main.css";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-center-section">
            <div className="footer-section">
              <h3 className="footer-section-title">{t.footer.brandName}</h3>
              <div className="booking-links">
                <a 
                  href={t.footer.contactInfo.bookingAriesLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="booking-link"
                >
                  🏨 {t.footer.contactInfo.bookingAries}
                </a>
                <a 
                  href={t.footer.contactInfo.bookingVenusLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="booking-link"
                >
                  🏨 {t.footer.contactInfo.bookingVenus}
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-section-title">{t.footer.contactInfo.title}</h4>
              <div className="contact-info">
                <p className="contact-item">📧 {t.footer.contactInfo.email}</p>
                <p className="contact-item">📞 {t.footer.contactInfo.phone}</p>
                {t.footer.contactInfo.phone2 && (
                  <p className="contact-item">📞 {t.footer.contactInfo.phone2}</p>
                )}
                <p className="contact-item">📍 {t.footer.contactInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
