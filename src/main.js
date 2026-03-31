import './style.css';

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    }
  },
  { threshold: 0.2 }
);

for (const el of document.querySelectorAll(".reveal")) {
  observer.observe(el);
}

const form = document.querySelector("#inquiry-form");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const params = {
      usluga: form.usluga.value,
      budzet: form.budzet.value,
      rok: form.rok.value,
      email: form.email.value,
      poruka: form.poruka.value,
      from_name: form.email.value,
      reply_to: form.email.value,
    };

    try {
      await emailjs.send(
        "service_796w4ls",
        "template_oace80l",
        params,
        "ibzEUcCd_uJ7C-G2V"
      );
      form.reset();
      alert("Hvala! Upit je poslat.");
    } catch (error) {
      console.error(error);
      alert("Slanje nije uspelo. Pokusaj ponovo.");
    }
  });
}
