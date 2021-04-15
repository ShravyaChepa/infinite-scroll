const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
let count = 30;
const apiKey = 'kq32FBJfJY1nmEEKLi980zx3bmy15JPK0z4HSufi43E';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all imgs are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Create elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src : photo.urls.regular,
            alt: photo.description,
            title: photo.description
        })
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put img inside a and both of them inside the image-container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //Catch error
    }
}

// Check to see if scrolling is near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    //when we reach the end of document almost
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//On load
getPhotos();