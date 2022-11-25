// const addResourcesToCache = async (resources) => {
//     const cache = await caches.open("v1");
//     await cache.addAll(resources);
// };


// const putInCache = async (request, response) => {
//     const cache = await caches.open("v1");
//     await cache.put(request, response);
// };




// const cacheFirst = async ({request, preloadResponsePromise, fallbackUrl}) => {

//     //First try to get the resourse from cache
//     const responseFromCache = await caches.match(request);
//     if (responseFromCache) {
//         return responseFromCache;
//     }


//     //Next try to use (and cache) the preload response, if its there
//     const preloadResponse = await preloadResponsePromise;
//     if (preloadResponse) {
//         console.info("using preload response", preloadResponse);
//         putInCache(request, preloadResponse.clone());
//         return preloadResponse;
//     }



//     //Next try to get the resourse from the network
//     try {

//         const responseFromNetWork = await fetch(request);
//         //Response may be used only once
//         //We need to save clone to put one copy in cache and serve second one
//         putInCache(request, responseFromNetWork.clone());
//         return responseFromNetWork;
        
//     } catch (error) {
//         const fallbackResponse = await caches.match(fallbackUrl);
//         if (fallbackUrl) {
//             return fallbackResponse;
//         }

//         //When even the fallback response is not available,
//         //There is nothing we can do
//         //return a response object 
//         return new Response("Network error happened", { 
//             status: 408, 
//             headers: { "Content-type": "text/plain" }
//         });

//     }
    
    
// };


// const enableNavigationPreload = async () => {
//     if (self.registration.navigationPreload) {
//         //Enable navigation preload
//         await self.registration.navigationPreload.enable();
//     }
// };



// self.addEventListener("activate", (event) => {
//     event.waitUntil(enableNavigationPreload());
// });



// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         addResourcesToCache([

//             "/",
//             "/style.css",
//             "/index.html",
//             "/profile.html",
//             "/index.js",
//             "/home.js",
//             "/utility/password_generator.js",
//             "/utility/uppercase_words.js",
//             "/uiclasses/create_login_class.js",
//             "/uiclasses/create_pin_form_class.js",
//             "/uiclasses/create_staff_apply_form_class.js",
//             "/uiclasses/create_student_admission_form_class.js",
//             "/uiclasses/school_profile_header_class.js",
//             "/uiclasses/user_passport.js",
//             "/uiclasses/user_section_option_handler.js",
//             "/uiclasses/validate_user_login_infor_class.js",
//             "/images/profile-1.jpg.js",
//             "/images/profile-12.jpg",
//             "/images/profile-20.jpg",
//             "/images/profile-11.jpg",
            

//         ])
//         );
// });





// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         cacheFirst({
//             request: event.request,
//             preloadResponsePromise: event.preloadResponse,
//             fallbackUrl: "/gallery/myLittleVader.jpg",
//         })
//         );
// });




// ======================================================
// name of cache to creat 

const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'dynamic-cache-v1';

//The real assets that gets installed during instation
const assets = [

            "/",
            "/index.html",
            "/css/style.css",
            "/js/home.js",

            "/uiclasses/create_login_class.js",
            "/uiclasses/create_staff_apply_form_class.js",
            "/uiclasses/create_pin_form_class.js",
            "/modal/create_validate_pin_class.js",
            "/uiclasses/create_student_admission_form_class.js",
            

            "/uiclasses/user_passport.js",
            "/uiclasses/school_profile_header_class.js",
            "/uiclasses/user_section_option_handler.js",
            
            "/utility/uppercase_words.js"

];



//Limited cache size //
const limitedCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                caches.delete(keys[0]).then(limitedCacheSize(name, size))
            }
        })
    })

};


self.addEventListener('install', event => {
    console.log('Service worker installed event', event);

    //Installing assets here
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            console.log('Caching shell assets');
            cache.addAll(assets);
        })
        .catch(error => {
            console.log('Omo something happen', error);
        })
    );

});







self.addEventListener('activate', event => {

    event.waitUntil(
        caches.keys()
        .then(keys => {
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );

});

//Fetch events
/**
 * Fetch event happens whenever we try to get some thing from a server example 
 * 1. .json file
 * 2. .js file 
 * 3. .css file etc
 * //
 */


self.addEventListener('fetch', event => {
    // console.log('Fetch event has been fired', event);//
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    limitedCacheSize(dynamicCacheName, 15);
                    return fetchRes; 
                })
            });
        }).catch(() => {
            if (event.request.url.indexOf('.html') > -1) {
                return caches.match('/index.html');
            }
        })
    );
});