import {assets} from "./src/assets.ts";


for (const asset of assets) {
    const result = await Bun.build({
        entrypoints: [asset.entrypoint],
        outdir: asset.outDir,
        minify: true,
    });
    console.log(`Built ${asset.entrypoint} to ${asset.outDir}`);
}

import { renderToString } from "react-dom/server";
import React from "react";

function Index(props: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <script src="/fontawesome/all.min.js"></script>
            <title>Document</title>
        </head>
        <body>
        {props.children}
        </body>
        </html>
    );
}

const stream = await renderToString(
    <Index>
        <h1>Assets uploaded</h1>
        {assets.map((asset) => (
            <a key={asset.pathname} href={asset.pathname}><i className={"fa-solid fa-file"}></i> {asset.pathname}</a>
        ))}
    </Index>
);

// print the stream in dist/index.html
const indexPath = "./dist/index.html";
await Bun.write(indexPath, stream);