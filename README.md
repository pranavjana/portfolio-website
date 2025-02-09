# Pranav Janakiraman's Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with dark mode support
- 🚀 Built with React, TypeScript, and Vite
- 💅 Styled with Tailwind CSS
- 🤖 AI-powered chatbot using Google's Gemini
- 🎯 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌐 AWS certifications showcase
- 📂 Project portfolio with live demos

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/pranavjana/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your Google Gemini API key.

4. Run the development server:
```bash
npm run dev
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Built With

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Gemini API
- Vite
- Vercel

## License

MIT License - feel free to use this code for your own portfolio!

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
