// Matrix Background Animation
function initMatrix() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skills-container')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.section, .timeline-item, .project-card, .achievement-item');
    animatedElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('slide-in-left');
        }
        observer.observe(el);
    });
}

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// Project Modals
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    
    const projectData = {
        'bus-safety': {
            title: 'Bus Safety Automation',
            period: 'July 2024 - Dec 2024',
            description: 'Developed a Bus Safety Automation system using OpenCV and IoT, implementing real-time image processing to detect hands outside school bus windows and trigger immediate alerts.',
            features: [
                'Real-time image processing using OpenCV',
                'IoT integration for immediate alerts',
                'Parent notification system',
                'Safety monitoring dashboard',
                'Automated incident reporting'
            ],
            technologies: ['OpenCV', 'Python', 'IoT', 'Image Processing', 'Real-time Systems'],
            challenges: 'Implementing accurate hand detection in various lighting conditions and ensuring real-time processing speed.',
            impact: 'Enhanced school bus safety by providing immediate alerts for dangerous situations and keeping parents informed.'
        },
        'hotel-management': {
            title: 'Hotel Management System',
            period: 'Sept 2024 - Dec 2024',
            description: 'Developed and implemented a comprehensive database for the Hotel Management System using SQL, creating complex queries and optimizing data handling for efficient reporting and management.',
            features: [
                'Comprehensive booking system',
                'Real-time availability tracking',
                'Automated billing processes',
                'Customer management',
                'Reporting and analytics'
            ],
            technologies: ['SQL', 'Database Design', 'System Architecture', 'Data Optimization'],
            challenges: 'Designing efficient database schema and optimizing complex queries for real-time operations.',
            impact: 'Streamlined hotel operations, reduced overbooking incidents, and improved resource management efficiency.'
        },
        'quiz-website': {
            title: 'Interactive Quiz Website',
            period: 'Jan 2025 - Present',
            description: 'Developing an interactive programming quiz website that allows users to customize quizzes based on programming languages and difficulty levels, providing instant feedback and explanations to enhance learning.',
            features: [
                'Customizable quiz generation',
                'Multiple programming languages support',
                'Difficulty level selection',
                'Instant feedback system',
                'Progress tracking',
                'Detailed explanations'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'RESTful APIs'],
            challenges: 'Building a scalable platform that can handle multiple programming languages and provide accurate code evaluation.',
            impact: 'Creating an educational platform to help programmers improve their skills through interactive learning.'
        }
    };
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <p class="project-period">${project.period}</p>
                    <p class="project-description">${project.description}</p>
                    
                    <h3>Key Features</h3>
                    <ul class="project-features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <h3>Technologies Used</h3>
                    <div class="project-tech-modal">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    
                    <h3>Challenges & Solutions</h3>
                    <p>${project.challenges}</p>
                    
                    <h3>Impact</h3>
                    <p>${project.impact}</p>
                `;
                
                modal.style.display = 'block';
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('https://formsubmit.co/bingijayanth21@gmail.com', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showNotification('✅ Message sent successfully!', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showNotification('❌ Message sending failed. Please try again.', 'error');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing Animation for Terminal
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = 'echo "Ready to innovate"';
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                typingElement.textContent = text.substring(0, index + 1);
                index++;
                setTimeout(typeText, 100);
            }
        }
        
        setTimeout(typeText, 2000);
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initNavigation();
    initScrollAnimations();
    initProjectModals();
    initContactForm();
    initSmoothScrolling();
    initTypingAnimation();
});

// Add CSS for modal content
const modalStyles = `
    .project-period {
        color: #00ccff;
        font-style: italic;
        margin-bottom: 1rem;
    }
    
    .project-description {
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    #modal-body h3 {
        color: #00ff41;
        margin: 1.5rem 0 1rem 0;
        font-size: 1.2rem;
    }
    
    .project-features {
        list-style: none;
        padding-left: 0;
        margin-bottom: 2rem;
    }
    
    .project-features li {
        margin-bottom: 0.5rem;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .project-features li::before {
        content: '▶';
        position: absolute;
        left: 0;
        color: #00ff41;
    }
    
    .project-tech-modal {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .tech-tag {
        background: rgba(0, 255, 65, 0.1);
        color: #00ff41;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        border: 1px solid #00ff41;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);