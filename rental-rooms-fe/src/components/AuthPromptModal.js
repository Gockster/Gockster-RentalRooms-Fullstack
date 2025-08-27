import React from 'react';

const dropdownStyle = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  background: '#fff',
  borderRadius: 12,
  padding: '24px 20px 16px 20px',
  minWidth: 280,
  maxWidth: 340,
  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
  zIndex: 2001,
  textAlign: 'center',
};

export default function AuthPromptModal({ onClose, onSignIn, onSignUp }) {
  // Prevent click outside for now; parent should handle closing
  return (
    <div style={dropdownStyle}>
      <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 18 }}>
        Συνδέσου με τα στοιχεία σου
      </div>
      <button
        onClick={onSignIn}
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 6,
          background: '#00b894',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          marginBottom: 16,
          transition: 'background 0.2s',
        }}
      >
        Είσοδος
      </button>
      <div style={{ borderTop: '1px solid #eee', margin: '16px 0 12px 0' }} />
      <div style={{ color: '#444', fontSize: 15, marginBottom: 10 }}>
        Πρώτη σου φορά στο Nana's Rooms;
      </div>
      <button
        onClick={onSignUp}
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 6,
          background: '#fff',
          color: '#222',
          border: '1.5px solid #222',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          marginBottom: 4,
          transition: 'background 0.2s',
        }}
      >
        Δημιουργία λογαριασμού
      </button>
    </div>
  );
}
