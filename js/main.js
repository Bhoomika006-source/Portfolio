document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Dynamic Content (Conditional)
    if (document.getElementById("projects-container")) renderProjects(projects, "projects-container");
    if (document.getElementById("projects-summary-container")) renderProjects(projects.slice(0, 2), "projects-summary-container"); // Preview: first 2

    if (document.getElementById("experience-container")) renderExperience(experience, "experience-container");
    if (document.getElementById("experience-summary-container")) renderExperience(experience.slice(0, 1), "experience-summary-container"); // Preview: first 1

    if (document.getElementById("education-container")) renderEducation(education, "education-container");
    if (document.getElementById("education-summary-container")) renderEducation(education.slice(0, 1), "education-summary-container"); // Preview: first 1

    if (document.getElementById("skills-container")) renderSkills(skills, "skills-container");
    if (document.getElementById("skills-highlight-container")) renderSkills(skills.slice(0, 2), "skills-highlight-container"); // Preview: first 2 categories

    if (document.getElementById("contact-container")) renderContact();

    if (document.getElementById("youtube-container")) renderYoutube(projects, "youtube-container");
    if (document.getElementById("concept-videos-container")) renderConceptVideos(conceptVideos, "concept-videos-container");

    if (document.getElementById("about-preview")) {
        const aboutPreview = document.getElementById("about-preview");
        aboutPreview.textContent = userData.intro;
    }

    if (document.getElementById("about-full-text")) {
        // Could dynamically load this or keep static in HTML as is.
    }

    // 2. Initialize Animations
    initLoader();
    if (document.querySelector(".typing-text")) initTypingEffect();
    initScrollAnimations();
    initNavbarHighlight();
});

// --- Rendering Functions ---

function renderProjects(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="btn-project">View on GitHub</a>
                <a href="${project.linkedin}" target="_blank" class="btn-project">View LinkedIn Post</a>
            </div>
        </div>
    `).join('');
}

function renderExperience(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(exp => `
        <div class="timeline-item">
            <span class="date">${exp.year}</span>
            <h3>${exp.title}</h3>
            <p>${exp.company}</p>
            <p>${exp.description}</p>
        </div>
    `).join('');
}

function renderEducation(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(edu => `
        <div class="timeline-item">
            <span class="date">${edu.year}</span>
            <h3>${edu.title}</h3>
            <p>${edu.institution}</p>
            <p>${edu.description}</p>
        </div>
    `).join('');
}

function renderSkills(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(category => `
        <div class="skill-category">
            <h3>${category.category}</h3>
            <div class="skill-items">
                ${category.items.map(skill => `
                    <div class="skill-item">
                        <i class="${skill.icon}"></i> ${skill.name}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderContact() {
    const container = document.getElementById("contact-container");
    if (!container) return;
    container.innerHTML = `
        <p>Email: <a href="mailto:${userData.email}">${userData.email}</a></p>
        <p>Phone: ${userData.phone}</p>
        <div class="social-links">
            <a href="${userData.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="${userData.youtube}" target="_blank" class="youtube-icon"><i class="fab fa-youtube"></i></a>
        </div>
    `;
}

function renderYoutube(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <div class="project-links">
                <a href="${project.demoVideo}" target="_blank" class="btn-project"><i class="fab fa-youtube"></i> Watch Demo</a>
            </div>
        </div>
    `).join('');
}

function renderConceptVideos(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(video => `
        <div class="concept-card">
            <h3>${video.title}</h3>
            <a href="${video.videoUrl}" target="_blank" class="btn-concept-link">
                <i class="fab fa-youtube"></i> Watch Concept
            </a>
        </div>
    `).join('');
}

// --- Animation & Interactivity Functions ---

function initLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 1500); // Simulate loading time
    }
}

function initTypingEffect() {
    // Typing for the Hero Text (existing)
    const typingElement = document.querySelector(".typing-text");
    const texts = ["Full Stack Java Developer", "Problem Solver", "Tech Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Typing for the Code Editor
    const codeElement = document.getElementById("code-typing");
    if (codeElement) {
        // Simple blinking cursor effect or gradual reveal can be added here
        // For now, let's keep the CSS syntax highlighting static as it's cleaner for code blocks
    }

    if (typingElement) {
        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typingSpeed);
        }
        type();
    }
}

function initScrollAnimations() {
    // Only run if there are sections to animate
    const sections = document.querySelectorAll(".fade-in-section");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initNavbarHighlight() {
    // Highlighting based on current page URL
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
        });
    }
}
