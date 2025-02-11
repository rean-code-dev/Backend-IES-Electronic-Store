import React from 'react';
import './LoginPageDash.css';

function LoginDashboard() {
    const onLogin = () => {
        localStorage.setItem('isLogin', '1');
        window.location.href = '/dashboard';
    };

    return (
        <div className='LoginDashboard'>
            <div className='LoginDashboardContainer'>
                <h2>Login</h2>
                <input type='text' placeholder='Email ID' />
                <input type='password' placeholder='Password' />
                <div className="checkbox">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href='#'>Forgot Password?</a>
                </div>
                <button onClick={onLogin}>Login</button>
                <div className="register-link">
                    Don’t have an account? <a href='#'>Register</a>
                </div>
            </div>
        </div>
    );
}

export default LoginDashboard;
