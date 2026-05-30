# SyraSalon Website

This is a Vite + React + Tailwind website for SyraSalon.

## Local setup

```bash
npm install
npm run dev
```

Then open the local URL printed in your terminal.

## Build for hosting

```bash
npm run build
```

The production files will be generated in the `dist/` folder.

## Upload to InfinityFree or similar hosting

1. Run `npm run build`.
2. Open the `dist/` folder.
3. Upload the **contents** of `dist/` into your hosting `htdocs/` folder.
4. Make sure `index.html` is directly inside `htdocs/`.

Correct hosting structure:

```text
htdocs/
  index.html
  assets/
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial SyraSalon website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/syrasalon-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Edit salon details

Open `src/App.jsx` and edit the `SALON`, `services`, and `priceMenu` sections.
