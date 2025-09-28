# Storybook React Project

This project is a **React + TypeScript** application scaffolded with **Vite** and integrated with **Storybook** for UI component development, testing, and documentation.

---

## 🚀 Features

- ⚡ **Vite** for fast builds and HMR (Hot Module Replacement)  
- 📚 **Storybook** for isolated component development and visual testing  
- 🧪 **Vitest** for unit and integration testing  
- 🎨 **Reusable UI Components** (DataTable, InputField, Button, Header, etc.)  
- 📂 Organized folder structure for scalability and maintainability  

---
# 📘 Architecture & Approach Documentation

## 1. Architecture Overview

This project is structured as a **Component-Driven Development (CDD)** environment using **React, TypeScript, Vite, Storybook, and Vitest**.  
The key architectural principles followed are:

- **Encapsulation** → Each component is self-contained with its logic, styles, and tests.  
- **Documentation-First** → Components are documented in Storybook before integration.  
- **Testability** → Unit and integration tests are colocated with components.  
- **Scalability** → The folder structure supports growth in features without creating monolithic files.  
- **Developer Experience (DX)** → Tooling choices (Vite, Storybook, TypeScript) optimize speed, safety, and collaboration.

---

## 2. Component Organization & Design Philosophy

### 🔹 Folder Structure Decisions
- **`src/Components/`**  
  - Each component (`DataTable`, `InputField`) has:  
    - `ComponentName.tsx` → Implementation  
    - `ComponentName.test.tsx` → Unit tests  
  - Benefits:  
    - Maintains **high cohesion** (logic + tests in one place).  
    - Reduces friction for onboarding new developers.  
    - Encourages a **design system mindset** (reusable, modular components).

- **`src/stories/`**  
  - Contains **Storybook stories** (`.stories.tsx`) for all reusable components.  
  - MDX documentation (`Configure.mdx`) is used for onboarding and customization guides.  
  - Provides **visual regression checks** during development.

- **`src/SampleData/`**  
  - Stores mock datasets (`Data.ts`) to simulate real-world usage.  
  - Keeps components **decoupled from APIs or databases** during development.  
  - Enables faster prototyping and testing.

---

## 3. Tooling Justification

### ⚡ Vite
- Chosen over CRA/Webpack for **lightning-fast hot reloads** and **smaller bundle sizes**.  
- Native **TypeScript support** avoids additional build complexity.  
- **Preview mode** simulates production, ensuring reliable testing.

### 📚 Storybook
- Acts as a **living component library**:  
  - Developers, designers, and testers can validate UI in isolation.  
  - Non-technical stakeholders can interact with components without running the app.  
- Enhances collaboration between **engineering and design teams**.  
- Builds `storybook-static/` for deployment in CI/CD pipelines.

### 🧪 Vitest
- Provides a **Jest-compatible API** but optimized for **Vite’s ESM pipeline**.  
- Fast execution, parallelized testing, and built-in TypeScript support.  
- Integrated with Storybook to validate components in both **isolation and integration** contexts.

### 🎨 Styling
- Component-specific `.css` files maintain **modularity**.  
- Storybook styles (`button.css`, `header.css`, `page.css`) ensure **visual consistency** across stories.  
- Encourages future adoption of **CSS-in-JS** or **utility-first frameworks** (e.g., Tailwind) without restructuring.

---

## 4. Development Workflow

1. **Design & Documentation First**
   - Create a new component folder in `src/Components/`.  
   - Define its Storybook story (`src/stories/Component.stories.tsx`).  
   - Use mock data from `SampleData/` if needed.  

2. **Implementation**
   - Build the component logic in `.tsx`.  
   - Add styles in a colocated `.css` file or styled-components (future-proof).  

3. **Testing**
   - Write unit tests in `Component.test.tsx`.  
   - Use `vitest.setup.ts` for common testing utilities.  
   - Run `npm run test` for continuous validation.  

4. **Integration**
   - Import the component into `App.tsx` only after it is stable in Storybook.  
   - This ensures **UI correctness before business logic coupling**.

5. **Build & Deployment**
   - Build React app with `npm run build`.  
   - Build Storybook documentation with `npm run build-storybook`.  
   - Deploy both outputs (`dist/` and `storybook-static/`) independently or combined into CI/CD pipelines.  

---

## 5. Testing Strategy

- **Unit Tests**: Validate isolated component behavior (`DataTable.test.tsx`, `InputField.test.tsx`).  
- **Integration Tests**: Ensure components interact correctly within `App.tsx`.  
- **Visual Testing** (via Storybook): Detect UI regressions across themes and states.  
- **Mocking Strategy**: `SampleData/Data.ts` avoids dependencies on live APIs.  

This layered testing approach ensures **robustness, maintainability, and confidence in deployment**.

---

## 6. Scalability Considerations

- **Component Library** → Current structure scales into a **design system** (e.g., adding `Button/`, `Modal/`, `Form/`).  
- **Storybook Documentation** → Evolves into a **single source of truth** for the UI.  
- **Theming Support** → `preview.ts` allows global decorators and theme providers.  
- **CI/CD Ready** → Prebuilt `storybook-static/` can be hosted on platforms like Netlify, Vercel, or integrated into pipelines.  

---

## 7. Benefits of This Approach

- 🧑‍🤝‍🧑 **Collaboration** → Designers and developers speak the same language via Storybook.  
- 🏗️ **Maintainability** → Modular file structure avoids tech debt and large files.  
- 🔍 **Testability** → Components validated in isolation before integration.  
- 🚀 **Performance** → Vite + TypeScript ensure optimized builds and faster DX.  
- 📦 **Deployment Flexibility** → Both app and Storybook can be shipped independently.  

---

👉 This approach balances **developer velocity, component reusability, and long-term scalability**, making it ideal for growing teams and enterprise-grade React applications.

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
