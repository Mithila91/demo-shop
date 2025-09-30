# Sanity CMS Setup Guide

## Quick Setup

### 1. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Note your Project ID

### 2. Set Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Access the Studio

Once your environment variables are set up, you can access the Sanity Studio at:
`http://localhost:3000/studio`

## Content Types Available

### Hero Section
- Main title and subtitle
- Description text
- Badge with icon
- Primary and secondary buttons

### Services
- Service title and description
- Price and duration
- Features list
- Popular badge
- Display order

### Features
- Feature title and subtitle
- Icon (Lucide icon name)
- Display order

### About Section
- Section title and description
- Benefits with icons
- Promise box with guarantees

### Site Settings
- Site title and description
- Contact information
- Social media links
- CTA section content

## How to Use

1. **Start the development server**: `npm run dev`
2. **Visit the studio**: Go to `http://localhost:3000/studio`
3. **Add content**: Create documents for each content type
4. **See changes**: Your website will automatically use the content from Sanity

## Fallback Content

If no Sanity content is available, the website will use fallback content to ensure it always works.

## Icons

Use Lucide icon names (lowercase) for icons:
- `clock`, `shield`, `award`, `users`
- `computer`, `zap`, `phone`, `mail`
- `checkCircle`, `star`, `arrowLeft`

## Notes

- The app works without Sanity content (fallback data)
- All content is optional - you can start with just one content type
- Changes in Sanity appear immediately on the website
- The studio is only accessible during development
