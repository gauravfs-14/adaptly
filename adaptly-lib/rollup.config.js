import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import ts from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
const packageJson = require("./package.json");

export default [
  // CJS build
  {
    input: "core/index.ts",
    output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      ts({ 
        tsconfig: "./tsconfig.json", 
        compilerOptions: { module: "esnext" },
        exclude: ["**/*.test.*", "**/*.spec.*"]
      }),
      terser(),
    ],
    onwarn(warning, warn) {
      // Ignore "use client" directive warnings and circular dependency warnings
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.code === 'CIRCULAR_DEPENDENCY') {
        return;
      }
      warn(warning);
    },
  },
  // ESM build
  {
    input: "core/index.ts",
    output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      ts({ 
        tsconfig: "./tsconfig.json", 
        compilerOptions: { module: "esnext" },
        exclude: ["**/*.test.*", "**/*.spec.*"]
      }),
      terser(),
    ],
    onwarn(warning, warn) {
      // Ignore "use client" directive warnings and circular dependency warnings
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.code === 'CIRCULAR_DEPENDENCY') {
        return;
      }
      warn(warning);
    },
  },
  // Type definitions
  {
    input: "core/index.ts",
    output: { file: packageJson.types },
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];