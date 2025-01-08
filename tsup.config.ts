import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    external: ["qvog-engine"],
    clean: true,
    dts: true,
});
