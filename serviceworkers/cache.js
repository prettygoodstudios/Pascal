const cacheName = 'v2';
const cacheAssets = ['../index.html', '../dist/main.js'];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log(cache);
                cache.addAll(cacheAssets);
            })
            .catch(error => {
                console.log(error);
            })
    );
});


self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request)
        .catch((e) => caches.match(e.request)));
});