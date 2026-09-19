# Project map

Read this first. It describes the architecture so you don't need to scan the whole repo.
Keep it updated when structure changes.

## What this is

Portfolio site for Studio Emma Cochet (interior architect, Paris). Domain: studioemmacochet.com.
Bilingual: French (`/fr/`) and English (`/en/`). Content is edited by a non-technical owner via the
GitHub web UI (see `GUIDE_POUR_EMMA.md`, written in French).

## Stack and hard constraints

- Next.js 16.2 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, i18next + react-i18next.
- **Next.js here differs from older versions.** Docs are in `node_modules/next/dist/docs/` (see AGENTS.md).
- **Static export** (`output: "export"`, `trailingSlash: true` in `next.config.ts`). Therefore:
  no middleware/proxy, no `redirects()`, no server actions, no runtime `headers()/cookies()`.
  Every dynamic route needs `generateStaticParams` + `dynamicParams = false`.
- Images: custom loader (`image-loader.ts`) serves pre-generated WebP variants
  (`name@640|750|828|1080|1200|1920.webp`). `scripts/optimize-images.mjs` creates them from
  jpg/jpeg/png in `public/` (runs on `npm run dev` and `prebuild`). Generated `.webp` files are build output.
- Deploy: `.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages
  (`public/CNAME`, `public/.nojekyll` must stay).
- Contact form posts client-side to Web3Forms (no backend).

## Commands

- `npm run dev` (optimizes images, then dev server) · `npm run build` (static export to `out/`) · `npm run lint`

## Routing / i18n architecture

- **No shared root layout.** There is no `app/layout.tsx`. `app/fr/layout.tsx` and `app/en/layout.tsx`
  are each a root layout (own `<html lang>`), both delegating to `components/locale-layout.tsx`, which wraps
  children in `components/i18n-provider.tsx` (client `I18nextProvider`).
- `/` is handled by `app/(root)/page.tsx`, which `redirect("/fr/")` (static export emits a meta-refresh page). It has its own minimal `app/(root)/layout.tsx` because there is no shared root layout. Change the default language there.
- Route segments are translated per locale; project/furniture item slugs are identical in both:

| Section   | fr URL              | en URL               |
|-----------|---------------------|----------------------|
| home      | `/fr`               | `/en`                |
| projects  | `/fr/projects[/slug]` | `/en/projects[/slug]` |
| furniture | `/fr/mobilier[/slug]` | `/en/furniture[/slug]` |
| about     | `/fr/a-propos`      | `/en/about`          |
| contact   | `/fr/contact`       | `/en/contact`        |

- The section-slug table and helpers (`sectionPath`, `switchLocalePath`, `localeFromPathname`, `isLocale`)
  live in `lib/i18n/config.ts`. **Adding a section or language = update that file first**, then add route folders.
- `app/fr/**/page.tsx` and `app/en/**/page.tsx` are thin wrappers: they render a shared component from
  `components/pages/*` with a `lang` prop (detail pages also `generateStaticParams` and pass `slug`).
  Real page logic lives in `components/pages/`, not in `app/`.
- Translation strings: `lib/i18n/locales/{fr,en}.json` (French is the fallback language).
  - Server components: `getT(lang)` from `lib/i18n/index.ts` (fresh i18next instance, sync).
  - Client components: `useTranslation()` from react-i18next (provider set in the locale layout).
- Metadata per locale: `lib/i18n/metadata.ts` (`getRootMetadata`), used by both locale layouts.
- Language dropdown: `LanguageSwitcher` inside `components/site-shell.tsx`; navigates with `switchLocalePath`.
  Switching languages crosses root layouts, so it is a full page load.

## Content model (data-driven, edited by owner)

- Projects: `src/projects/<slug>/data.json` + photos in `public/projects/<slug>/`.
  Fields: `title, description, images[], location?, year?`. First image = cover.
- Furniture: `src/furniture/<slug>/data.json` + photos in `public/furniture/<slug>/`.
  Fields: `title, description, images[], produit, year?`.
- Folder names in `src/...` and `public/...` must match; image file names must match `images[]` exactly.
- English text: optional `translations.en` block in each `data.json` (`title/description/location` for projects,
  `title/description/produit` for furniture). Missing fields fall back to French.
- Ordering: `src/config/projects-order.ts`, `src/config/furniture-order.ts` (unlisted slugs go last, alphabetical).
- Homepage slideshow: hand-curated in `src/config/homepage-slideshow.ts` (`alt` in French,
  optional `altTranslations.en`).
- Other config: `src/config/contact.ts` (email/phone/socials), `src/config/site.ts` (`siteUrl`).
- Loaders (read JSON from disk at build time, take a `lang`): `lib/projects.ts`, `lib/furniture.ts`,
  `lib/homepage-slideshow.ts`; `lib/sort-by-order.ts` is the ordering helper.

## File tree (annotated)

```
app/
  fr/ , en/                 locale roots: layout.tsx + page routes (thin wrappers)
    page.tsx                home
    a-propos/ | about/      about
    contact/
    projects/ , projects/[slug]/
    mobilier/ | furniture/ , .../[slug]/
  globals.css               Tailwind import + CSS variables (theme colors, Helvetica font stack)
  sitemap.ts, robots.ts     static; sitemap lists every route for both locales
  favicon.ico, icon.png, apple-icon.png   generated from brand/icon-master.png (ico = 16/32/48, icon = 512, apple = 180)
  (root)/                   `/` redirect to /fr (page.tsx + minimal layout.tsx)
components/
  site-shell.tsx            header/nav/mobile menu/footer + LanguageSwitcher (client)
  locale-layout.tsx         <html lang> + <body> + I18nProvider
  i18n-provider.tsx         client i18next provider
  entry-grid.tsx            card grid for projects/furniture lists
  image-carousel.tsx        hero/card carousel (client)
  image-slideshow.tsx       homepage auto-advancing slideshow (client)
  pages/                    shared page implementations (home, about, contact, projects, project-detail,
                            furniture, furniture-detail); all take `lang` except contact (uses hook)
lib/
  i18n/                     config.ts, index.ts, metadata.ts, locales/{fr,en}.json
  projects.ts, furniture.ts, homepage-slideshow.ts, sort-by-order.ts
src/
  config/                   ordering, slideshow, contact, site URL
  projects/<slug>/data.json
  furniture/<slug>/data.json
public/                     static assets, photos (+ generated @width.webp), CNAME
scripts/optimize-images.mjs
brand/icon-master.png       1024x1024 favicon source (not served); regenerate the app/ icons from it with sharp
image-loader.ts             custom next/image loader
next.config.ts
GUIDE_POUR_EMMA.md          owner-facing content guide (French)
```

## Common tasks

- **Add a project/furniture item:** create `src/<kind>/<slug>/data.json` and photos in `public/<kind>/<slug>/`;
  optionally add to the order file, `translations.en`, and the slideshow config. No code change needed.
- **Add/change UI text:** edit both `lib/i18n/locales/fr.json` and `en.json` (same keys).
- **Add a page:** add a shared component in `components/pages/`, a `SectionKey` + slugs in `lib/i18n/config.ts`,
  a nav entry in `components/site-shell.tsx` (`sections` array), route folders in both `app/fr` and `app/en`,
  and the section in `app/sitemap.ts`.
- **Add a language:** extend `locales`/`sectionSlugs`/`localeNames` in `lib/i18n/config.ts`, add
  `lib/i18n/locales/<lang>.json` and register it in `lib/i18n/index.ts` + `components/i18n-provider.tsx` path
  (via `resources`), create `app/<lang>/` with layout + routes, update `app/(root)/page.tsx` if it should become the default.

## Gotchas

- Styling is Tailwind utility classes inline; theme tokens are CSS variables in `app/globals.css`.
- Uppercase/mono small-caps look is the site's design language; keep it consistent.
- Unprefixed / pre-i18n URLs (`/projects/x`, `/about`, `/mobilier`...) are handled by `scripts/404.html` (spa-github-pages trick): GitHub Pages serves it for unknown paths and it redirects to the locale-prefixed URL (browser language, fr default). `scripts/install-404.mjs` (npm `postbuild`) copies it over Next's generated `out/404.html`. Keep its slug table in sync with `lib/i18n/config.ts`.
