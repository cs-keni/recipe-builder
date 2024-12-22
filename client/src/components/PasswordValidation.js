import React from 'react';

function PasswordValidation({ password, isDarkMode }) {
    const requirements = [
        { label: 'At least one lowercase letter', regex: /[a-z]/ },
        { label: 'At least one uppercase letter', regex: /[A-Z]/ },
        { label: 'At least one number', regex: /[0-9]/ },
        { label: 'At least one special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
        { label: 'Minimum 8 characters', regex: /.{8,}/ }
    ];

    return (
        <div className="mt-2">
            {requirements.map((req, index) => (
                <div 
                    key={index} 
                    className={`text-sm flex items-center space-x-2 ${
                        req.regex.test(password)
                            ? isDarkMode ? 'text-green-400' : 'text-green-600'
                            : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    <span>{req.regex.test(password) ? '✓' : '○'}</span>
                    <span>{req.label}</span>
                </div>
            ))}
        </div>
    );
}

export default PasswordValidation; 