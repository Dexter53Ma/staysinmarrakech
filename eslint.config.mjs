import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".netlify/**",
    ".playwright-mcp/**",
    "out/**",
    "build/**",
    "test-results/**",
    "next-env.d.ts",
    "scripts/**",
    "seed-*.js",
    "page-audit.mjs",
  ]),
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
