function serviceWorkerDev() {
  const serviceWorkerUrl = new URL('/serviceWorker.js', window.location.origin)
    .href;
  navigator.serviceWorker.register(serviceWorkerUrl).then((response) => {
    console.warn('Service Worker Registered', response);
  });
}

export default serviceWorkerDev;
