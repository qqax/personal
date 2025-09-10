# Musician Portfolio

A multi-page musician portfolio site built with **Next.js**, showcasing musical projects, biography, and localized content.

Live demo: [piano‑nine‑nu.vercel.app](https://piano-nine-nu.vercel.app)

---

##  Overview

This Next.js application offers a professional and responsive portfolio for a musician, featuring:

- Multi-language support (English & Russian).
- Secure authentication (e.g. NextAuth).
- Dynamically generated `robots.txt`, sitemap, and Web App Manifest.
- Modular structure using **Drizzle ORM** for efficient data handling.
- Server-side middleware for authentication, localization, and internationalization (i18n).
- Optimized styling with Tailwind CSS and custom PostCSS configuration.

---

##  Features at a Glance

| Feature                        | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| **Multi-page navigation**      | Multiple sections/pages, such as Home, About, Discography, Contact, etc.    |
| **Localization (i18n)**        | Full multilingual support via `messages/en.json` and `messages/ru.json`.   |
| **Authentication**             | Secure login and routing powered by NextAuth and custom middleware.         |
| **SEO & PWA support**          | Includes `robots.ts`, `sitemap.ts`, and `site.webmanifest` files.           |
| **Organized file structure**   | Clear separation into `app`, `api`, `components`, `ui`, `lib`, and more.    |
| **Data layer with Drizzle**    | Type-safe ORM for performant data models and configuration.                 |

---

##  Project Structure

```bash
personal/
├── app
│ ├── actions/
│ ├── api/
│ ├── components/
│ ├── lib/
│ ├── ui/
│ ├── utils/
│ ├── loading.tsx
│ ├── [locale]/
│ ├── [...nextauth]/
│ ├── robots.ts
│ ├── sitemap.ts
│ ├── site.webmanifest
├── auth.config.ts
├── auth.ts
├── drizzle/
│ └── meta/
├── drizzle.config.ts
├── i18n/
│ ├── request.ts
│ └── routing.ts
├── messages/
│ ├── en.json
│ └── ru.json
├── middlewares/
│ ├── authHandler.ts
│ ├── chain.ts
│ └── withI18nMiddleware.ts
├── middleware.ts
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── public/
└── (static assets)
```
---

##  Getting Started

1. **Clone the repository**

   ```bash
   git clone git@github.com:qqax/personal.git
   cd personal
   ```
2. **Install dependencies**
   ```bash
   npm install
    # or
    yarn
   ```
3. **Run the development server**
   ```bash
    npm run dev
    # or
    yarn dev
   ```
4. **Build for production**
   ```bash
    npm run build
    # or
    yarn build
   ```
## Internationalization (i18n)

- Localized text stored in `messages/en.json` and `messages/ru.json`.
- Routing and request locale detection set up via `i18n/request.ts`, `i18n/routing.ts`, and middleware in `middlewares/`.
- Supports dynamic locale-based rendering and static generation.

## Authentication & Security (not implemented yet)
* Powered by NextAuth via `auth.ts` and configured via `auth.config.ts.`
* Middleware located in `middlewares/*` ensures protected routes and i18n integration.
* Handles user sessions and seamless locale-based authentication flows.

## Data Management (Drizzle)
* The database used is Postgres.
* The `app/actions/` folder contains `action.ts`, which defines the communication with the database using **DTOs** (Data Transfer Objects), described in `lib/definitions.ts/`.
* Schema and ORM settings are defined in `drizzle.config.ts` and under `drizzle/meta/`.
* Enables fast, type-safe queries and migrations in a Next.js context.

## Styling & Utilities
* Tailored UI using Tailwind CSS – configured in `tailwind.config.ts`.
* Custom PostCSS configuration via `postcss.config.mjs`.
* Reusable UI components in `components/` and `ui/` for maintainable design.
* Additional utilities and actions in `lib/`, `utils/`, and .

## License
This project is open-source and available under the MIT License.

## Author
Created and maintained by Alexander Kudryavtsev.