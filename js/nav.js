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

  // Many mobile browsers (notably iOS Safari) don't support requestFullscreen
  // on non-video elements, so fall back to a CSS-only overlay on those devices.
  var supportsElementFullscreen = !!(
    document.documentElement.requestFullscreen ||
    document.documentElement.webkitRequestFullscreen
  );

  function requestElementFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  function exitElementFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function closeManualFullscreen(element) {
    element.classList.remove("mobile-fullscreen");
    if (element === fullscreenImageWrapper) {
      var image = fullscreenImageWrapper.querySelector("img");
      fullscreenImageWrapper.parentNode.insertBefore(image, fullscreenImageWrapper);
      fullscreenImageWrapper.remove();
      fullscreenImageWrapper = undefined;
    }
  }

  function createFullscreenCloseButton() {
    var button = document.createElement("button");
    button.className = "fullscreen-close";
    button.type = "button";
    button.setAttribute("aria-label", "Exit fullscreen");
    button.innerHTML =
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">' +
      '<path d="M6 16h3v3h2v-5H6v2zm3-8H6v2h5V5H9v3zm4 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>' +
      "</svg>";

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var manualTarget = event.target.closest(".mobile-fullscreen");
      if (manualTarget && !document.fullscreenElement && !document.webkitFullscreenElement) {
        closeManualFullscreen(manualTarget);
      } else {
        exitElementFullscreen();
      }
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
  });

  document.querySelectorAll(".piece img, .carousel-container img").forEach(function (image) {
    image.addEventListener("click", function () {
      var carousel = image.closest(".image-carousel");
      var isMobile = window.matchMedia("(max-width: 700px)").matches;
      var useManualFullscreen = isMobile || !supportsElementFullscreen;

      if (carousel) {
        if (carousel.classList.contains("mobile-fullscreen")) {
          closeManualFullscreen(carousel);
          return;
        }
        if (document.fullscreenElement === carousel || document.webkitFullscreenElement === carousel) {
          exitElementFullscreen();
          return;
        }

        if (useManualFullscreen) {
          carousel.classList.add("mobile-fullscreen");
        } else {
          requestElementFullscreen(carousel);
        }
        return;
      }

      if (fullscreenImageWrapper) {
        if (fullscreenImageWrapper.classList.contains("mobile-fullscreen")) {
          closeManualFullscreen(fullscreenImageWrapper);
          return;
        }
        if (document.fullscreenElement === fullscreenImageWrapper || document.webkitFullscreenElement === fullscreenImageWrapper) {
          exitElementFullscreen();
        }
        return;
      }

      fullscreenImageWrapper = document.createElement("div");
      fullscreenImageWrapper.className = "fullscreen-image";
      image.parentNode.insertBefore(fullscreenImageWrapper, image);
      fullscreenImageWrapper.appendChild(image);
      fullscreenImageWrapper.appendChild(createFullscreenCloseButton());

      if (useManualFullscreen) {
        fullscreenImageWrapper.classList.add("mobile-fullscreen");
      } else {
        requestElementFullscreen(fullscreenImageWrapper);
      }
    });
  });
});
