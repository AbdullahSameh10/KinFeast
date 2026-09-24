<p align="center">
  <img src="https://kinfeast.vercel.app/logo.png" alt="Status" />
</p>

### *A modern recipe platform built around food, people, discovery, and community.*

<p align="center">
  <img src="https://img.shields.io/badge/Status-Actively%20Developed-orange?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/License-TBD-lightgrey?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/English-🇬🇧-blue?style=for-the-badge" alt="English" />
  <img src="https://img.shields.io/badge/العربية-🇸🇦-green?style=for-the-badge" alt="Arabic" />
  <img src="https://img.shields.io/badge/Light_Mode-☀️-yellow?style=for-the-badge" alt="Light Mode" />
  <img src="https://img.shields.io/badge/Dark_Mode-🌙-darkblue?style=for-the-badge" alt="Dark Mode" />
</p>

---

**KinFeast** is a full-stack recipe platform designed to bring **home cooks, food lovers, chefs, and platform administrators** into one polished ecosystem.

The goal is bigger than simply storing recipes: KinFeast is being built as a place where people can **discover food, share their creations, follow chefs, interact with recipes, and where the platform team can understand and manage the community through meaningful analytics and moderation tools.**

> **This repository contains the frontend and backend of the KinFeast platform.**

---

## 📖 Table of Contents

- [✨ Why KinFeast?](#-why-kinfeast)
- [🚀 Core Strengths](#-core-strengths)
- [🍲 Recipe Ecosystem](#-recipe-ecosystem)
- [👨‍🍳 Chef & Community Features](#-chef--community-features)
- [❤️ Social & Engagement Layer](#️-social--engagement-layer)
- [📊 Analytics & Business Intelligence](#-analytics--business-intelligence)
- [📣 Marketing Attribution](#-marketing-attribution)
- [🛡️ Administration & Moderation](#️-administration--moderation)
- [🧭 Admin Dashboard](#-admin-dashboard)
- [🌍 Internationalization](#-internationalization)
- [🌙 Light & Dark Mode](#-light--dark-mode)
- [📱 Responsive UI](#-responsive-ui)
- [🎨 Design Philosophy](#-design-philosophy)
- [🏠 Public Experience](#-public-experience)
- [🔐 Authentication & Security Foundation](#-authentication--security-foundation)
- [🧱 Technology Stack](#-technology-stack)
- [🔌 API Architecture](#-api-architecture)
- [🧩 Modular Backend Design](#-modular-backend-design)
- [🧪 Development](#-development)
- [⚙️ Environment Variables](#️-environment-variables)
- [🗄️ Database](#️-database)
- [📈 Product Direction](#-product-direction)
- [🏆 What Makes the Platform Different?](#-what-makes-the-platform-different)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [🔒 Security Notes](#-security-notes)
- [📌 Project Status](#-project-status)
- [❤️ Built With Purpose](#️-built-with-purpose)

---

## ✨ Why KinFeast?

KinFeast is designed around a simple idea:

> **Recipes are better when they are connected to people.**

Instead of treating a recipe as an isolated piece of content, KinFeast combines:

| Feature | Description |
|---------|-------------|
| 🍲 **Recipe Discovery** | Find recipes that inspire you |
| 👨‍🍳 **Chef Profiles** | Follow creators and their culinary journeys |
| ❤️ **Likes & Favorites** | Save and react to recipes you love |
| 👥 **Following & Community** | Build relationships with chefs |
| ⭐ **Reviews** | Share your experience with recipes |
| 👀 **View Tracking** | Understand what's trending |
| 🧭 **Categories & Cuisines** | Explore by food type and origin |
| 🛡️ **Recipe Moderation** | Keep content quality high |
| 📊 **Platform Analytics** | Understand community growth |
| 📣 **Marketing Attribution** | Track how users discover us |
| 🌍 **English & Arabic** | Serve a global audience |
| 🌙 **Light & Dark Themes** | Comfortable viewing anytime |
| 🔐 **Auth & Role-Based Access** | Secure, permission-aware platform |

The result is a platform foundation that can grow from a recipe website into a **complete food community**.

---

## 🚀 Core Strengths

### 1. Full-Stack Architecture

KinFeast is not just a frontend prototype. It has a dedicated React/TypeScript client and an Express/TypeScript API server backed by PostgreSQL.

```text
KinFeast
├── Client
│   ├── React
│   ├── TypeScript
│   ├── Vite
│   ├── React Router
│   ├── Tailwind CSS
│   └── Recharts
│
└── Server
    ├── Node.js
    ├── Express
    ├── TypeScript
    ├── PostgreSQL
    ├── JWT Authentication
    └── REST API
```

This separation keeps the application maintainable and gives KinFeast a strong foundation for future mobile apps, additional clients, integrations, and services.

---

### 2. Role-Based Platform Design

KinFeast is designed around multiple user roles rather than treating everyone as the same type of account.

<p align="center">
  <img src="https://img.shields.io/badge/👤_Users-Community_Members-blue?style=for-the-badge" alt="Users" />
  <img src="https://img.shields.io/badge/👨‍🍳_Chefs-Content_Creators-orange?style=for-the-badge" alt="Chefs" />
  <img src="https://img.shields.io/badge/🛡️_Admins-Platform_Managers-red?style=for-the-badge" alt="Admins" />
</p>

| Role | Capabilities |
|------|-------------|
| 👤 **Users** | Be part of the food community, interact with recipes and chefs |
| 👨‍🍳 **Chefs** | Build presence around recipes and audience |
| 🛡️ **Administrators** | Manage users, chefs, recipes, moderation, and analytics |

> The backend enforces role permissions through authentication middleware instead of relying only on frontend navigation.

---

## 🍲 Recipe Ecosystem

KinFeast's backend provides a foundation for a rich recipe ecosystem.

### Recipe Capabilities

- ✅ Recipe creation and updates
- ✅ Recipe retrieval
- ✅ Recipe status management
- ✅ Recipe ownership checks
- ✅ Recipe categories
- ✅ Cuisines
- ✅ Ingredients
- ✅ Recipe ingredients
- ✅ Recipe media
- ✅ Favorites
- ✅ Likes
- ✅ Reviews
- ✅ Views
- ✅ Recipe moderation

### Recipe Lifecycle

```text
Chef/User submits recipe
          │
          ▼
       Pending
          │
     ┌────┴────┐
     ▼         ▼
 Approved    Rejected
     │
     ▼
 Published
```

This creates a safer foundation for a community-driven recipe platform where published content can be reviewed before appearing publicly.

---

## 👨‍🍳 Chef & Community Features

KinFeast is designed to make chefs more than just recipe authors.

The platform includes backend support for:

- 🧑‍🍳 Chef accounts
- 🔍 Chef discovery
- 👥 Following chefs
- 📊 Follower counts
- 📝 Published recipe counts
- 🛠️ Chef-focused administration
- 📈 Chef analytics
- 🤝 Community relationships

This opens the door to a creator ecosystem where users can discover chefs whose cooking style they enjoy and continue following their work.

---

## ❤️ Social & Engagement Layer

KinFeast includes several mechanisms for turning recipe browsing into community interaction.

| Feature | Description |
|---------|-------------|
| ❤️ **Likes** | Users can like recipes; platform tracks total likes |
| ⭐ **Favorites** | Users can save recipes for later |
| 📝 **Reviews** | Recipes can receive reviews from authenticated users |
| 👥 **Follows** | Users can follow chefs for a personalized relationship |
| 👀 **Views** | Recipe views are recorded to understand attention |

Together, these features create a foundation for a genuine **food community**, rather than a static recipe catalogue.

---

## 📊 Analytics & Business Intelligence

One of KinFeast's major strengths is that analytics are being treated as a first-class part of the product.

### Admin Analytics Support

| Metric | Description |
|--------|-------------|
| 👤 Total Users | Platform user count |
| 👨‍🍳 Total Chefs | Chef account count |
| 🍲 Total Recipes | All recipes |
| ✅ Published Recipes | Approved and live |
| ⏳ Pending Recipes | Awaiting moderation |
| ❌ Rejected Recipes | Not approved |
| 👀 Recipe Views | Engagement metric |
| ❤️ Recipe Likes | Popularity signal |
| ⭐ Reviews | Community feedback |
| 📈 Platform Activity | Over time trends |
| 📊 Recipe Status Distribution | Breakdown by status |
| 🧭 Recipes by Category | Category insights |
| 🌍 Recipes by Cuisine | Cuisine insights |
| 🏆 Top Recipes | Most popular |
| 👨‍🍳 Top Chefs | Most followed |
| 📊 Chef Follower Counts | Audience size |
| 📝 Published Recipe Counts | Creator output |

> The admin analytics dashboard uses interactive charts to make platform activity easier to understand.

This means KinFeast isn't only collecting content — it is building the infrastructure needed to **understand how the platform is being used**.

---

## 📣 Marketing Attribution

KinFeast captures an important piece of product-growth information during registration:

> **"Where did you hear about us?"**

Marketing sources are stored in the backend and connected to user registrations through marketing attribution records.

This gives the platform the foundation to analyze:

- 📊 Which channels bring users to KinFeast
- 🔍 How users discovered the platform
- 📈 Which acquisition sources are generating registrations
- 📝 Additional information supplied for an "Other" source

> Marketing attribution can eventually be combined with user activity and retention analytics to build a much more complete picture of platform growth.

---

## 🛡️ Administration & Moderation

KinFeast includes a dedicated administration area rather than mixing platform-management functionality into the public website.

### Admin Sections

| Section | Purpose |
|---------|---------|
| 📈 Dashboard | High-level platform overview |
| 👤 Users | User management |
| 👨‍🍳 Chefs | Chef management |
| 🍲 Recipes | Recipe management |
| 🛡️ Moderation | Content approval workflow |
| 📊 Analytics | Deep-dive data insights |

### Moderation Capabilities

Administrators can review pending recipes and:

- ✅ Approve recipes
- ❌ Reject recipes
- 🔍 Search the moderation queue
- 📋 Review recipe and chef information
- 📊 Track recipe statuses

> This creates a clear separation between **content creation** and **content approval**.

---

## 🧭 Admin Dashboard

The admin dashboard provides a high-level overview of what is happening across KinFeast.

### Dashboard Includes

- 👤 User totals
- 👨‍🍳 Chef totals
- ✅ Published recipes
- ⏳ Pending recipes
- 📈 Platform activity
- 📊 Recipe status
- 🧭 Recipe categories
- 📋 Pending recipe queue
- 👥 Recent users

> The dashboard is designed as an operational control center rather than simply a collection of database tables.

---

## 🌍 Internationalization

KinFeast is being built with international users in mind.

<p align="center">
  <img src="https://img.shields.io/badge/English-🇬🇧-0052CC?style=for-the-badge" alt="English" />
  <img src="https://img.shields.io/badge/Arabic-🇸🇦-006C35?style=for-the-badge" alt="Arabic" />
</p>

The frontend currently supports:

- 🇬🇧 **English**
- 🇸🇦 **Arabic**

The localization architecture separates translations by language and feature, making it easier to expand the platform with additional languages.

> Arabic support also considers **RTL layout behavior**, which is important for a polished Arabic experience rather than simply translating text.

The architecture is intentionally prepared for additional languages as KinFeast grows.

---

## 🌙 Light & Dark Mode

KinFeast supports theme switching between:

<p align="center">
  <img src="https://img.shields.io/badge/☀️_Light_Mode-Available-yellow?style=for-the-badge" alt="Light Mode" />
  <img src="https://img.shields.io/badge/🌙_Dark_Mode-Available-darkblue?style=for-the-badge" alt="Dark Mode" />
</p>

Theme handling is centralized through a React context and hook structure, allowing the UI to remain consistent across the application.

---

## 📱 Responsive UI

The frontend is built with responsive layouts using Tailwind CSS.

### Designed For

| Device | Optimized |
|--------|-----------|
| 🖥️ Desktop | ✅ |
| 📱 Tablet | ✅ |
| 📱 Mobile | ✅ |

Navigation, dashboards, authentication screens, cards, panels, forms, and administrative interfaces are structured with responsive behavior in mind.

---

## 🎨 Design Philosophy

KinFeast aims for a visual language that feels:

<p align="center">
  <img src="https://img.shields.io/badge/🔥_Warm-FF6B6B?style=for-the-badge" alt="Warm" />
  <img src="https://img.shields.io/badge/✨_Modern-4ECDC4?style=for-the-badge" alt="Modern" />
  <img src="https://img.shields.io/badge/🍽️_Food--Focused-FFE66D?style=for-the-badge" alt="Food-Focused" />
  <img src="https://img.shields.io/badge/🧹_Clean-1A535C?style=for-the-badge" alt="Clean" />
  <img src="https://img.shields.io/badge/👋_Approachable-FF6B6B?style=for-the-badge" alt="Approachable" />
  <img src="https://img.shields.io/badge/💼_Professional-292F36?style=for-the-badge" alt="Professional" />
</p>

The UI uses a combination of:

- 🎨 Tailwind CSS
- 🎯 Lucide Icons
- 📱 Responsive Layouts
- 🧩 Reusable Components
- 📏 Consistent Spacing
- 🌗 Light/Dark Theme Support
- 🌍 RTL-Aware Layouts
- 📊 Interactive Charts

> The goal is to make the platform feel like a **real product**, not a generic CRUD application.

---

## 🏠 Public Experience

The current frontend foundation includes a homepage experience with sections such as:

### Hero Section
Introduces KinFeast and its value proposition.

### Categories
Helps users discover recipes through food categories.

### Cook With What You Have
A recipe-discovery concept centered around ingredients the user already has.

### Trending Recipes
Highlights popular recipe content.

### Who We Are
Introduces the platform and its community-oriented identity.

### Footer
Provides navigation, language selection, newsletter UI, and legal/accessibility links.

---

## 🔐 Authentication & Security Foundation

KinFeast uses JWT-based authentication.

### Backend Includes

- ✅ Registration
- ✅ Login
- ✅ Current-user authentication
- ✅ JWT verification
- ✅ Token expiration handling
- ✅ Role-based authorization
- ✅ Recipe ownership verification

Protected routes can require authentication, while sensitive administrative endpoints require the appropriate role.

```text
Authentication
      │
      ▼
 JWT verification
      │
      ▼
 User identity + role
      │
 ┌────┼───────────┐
 ▼    ▼           ▼
User Chef       Admin
```

> The server also verifies recipe ownership before allowing protected recipe modifications.

---

## 🧱 Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| ⚛️ React 19 | UI framework |
| 📘 TypeScript | Type safety |
| ⚡ Vite | Development/build tooling |
| 🧭 React Router | Client-side routing |
| 🎨 Tailwind CSS | Styling |
| 🎯 Lucide React | Interface icons |
| 🖼️ React Icons | Additional iconography |
| 📊 Recharts | Analytics visualization |
| 📡 Axios | API communication |

### Backend

| Technology | Purpose |
|------------|---------|
| 🟢 Node.js | Server runtime |
| 🚂 Express 5 | REST API |
| 📘 TypeScript | Type safety |
| 🐘 PostgreSQL | Relational database |
| 🔌 `pg` | PostgreSQL driver |
| 🔐 JWT | Authentication |
| 🔒 bcrypt | Password hashing |
| 🌐 CORS | Cross-origin API access |
| 🔧 dotenv | Environment configuration |
| ⚡ tsx | Development execution |

---

## 🔌 API Architecture

The backend follows a modular REST API structure.

### Main API Areas

```text
/api/health
/api/auth
/api/recipes
/api/admin
/api/favorites
/api/users/:id/follow
/api/recipes/:id/like
/api/recipes/:id/reviews
/api/ingredients
/api/recipe-ingredients
/api/recipe-media
/api/recipes/:id/views
/api/cuisines
/api/recipe-categories
/api/marketing
```

> The backend is organized by domain rather than placing everything into one large controller or service.

This makes the codebase easier to maintain and gives future contributors a clear place to add functionality.

---

## 🧩 Modular Backend Design

KinFeast's server is divided into focused domains such as:

<p align="center">
  <img src="https://img.shields.io/badge/🔐_Auth-4A90D9?style=flat-square" alt="Auth" />
  <img src="https://img.shields.io/badge/🍲_Recipes-FF6B6B?style=flat-square" alt="Recipes" />
  <img src="https://img.shields.io/badge/🥕_Ingredients-4ECDC4?style=flat-square" alt="Ingredients" />
  <img src="https://img.shields.io/badge/📦_Recipe_Ingredients-FFE66D?style=flat-square" alt="Recipe Ingredients" />
  <img src="https://img.shields.io/badge/🖼️_Recipe_Media-1A535C?style=flat-square" alt="Recipe Media" />
  <img src="https://img.shields.io/badge/🧭_Categories-FF6B6B?style=flat-square" alt="Categories" />
  <img src="https://img.shields.io/badge/🌍_Cuisines-4ECDC4?style=flat-square" alt="Cuisines" />
  <img src="https://img.shields.io/badge/❤️_Likes-FF6B6B?style=flat-square" alt="Likes" />
  <img src="https://img.shields.io/badge/⭐_Favorites-FFE66D?style=flat-square" alt="Favorites" />
  <img src="https://img.shields.io/badge/📝_Reviews-1A535C?style=flat-square" alt="Reviews" />
  <img src="https://img.shields.io/badge/👀_Views-4A90D9?style=flat-square" alt="Views" />
  <img src="https://img.shields.io/badge/👥_Follows-4ECDC4?style=flat-square" alt="Follows" />
  <img src="https://img.shields.io/badge/📣_Marketing-FF6B6B?style=flat-square" alt="Marketing" />
  <img src="https://img.shields.io/badge/🛡️_Admin-1A535C?style=flat-square" alt="Admin" />
</p>

Each domain can contain its own:

- 🛣️ Routes
- 🎮 Controllers
- ⚙️ Services
- 📘 Types

> This keeps business logic separated and makes the backend easier to extend.

---

## 🧪 Development

### Prerequisites

Make sure you have:

- 🟢 Node.js
- 📦 npm/pnpm
- 🐘 PostgreSQL

---

### Client

```bash
cd client
npm install
npm run dev
```

**For a production build:**

```bash
npm run build
```

**To run linting:**

```bash
npm run lint
```

---

### Server

```bash
cd server
npm install
npm run dev
```

**For a production build:**

```bash
npm run build
npm start
```

---

## ⚙️ Environment Variables

The server uses environment variables for configuration.

### Typical Configuration

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_jwt_secret
```

> ⚠️ **Never commit real secrets, database credentials, or production environment variables to GitHub.**

---

## 🗄️ Database

KinFeast uses PostgreSQL as its relational data layer.

### Database Architecture

```text
Users
  │
  ├── Recipes
  │     ├── Categories
  │     ├── Cuisines
  │     ├── Ingredients
  │     ├── Media
  │     ├── Likes
  │     ├── Favorites
  │     ├── Reviews
  │     └── Views
  │
  ├── Follows
  │
  └── Marketing Attribution
```

> This relational model makes it possible to build meaningful features on top of connected data rather than isolated records.

---

## 📈 Product Direction

KinFeast is intentionally being built as a platform, not just a recipe page.

### Planned/Expanding Areas

- 📖 Dedicated Recipes discovery experience
- 👨‍🍳 Public Chef profiles
- ℹ️ About KinFeast
- 📬 Contact experience
- 🔎 Rich recipe discovery and filtering
- 🧾 Recipe detail experiences
- 🧑‍🍳 Expanded chef tools
- 📊 More advanced analytics
- 📣 Deeper marketing analysis
- 💬 Stronger community interactions
- 📱 Continued mobile optimization
- 🌍 Additional languages
- 🔗 Complete footer/legal navigation
- 🛒 Future product and food-related integrations

> These areas can be developed without replacing the existing architecture.

---

## 🏆 What Makes the Platform Different?

KinFeast's strength is not a single feature. It is the combination of several systems working together:

```text
                    ┌──────────────┐
                    │   KinFeast   │
                    └──────┬───────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
       ▼                   ▼                   ▼
   Discovery           Community          Management
       │                   │                   │
   Recipes              Likes              Admin
   Categories           Reviews            Moderation
   Cuisines             Favorites          Analytics
   Ingredients          Follows            Marketing
       │                   │                   │
       └───────────────────┼───────────────────┘
                           ▼
                    Connected Platform
```

A recipe can be:

> **created → moderated → published → discovered → viewed → liked → favorited → reviewed → shared through a chef relationship → measured through analytics.**

> That connected lifecycle is the foundation of KinFeast.

---

## 🛣️ Roadmap

KinFeast is actively evolving. The roadmap is organized around turning the current platform foundation into a complete consumer and creator experience.

### Phase 1 — Platform Foundation ✅

- [x] React + TypeScript frontend
- [x] Express + TypeScript backend
- [x] PostgreSQL integration
- [x] Authentication
- [x] Role-based authorization
- [x] Recipe backend
- [x] Recipe moderation
- [x] Admin dashboard
- [x] Admin analytics
- [x] Marketing attribution
- [x] Likes
- [x] Favorites
- [x] Reviews
- [x] Follows
- [x] Views
- [x] Categories
- [x] Cuisines
- [x] Ingredients
- [x] Recipe media
- [x] English/Arabic localization
- [x] RTL support foundation
- [x] Light/dark themes

### Phase 2 — Public Platform Experience 🚧

- [ ] Full Recipes page
- [ ] Recipe detail pages
- [ ] Public chef profiles
- [ ] Complete chef experience
- [ ] About page
- [ ] Contact page
- [ ] Expanded footer pages
- [ ] More complete discovery/search experience

### Phase 3 — Community & Growth 📋

- [ ] More personalized discovery
- [ ] Advanced chef profiles
- [ ] Stronger social interactions
- [ ] Advanced marketing analytics
- [ ] More detailed user analytics
- [ ] Notifications
- [ ] Improved content discovery

### Phase 4 — Platform Expansion 🔮

- [ ] Additional languages
- [ ] Mobile-focused improvements
- [ ] More integrations
- [ ] Advanced recommendation systems
- [ ] Expanded creator tooling

---

## 🤝 Contributing

KinFeast is structured to make contribution easier as the platform grows.

### When Adding a Feature

1. 🎯 Identify the relevant domain.
2. ⚙️ Keep business logic in the appropriate service.
3. 🎮 Keep request/response handling in controllers.
4. 🛣️ Keep API routes focused.
5. 📘 Add or update types where necessary.
6. 🔌 Keep frontend API calls separated from UI components.
7. 🧩 Reuse shared UI patterns whenever possible.
8. 🌍 Consider both English and Arabic experiences.
9. 🌙 Consider both light and dark themes.
10. 🔐 Protect sensitive operations with the appropriate authentication/role checks.

---

## 🔒 Security Notes

Security is an important part of the platform architecture.

### KinFeast Currently Uses

- 🔒 Password hashing with bcrypt
- 🔐 JWT authentication
- ⏰ Token expiration validation
- 🛡️ Role-based authorization
- ✅ Recipe ownership validation
- 🚪 Protected admin endpoints
- 🔧 Environment-based secrets

> ⚠️ **Before production deployment**, additional production-hardening should be applied, including appropriate rate limiting, security headers, validation strategy, logging/monitoring, secret management, and deployment-specific database protections.

---

## 📌 Project Status

**KinFeast is an actively developed full-stack recipe and food-community platform.**

The core platform foundation is already in place, including authentication, roles, recipe management infrastructure, social interactions, moderation, administration, analytics, marketing attribution, localization, and theming.

> The public-facing product experience is continuing to expand on top of that foundation.

> **The architecture is being built for the platform KinFeast is becoming — not only the pages it has today.**

---

## ❤️ Built With Purpose

KinFeast is being developed with a focus on three things:

### 🍽️ Better Food Discovery
Make it easier for people to find recipes and cooking inspiration.

### 👨‍🍳 Better Creator Experiences
Give chefs and recipe creators a place to publish, build an audience, and grow.

### 📊 Better Platform Intelligence
Give the team the tools to understand content, users, engagement, moderation, and growth.

---

<p align="center">
  <strong>⭐ KinFeast</strong>
</p>

<p align="center">
  <em>Discover recipes. Follow chefs. Share food. Build a community.</em>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-❤️_&_🍳-red?style=for-the-badge" alt="Made with love and food" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🍽️_KinFeast-2025-FF6B6B?style=for-the-badge" alt="KinFeast 2025" />
</p>

---

### License

This project is currently under active development. Licensing and contribution terms should be finalized before public distribution.

---

<p align="center">
  <a href="#-kinfeast">⬆️ Back to Top</a>
</p>