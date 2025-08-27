import React, { useState } from 'react';
import { FaUser, FaBed } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Booking = ({ roomId, userId, onBooked }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('PENDING');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        userId,
        roomId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        status,
        adults,
        children,
      };
      console.log('Booking payload:', payload);
      const res = await axios.post('http://localhost:8080/api/bookings', payload);
      setSuccess('Booking request sent!');
      setLoading(false);
      if (onBooked) onBooked();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 0 }}>
      <form onSubmit={handleBooking} style={{ padding: 0, margin: 0 }}>
        {/* Top horizontal booking bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid #f5c242', borderRadius: 8, overflow: 'hidden', background: '#f8f9fa', padding: 0 }}>
          <div style={{ flex: 2, borderRight: '1.5px solid #f5c242', padding: '18px 18px 18px 24px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>
              Άφιξη<br />
              <span style={{ color: '#00b894', fontSize: 13, fontWeight: 500 }}>Check-in</span>
            </label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="dd MMM yyyy"
              placeholderText="Άφιξη / Check-in"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 2, borderRight: '1.5px solid #f5c242', padding: '18px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>
              Αναχώρηση<br />
              <span style={{ color: '#00b894', fontSize: 13, fontWeight: 500 }}>Check-out</span>
            </label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              dateFormat="dd MMM yyyy"
              placeholderText="Αναχώρηση / Check-out"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 3, borderRight: '1.5px solid #f5c242', padding: '18px', display: 'flex', flexDirection: 'column', minWidth: 220 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>
              Επισκέπτες<br />
              <span style={{ color: '#00b894', fontSize: 13, fontWeight: 500 }}>Guests</span>
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <select value={adults} onChange={e => setAdults(Number(e.target.value))} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 60 }}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ενήλικας{n>1?'ες':''} / {n} adult{n>1?'s':''}</option>)}
              </select>
              <select value={children} onChange={e => setChildren(Number(e.target.value))} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 60 }}>
                {[0,1,2,3,4].map(n => <option key={n} value={n}>{n} παιδί{n!==1?'ά':''} / {n} child{n!==1?'ren':''}</option>)}
              </select>
            </div>
          </div>
          <div style={{ flex: 1, padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 0', borderRadius: 8, background: '#0071c2', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              {loading ? 'Κράτηση... / Booking...' : 'Κράτηση / Book'}
            </button>
          </div>
        </div>
        {/* Error/success messages */}
  {error && <div style={{ color: 'red', margin: '8px 0 0 16px' }}>{error} <span style={{ color: '#00b894', fontSize: 13, fontWeight: 500 }}>/ Σφάλμα</span></div>}
  {success && <div style={{ color: 'green', margin: '8px 0 0 16px' }}>{success} <span style={{ color: '#00b894', fontSize: 13, fontWeight: 500 }}>/ Επιτυχία</span></div>}
      </form>
  {/* Summary row removed as requested */}
    </div>
  );
};

export default Booking;
