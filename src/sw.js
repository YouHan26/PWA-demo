/**
 * Created by YouHan on 2017/1/20.
 */

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      console.log('Opened cache');
      return cache.addAll([
        './js/index.js',
        './index.html'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    // magic goes here
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});