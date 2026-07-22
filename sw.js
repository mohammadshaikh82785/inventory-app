// =========================
// Cache Name
// =========================

const CACHE_NAME = "inventory-app-v1";


// =========================
// Files To Cache
// =========================

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


// =========================
// Install Service Worker
// =========================

self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(

            caches.open(CACHE_NAME)

                .then(function (cache) {

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                })

        );

    }
);


// =========================
// Fetch Files
// =========================

self.addEventListener(
    "fetch",
    function (event) {

        event.respondWith(

            caches.match(
                event.request
            )

            .then(function (response) {

                // Agar file cache mein hai
                if (response) {

                    return response;

                }

                // Agar cache mein nahi hai
                // to internet se fetch karo

                return fetch(
                    event.request
                );

            })

        );

    }
);