// Tap-to-toggle the Artwork dropdown on touch devices (hover still works on desktop).
document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelector(".has-dropdown");
  if (!dropdown) return;
  var toggle = dropdown.querySelector(".dropdown-toggle");

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = dropdown.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", function () {
    dropdown.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});
