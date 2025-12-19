## ABN Broadcast Dashboard

A React + Vite dashboard for broadcast operations: rundown management, schedule views, studio clock, waveform, breaking news ticker, and an AI assistant.

### Local Development
- Prerequisites: Node 20+ and npm.
- Copy `.env.example` to `.env` and set `GEMINI_API_KEY` if you plan to use the AI assistant features.
- Install and run:

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000/`.

### Build

```bash
npm run build
npm run preview
```

### GitHub Setup & Pages Deployment
1. Create a new GitHub repository (public recommended), e.g. `abn-broadcast-dashboard`.
2. Initialize Git locally, add, commit, and push:

```bash
git init
git branch -M main
git remote add origin https://github.com/<your-username>/abn-broadcast-dashboard.git
git add .
git commit -m "Initial import"
git push -u origin main
```

3. GitHub Actions will build and deploy to GitHub Pages using `.github/workflows/deploy.yml`.
	- It auto-detects whether you're deploying a user/org root site (`<username>.github.io`) or a project site, and sets `BASE_PATH` accordingly (`/` vs `/<repo>/`).
	- Vite reads `BASE_PATH` and sets `base` via `vite.config.ts`.
	- Artifact is published from `dist/`.

4. In the repository Settings → Pages, ensure Source is set to "GitHub Actions" (it will be automatic on first deploy).

5. Your site will be available at: `https://<your-username>.github.io/abn-broadcast-dashboard/`.

#### User/Org page variant
No changes needed—the workflow detects `<username>.github.io` repositories and sets `BASE_PATH=/` automatically.

### Environment Variables
- `GEMINI_API_KEY`: used by `services/geminiService.ts`. Do not commit real keys.
- `BASE_PATH`: used by Vite to fix asset paths when hosted under a subpath (set by GitHub Actions for Pages).

### Project Structure
Key files and folders:
- `App.tsx`, `index.tsx`, `index.html`: app entry.
- `components/`: UI modules like `StudioClock.tsx`, `ScheduleItemRow.tsx`, `AIAssistantModal.tsx`.
- `services/geminiService.ts`: AI assistant integration (expects `GEMINI_API_KEY`).
- `vite.config.ts`: dev server, React plugin, alias, and Pages `base` config.

### Notes
- `.gitignore` excludes `.env*` files to protect secrets.
- For local testing of Pages base path, you can run `BASE_PATH=/abn-broadcast-dashboard npm run build` and serve `dist`.
- A `public/404.html` is included to support deep links on GitHub Pages.
 - Optional: add `public/CNAME` with your custom domain to configure Pages CNAME automatically.

#### Branch-based Pages (main/docs)
If you prefer Pages "Deploy from a branch" instead of Actions:

1. In repo Settings → Pages, set Source to "Branch", select `main` and folder `/(docs)`.
2. Build locally into `docs/` with the correct base path, then commit and push:

PowerShell (Windows):

```powershell
$env:OUT_DIR = 'docs'
$env:BASE_PATH = '/-Benjamin-Owusu-s-Angel-Broadcasting-ERP/'
npm run build
git add docs
git commit -m "Build site to docs"
git push
```

Notes:
- `vite.config.ts` respects `OUT_DIR` (defaults to `dist`) and `BASE_PATH`.
- Replace `/-Benjamin-Owusu-s-Angel-Broadcasting-ERP/` with your repo path if different.
