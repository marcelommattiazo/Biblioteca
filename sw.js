const CACHE = 'biblioteca-1789951832989';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icone-192.png', './icone-512.png', './icone-180.png', './icone-maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(resp => { const copia = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return resp; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
