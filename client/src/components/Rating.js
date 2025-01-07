import { motion } from 'framer-motion';
import { useState } from 'react';

function Rating({ recipeId, onRate, isDarkMode }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRate = async (value) => {
        setRating(value);
        await onRate(recipeId, value);
    };

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setHover(star)}
                    onHoverEnd={() => setHover(0)}
                    onClick={() => handleRate(star)}
                    className={`text-2xl ${
                        (hover || rating) >= star
                            ? 'text-yellow-400'
                            : isDarkMode
                                ? 'text-gray-600'
                                : 'text-gray-300'
                    }`}
                >
                    ★
                </motion.button>
            ))}
        </div>
    );
}

export default Rating; 