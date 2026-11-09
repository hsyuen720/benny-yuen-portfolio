# Benny Yuen's Portfolio Website

A modern, responsive personal portfolio website showcasing my projects, experiences, and skills as a developer.

## ✨ Features

- 🌐 **Internationalization** - Multi-language support with next-intl
- 🎨 **Modern UI** - Clean, responsive design with Vanilla Extract CSS-in-JS
- 🔥 **Firebase Integration** - Dynamic content management with Firebase
- ⚡ **Optimized Performance** - Built with Next.js 15 for fast loading and SEO
- 📊 **Analytics** - Integrated Vercel Analytics and Speed Insights
- 🧪 **Tested** - Unit tests with Jest and React Testing Library, end-to-end tests with Playwright
- 🚦 **Gated releases** - Production deploys only after CI passes

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

- **Testing:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/), [Playwright](https://playwright.dev/) for e2e
- **Linting:** [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)

### Deployment & Analytics

- **Hosting:** [Vercel](https://vercel.com/), deployed by GitHub Actions after CI passes
- **Revalidation:** Firebase Cloud Functions refresh the site when Firestore content changes
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

To preview the layout with local seed content instead of Firestore:

```bash
USE_SEED_DATA=1 yarn dev
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
| `yarn test:e2e` | Run Playwright end-to-end tests (starts its own seeded dev server) |

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

## 🚢 Deployment

Every pull request and push to `main` runs lint, type check and unit tests in GitHub Actions.
On `main`, production deploys through a Vercel Deploy Hook only after those pass.

- [docs/deploy.md](docs/deploy.md) - CI and Vercel setup
- [docs/revalidation.md](docs/revalidation.md) - Cloud Functions that revalidate on content changes
- [docs/firestore-content.md](docs/firestore-content.md) - Firestore content schema

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
