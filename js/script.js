// Project Data
const projects = [
  {
    title: "Bankist",
    description:
      "A full-stack e-commerce platform with payment integration, product management, and user authentication.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    github: "https://github.com/bonatolasa/ecommerce-platform",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Home-Rental System",
    description:
      "A productivity application for managing tasks with drag-and-drop functionality and team collaboration features.",
    technologies: ["TypeScript", "React", "Firebase", "Material UI"],
    github: "https://github.com/bonatolasa/task-manager",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Online-Exam System",
    description:
      "A weather application that displays current and forecasted weather data for locations around the world.",
    technologies: ["JavaScript", "OpenWeather API", "CSS3", "HTML5"],
    github: "https://github.com/bonatolasa/weather-app",
    image:
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Anaf Medical Assistance",
    description:
      "An application that helps users discover recipes based on ingredients they have available.",
    technologies: ["Python", "Flask", "PostgreSQL", "Spoonacular API"],
    github: "https://github.com/bonatolasa/recipe-finder",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Ominofood website",
    description:
      "A responsive portfolio website showcasing my projects and skills as a developer.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Git"],
    github: "https://github.com/bonatolasa/portfolio",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
];

// DOM Elements
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.getElementById("contactForm");
const projectsCarousel = document.querySelector(".projects-carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.querySelector(".carousel-dots");

// Carousel state
let currentIndex = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Load projects
  loadProjects();

  // Update year in footer
  const year = new Date().getFullYear();
  const footerText = document.querySelector(".footer-text");
  footerText.textContent += ` © ${year}`;

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize carousel controls
  setupCarouselControls();
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top:
          targetElement.offsetTop - document.querySelector("nav").offsetHeight,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("show");
      }
    }
  });
});

// document.querySelectorAll(".nav-links").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Form Handling
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // In a real implementation, you would send the form data to a server
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    !e.target.closest(".nav-links") &&
    !e.target.closest(".mobile-menu-btn")
  ) {
    navLinks.classList.remove("show");
  }
});

// Load Projects into Carousel
function loadProjects() {
  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card hidden";
    projectCard.innerHTML = `
            <img src="${project.image}" alt="${
      project.title
    }" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-item">${tech}</span>`)
                      .join("")}
                </div>
                <div class="project-links">
                    <a href="${
                      project.github
                    }" target="_blank" class="btn">View on GitHub</a>
                </div>
            </div>
        `;
    projectsCarousel.appendChild(projectCard);
  });

  // Create dots
  projects.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
}

// Setup Carousel Controls
function setupCarouselControls() {
  const dots = document.querySelectorAll(".dot");
  const cardWidth = document.querySelector(".project-card").offsetWidth;
  const gap = 30; // Same as gap in CSS

  // Previous button
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Next button
  nextBtn.addEventListener("click", () => {
    if (currentIndex < projects.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
    });
  });

  // Update carousel position and active dot
  function updateCarousel() {
    const scrollPosition = currentIndex * (cardWidth + gap);
    projectsCarousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === projects.length - 1;
  }

  // Handle scroll events
  projectsCarousel.addEventListener("scroll", () => {
    const scrollPosition = projectsCarousel.scrollLeft;
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));

    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === projects.length - 1;
    }
  });

  // Initial button states
  prevBtn.disabled = true;
  if (projects.length <= 1) {
    nextBtn.disabled = true;
  }
}

// Initialize Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".hidden").forEach((element) => {
    observer.observe(element);
  });
}
