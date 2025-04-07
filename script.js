document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Scroll Reveal Animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true
    });
    
    // Scroll Reveal
    sr.reveal('.hero-content', {});
    sr.reveal('.about-img', { delay: 300 });
    sr.reveal('.about-text', { delay: 300 });
    sr.reveal('.skill-category', { interval: 200 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.contact-info', { delay: 300 });
    sr.reveal('.contact-form', { delay: 400 });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formEntries);
            
            // Reset form
            this.reset();
            
            // Create and show a better UI for success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>¡Mensaje Enviado!</h3>
                    <p>Gracias por tu mensaje. Me pondré en contacto contigo pronto.</p>
                    <button class="btn close-btn">Cerrar</button>
                </div>
            `;
            document.body.appendChild(successMessage);
            
            // Add styles for the success message
            const style = document.createElement('style');
            style.textContent = `
                .success-message {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }
                .success-content {
                    background-color: var(--card-bg);
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                .success-content i {
                    font-size: 4rem;
                    color: var(--success-color);
                    margin-bottom: 20px;
                }
                .success-content h3 {
                    font-size: 1.8rem;
                    margin-bottom: 15px;
                }
                .success-content p {
                    margin-bottom: 20px;
                    color: var(--text-secondary);
                }
                .close-btn {
                    margin-top: 10px;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Close button functionality
            const closeBtn = successMessage.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                successMessage.remove();
                style.remove();
            });
        });
    }
    
    // Update profile image
    const profileImg = document.querySelector('.about-img img');
    if (profileImg) {
        profileImg.src = 'profile.jpg';
        profileImg.alt = 'Cristian Micchele';
    }
    
    // Certificate Modal Setup
    const certificateModal = document.getElementById('certificateModal');
    const closeModal = document.querySelector('.close-modal');
    
    // When the user clicks on <span> (x), close the modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            certificateModal.style.display = "none";
            document.body.style.overflow = 'auto';
        });
    } else {
        console.error('Close modal button not found');
    }
    
    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener('click', function(event) {
        if (event.target === certificateModal) {
            certificateModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add keyboard support to close modal with ESC key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && certificateModal && certificateModal.style.display === 'block') {
            certificateModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
    
    // Uncomment if you want to use the JavaScript approach to update content
    // updatePortfolioInfo();
}); // Fixed: Removed extra closing bracket that was here

// Function to update portfolio information
function updatePortfolioInfo() {
    // Update programming languages
    updateSkillCategory('Lenguajes de Programación', [
        'JavaScript', 
        'TypeScript', 
        'HTML5', 
        'CSS'
    ]);
    
    // Update frameworks & libraries
    updateSkillCategory('Frameworks y Librerías', [
        'Node.js', 
        'Express.js', 
        'NestJS', 
        'Socket.io', 
        'TypeORM',
        'Handlebars'
    ]);
    
    // Update databases
    updateSkillCategory('Bases de Datos', [
        'MySQL', 
        'MongoDB'
    ]);
    
    // Update tools
    updateSkillCategory('DevOps y Herramientas', [
        'Git', 
        'GitHub'
    ]);
    
    // Update contact information
    updateContactInfo('email', 'c.micchele@gmail.com');
    updateContactInfo('phone', '+54 3402 501127');
}

// Helper function to update skill categories
function updateSkillCategory(categoryName, skills) {
    const categories = document.querySelectorAll('.skill-category h3');
    categories.forEach(category => {
        if (category.textContent === categoryName) {
            const skillList = category.nextElementSibling;
            if (skillList && skillList.tagName === 'UL') {
                skillList.innerHTML = '';
                skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillList.appendChild(li);
                });
            }
        }
    });
}

// Helper function to update contact information
function updateContactInfo(type, value) {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        if (icon) {
            if ((type === 'email' && icon.classList.contains('fa-envelope')) || 
                (type === 'phone' && icon.classList.contains('fa-phone'))) {
                const p = item.querySelector('p');
                if (p) p.textContent = value;
            }
        }
    });
}

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Certificate Modal Functionality
function openCertificateModal(imgSrc, caption) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateModalImg');
    const captionText = document.getElementById('certificateModalCaption');
    
    if (!modal || !modalImg || !captionText) {
        console.error('Modal elements not found');
        return;
    }
    
    modalImg.src = imgSrc;
    captionText.innerHTML = caption;
    modal.style.display = "block";
    
    // Disable scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for closing the modal
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close when clicking outside the image
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }, { once: true });
} // Added missing closing bracket

// Manejo del envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // No prevenimos el envío del formulario para que se envíe a formsubmit.co
            
            // Mostramos un mensaje al usuario
            localStorage.setItem('formSubmitted', 'true');
        });
        
        // Verificar si el formulario fue enviado (después de redirigir)
        if (localStorage.getItem('formSubmitted') === 'true') {
            formMessage.textContent = "¡Mensaje enviado! Gracias por contactarme.";
            formMessage.className = "form-message success";
            
            // Limpiar el estado
            localStorage.removeItem('formSubmitted');
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});