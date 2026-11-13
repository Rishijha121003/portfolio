# Rishi Jha — Developer Portfolio & RISHI OS

An interactive developer portfolio and browser-based desktop operating system built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **CSS Modules**.

Designed and engineered with a dual-experience architecture: a modern editorial web portfolio paired with **RISHI OS** — a Unix-inspired virtual desktop environment with window management, virtual filesystem, and an interactive terminal.

---

## ⚡ Dual Experience Architecture

### 1. Modern Web Portfolio
- **Cinematic Dark Theme**: Custom cyber-slate palette (`#071426`, `#0B0E14`) with glassmorphic cards and crisp typography (*Barlow Condensed*, *Inter*, *JetBrains Mono*).
- **Interactive Particle Canvas**: Real-time interactive point-cloud hero canvas.
- **Project Case Studies**: Comprehensive breakdowns for:
  - **DormiQ** *(formerly SmartHostel AI)*: Modern hostel room allocation, resident dossiers, and administrative dashboard.
  - **LifeOS**: Personal productivity system with deterministic daily planning (React 18, TypeScript, FastAPI, SQLAlchemy 2.0, PostgreSQL/SQLite).
  - **AssignFlow**: Assignment management and automated submission tracker.
  - **Finora**: Personal finance & multi-period cash flow monitor.
- **Skills & Journey Ledgers**: Structured technical competencies, engineering journey milestones, and direct contact channels.

### 2. RISHI OS (Desktop Environment)
- **Bidirectional Boot Transition**: Smooth 800ms boot sequence featuring the official RJ monogram with midnight blue glowing stages.
- **Window Management System**: Multi-window environment with drag, resize, maximize/restore, minimize, and z-index active window focus.
- **Virtual File System (VFS)**: Hierarchical directory tree (`/home/rishi`) with dedicated inspectors for text, markdown, project dossiers, and desktop shortcuts (`Resume.md`).
- **Interactive Terminal Shell**:
  - `resume`: Formatted developer CV summary and contact shortcuts.
  - `cmatrix`: Real-time streaming green cyber digital rain canvas.
  - `sudo hire`: Recruiter easter egg automatically launching the Contact composer.
  - `theme <name>`: Live on-the-fly desktop wallpaper switcher (`minimal-grid`, `deep-space`, `sage-aurora`, etc.).
  - `neofetch`, `ls -la`, `cat`, `pwd`, `tree`, `whoami`, `help`, `history`.
- **Top System Panel & Dock**: Real-time system clock, workspace switcher, application launcher, and battery/network indicators.

---

## 🛠️ Tech Stack & Tooling

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | Native CSS Modules + Custom Design Tokens + Glassmorphism |
| **Identity & Branding** | Custom Vector Monograms (`RJ` Standalone & Orbit Crests) |
| **Architecture** | 100% Static Pre-rendering (SSG, 17/17 routes pre-rendered) |
| **Linting & Quality** | ESLint 9 + TypeScript Compiler (`tsc --noEmit`) |

---

## 📁 Repository Structure

```text
.
├── public/                     # Static media, custom RJ SVG icons, and imagery
│   ├── images/                 # Optimized project previews and brand assets
│   ├── favicon.ico
│   └── icon.svg                # Official RJ monogram favicon
├── src/
│   ├── app/                    # Next.js App Router static pages
│   │   ├── about/              # Editorial bio & background
│   │   ├── contact/            # Direct contact composer
│   │   ├── journey/            # Timeline & milestones
│   │   ├── projects/           # Projects showcase & [slug] case studies
│   │   ├── skills/             # Technical competencies manifest
│   │   ├── icon.svg            # Dynamic metadata icon route
│   │   ├── layout.tsx          # Root shell layout & fonts
│   │   └── page.tsx            # Main landing view
│   ├── components/
│   │   ├── home/               # Hero, particle portrait, and sections
│   │   ├── layout/             # TopEdgeBar, AppShell, Footer, Nav
│   │   ├── os/                 # RISHI OS Window Manager, Dock, & VFS
│   │   │   ├── apps/           # Terminal, FileManager, Projects, Contact
│   │   │   ├── DesktopContext  # Window manager & OS state provider
│   │   │   └── OsBootTransition# Bidirectional boot overlay
│   │   ├── portfolio/          # Case studies & skill grids
│   │   └── ui/                 # Reusable buttons, monograms, badges
│   ├── data/                   # Structured portfolio content & virtual filesystem
│   │   ├── content/            # Verified project records & technical details
│   │   └── rishiOs.ts          # VFS tree, OS shortcuts, wallpapers, and shell commands
│   └── types/                  # Strict TypeScript contracts & schemas
├── next.config.ts              # Next.js build & Turbopack configuration
├── tsconfig.json               # TypeScript compiler config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Installation
```bash
git clone https://github.com/Rishijha121003/portfolio.git
cd portfolio
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## 👨‍💻 Author

**Rishi Jha**  
- **GitHub**: [@Rishijha121003](https://github.com/Rishijha121003)  
- **Role**: Software Developer (Python, TypeScript, FastAPI, Next.js, PostgreSQL)
