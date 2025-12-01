const CACHE_NAME = "zoona-cache-v1";
const urlsToCache = [
  "/",
  "https://i.ibb.co/hJLQXkm6/T401764575713340.png",
  "https://i.ibb.co/0Rqs4xhD/T401764426388711.png",
  "https://raw.githubusercontent.com/sif0918183-design/zoona-fest/main/manifest.json" // استبدل بالمسار الفعلي
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
