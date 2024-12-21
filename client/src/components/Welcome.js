import React from 'react';
import { motion } from 'framer-motion';

function Welcome({ onGetStarted }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
    >
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center text-white"
      >
        <h1 className="text-6xl font-bold mb-4">Recipe Builder</h1>
        <p className="text-xl mb-8">Create, manage, and discover amazing recipes</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Welcome; 