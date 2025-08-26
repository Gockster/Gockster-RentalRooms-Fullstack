import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        userFirstName: '',
        userLastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', form);
            if (response.status === 200 || response.status === 201) {
                // Auto sign-in after successful signup
                try {
                    const signInRes = await axios.post('http://localhost:8080/api/auth/signin', {
                        email: form.email,
                        password: form.password
                    });
                    if (signInRes.data && signInRes.data.token) {
                        dispatch(setUser({
                            email: signInRes.data.email,
                            userFirstName: signInRes.data.userFirstName,
                            userLastName: signInRes.data.userLastName,
                            phoneNumber: signInRes.data.phoneNumber,
                            roles: signInRes.data.roles,
                            token: signInRes.data.token,
                        }));
                        toast.success('Sign up and sign in successful!', { position: 'top-center' });
                        setForm({ userFirstName: '', userLastName: '', email: '', password: '' });
                        if (onSuccess) onSuccess();
                        return;
                    } else {
                        toast.error('Sign up succeeded but sign in failed.', { position: 'top-center' });
                        setMessage('Sign up succeeded but sign in failed.');
                    }
                } catch (err) {
                    toast.error('Sign up succeeded but sign in failed.', { position: 'top-center' });
                    setMessage('Sign up succeeded but sign in failed.');
                }
            } else {
                setMessage('Sign up failed.');
                toast.error('Sign up failed.', { position: 'top-center' });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
                toast.error(error.response.data.message, { position: 'top-center' });
            } else {
                setMessage('Error connecting to server.');
                toast.error('Error connecting to server.', { position: 'top-center' });
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="signup-container" style={{ width: 350, padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', background: '#fff', margin: '32px 0' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Sign Up</h2>
                    <form onSubmit={handleSubmit} autoComplete="on">
                        <div style={{ marginBottom: 18 }}>
                            <label htmlFor="signup-firstname" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>First Name</label>
                            <input
                                id="signup-firstname"
                                type="text"
                                name="userFirstName"
                                placeholder="Enter your first name"
                                value={form.userFirstName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 14, fontSize: 17, marginBottom: 0, borderRadius: 8, border: '1.5px solid #bdbdbd', background: '#fafbfc' }}
                            />
                        </div>


                        <div style={{ marginBottom: 18 }}>
                            <label htmlFor="signup-lastname" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Last Name</label>
                            <input
                                id="signup-lastname"
                                type="text"
                                name="userLastName"
                                placeholder="Enter your last name"
                                value={form.userLastName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 14, fontSize: 17, marginBottom: 0, borderRadius: 8, border: '1.5px solid #bdbdbd', background: '#fafbfc' }}
                            />
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <label htmlFor="signup-email" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
                            <input
                                id="signup-email"
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
                            <label htmlFor="signup-password" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
                            <input
                                id="signup-password"
                                type="password"
                                name="password" 
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 14, fontSize: 17, borderRadius: 8, border: '1.5px solid #bdbdbd', background: '#fafbfc' }}
                            />
                        </div>

                        <div style={{ marginBottom: 18 }}>
                            <label htmlFor="signup-phone" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Phone Number (optional)</label>
                            <input
                                id="signup-phone"
                                type="tel"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                style={{ width: '100%', padding: 14, fontSize: 17, marginBottom: 0, borderRadius: 8, border: '1.5px solid #bdbdbd', background: '#fafbfc' }}
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
                            Sign Up
                        </button>
                    </form>
                    {/* Toast notifications handle feedback, so no message below the form */}
                </div>
            </div>
        </>
    );
};

export default SignUp;
