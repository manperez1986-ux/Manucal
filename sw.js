const CACHE='mm-v2';
const FILES=['/index.html','/manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(cached){if(cached)return cached;return fetch(e.request).then(function(r){if(r&&r.status===200){var c=r.clone();caches.open(CACHE).then(function(ch){ch.put(e.request,c);});}return r;}).catch(function(){return caches.match('/index.html');});}));});
