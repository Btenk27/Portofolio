document.addEventListener("DOMContentLoaded", function () {
  const btnMobile = document.getElementById("btn-mobile");
  const mobileMenu = document.getElementById("mobile-menu");

  btnMobile.addEventListener("click", () => {
    btnMobile.classList.toggle("open"); 
    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      setTimeout(() => {
        mobileMenu.classList.add("opacity-100", "max-h-96", "scale-y-100");
        mobileMenu.classList.remove("opacity-0", "max-h-0", "scale-y-95");
      }, 10);
    } else {
      mobileMenu.classList.add("opacity-0", "max-h-0", "scale-y-95");
      mobileMenu.classList.remove("opacity-100", "max-h-96", "scale-y-100");
      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 500);
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, 
        behavior: 'smooth'
      });
    }
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el) => {
  el.classList.add("fade-up");
  observer.observe(el);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-teal-600");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-teal-600", "font-semibold");
    }
  });
});

// Dark Mode Toggle
const html = document.documentElement;
const darkToggle = document.getElementById("dark-toggle");
const sunIcon = document.getElementById("icon-sun");
const moonIcon = document.getElementById("icon-moon");

if (localStorage.getItem("theme") === "dark" ||
   (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  html.classList.add("dark");
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
}

darkToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  sunIcon.classList.toggle("hidden", isDark);
  moonIcon.classList.toggle("hidden", !isDark);
});

const darkToggleMobile = document.getElementById("dark-toggle-mobile");
const sunIconMobile = document.getElementById("icon-sun-mobile");
const moonIconMobile = document.getElementById("icon-moon-mobile");

function setDarkMode(isDark) {
  html.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  sunIcon.classList.toggle("hidden", isDark);
  moonIcon.classList.toggle("hidden", !isDark);
  sunIconMobile.classList.toggle("hidden", isDark);
  moonIconMobile.classList.toggle("hidden", !isDark);
}

if (darkToggleMobile) {
  darkToggleMobile.addEventListener("click", () => {
    const isDark = !html.classList.contains("dark");
    setDarkMode(isDark);
  });
}
