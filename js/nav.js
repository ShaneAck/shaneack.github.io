// Toggle dropdowns on click and close them when the user clicks elsewhere.
document.addEventListener("DOMContentLoaded", function () {
  var dropdowns = document.querySelectorAll(".has-dropdown");

  function closeDropdowns(exceptDropdown) {
    dropdowns.forEach(function (dropdown) {
      if (dropdown === exceptDropdown) return;

      dropdown.classList.remove("open");
      dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = !dropdown.classList.contains("open");

      closeDropdowns(dropdown);
      dropdown.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      closeDropdowns();
    }
  });

  document.querySelectorAll(".artwork-video").forEach(function (video) {
    video.addEventListener("click", function () {
      if (document.fullscreenElement === video) {
        return;
      }

      video.controls = true;
      video.requestFullscreen();
    });

    document.addEventListener("fullscreenchange", function () {
      if (document.fullscreenElement !== video) {
        video.controls = false;
      }
    });
  });

  var fullscreenImageWrapper;

  function createFullscreenCloseButton() {
    var button = document.createElement("button");
    button.className = "fullscreen-close";
    button.type = "button";
    button.setAttribute("aria-label", "Exit fullscreen");
    button.textContent = "x";

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      document.exitFullscreen();
    });

    return button;
  }

  document.querySelectorAll(".image-carousel").forEach(function (carousel) {
    carousel.appendChild(createFullscreenCloseButton());
  });

  document.addEventListener("fullscreenchange", function () {
    if (fullscreenImageWrapper && document.fullscreenElement !== fullscreenImageWrapper) {
      var image = fullscreenImageWrapper.querySelector("img");
      fullscreenImageWrapper.parentNode.insertBefore(image, fullscreenImageWrapper);
      fullscreenImageWrapper.remove();
      fullscreenImageWrapper = undefined;
    }

    document.querySelectorAll(".mobile-fullscreen").forEach(function (element) {
      if (document.fullscreenElement !== element) {
        element.classList.remove("mobile-fullscreen");
      }
    });
  });

  document.querySelectorAll(".piece img, .carousel-container img").forEach(function (image) {
    image.addEventListener("click", function () {
      var carousel = image.closest(".image-carousel");
      var fullscreenTarget = carousel || fullscreenImageWrapper || image;
      var isMobile = window.matchMedia("(max-width: 700px)").matches;

      if (document.fullscreenElement === fullscreenTarget) {
        if (!isMobile) {
          document.exitFullscreen();
        }
      } else {
        if (carousel) {
          if (isMobile) {
            carousel.classList.add("mobile-fullscreen");
          }
          carousel.requestFullscreen();
          return;
        }

        fullscreenImageWrapper = document.createElement("div");
        fullscreenImageWrapper.className = "fullscreen-image";
        if (isMobile) {
          fullscreenImageWrapper.classList.add("mobile-fullscreen");
        }
        image.parentNode.insertBefore(fullscreenImageWrapper, image);
        fullscreenImageWrapper.appendChild(image);
        fullscreenImageWrapper.appendChild(createFullscreenCloseButton());
        fullscreenImageWrapper.requestFullscreen();
      }
    });
  });
});
