// PEXELS API to make images dynamic
const imagesWrapper = document.querySelector('.images');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = document.querySelector('.search-box input');
const lightBox = document.querySelector('.lightbox');
const closeBtn = lightBox.querySelector('.uil-times');
const downloadImgBtn = lightBox.querySelector('.uil-import');



const apiKey = 'Dqq4Uv55HPXfSyVvSC07unH9dODmDMwyNyMtb68mhWpJ6JTc2Qlg0hEZ';
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

// CONVERT IMG TO BLOB, THEN CREATE DL LINK AND FINALLY DOWNLOAD.
// response.blob() gives response as a blob object, useful for fetching data that isnt plain text, like images, video, audio, etc.
// blob payepaxi image takkai aauxa type maa, ani dl garna milyo
const downloadImg = (imgURL) => {
    // console.log(imgURL);
    fetch(imgURL).then(res => res.blob()).then(file => {
        // console.log(file);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);         // creates URL of passed object
        a.download = new Date().getTime();          // uniqueness ko lagi download filename is time in milliseconds
        a.click();                                  // triggers a click event on newly created link and begins download
    }).catch(() => alert('Sorry, we have failed to download the image.'));
}


const showLightbox = (name, img) => {
    lightBox.querySelector('img').src = img;            // showing clicked img
    lightBox.querySelector('span').innerText = name;       // showing photographer name

    downloadImgBtn.setAttribute('data-img', img);
    lightBox.classList.add('show');
    document.body.style.overflow = 'hidden';
}


const hideLightbox = () => {
    lightBox.classList.remove('show');
    document.body.style.overflow = 'auto';

}

// map le chahi array ko aba sab element lai linxa ani yo function hanera naya array banauxa
// join le chahi aba " " delimiter jodera tyo naya array ko elements lai single string banauxa
// making li of all fetched images and adding them to imageWrapper
const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img => 
        `<li class="card" onclick="showLightbox('${img.photographer}','${img.src.large2x}')">
            <img src="${img.src.large2x}" alt=""/>
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiURL) => {
    loadMoreBtn.innerText = 'Loading...';
    loadMoreBtn.classList.add('disabled');
    // Fetching images by API call with authorization header
    fetch(apiURL, {
        headers: {Authorization: apiKey}
    }).then(res => res.json()).then(data => {
        // console.log(data);
        generateHTML(data.photos);
        // once data has been fetched, we turn the load more button back to normal
        loadMoreBtn.innerText = 'Load more';
        loadMoreBtn.classList.remove('disabled');
    }).catch(() => alert('Sorry, we have currently failed to load images.'));   
}

const loadMoreImages = () => {
    // load more click =, then next page aauna lai current page increase by 1
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    
    // if searchterm maa pailai kei value xa, i.e it is true, then search query anusar search, natra call default API
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    // console.log(e);
    // if searchbar is empty, then
    if(e.target.value === "") return searchTerm = null;

    // searchbar maa enter press vo ki searchterm anusar seach gardini vo. e.target means input is target, ra value maa ta j type garya tei vaidinxa
    if(e.key === 'Enter'){
        // console.log('Enter key pressed');
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    }
}


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`);
loadMoreBtn.addEventListener('click', loadMoreImages);
searchInput.addEventListener('keyup', loadSearchImages);
// keyup Fires when a key is released, and keydown fires when a key is pressed down

closeBtn.addEventListener('click', hideLightbox);
downloadImgBtn.addEventListener('click', (e) => downloadImg(e.target.dataset.img));
// oassing btn img attribute value as argument to this downloadImg function

let dallo = document.querySelector(".dallo");

const options = {
    root: null,
    rootMargin: "500px",
    threshold: [0.0, 0.75],
};


let callback = (entries) => {
    // console.log(entries);
    entries.forEach(element => {
        if(!element.isIntersecting){
         dallo.style.display = 'grid';   
        }
        else{
            dallo.style.display = 'none';   
        }
    });
}

const mathi = document.querySelector('#mathi');
let observer = new IntersectionObserver(callback, options);
observer.observe(mathi);
