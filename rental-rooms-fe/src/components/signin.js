import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';


const SignIn = ({ onSuccess }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        console.log('Sign In Data:', form);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {
                email: form.email,
                password: form.password
            });
            if (response.data && response.data.token) {
                console.log('Sign in response data:', response.data);
                // Store user info in Redux
                dispatch(setUser({
                    userId: response.data.userId || response.data.id,
                    email: response.data.email,
                    userFirstName: response.data.userFirstName,
                    userLastName: response.data.userLastName,
                    phoneNumber: response.data.phoneNumber,
                    roles: response.data.roles,
                    token: response.data.token,
                }));
                setMessage('Sign in successful!');
                toast.success('Sign in successful!', { position: 'top-center' });
                console.log('Sign in succeeded!');
                if (onSuccess) onSuccess();
                setTimeout(() => navigate('/'), 1200);
            } else {
                setMessage('Sign in failed.');
                toast.error('Sign in failed.', { position: 'top-center' });
                console.log('Sign in failed.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
                toast.error(error.response.data.message, { position: 'top-center' });
                console.log('Sign in failed:', error.response.data.message);
            } else {
                setMessage('Error connecting to server.');
                toast.error('Error connecting to server.', { position: 'top-center' });
                console.log('Sign in failed: Error connecting to server.');
            }
        }
    };

    return (
        <>
            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="signin-container" style={{ width: 350, padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', background: '#fff', margin: '32px 0' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Sign In</h2>
                    <form onSubmit={handleSubmit} autoComplete="on">
                        <div style={{ marginBottom: 18 }}>
                            <label htmlFor="signin-email" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
                            <input
                                id="signin-email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 14, fontSize: 17, marginBottom: 0, borderRadius: 8, border: '1.5px solid #bdbdbd', background: '#fafbfc' }}
                            />
                        </div>
                        <div style={{ marginBottom: 22 }}>
                            <label htmlFor="signin-password" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
                            <input
                                id="signin-password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 14, fontSize: 17, borderRadius: 8, border: '1.5px solid #bdbdbd', background: '#fafbfc' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: 14,
                                borderRadius: 8,
                                background: form._hover ? '#2980b9' : '#3498db',
                                color: '#fff',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: 18,
                                letterSpacing: 1,
                                transition: 'background 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() => setForm({ ...form, _hover: true })}
                            onMouseLeave={() => setForm({ ...form, _hover: false })}
                        >
                            Sign In
                        </button>
                    </form>
                    {/* Toast notifications handle feedback, so no message below the form */}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignIn;
