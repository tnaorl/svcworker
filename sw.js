this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/svcworker/',
        '/svcworker/index.html',
        '/svcworker/style.css',
        '/svcworker/app.js',
        '/svcworker/Service.jpg'
      ]);
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(this.clients.claim().then(function() {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
    console.log('matchAll executing..');
    return this.clients.matchAll({type: 'wearable'});
    //return this.clients.matchAll({type: 'window'});
  }).then(function(clients) {
    return clients.map(function(client) {
      if ('postmessage' in client) {
        console.log('postMessage executing..');
        return client.postmessage('http://www.naver.com');
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
    console.log('fetch returns default img..');
    return caches.match('/svcworker//svcworker/Service.jpg');
  }));
});
