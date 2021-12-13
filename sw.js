importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

const OFFLINE_HTML = '/offline-test.html';
const PRECACHE = [
  OFFLINE_HTML,
  '/app_icons/manifest-icon-192.png'
];

/**
 * Enable navigation preload.
 */
workbox.navigationPreload.enable();

/**
 * Precache Manifest for resources available offline.
 * https://developers.google.com/web/tools/workbox/modules/workbox-precaching#explanation_of_the_precache_list
 */
workbox.precaching.precacheAndRoute(PRECACHE);



/**
 * Enable tracking with Google Analytics while offline.
 * This does not work with other tracking vendors.
 */
workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd1: 'offline',
  },
});

/**
 * Basic caching for CSS and JS.
 */
/*
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css_js'
  })
);
*/

/**
 * Basic caching for fonts.
 */
workbox.routing.registerRoute(
  /\.(?:woff|woff2|ttf|otf|eot)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fonts'
  })
);

/**
 * Basic caching for images.
 */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // Only cache 60 most recent images.
        maxEntries: 60,
        purgeOnQuotaError: true
      })
    ]
  })
);

/*
 * Fallback to offline HTML page when a navigation request fails.
 */
const htmlHandler = new workbox.strategies.NetworkOnly();
// A NavigationRoute matches navigation requests in the browser, i.e. requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({
  event
}) => {
  const request = event.request;
  return htmlHandler.handle({
    event,
    request
  }).catch(() => caches.match(OFFLINE_HTML, {
    ignoreSearch: true
  }));
});
workbox.routing.registerRoute(navigationRoute);