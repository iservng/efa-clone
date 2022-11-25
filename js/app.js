// //This is our entry point into using service workers 
// const registerServiceWorker = async () => {
    
//     if ('serviceWorker' in navigator) {
//         try {

//             const registration = navigator.serviceWorker.register("/sw.js", { scope: "/",});

//             if (registration.installing) {
//                 console.log("Service worker installing");
//             } else if (registration.waiting) {
//                 console.log("Service worker installed");
//             } else if (registration.active) {
//                 console.log("Service worker active");
//             }

//         } catch (error) {
//             console.error(`Registration failed with ${error}`);
//         }
//     }
// };


// //Call it 
// registerServiceWorker();


if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((error) => console.log('service worker not registered', error))
    
}

