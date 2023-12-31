/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core"
import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { StaleWhileRevalidate } from "workbox-strategies"

clientsClaim()

/**
 * We are not wrapping it in a 'message' event as per the new update.
 * @see https://developers.google.com/web/tools/workbox/modules/workbox-core
 */
self.skipWaiting()

/**
 * Precache all of the assets generated by your build process.
 * Their URLs are injected into the manifest variable below.
 * This variable must be present somewhere in your service worker file,
 * even if you decide not to use precaching. See https://cra.link/PWA
 */
precacheAndRoute(self.__WB_MANIFEST)

// @see https://developers.google.com/web/tools/workbox/guides/common-recipes#cache_css_and_javascript_files
registerRoute(
  ({ request }) => request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
)
