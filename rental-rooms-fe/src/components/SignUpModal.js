import React from 'react';

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
  borderRadius: 12,
  padding: 32,
  minWidth: 420,
  maxWidth: '98vw',
  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
  position: 'relative',
};

export default function SignUpModal({ onClose, children }) {
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>×</button>
        {children}
      </div>
    </div>
  );
}
