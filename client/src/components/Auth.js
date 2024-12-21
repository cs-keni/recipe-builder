import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
            console.log('Sending request to:', endpoint);
            console.log('Request data:', formData);
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Response:', data);
            
            if (response.ok) {
                onLogin({
                    ...data.user,
                    name: data.user.name || formData.name
                });
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isLogin ? 'login' : 'signup'}
                    initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 25
                    }}
                    className="bg-white p-10 rounded-lg shadow-xl w-full max-w-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h2>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors text-lg font-medium mt-6"
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default Auth; 