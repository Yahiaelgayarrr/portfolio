# Portfolio

A fast, dark-themed personal portfolio website. All content lives in one
file so it's easy to update — no build tools, no frameworks, no installs.

## ✏️ How to edit your portfolio

Open **`js/data.js`** and change the text. That's the only file you need.

- **Change your name, tagline, roles** → top of `data.js`
- **Add a project** → copy a `{ ... }` block inside `projects` and edit it
- **Add a skill / job / degree / award** → add an item to the matching list
- **Change the color theme** → edit the `accent` value (e.g. `"#7c5cff"`)
- **Add your resume** → drop `resume.pdf` in the `assets/` folder

Save the file and refresh your browser to see the changes.

## 👀 Preview it locally

Just open `index.html` in your browser. (Or run a tiny local server for
best results:)

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Publish it for free (GitHub Pages)

1. Push this repo to GitHub.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick your branch and the `/ (root)` folder, then **Save**.
5. Your site goes live at `https://<your-username>.github.io/portfolio/`.

## 📁 Structure

```
index.html      Page structure (rarely needs editing)
css/styles.css  All styling and animations
js/data.js      👈 YOUR CONTENT — edit this
js/main.js      Renders your data + runs the animations
assets/         Put your resume.pdf and images here
```
