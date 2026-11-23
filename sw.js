/* Fanik Jahiz — offline cache (app shell + assets) */
const V='fanik-v2-4';
const SHELL=['./','fonts/MontserratArabic-Regular.woff','fonts/MontserratArabic-Medium.woff','fonts/MontserratArabic-SemiBold.woff','fonts/MontserratArabic-Bold.woff','index.html','app.css','app.js','icons.js','logo.svg','manifest.webmanifest','img/onb1.jpg','img/onb2.jpg','img/onb3.jpg','img/onb4.jpg','img/banner.jpg','img/offer2.jpg','img/clean.jpg','img/avatar.jpg','img/cat-install.png','img/cat-ac.png','img/cat-plumb.png','img/cat-clean.png','img/cat-pest.png','icons/icon-192.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
const put=(req,res)=>{ if(res.ok&&(req.url.startsWith(self.location.origin)||req.url.includes('fonts.g'))){ const cp=res.clone(); caches.open(V).then(c=>c.put(req,cp)); } return res; };
self.addEventListener('fetch',e=>{ const q=e.request; if(q.method!=='GET') return;
  const fresh=q.url.startsWith(self.location.origin)&&!/\.(jpg|png|svg|webp|woff)$/.test(new URL(q.url).pathname);
  if(fresh){ e.respondWith(fetch(q).then(r=>put(q,r)).catch(()=>caches.match(q).then(r=>r||caches.match('index.html')))); return; }
  e.respondWith(caches.match(q).then(r=>r||fetch(q).then(r=>put(q,r)))); });
