const STATIC_CACHE = "static";

const APP_SHELL = [
    "/",
    "Index.html",
    "css/style.css",
    "main.js",
    "imagenes/rines_chidos.jpg",
];

self.addEventListener("install", (e) => {
    const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
    console.log("fectch! ", e.request);

    e.respondWith(
        caches
        .match(e.request)
        .then((res) => res || fetch(e.request))
        .catch(console.log)
    );
});