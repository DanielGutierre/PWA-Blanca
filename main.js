//Cargar Service worker
if('serviceWorker' in navigator)
{
    console.log("Puedes usar el Service Worker");
    //configuracion del sw
    navigator.serviceWorker.register('./sw.js')
                            .then(res=>console.log('SW cargado correctamente' ,res))
                            .catch(err => console.log('service worker no se ha podido registrar' ,err));
}
else
{
    console.log("No puedes usar el service Worker");
}