import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

// const resolve = require("@rollup/plugin-node-resolve");
// const commonjs = require("@rollup/plugin-commonjs");
// const typescript = require("@rollup/plugin-typescript");
// const dts = require("rollup-plugin-dts");

export default [
  {
    input: "src/index.tsx",
    external: ["react", "react-dom"],
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      json(),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
