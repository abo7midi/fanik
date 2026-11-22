/* Fanik Jahiz — offline cache (app shell + assets) */
const V='fanik-v2-1';
const SHELL=['./','index.html','app.css','app.js','icons.js','logo.svg','manifest.webmanifest','img/onb1.jpg','img/onb2.jpg','img/onb3.jpg','img/onb4.jpg','img/banner.jpg','img/offer2.jpg','img/clean.jpg','img/avatar.jpg','img/cat-install.png','img/cat-ac.png','img/cat-plumb.png','img/cat-clean.png','img/cat-pest.png','icons/icon-192.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ if(res.ok&&(e.request.url.startsWith(self.location.origin)||e.request.url.includes('fonts.g'))){ const cp=res.clone(); caches.open(V).then(c=>c.put(e.request,cp)); } return res; }).catch(()=>caches.match('index.html')))); });
