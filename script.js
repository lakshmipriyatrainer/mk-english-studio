const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const board = document.getElementById("board").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone) {
    status.textContent = "Please enter your name and phone / WhatsApp number.";
    return;
  }

  const text =
`Hello MK English Studio,

I would like to enquire about online English classes.

Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email || "Not specified"}
Board / Curriculum: ${board || "Not specified"}
Requirement: ${message || "Not specified"}`;

  const url = "https://wa.me/919884499562?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener");
  status.textContent = "Opening WhatsApp...";
  form.reset();
});
