document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox.querySelector(".lightbox__image");
  const lightboxCaption = lightbox.querySelector(".lightbox__caption");
  const closeButton = lightbox.querySelector(".lightbox__close");
  const backdrop = lightbox.querySelector(".lightbox__backdrop");

  // Alle thumbnails
  const thumbs = document.querySelectorAll(".project-media__thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const fullSrc = thumb.dataset.full || thumb.src;
      const altText = thumb.getAttribute("alt") || "";

      lightboxImage.src = fullSrc;
      lightboxImage.alt = altText;
      lightboxCaption.textContent = altText;

      lightbox.classList.add("lightbox--visible");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("lightbox--visible");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
  }

  closeButton.addEventListener("click", closeLightbox);

  backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});