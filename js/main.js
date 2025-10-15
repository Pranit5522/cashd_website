// Main JavaScript file for KickCash website

class KickCashApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupTestimonialCarousel();
    this.setupMobileMenu();
    this.setupFormHandling();
    this.setupImageLazyLoading();
    this.handleHamburgerMenuClick();
  }

  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll("section").forEach((section, index) => {
      section.classList.add("animate-on-scroll");
      observer.observe(section);
    });

    // Animate step cards with stagger
    document.querySelectorAll(".step").forEach((step, index) => {
      step.classList.add("animate-on-scroll");
      step.style.transitionDelay = `${index * 0.2}s`;
      observer.observe(step);
    });
  }

  // Testimonial carousel functionality
  setupTestimonialCarousel() {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".testimonials__nav--prev");
    const nextBtn = document.querySelector(".testimonials__nav--next");

    let currentIndex = 0;

    if (testimonials.length === 0) return;

    const showTestimonial = (index) => {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle("testimonial--active", i === index);
      });
    };

    const nextTestimonial = () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    };

    const prevTestimonial = () => {
      console.log("@@@ prev testimonal");
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    };

    if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);
    if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);

    // Auto-advance testimonials
    setInterval(nextTestimonial, 8000);
  }

  // Mobile menu functionality
  setupMobileMenu() {
    // This would be implemented if we had a hamburger menu
    // For now, we're hiding the menu on mobile
    const handleResize = () => {
      // const menu = document.querySelector(".hero__menu");
      // if (window.innerWidth <= 768) {
      //   menu?.classList.add("hide-mobile");
      // } else {
      //   menu?.classList.remove("hide-mobile");
      // }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
  }

  // Form handling for newsletter signup
  setupFormHandling() {
    const newsletterForm = document.querySelector(".footer__newsletter");
    const emailInput = document.querySelector(".footer__input");
    const submitBtn = document.querySelector(".footer__button");

    if (!newsletterForm || !emailInput || !submitBtn) return;

    const handleSubmit = (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!this.isValidEmail(email)) {
        this.showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate API call
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        this.showNotification("Thank you for subscribing!", "success");
        emailInput.value = "";
        submitBtn.textContent = "Get in Touch";
        submitBtn.disabled = false;
      }, 1500);
    };

    submitBtn.addEventListener("click", handleSubmit);
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    });
  }

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show notification
  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 24px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "9999",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
      backgroundColor:
        type === "success"
          ? "#10b981"
          : type === "error"
          ? "#ef4444"
          : "#3b82f6",
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Lazy loading for images
  setupImageLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  handleHamburgerMenuClick() {
    const hamburger = document.querySelector("[data-hamburger]");
    const menu = document.querySelector("[data-menu]");
    if (hamburger && menu) {
      hamburger.addEventListener("click", function () {
        menu.classList.toggle("hero__menu-wrapper--active");
      });
      // Optional: close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
          menu.classList.remove("hero__menu-wrapper--active");
        }
      });
    }
  }
}

// Utility functions
const utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new KickCashApp();
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Page is hidden, pause any animations or timers if needed
  } else {
    // Page is visible again, resume animations or timers if needed
  }
});

// Performance monitoring
window.addEventListener("load", () => {
  // Log performance metrics
  if ("performance" in window) {
    const perfData = performance.getEntriesByType("navigation")[0];
    console.log(
      "Page load time:",
      perfData.loadEventEnd - perfData.loadEventStart,
      "ms"
    );
  }
});
