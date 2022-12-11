let searchParams = location.search.split("=").pop();

const access_key = "lqghMBkt7vKms6_FHYeY0EZ7h8Pqh_ZfUPrWmuTdsqg";

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParams}&per_page=50`;

const galleryContainer = document.querySelector(".container");

let allImages; // it is store all images
let currentImage = 0;

const getImages = () => {
  fetch(random_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data;
      makeImages(allImages);
    });
};

const searchImages = () => {
  fetch(search_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data.results;
      makeImages(allImages);
    });
};

const makeImages = (data) => {
  // console.log(data);
  data.forEach((item, index) => {
    // console.log(item);

    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.className = "gallery-img";
    galleryContainer.appendChild(img);

    // after click the img
    img.addEventListener("click", () => {
      currentImage = index;
      showPopup(item);
    });
  });
};

const showPopup = (item) => {
  let popup = document.querySelector(".image-popup");
  const closeBtn = document.querySelector(".close-btn");
  const downloadBtn = document.querySelector(".download-btn");
  const imgFluid = document.querySelector(".img-fluid");

  popup.classList.remove("hide");
  downloadBtn.href = item.links.html;
  imgFluid.src = item.urls.regular;

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hide");
  });
};

if (searchParams == "") {
  getImages();
} else {
  searchImages();
}

// controls

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

prevBtn.addEventListener("click", () => {
  if (currentImage > 0) {
    currentImage--;
    showPopup(allImages[currentImage]);
  } else {
    currentImage = allImages.length - 1;
    showPopup(allImages[currentImage]);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentImage < allImages.length - 1) {
    currentImage++;
    showPopup(allImages[currentImage]);
  } else {
    currentImage = 0;
  }
});
