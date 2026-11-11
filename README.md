# Rishi Jha — Personal Portfolio

A fast, lightweight, and responsive developer portfolio website built strictly with vanilla **HTML5**, modern **CSS**, and **Vanilla JavaScript** — zero build tools, zero dependencies, and no frameworks.

---

## 🎨 Visual Identity
- **Palette:** Warm cream/off-white (`#F6F5EF`), pure white cards (`#FFFFFF`), near-black typography (`#111111`), fresh lime accent (`#B7E86B`), and a cinematic dark contact section (`#0B0D0C`).
- **Typography:** *Plus Jakarta Sans*, *Inter*, *Newsreader* (editorial italics), *JetBrains Mono*, and *Caveat* (handwritten notes).
- **Interactions:** Desktop pointer micro-parallax (capped at 8px), CSS keyframe ambient glow, floating dots, and vanilla `IntersectionObserver` scroll reveals.
- **BorderGlow:** Pure CSS and JavaScript proximity-based edge glow effect on key cards and CTAs.

---

## 📁 File Structure

```text
/
├── index.html
├── css/
│   ├── style.css
│   └── animations.css
│
├── js/
│   ├── main.js
│   ├── animations.js
│   └── interactions.js
│
├── assets/
│   ├── images/
│   │   ├── rishi-portfolio.png
│   │   ├── campushub-preview.jpg
│   │   ├── dormiq-preview.jpg
│   │   ├── apiproxy-preview.jpg
│   │   ├── about-builder.jpg
│   │   └── contact-bg.jpg
│   └── icons/
│
└── README.md
```

---

## 🚀 Running the Project

### Option 1: Direct File Opening
Double-click `index.html` in your file manager or open it directly in any browser:
```text
file:///path/to/index.html
```

### Option 2: Simple Local Static Server
Run a zero-dependency static server with Python:
```bash
python3 -m http.server 4321
```
Then visit `http://localhost:4321`.
