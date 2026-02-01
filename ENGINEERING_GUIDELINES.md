# Engineering Guidelines

This project adheres to **Google-Level** software engineering standards.

## 1. Code Quality & Hygiene
- **Strict Linting**: Zero tolerance for warnings. All `eslint` rules must pass.
- **Type Safety**: No `any`. Strict `TypeScript` configuration is enforced.
- **No "Dev" Comments**: The codebase must be "production-ready" at all times. Do not leave `// TODO`, `// Fix later`, or explanatory comments that should be in documentation. Code should be self-documenting.
- **Clean Imports**: Unused imports are automatically removed. Imports are sorted.

## 2. Component Architecture
- **Atomic Design**: Components must be small, focused, and composable.
- **Headless Logic**: Separate business logic and state from UI.
  - Use **Custom Hooks** (e.g., `useChat`) for logic (Brain).
  - Use **Functional Components** (e.g., `ChatWindow`) for rendering (Body).
  - **Single Responsibility**: A component should not handle API fetching, validation, AND rendering simultaneously.

## 3. Performance
- **React Router 7**: Utilize Loaders and Actions for server-side data management.
- **Code Splitting**: Routes are automatically code-split.
- **Asset Optimization**: Use optimized formats (WebP/AVIF) and lazy loading.

## 4. Styling (Tailwind CSS v4)
- **Zero Runtime**: Use Tailwind's utility-first approach.
- **Semantic Tokens**: Avoid magic numbers. Use theme tokens (e.g., `bg-background`, `text-foreground`).
- **Icons**: Use `lucide-react` for standard UI icons and `simple-icons` for brand logos.

## 5. Accessibility (A11y)
- **Semantic HTML**: Use proper tags (`<button>`, `<nav>`, `<article>`).
- **Focus Management**: Ensure keyboard navigability.
- **Contrast**: Maintain AA compliancy.

## 6. AI Optimization
- Maintain `robots.txt`, `sitemap.xml`, and `llms.txt` for maximum discoverability by both humans and machines.

## 7. Refactoring Protocol
When modifying a "God Component":
1.  **Analyze**: Identify state clusters and logic flows.
2.  **Extract**: Move logic to a custom hook (`useFeatureName`).
3.  **Atomize**: Break UI into sub-components.
4.  **Assemble**: Recombine in the main file as a clean controller.
