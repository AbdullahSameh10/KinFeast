# 🍽️ KinFeast

> **A modern recipe platform built around food, people, discovery, and community.**

KinFeast is a full-stack recipe platform designed to bring **home cooks, food lovers, chefs, and platform administrators** into one polished ecosystem.

The goal is bigger than simply storing recipes: KinFeast is being built as a place where people can **discover food, share their creations, follow chefs, interact with recipes, and where the platform team can understand and manage the community through meaningful analytics and moderation tools.**

This repository contains the frontend and backend of the KinFeast platform.

---

## ✨ Why KinFeast?

KinFeast is designed around a simple idea:

**Recipes are better when they are connected to people.**

Instead of treating a recipe as an isolated piece of content, KinFeast combines:

- 🍲 Recipe discovery
- 👨‍🍳 Chef profiles and creator activity
- ❤️ Likes and favorites
- 👥 Following and community relationships
- ⭐ Reviews
- 👀 Recipe view tracking
- 🧭 Categories and cuisines
- 🛡️ Recipe moderation
- 📊 Platform analytics
- 📣 Marketing attribution
- 🌍 English and Arabic localization
- 🌙 Light and dark themes
- 🔐 Authentication and role-based access

The result is a platform foundation that can grow from a recipe website into a **complete food community**.

---

# 🚀 Core Strengths

## 1. Full-stack architecture

KinFeast is not just a frontend prototype.

It has a dedicated React/TypeScript client and an Express/TypeScript API server backed by PostgreSQL.

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

## 2. Role-based platform design

KinFeast is designed around multiple user roles rather than treating everyone as the same type of account.

### 👤 Users

Regular users can be part of the food community and interact with recipes and chefs.

### 👨‍🍳 Chefs

Chefs are content creators who can build their presence around their recipes and audience.

### 🛡️ Administrators

Administrators have access to platform-management capabilities, including users, chefs, recipes, moderation, and analytics.

The backend enforces role permissions through authentication middleware instead of relying only on frontend navigation.

---

# 🍲 Recipe Ecosystem

KinFeast's backend already provides a foundation for a rich recipe ecosystem.

### Recipe capabilities

- Recipe creation and updates
- Recipe retrieval
- Recipe status management
- Recipe ownership checks
- Recipe categories
- Cuisines
- Ingredients
- Recipe ingredients
- Recipe media
- Favorites
- Likes
- Reviews
- Views
- Recipe moderation

Recipes can move through a moderation workflow before becoming publicly published.

### Recipe lifecycle

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

# 👨‍🍳 Chef & Community Features

KinFeast is designed to make chefs more than just recipe authors.

The platform includes backend support for:

- Chef accounts
- Chef discovery
- Following chefs
- Follower counts
- Published recipe counts
- Chef-focused administration
- Chef analytics
- Community relationships

This opens the door to a creator ecosystem where users can discover chefs whose cooking style they enjoy and continue following their work.

---

# ❤️ Social & Engagement Layer

KinFeast includes several mechanisms for turning recipe browsing into community interaction.

### Likes

Users can like recipes and the platform can track total likes.

### Favorites

Users can save recipes for later.

### Reviews

Recipes can receive reviews from authenticated users.

### Follows

Users can follow chefs and build a personalized relationship with creators.

### Views

Recipe views are recorded, allowing the platform to understand which content is attracting attention.

Together, these features create a foundation for a genuine **food community**, rather than a static recipe catalogue.

---

# 📊 Analytics & Business Intelligence

One of KinFeast's major strengths is that analytics are being treated as a first-class part of the product.

The administration analytics layer currently supports data such as:

- Total users
- Total chefs
- Total recipes
- Published recipes
- Pending recipes
- Rejected recipes
- Recipe views
- Recipe likes
- Reviews
- Platform activity over time
- Recipe status distribution
- Recipes by category
- Recipes by cuisine
- Top recipes
- Top chefs
- Chef follower counts
- Published recipe counts

The admin analytics dashboard uses interactive charts to make platform activity easier to understand.

This means KinFeast isn't only collecting content — it is building the infrastructure needed to **understand how the platform is being used**.

---

# 📣 Marketing Attribution

KinFeast also captures an important piece of product-growth information during registration:

> **"Where did you hear about us?"**

Marketing sources are stored in the backend and connected to user registrations through marketing attribution records.

This gives the platform the foundation to analyze:

- Which channels bring users to KinFeast
- How users discovered the platform
- Which acquisition sources are generating registrations
- Additional information supplied for an "Other" source

Marketing attribution can eventually be combined with user activity and retention analytics to build a much more complete picture of platform growth.

---

# 🛡️ Administration & Moderation

KinFeast includes a dedicated administration area rather than mixing platform-management functionality into the public website.

Current admin sections include:

- 📈 Dashboard
- 👤 Users
- 👨‍🍳 Chefs
- 🍲 Recipes
- 🛡️ Moderation
- 📊 Analytics

### Moderation

Administrators can review pending recipes and:

- Approve recipes
- Reject recipes
- Search the moderation queue
- Review recipe and chef information
- Track recipe statuses

This creates a clear separation between **content creation** and **content approval**.

---

# 🧭 Admin Dashboard

The admin dashboard provides a high-level overview of what is happening across KinFeast.

It includes information such as:

- User totals
- Chef totals
- Published recipes
- Pending recipes
- Platform activity
- Recipe status
- Recipe categories
- Pending recipe queue
- Recent users

The dashboard is designed as an operational control center rather than simply a collection of database tables.

---

# 🌍 Internationalization

KinFeast is being built with international users in mind.

The frontend currently supports:

- 🇬🇧 English
- 🇸🇦 Arabic

The localization architecture separates translations by language and feature, making it easier to expand the platform with additional languages.

Arabic support also considers **RTL layout behavior**, which is important for a polished Arabic experience rather than simply translating text.

The architecture is intentionally prepared for additional languages as KinFeast grows.

---

# 🌙 Light & Dark Mode

KinFeast supports theme switching between:

- ☀️ Light mode
- 🌙 Dark mode

Theme handling is centralized through a React context and hook structure, allowing the UI to remain consistent across the application.

---

# 📱 Responsive UI

The frontend is built with responsive layouts using Tailwind CSS.

The interface is designed to adapt across:

- Desktop
- Tablet
- Mobile

Navigation, dashboards, authentication screens, cards, panels, forms, and administrative interfaces are structured with responsive behavior in mind.

---

# 🎨 Design Philosophy

KinFeast aims for a visual language that feels:

- Warm
- Modern
- Food-focused
- Clean
- Approachable
- Professional

The UI uses a combination of:

- Tailwind CSS
- Lucide icons
- Responsive layouts
- Reusable components
- Consistent spacing
- Light/dark theme support
- RTL-aware layouts
- Interactive charts

The goal is to make the platform feel like a **real product**, not a generic CRUD application.

---

# 🏠 Public Experience

The current frontend foundation includes a homepage experience with sections such as:

### Hero section

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

# 🔐 Authentication & Security Foundation

KinFeast uses JWT-based authentication.

The backend includes:

- Registration
- Login
- Current-user authentication
- JWT verification
- Token expiration handling
- Role-based authorization
- Recipe ownership verification

Protected routes can require authentication, while sensitive administrative endpoints require the appropriate role.

For example:

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

The server also verifies recipe ownership before allowing protected recipe modifications.

---

# 🧱 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Development/build tooling |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Lucide React | Interface icons |
| React Icons | Additional iconography |
| Recharts | Analytics visualization |
| Axios | API communication |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express 5 | REST API |
| TypeScript | Type safety |
| PostgreSQL | Relational database |
| `pg` | PostgreSQL driver |
| JWT | Authentication |
| bcrypt | Password hashing |
| CORS | Cross-origin API access |
| dotenv | Environment configuration |
| tsx | Development execution |

---

# 🔌 API Architecture

The backend follows a modular REST API structure.

Main API areas include:

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

The backend is organized by domain rather than placing everything into one large controller or service.

This makes the codebase easier to maintain and gives future contributors a clear place to add functionality.

---

# 🧩 Modular Backend Design

KinFeast's server is divided into focused domains such as:

- Authentication
- Recipes
- Ingredients
- Recipe ingredients
- Recipe media
- Categories
- Cuisines
- Likes
- Favorites
- Reviews
- Views
- Follows
- Marketing
- Administration

Each domain can contain its own:

- Routes
- Controllers
- Services
- Types

This keeps business logic separated and makes the backend easier to extend.

---

# 🧪 Development

## Prerequisites

Make sure you have:

- Node.js
- npm/pnpm
- PostgreSQL

---

## Client

```bash
cd client
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

To run linting:

```bash
npm run lint
```

---

## Server

```bash
cd server
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

---

# ⚙️ Environment Variables

The server uses environment variables for configuration.

Typical configuration includes:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Never commit real secrets, database credentials, or production environment variables to GitHub.

---

# 🗄️ Database

KinFeast uses PostgreSQL as its relational data layer.

The database architecture is designed around relationships between:

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

This relational model makes it possible to build meaningful features on top of connected data rather than isolated records.

---

# 📈 Product Direction

KinFeast is intentionally being built as a platform, not just a recipe page.

The long-term product direction includes expanding the public experience around the same foundation already used by the dashboards and API.

Planned/expanding areas include:

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

These areas can be developed without replacing the existing architecture.

---

# 🏆 What Makes the Platform Different?

KinFeast's strength is not a single feature.

It is the combination of several systems working together:

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

**created → moderated → published → discovered → viewed → liked → favorited → reviewed → shared through a chef relationship → measured through analytics.**

That connected lifecycle is the foundation of KinFeast.

---

# 🛣️ Roadmap

KinFeast is actively evolving. The roadmap is organized around turning the current platform foundation into a complete consumer and creator experience.

### Phase 1 — Platform Foundation
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

### Phase 2 — Public Platform Experience
- [ ] Full Recipes page
- [ ] Recipe detail pages
- [ ] Public chef profiles
- [ ] Complete chef experience
- [ ] About page
- [ ] Contact page
- [ ] Expanded footer pages
- [ ] More complete discovery/search experience

### Phase 3 — Community & Growth
- [ ] More personalized discovery
- [ ] Advanced chef profiles
- [ ] Stronger social interactions
- [ ] Advanced marketing analytics
- [ ] More detailed user analytics
- [ ] Notifications
- [ ] Improved content discovery

### Phase 4 — Platform Expansion
- [ ] Additional languages
- [ ] Mobile-focused improvements
- [ ] More integrations
- [ ] Advanced recommendation systems
- [ ] Expanded creator tooling

---

# 🤝 Contributing

KinFeast is structured to make contribution easier as the platform grows.

When adding a feature:

1. Identify the relevant domain.
2. Keep business logic in the appropriate service.
3. Keep request/response handling in controllers.
4. Keep API routes focused.
5. Add or update types where necessary.
6. Keep frontend API calls separated from UI components.
7. Reuse shared UI patterns whenever possible.
8. Consider both English and Arabic experiences.
9. Consider both light and dark themes.
10. Protect sensitive operations with the appropriate authentication/role checks.

---

# 🔒 Security Notes

Security is an important part of the platform architecture.

KinFeast currently uses:

- Password hashing with bcrypt
- JWT authentication
- Token expiration validation
- Role-based authorization
- Recipe ownership validation
- Protected admin endpoints
- Environment-based secrets

Before production deployment, additional production-hardening should be applied, including appropriate rate limiting, security headers, validation strategy, logging/monitoring, secret management, and deployment-specific database protections.

---

# 📌 Project Status

**KinFeast is an actively developed full-stack recipe and food-community platform.**

The core platform foundation is already in place, including authentication, roles, recipe management infrastructure, social interactions, moderation, administration, analytics, marketing attribution, localization, and theming.

The public-facing product experience is continuing to expand on top of that foundation.

> **The architecture is being built for the platform KinFeast is becoming — not only the pages it has today.**

---

# ❤️ Built With Purpose

KinFeast is being developed with a focus on three things:

### 🍽️ Better food discovery

Make it easier for people to find recipes and cooking inspiration.

### 👨‍🍳 Better creator experiences

Give chefs and recipe creators a place to publish, build an audience, and grow.

### 📊 Better platform intelligence

Give the team the tools to understand content, users, engagement, moderation, and growth.

---

## ⭐ KinFeast

**Discover recipes. Follow chefs. Share food. Build a community.**

---

### License

This project is currently under active development. Licensing and contribution terms should be finalized before public distribution.
