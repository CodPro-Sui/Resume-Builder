# KaynatResume

A React + Vite resume builder with 10 distinct, professionally designed templates, live editing, photo upload, and PNG/PDF export.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**).

## Build for production

```bash
npm run build
npm run preview
```

## What's inside

- `src/App.jsx` — app state (resume data, template, accent color) and layout
- `src/components/FormPanel.jsx` — the editable form (left panel)
- `src/components/ResumeDoc.jsx` — the 10 template layouts (right panel preview)
- `src/components/ResumeParts.jsx` — shared pieces (contact line, skills, experience list)
- `src/data/constants.js` — starter/sample data, template list, accent color palette
- `src/utils/download.js` — PNG/PDF export using `html2canvas` + `jspdf`
- `src/index.css` — all app UI styling + all 10 resume template styles

## Notes

- All resume data is auto-saved to `localStorage` as you type (clears with the "Clear everything" button).
- Photo upload accepts images up to 4MB, stored as a data URL (no backend needed).
- Export renders the on-screen resume at 3x scale for crisp print quality.

live on : https://kaynat.onrender.com
