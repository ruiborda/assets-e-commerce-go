const BASE_PATH = "./dist";
const server = Bun.serve({
    port: 8048,
    async fetch(req) {
        let reqUrlPath = new URL(req.url).pathname;
        if (reqUrlPath === "/") {
            reqUrlPath = "/index.html";
        }
        const filePath = BASE_PATH + reqUrlPath;
        const file = Bun.file(filePath);
        return new Response(file);
    },
    error() {
        return new Response(null, {status: 404});
    },
});

console.log(`Listening on ${server.url}`);