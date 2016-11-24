export class ServiceWorkActivate {

  public constructor() {
    this.ServiceWorkActive();
  }

  ServiceWorkActive = () => {
    console.log('ServiceWorkActive accessed::');
    let isAvailable: Boolean;

    if ( 'serviceWorker' in navigator ) {
      navigator.serviceWorker.register('/service-worker.js')
      .then( (registration) => {
        console.log( 'ServiceWorker registration successful', registration.scope );
      })
      .catch( (err) => {
        console.log( 'ServiceWorker registration failed', err );
      });
      isAvailable = true;
    }else {
      console.log( 'ServiceWorker not available' );
      isAvailable = false;
    }
    return isAvailable;
  };
}