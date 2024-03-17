import { expect, test } from "bun:test";
import { assets } from "./src/assets.ts";

for (const asset of assets) {
    const result = await Bun.build({
        entrypoints: [asset.entrypoint],
        outdir: asset.outDir,
        minify: true,
    });
    test(`Build ${asset.pathname}`, () => {
        expect(result.success).toBe(true);
    })

}