# Gurumella Durga Lalitha Priyanka - Personal Portfolio

A professional, high-performance personal portfolio website for **Gurumella Durga Lalitha Priyanka** (B.Tech Information Technology, 2024–2028, MVGR College of Engineering).

Designed with a **dark luxury aesthetic** with refined gold accents, an elegant cream hero section, huge condensed headings, and fluid GSAP animations.

---

## 🌟 Tech Stack & Features

- **Pure Static Stack**: HTML5, CSS3, modern Vanilla JavaScript (no framework, no build step, zero dependencies required to run).
- **Animation Engine**: [GSAP 3](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/) loaded via CDN.
- **Typography**: 
  - `Anton` for big condensed uppercase headlines.
  - `Manrope` for sleek, legible body text.
  - `Caveat (600)` for handwritten greetings and authentic script notes.
- **Design Tokens**:
  - Cream Hero: `#efe8da`
  - Near-Black Body: `#0d0c0a`
  - Dark Surface: `#14120f`
  - Panel Surface: `#1d1a15`
  - Gold Accent: `#c9a96e`
  - Muted Text: `#a49b8a`
  - Thin Lines: `#2f2a22`
- **Animations & Interactive Features**:
  1. **Scroll Progress Bar**: Sleek gold progress indicator pinned at the very top of the viewport.
  2. **Curtain Preloader**: 0 to 100 gold counter followed by a handwritten "Hey, welcome!" greeting reveal, concluding with the black curtain sliding upward.
  3. **Hero Letter Stagger**: "PRIYANKA" letters rise in one by one.
  4. **Liquid Hover Distortion**: Interactive SVG `feTurbulence` + `feDisplacementMap` filter creating a fluid melting wave on the hero title that settles smoothly on mouse leave.
  5. **Currently Learning Ticker**: Cycling banner transitioning through *Data Structures and Algorithms*, *Machine Learning*, *Full Stack Development*, and *IoT*.
  6. **Interactive 3D Photo & Floating Glass Chips**: 
     - Fixed 3:4 frame in full color with `object-fit: cover` and `object-position: center top` to perfectly frame the portrait.
     - Smooth 3D tilt with LERP physics (`requestAnimationFrame`), dynamic specular reflection, and radial gold backlight.
     - 3 floating glass chips (*CGPA 9.66*, *Data Science*, *Full Stack*) with multi-depth parallax floating in front of the portrait.
     - Gentle idle float animation on touch devices and graceful reduced-motion support.
  7. **Strictly Factual Numerical Counters**: Animated counters for verified metrics: CGPA `9.66`, Featured Projects `3`, and Certifications dynamically counted from the page list.
  8. **Custom Cursor**: Interactive cursor dot & trailing difference ring that scales over interactive elements (hidden on touch devices).
  9. **Rotating Badge**: SVG textPath badge continuously rotating reading `OPEN TO INTERNSHIPS • 2026`.
  10. **Infinite Marquee**: Gold continuous scrolling strip showcasing technical proficiencies.
  11. **Expertise Accordion**: Expanding rows with gold hover shifts and accessibility states.
  12. **Project Card Glow & 3D Tilt**: Interactive cursor-following gold border glow and subtle 3D hover response.
  13. **Factual Coding Profiles**: Clean LeetCode and CodeChef cards with exact course completion and current practice status (no invented stats).
  14. **Instant Search & Category Filter**: Live search box and category filter tabs for all certifications across Cloud, AI and Data, Programming, and Other.
  15. **One-Tap Clipboard Copy & Toast**: Quick copy buttons for phone number and email with an animated toast notification.
  16. **Floating Back-to-Top**: Appears after scrolling 400px with smooth return to top.

---

## 🚀 How to Deploy to GitHub Pages

Deploying this portfolio to GitHub Pages takes less than 2 minutes and requires zero build tools.

### Option A: Using Git Command Line (Recommended)

1. Open your terminal in this project folder:
   ```bash
   cd "C:\Users\priya\OneDrive\Documents\priyanka\Desktop\Portfolio"
   ```

2. Initialize Git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal portfolio for Priyanka Gurumella"
   ```

3. Create a new public repository on GitHub named `portfolio` (or `priyankagurumella.github.io` for a user site):
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: `portfolio` (or `priyankagurumella.github.io`)
   - Keep it Public
   - Do **not** initialize with a README (you already have this one)

4. Link the repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/priyankagurumella/portfolio.git
   git push -u origin main
   ```

5. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Click **Settings** (top right tab).
   - In the left sidebar, click **Pages** (under "Code and automation").
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.

Within 1–2 minutes, your website will be live at:
```
https://priyankagurumella.github.io/portfolio/
```
*(Or `https://priyankagurumella.github.io/` if using the username repository format)*

---

### Option B: Upload Directly via GitHub Web Interface

1. Go to [https://github.com/new](https://github.com/new) and create a new repository named `portfolio`.
2. On the new repository page, click **uploading an existing file**.
3. Drag and drop all the files from this folder (`index.html`, `style.css`, `script.js`, `photo.jpg`, `README.md`).
4. Commit the changes.
5. Go to **Settings > Pages > Branch**, select `main` / `root`, and click **Save**.

---

## 📝 Placeholder Updates & Customization

All placeholders in the code are cleanly marked with `TODO` comments. You can search for `TODO` in `index.html` to update:

1. **Project Code & Demo Links**:
   - `ForensicAI`: Update the GitHub link and demo URL (currently pointing to your GitHub profile).
   - `Civic Problem Reporter`: Live app link is set to `https://ai-community-problem-reporter.onrender.com`.
   - `IoT Project`: Update the title, description, and repository once hardware schematics are finalized.
2. **Competitive Programming Profiles**:
   - Update LeetCode and CodeChef profile URLs with your direct account links.

---

## 📂 Project Structure

```
Portfolio/
├── index.html        # Complete semantic HTML structure, search, & SVG definitions
├── style.css         # Responsive styling, luxury tokens, 3D photo, & animations
├── script.js         # GSAP animations, LERP photo tilt, search filters, & logic
├── photo.jpg         # Profile photograph (full color, 3:4 framing)
└── README.md         # Deployment & documentation guide
```

---

## 📄 License & Attribution

Designed and developed for **Gurumella Durga Lalitha Priyanka**.  
© 2026 Gurumella Durga Lalitha Priyanka. All rights reserved.
