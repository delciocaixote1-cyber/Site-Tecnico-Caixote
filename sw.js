const CACHE_NAME = "caixote-runner-v2";

const ARQUIVOS = [
  "./",
  "./jogo.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ARQUIVOS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(chaves) {
      return Promise.all(
        chaves.map(function(chave) {
          if (chave !== CACHE_NAME) {
            return caches.delete(chave);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resposta) {
      return resposta || fetch(event.request);
    })
  );
});