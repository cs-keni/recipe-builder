import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PasswordValidation from './PasswordValidation';

function Auth({ onLogin, isDarkMode }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const validatePassword = (password) => {
        const requirements = [
            /[a-z]/, // lowercase
            /[A-Z]/, // uppercase
            /[0-9]/, // number
            /[!@#$%^&*(),.?":{}|<>]/, // special character
            /.{8,}/ // minimum length
        ];
        return requirements.every(regex => regex.test(password));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isLogin && !validatePassword(formData.password)) {
            setError('Password does not meet requirements');
            return;
        }

        try {
            const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                // Save the token to localStorage
                localStorage.setItem('token', data.token);
                
                // Call onLogin with user data
                onLogin(data.user);
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            // Implement password reset logic
            console.log('Password reset requested for:', resetEmail);
            setError('Password reset link sent to your email');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
        >
            <motion.div
                key={showForgotPassword ? 'forgot' : (isLogin ? 'login' : 'signup')}
                initial={{ opacity: 0, x: showForgotPassword ? 50 : (isLogin ? -50 : 50) }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: showForgotPassword ? -50 : (isLogin ? 50 : -50) }}
                transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                }}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-lg shadow-xl w-full max-w-xl`}
            >
                <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {isLogin ? 'Welcome' : 'Create Account'}
                </h2>

                {error && (
                    <div className={`${isDarkMode ? 'bg-red-900' : 'bg-red-50'} text-red-500 p-4 rounded-md mb-6`}>
                        {error}
                    </div>
                )}

                {showForgotPassword ? (
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border border-gray-300'
                                }`}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Reset Password
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(false)}
                            className={`w-full py-2 px-4 rounded-md ${
                                isDarkMode
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            Back to Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className={`w-full px-3 py-2 rounded-md ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'border border-gray-300'
                                    }`}
                                    required
                                />
                            </div>
                        )}
                        
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className={`w-full px-3 py-2 rounded-md ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border border-gray-300'
                                }`}
                                required
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className={`w-full px-3 py-2 rounded-md ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border border-gray-300'
                                }`}
                                required
                            />
                            {!isLogin && <PasswordValidation password={formData.password} isDarkMode={isDarkMode} />}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                        </button>
                    </form>
                )}

                <div className="mt-4 flex justify-between items-center">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                    {isLogin && !showForgotPassword && (
                        <button
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Forgot Password?
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Auth; 