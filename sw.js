this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(this.clients.claim().then(function() {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
    return this.clients.matchAll({type: 'wearable'});
  }).then(function(clients) {
    return clients.map(function(client) {
      // Check to make sure WindowClient.navigate() is supported.
      if ('postmessage' in client) {
        return client.postmessage({"open",http://www.naver.com});
      }
    });
  }));
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/sw-test/gallery/myLittleVader.jpg');
  }));
});
