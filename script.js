const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    workCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const galleryDialog = document.querySelector(".gallery-dialog");
const galleryImage = document.querySelector(".gallery-image");
const galleryTitle = document.querySelector("#gallery-title");
const galleryType = document.querySelector(".gallery-type");

workCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    galleryImage.src = card.dataset.image;
    galleryImage.alt = image.alt;
    galleryTitle.textContent = card.dataset.title;
    galleryType.textContent = card.dataset.type;
    galleryDialog.showModal();
  });
});

document.querySelector(".gallery-close").addEventListener("click", () => galleryDialog.close());
galleryDialog.addEventListener("click", (event) => {
  if (event.target === galleryDialog) galleryDialog.close();
});
galleryDialog.querySelector(".text-link").addEventListener("click", () => galleryDialog.close());

document.querySelector("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const details = [
    `Hello David Efosa Studios, my name is ${formData.get("name")}.`,
    `Phone / WhatsApp: ${formData.get("phone")}`,
    `Session: ${formData.get("session")}`,
    formData.get("date") ? `Preferred date: ${formData.get("date")}` : "",
    formData.get("message") ? `A little about my plans: ${formData.get("message")}` : ""
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/2348149921216?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();