# CVForge — Local Resume Builder

CVForge is a frontend-only Vue 3 resume workspace designed for simple Netlify deployment. It does not require a backend, database, login, API keys or environment variables.

## Final feature set

- First-visit welcome modal asks for the user's name and personalizes the dashboard.
- Multiple resumes stored locally in the browser with automatic saving.
- 14 templates: 7 ATS-friendly layouts and 7 creative layouts.
- English and Arabic resume display, plus local translation helpers already included in the project.
- Resume health guidance based on completeness, clarity and measurable outcomes.
- Local career-writing suggestions for summaries, skills and experience bullets.
- Professional tips and motivational guidance on the landing page and dashboard.
- Light and dark mode with the preference saved locally.
- A4 preview and browser PDF export/print flow.
- No ATS matching/checker, no account system, no cloud sync and no public resume links.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

## Production build

```bash
cd frontend
npm install
npm run build
```

The production output is created in `frontend/dist`.

## Deploy to Netlify

This repository already contains a root `netlify.toml` configured for the Vue/Vite frontend.

1. Upload the project to GitHub/GitLab or drag the project into a Netlify-connected repository.
2. Netlify reads `netlify.toml` automatically.
3. Build command: `npm run build`
4. Base directory: `frontend`
5. Publish directory: `dist`

No environment variables are required.

The `frontend/public/_redirects` file and `netlify.toml` both ensure Vue routes such as `/dashboard`, `/templates` and `/builder/...` resolve correctly after refresh.

## Local storage

The browser stores the user's display name, resumes and theme preference in local storage. Clearing browser/site data removes those items. They do not sync between devices or browsers.
