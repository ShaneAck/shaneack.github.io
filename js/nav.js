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
});
