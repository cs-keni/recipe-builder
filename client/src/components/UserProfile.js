import React, { useState } from 'react';
import { motion } from 'framer-motion';

function UserProfile({ user, onUpdateProfile, isDarkMode }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdateProfile(formData);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}
        >
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Profile Settings
            </h2>

            {error && (
                <div className={`${isDarkMode ? 'bg-red-900' : 'bg-red-50'} text-red-500 p-4 rounded-md mb-6`}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-md ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        } ${!isEditing && 'opacity-50'}`}
                    />
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 rounded-md ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        } ${!isEditing && 'opacity-50'}`}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className={`px-4 py-2 rounded-md ${
                                    isDarkMode
                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </form>
        </motion.div>
    );
}

export default UserProfile; 