//Asignar nombre y version de la cache
const CACHE_NAME='v1_cache_BCH_PWA';

//configuración de los fichros a subir a la cache de la aplicación.
var urlsToCache= [
    './',
    './css/style.css',
    './imagenes/rines_chidos.jpg'
];
//Evento del ServerWorker
//Evento Install
//se encarga de la instalacion del SW
//guarda en cache los recursos estáticos
//a variable self permite recoger del SW

self.addEventListener('Install', e=>{
    //utilizamos la variable del evento

    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                //le mandamos los elementos que tenemos en el array
                return cache.addAll(urlsToCache)
                            .then(()=>{
                                self.skipWaiting();
                            })
              })
              .catch(err=>console.log('No se ha registrado el cache' , err))
    );
});

//Evento activable
//este evento permite que la aplicacion funcione offline
self.addEventListener('activate' ,e => {
    const cacheWhitelist = [CACHE_NAME];

    //que el evento espere a que termine de ejecutar
    e.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    cacheNames.map(cacheNames => {
                        if(cacheWhitelist.indexOf(cacheName)== -1)
                        {
                            //borrar elementos que no se necesitan
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=> {
                self.clients.claim(); //activa la cache en el dispositivo.

            })
    );
})

self.addEventListener('fetch',e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                //devuelvo datos desde cache
                return res;
            }
            return fetch(e.request);
            //hago petición al servidor en caso de que no este en cache
        })
    );
});
