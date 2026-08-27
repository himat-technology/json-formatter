# 🚀 HiMat JSON Formatter & Validator

<div align="center">

![HiMat Banner](https://img.shields.io/badge/HiMat-Free%20Developer%20Tools-0074c7?style=for-the-badge&logo=codeforces&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-himat.tech-0c93e7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://himat.tech/free-tools/json-formatter)
[![GitHub Repository](https://img.shields.io/badge/GitHub-himat--technology-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/himat-technology)

[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Browser--Local-emerald?style=flat-badge&logo=shieldcheck)](https://himat.tech/free-tools/json-formatter)
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=flat-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-1.6-76E2EA?style=flat-badge&logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-badge)](LICENSE)

<p align="center">
  <b>A production-grade, 100% offline-first JSON Formatter, Validator, Minifier, Key Sorter & Auto-Repair application.</b>
  <br />
  <i>Process JSON instantly in your browser with zero server uploads, complete privacy, and a modern developer-tool UI.</i>
</p>

[🌐 Live Application](https://himat.tech/free-tools/json-formatter) • [📖 Key Features](#-key-features) • [⚡ Quick Start](#-quick-start) • [🛡️ Privacy Architecture](#%EF%B8%8F-privacy-architecture) • [🌐 Official Socials](#-official-community--socials)

---

</div>

## 🌟 Key Features

* **⚡ Real-Time JSON Formatting & Beautification**: Instantly format JSON with flexible indentation options (2 Spaces, 4 Spaces, or Tab).
* **🔍 Syntax Validation & Humanized Errors**: Live syntax checking with exact line & column numbers and human-readable error descriptions.
* **🪄 Smart Auto-Repair Engine**: Client-side repair for non-standard JSON:
  * Single-quoted strings (`{'key': 'val'}` → `{"key": "val"}`)
  * Unquoted object keys (`{name: "John"}` → `{"name": "John"}`)
  * Trailing commas (`{"a": 1,}` → `{"a": 1}`)
  * JavaScript comments (`//` and `/* */` removed safely)
  * Python & JS literals (`True`, `False`, `None` → `true`, `false`, `null`)
  * Truncated missing closing brackets/braces (`{"a": 1` → `{"a": 1}`)
* **⚡ One-Click Minification**: Collapse all unnecessary whitespace for production payload optimization.
* **🔤 Recursive Object Key Sorting**: Alphabetically sort object keys recursively across all nested levels while strictly preserving array item order.
* **🌳 Interactive Searchable Tree View**: Deep tree view navigation with expandable/collapsible nodes, type color coding, Expand All / Collapse All controls, and real-time key/value search filter.
* **📊 Real-Time Metrics**: Live statistics calculation for payload size (UTF-8 byte length & KB/MB formatting), total node count, total object key count, and max nesting depth.
* **📂 Drag & Drop Uploads**: Drag `.json` or `.txt` files directly into the workspace or pick files locally via `FileReader`.
* **📋 Clipboard & Download**: One-click copy formatted JSON to clipboard with toast feedback or download directly as `formatted.json`.
* **🔒 100% Client-Side Privacy**: Zero server calls, zero external loggers, zero telemetry.

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Core** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) | Modern functional components with strict type checking |
| **Build Tool** | [Vite 5](https://vitejs.dev/) | Lightning fast HMR & optimized production bundler |
| **Styling & Icons** | [Tailwind CSS 3](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/) | Clean developer aesthetic with custom theme tokens |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) | High performance unit & integration test runner |
| **Code Quality** | ESLint + Prettier | Enforced linting and code formatting rules |

---

## 📂 Repository Structure

```text
json-formatter/
├── public/
│   └── favicon.svg              # Tool favicon icon
├── src/
│   ├── components/              # Clean React component architecture
│   │   ├── Header.tsx           # Navigation bar & HiMat branding
│   │   ├── Breadcrumb.tsx       # Breadcrumb navigation path
│   │   ├── Hero.tsx             # Main hero header & privacy pill
│   │   ├── ToolToolbar.tsx      # Main toolbar (Format, Repair, Minify, Sort, etc.)
│   │   ├── JsonEditor.tsx       # Raw input editor panel
│   │   ├── JsonOutput.tsx       # Formatted code view & tree view wrapper
│   │   ├── JsonTree.tsx         # Interactive tree view container & search
│   │   ├── JsonTreeNode.tsx     # Recursive tree node renderer
│   │   ├── Statistics.tsx       # Real-time metrics grid
│   │   ├── DropZone.tsx         # Drag-and-drop file overlay
│   │   ├── ErrorMessage.tsx     # Line/column error reporting alert
│   │   ├── Toast.tsx            # Floating toast notification
│   │   ├── HowToUse.tsx         # Step-by-step usage guide section
│   │   ├── Features.tsx         # Feature highlight cards section
│   │   ├── FAQ.tsx              # Interactive FAQ accordion
│   │   └── Footer.tsx           # HiMat footer & copyright
│   ├── hooks/                   # Custom React hooks
│   │   ├── useJsonFormatter.ts  # Core editor state & algorithm hook
│   │   ├── useClipboard.ts      # Clipboard operations hook
│   │   └── useLocalFile.ts      # FileReader drag-and-drop hook
│   ├── lib/                     # Pure JS/TS core processing engines
│   │   ├── jsonFormatter.ts    # Formatting & minification algorithms
│   │   ├── jsonValidator.ts    # JSON validator & line/col position parser
│   │   ├── jsonRepair.ts       # Non-standard JSON auto-repair engine
│   │   ├── jsonSorter.ts       # Recursive object key sorter
│   │   ├── jsonStats.ts        # Byte size, node count & depth engine
│   │   └── download.ts         # Browser Blob downloader
│   ├── types/
│   │   └── json.ts             # TypeScript type declarations
│   ├── data/
│   │   └── sampleJson.ts       # Default sample JSON payload
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Tailwind CSS directives & global styling
├── tests/                       # Vitest test suite
│   ├── setup.ts                 # Testing library setup
│   ├── jsonFormatter.test.ts   # Formatter & validator unit tests
│   ├── jsonRepair.test.ts      # Auto-repair unit tests
│   ├── jsonSorter.test.ts       # Key sorting unit tests
│   ├── jsonStats.test.ts        # Statistics engine unit tests
│   └── integration.test.tsx    # User workflow integration tests
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── prettier.config.js
└── README.md
```

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/himat-technology/json-formatter.git
cd json-formatter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🧪 Testing & Verification

Run the full Vitest suite (unit & integration tests):

```bash
npm run test
```

Run ESLint code quality check:

```bash
npm run lint
```

Build production distribution bundle:

```bash
npm run build
npm run preview
```

---

## 🛡️ Privacy Architecture

Privacy is guaranteed by design:
* **Zero Remote Processing**: All JSON data remains exclusively inside client-side browser memory (`RAM`).
* **No File Uploads**: Drag-and-drop and file pickers read data locally using the standard browser [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) API.
* **No Remote File Saving**: File downloads generate in-memory [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) URLs using `URL.createObjectURL()`.
* **Offline Compatible**: Works completely offline after initial asset loading.

---

## 🌐 Official Community & Socials

Connect with **HiMat Technology** across our official channels:

| Platform | Direct Link |
| :--- | :--- |
| 🌐 **Live Website & Tools** | [himat.tech/free-tools/json-formatter](https://himat.tech/free-tools/json-formatter) |
| 💻 **GitHub** | [github.com/himat-technology](https://github.com/himat-technology) |
| 💼 **LinkedIn** | [linkedin.com/company/himat-technology](https://www.linkedin.com/company/himat-technology) |
| 📘 **Facebook** | [facebook.com/Himat-technology](https://www.facebook.com/people/Himat-technology/61593829197445/) |
| 📸 **Instagram** | [instagram.com/himat_technologies](https://www.instagram.com/himat_technologies/) |

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

Developed with ❤️ by **[HiMat Technology](https://himat.tech)**.
