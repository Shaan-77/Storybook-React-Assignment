# Storybook React Project

This project is a **React + TypeScript** application scaffolded with **Vite** and integrated with **Storybook** for UI component development, testing, and documentation.

---
2. Folder Structure 
Storybook-React/ 
├── .gitignore 
├── eslint.config.js 
├── index.html 
├── package-lock.json 
├── package.json 
├── README.md 
├── tsconfig.app.json 
├── tsconfig.json 
├── tsconfig.node.json 
├── vite.config.ts 
├── vitest.config.ts 
├── vitest.shims.d.ts 
│ 
├── .storybook/ 
│   ├── main.ts 
│   ├── preview.ts 
│   └── vitest.setup.ts 
│ 
├── public/ 
│   └── vite.svg 
│ 
├── src/ 
│   ├── App.tsx 
│   ├── index.css 
│   ├── main.tsx 
│   │ 
│   ├── assets/ 
│   │   └── react.svg 
│   │ 
│   ├── Components/ 
│   │   ├── DataTable/ 
│   
│   │   ├── DataTable.tsx 
│   │   │   └── DataTable.test.tsx 
│   │   └── InputField/ 
│   │       ├── InputField.tsx 
│   │       └── InputField.test.tsx 
│   │ 
│   ├── SampleData/ 
│   │   └── Data.ts 
│   │ 
│   └── stories/ 
│       ├── assets/ 
│       ├── Button.tsx 
│       ├── Button.stories.ts 
│       ├── Configure.mdx 
│       ├── DataTable.stories.tsx 
│       ├── Header.tsx 
│       ├── Header.stories.ts 
│       ├── InputField.stories.tsx 
│       ├── Page.tsx 
│       ├── Page.stories.ts 
│       └── *.css 
│ 
└── storybook-static/ 
├── assets/ 
├── sb-addons/ 
├── sb-common-assets/ 
├── sb-manager/ 
├── iframe.html 
├── index.html 
└── project.json
## 🚀 Features

- ⚡ **Vite** for fast builds and HMR (Hot Module Replacement)  
- 📚 **Storybook** for isolated component development and visual testing  
- 🧪 **Vitest** for unit and integration testing  
- 🎨 **Reusable UI Components** (DataTable, InputField, Button, Header, etc.)  
- 📂 Organized folder structure for scalability and maintainability  

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [<repo-url>]
   cd Storybook-React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Access the app at: [http://localhost:5173](http://localhost:5173)

4. **Run Storybook**
   ```bash
   npm run storybook
   ```
   Access Storybook at: [http://localhost:6006](http://localhost:6006)

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

7. **Run tests**
   ```bash
   npm run test
   ```

---

## 📂 Project Structure

- **`.storybook/`** → Storybook configuration files  
- **`src/Components/`** → Core reusable UI components  
- **`src/stories/`** → Storybook stories (documentation & demo for components)  
- **`src/SampleData/`** → Mock/sample dataset for demo and testing  
- **`storybook-static/`** → Pre-built static Storybook distribution  

---

## 🛠️ Scripts

| Command              | Description                               |
|----------------------|-------------------------------------------|
| `npm run dev`        | Start Vite dev server                     |
| `npm run build`      | Build production-ready React app          |
| `npm run preview`    | Preview production build                  |
| `npm run storybook`  | Start Storybook in development mode       |
| `npm run build-storybook` | Build Storybook as static site       |
| `npm run test`       | Run unit tests with Vitest                |

---

## 📜 License

This project is licensed under the **MIT License**.
