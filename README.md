# 프로젝트 생성

- `npm create vite@latest .`
- `react`
- `typescript`
- `npm install`
- `npm run dev`

## 깃 셋팅

- `git init`
- `git remote add origin https://github.com/devgreact/til-react-ts.git`

## ESLint 및 Prettier 셋팅

- `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`
- `npm i eslint-plugin-react`
- `.prettierrc` 파일 생성

```
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

- eslint.config.js

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    //검사할 파일 종류
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier, // Prettier 플러그인
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "warn", // Prettier 규칙 (포매팅 오류를 에러로 표시)
      "react/react-in-jsx-scope": "off", // React import 생략 가능
    },
    settings: {
      react: {
        version: "detect", // React 버전을 자동 감지
      },
    },
  },
);
```

## .gitignore

```
.env
.env.*
```

## npm

npm i axios
npm i react-router-dom
npm i react-icons
npm i react-hook-form yup @hookform/resolvers
npm i react-quill
npm i quill
npm i react-calendar
npm i swiper
npm i recoil
npm i antd --save
npm install -D tailwindcss postcss autoprefixer

## Tailwindcss 셋팅

- `npx tailwindcss init`
- tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
```

- index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Recoil 셋팅

- main.tsx

```tsx
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

## tsconfig.app.json 추가

- js 사용 설정

```json
/* 추가 설정 */
"allowJs": true,
```

## proxy 사용 설정

- vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.0.144:5214",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```
