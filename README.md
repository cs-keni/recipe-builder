# Recipe Builder

A modern CRUD (the acronym, not the word) web application that helps you create and manage recipes from any ingredients you have on hand. Powered by AI to suggest creative recipes based on your available ingredients.

## Features

- **AI-Powered Recipe Generation**: Input your ingredients and get AI-generated recipe suggestions
- **Custom Recipe Management**: Create, view, update, and delete your own recipes
- **Ingredient-Based Search**: Find recipes based on ingredients you have
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- React.js
- Framer Motion (animations so smooth wow!)
- Tailwind CSS
- TypeScript
- Jest & React Testing Library

### Backend
- Flask 
- SQLite (might switch to PostgreSQL or mongoDB)
- OpenAI API
- Flask-CORS
- Werkzeug (definitely switching to Firebase)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- SQLite (might switch to PostgreSQL or mongoDB)
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cs-keni/recipe-builder.git
cd recipe-builder
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd server
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Create .env file in server directory
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_url
```

### Running the Application For Development (and for users!)

1. Start the backend server:
```bash
cd server
python app.py
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Testing

Run frontend tests: (haven't done this yet)
```bash
cd client
npm test
```

Run backend tests: (haven't done this yet)
```bash
cd server
python -m pytest
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

No license! I don't care if you copy it. I'm not a lawyer and don't want to be one. It'd be nice to include me in credits though! Also I'm too scared to actually deploy this outside of a local environment because it costs money to use the API (it's cheap, but still, I'm a broke university student).

## Author

Kenny Nguyen (cs-keni)

## Acknowledgments

- OpenAI for providing the AI recipe generation capabilities
- Create React App for the initial project setup
- Professor Boyana for her intro to software engineering course (I'm not sure if I'm allowed to say this, but I'm grateful for her help and guidance)
- My sister for giving me feature ideas
- Unsplash for the images
- ChatGPT for breaking my code and helping me learn to fix it on my own
- Stack Overflow for giving me irrelevant answers to my questions, making me learn to fix it on my own
- My rubber duck -- my biggest contributor