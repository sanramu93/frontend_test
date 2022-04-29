const swiperWrapper = document.querySelector(".swiper-wrapper");
const commentsEl = document.querySelector(".comments__container");
const postInput = document.querySelector(".post__input");
const postBtn = document.querySelector(".post__btn");

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
    newSlide.classList.add("swiper-slide");
    newSlide.style.background = `url(${imgUrl})`;
    swiperWrapper.appendChild(newSlide);
  });

  // SWIPER
  new Swiper(".swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
};

renderImages(4);

// -------------
// POST FEATURE
// -------------
postBtn.addEventListener("click", () => {
  if (postInput.value === "") return;
  const newComment = document.createElement("p");
  newComment.classList.add("comment");
  newComment.insertAdjacentHTML(
    "beforeend",
    `
    <strong>Comment</strong>
    ${postInput.value}
  `
  );
  commentsEl.appendChild(newComment);
  postInput.value = "";
  commentsEl.scrollTop = commentsEl.scrollHeight;
});

// -------------------
// BUTTON LIKE FEATURE
// -------------------
const btnLike = document.querySelector(".btn-like");
const btnLikeRed = document.querySelector(".btn-like-red");

btnLike.addEventListener("click", () => {
  btnLikeRed.classList.add("btn-like-red--show");
});

btnLikeRed.addEventListener("click", () => {
  btnLikeRed.classList.remove("btn-like-red--show");
});
