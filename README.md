# Benny Yuen's Portfolio Website

A modern, responsive personal portfolio website showcasing my projects, experiences, and skills as a developer.

## ✨ Features

- 🌐 **Internationalization** - Multi-language support with next-intl
- 🎨 **Modern UI** - Clean, responsive design with Vanilla Extract CSS-in-JS
- 🔥 **Firebase Integration** - Dynamic content management with Firebase
- ⚡ **Optimized Performance** - Built with Next.js 15 for fast loading and SEO
- 📊 **Analytics** - Integrated Vercel Analytics and Speed Insights
- 🧪 **Tested** - Comprehensive test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

### Core

- **Framework:** [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **React:** [React 19](https://react.dev/) - UI library

### Styling

- **CSS-in-JS:** [Vanilla Extract](https://vanilla-extract.style/) - Zero-runtime stylesheets
- **Utilities:** [clsx](https://github.com/lukeed/clsx) - Conditional class names

### Backend & Data

- **Database:** [Firebase](https://firebase.google.com/) - Backend-as-a-Service
- **Image Optimization:** [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing

### Internationalization

- **i18n:** [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js

### Development & Testing

- **Testing:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Linting:** [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)

### Deployment & Analytics

- **Hosting:** [Vercel](https://vercel.com/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/hsyuen720/benny-yuen-portfolio.git

# Navigate to the project
cd benny-yuen-portfolio

# Install dependencies
yarn

# Start development server
yarn dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn test` | Run tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Run tests with coverage report |

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── locales/          # Translation files
├── modules/          # Page-specific modules
├── settings/         # App constants and configuration
├── styles/           # Global styles and theme
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
