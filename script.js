AOS.init();

function openSidebar() {
  document.getElementById('sidebar').style.display = 'flex';
}

function closeSidebar() {
  document.getElementById('sidebar').style.display = 'none';
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    if (sectionId === 'home') {
      setTimeout(() => {
        const currentScroll = window.pageYOffset;
        const threshold = 50;

        if (currentScroll <= threshold) {
          return;
        }

        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  }
}

// Contact form submission script
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("loadingMessage").classList.remove("hidden");

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  fetch("https://contactform-backend-19.onrender.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to submit form");
      return response.json();
    })
    .then((data) => {
      document.getElementById("loadingMessage").classList.add("hidden");
      if (data.success) {
        document.getElementById("successMessage").classList.remove("hidden");
        document.getElementById("contactForm").reset();
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      document.getElementById("loadingMessage").classList.add("hidden");
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
});