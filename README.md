# Klarna Sparkle Shop

Next.js + TypeScript storefront with Sanity CMS, shadcn/ui, Tailwind CSS, and TanStack Query. Includes an embedded Sanity Studio at `/studio` and a simple service checkout flow.

## Quick Start

Prerequisites:
- Node.js 18+ and npm

Setup:
```bash
git clone <YOUR_REPO_URL>
cd demo-shop
npm install

# Environment (copy the provided example or create manually)
cp env.local .env.local # if you have one checked in locally
# Or create .env.local with:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
# NEXT_PUBLIC_SANITY_DATASET=production

npm run dev
```

- App: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

## Scripts

- `npm run dev`: Start the Next.js dev server
- `npm run build`: Create a production build
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run type-check`: TypeScript type check

## Sanity CMS

This project uses Sanity for content. The Studio is mounted at `/studio` and reads project settings from `sanity.config.ts`.

Get started:
1. Create a project at `https://sanity.io`
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`
3. Visit `http://localhost:3000/studio`

See `SANITY_SETUP.md` for a step-by-step guide and available content types (Hero, Services, Features, About, Site Settings). The site renders with fallback content if Sanity is empty.

## Tech Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS, shadcn/ui (Radix UI primitives)
- TanStack Query
- Sanity, `next-sanity`
- Lucide icons, Recharts, date-fns

## Project Structure (high level)

- `app/`: Next.js app router
  - `components/`: UI and layout components
  - `lib/`: utilities and Sanity client/queries
  - `studio/`: embedded Sanity Studio at `/studio`
- `sanity/schemas/`: Sanity content schemas

## Deployment

Recommended: Vercel
1. Push the repo to GitHub/GitLab/Bitbucket
2. Import the project into Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (e.g. `production`)
4. Deploy

The Studio can be deployed alongside the app at `/studio`. For public access, ensure your Sanity CORS settings allow your deployed domain.

## Notes

- The checkout flow UI is present; integrate your payment provider as needed
- Content is optional; fallback content is used when Sanity is empty
- Type safety: run `npm run type-check` before commits
