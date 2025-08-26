import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function FAQSection({ suiteType = "venus", constrained = false }) {
  const { t } = useLanguage();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  
  // Get FAQ data based on suite type
  const faqData = suiteType === "aries" ? t.roomDetails?.ariesFAQ : t.roomDetails?.venusFAQ;
  
  if (!faqData || !faqData.questions) {
    return null; // Don't render if FAQ data doesn't exist
  }

  // Different styles based on whether it's constrained (in room gallery) or full-width
  const containerStyle = constrained ? {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '30px 20px',
    borderTop: '1px solid #e0e0e0',
    borderRadius: '0 0 12px 12px'
  } : {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    backgroundColor: '#ffffff',
    padding: '60px 20px',
    borderTop: '1px solid #e0e0e0'
  };

  const innerContainerStyle = constrained ? {
    maxWidth: '100%',
    margin: '0 auto'
  } : {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = constrained ? {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  } : {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#333'
  };

  const faqContainerStyle = constrained ? {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '100%',
    margin: '0 auto'
  } : {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '800px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h2 style={titleStyle}>
          {faqData.title}
        </h2>

        <div style={faqContainerStyle}>
          {faqData.questions.map((faq, index) => (
            <div 
              key={index}
              style={{ 
                backgroundColor: constrained ? '#ffffff' : '#f8f9fa',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                style={{
                  width: '100%',
                  padding: constrained ? '18px 20px' : '20px 25px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: constrained ? '16px' : '18px',
                  fontWeight: '600',
                  color: '#333',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <span>{faq.question}</span>
                <span style={{ 
                  fontSize: constrained ? '20px' : '24px', 
                  color: '#007bff',
                  transform: expandedFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </button>
              
              {expandedFAQ === index && (
                <div style={{
                  padding: constrained ? '0 20px 20px 20px' : '0 25px 25px 25px',
                  backgroundColor: constrained ? '#f8f9fa' : '#ffffff',
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <p style={{
                    fontSize: constrained ? '15px' : '16px',
                    lineHeight: '1.6',
                    color: '#666',
                    margin: constrained ? '15px 0 0 0' : '15px 0 0 0',
                    whiteSpace: 'pre-line' // This allows \n characters to create line breaks
                  }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
