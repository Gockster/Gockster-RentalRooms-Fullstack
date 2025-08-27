import React, { useState } from 'react';
import SignIn from './signin';
import SignUp from './signup';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};
const contentStyle = {
  background: '#fff',
  borderRadius: 6, // less rounded, more square
  padding: 0,
  minWidth: 400,
  maxWidth: '98vw',
  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
  position: 'relative',
  width: 420,
};

export default function AuthModal({ onClose, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode);

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>×</button>
        <div style={{ padding: '32px 32px 24px 32px', minWidth: 320 }}>
          {mode === 'signin' ? (
            <>
              <div style={{ marginBottom: 18, fontWeight: 600, fontSize: 18, textAlign: 'center' }}>
                Συνδέσου με τα στοιχεία σου
              </div>
              <SignIn onSuccess={onClose} hideTitle hideAltLinks />
              <div style={{ borderTop: '1px solid #eee', margin: '24px 0 16px 0' }} />
              <div style={{ textAlign: 'center', marginBottom: 10, color: '#444', fontSize: 15 }}>
                Πρώτη σου φορά στο Nana's Rooms;
              </div>
              <button
                onClick={() => setMode('signup')}
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
            </>
          ) : (
            <>
              <div style={{ marginBottom: 18, fontWeight: 600, fontSize: 18, textAlign: 'center' }}>
                Δημιουργία λογαριασμού
              </div>
              <SignUp onSuccess={onClose} hideTitle hideAltLinks />
              <div style={{ borderTop: '1px solid #eee', margin: '24px 0 16px 0' }} />
              <div style={{ textAlign: 'center', marginBottom: 10, color: '#444', fontSize: 15 }}>
                Έχεις ήδη λογαριασμό;
              </div>
              <button
                onClick={() => setMode('signin')}
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
                Είσοδος
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
