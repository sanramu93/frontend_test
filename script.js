const swiperWrapper = document.querySelector(".swiper-wrapper");

const getImageUrl = async () => {
  try {
    const res = await fetch(`https://picsum.photos/1080/566`);
    return res.url;
  } catch {
    console.error("Not image found");
  }
};

const getImages = async (amount) => {
  const images = [];
  for (let i = 0; i < amount; i++) {
    const image = await getImageUrl();
    images.push(image);
  }
  return images;
};

const renderImages = async (amount = 4) => {
  const images = await getImages(amount);
  images.forEach((imgUrl) => {
    const newSlide = document.createElement("div");
    const newImage = document.createElement("img");
    newSlide.classList.add("swiper-slide");
    newImage.src = imgUrl;
    newImage.alt = "Image";
    newSlide.appendChild(newImage);
    swiperWrapper.appendChild(newSlide);
  });

  // SWIPER
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: false,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
  return swiper;
};

renderImages(4);
