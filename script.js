   // Mobile Navigation Toggle
   const mobileToggle = document.getElementById('mobileToggle');
   const navLinks = document.getElementById('navLinks');
   
   mobileToggle.addEventListener('click', () => {
       navLinks.classList.toggle('active');
       const icon = mobileToggle.querySelector('i');
       icon.classList.toggle('fa-bars');
       icon.classList.toggle('fa-times');
   });
   // Close mobile menu when clicking a link
   document.querySelectorAll('.nav-links a').forEach(link => {
       link.addEventListener('click', () => {
           navLinks.classList.remove('active');
           const icon = mobileToggle.querySelector('i');
           icon.classList.add('fa-bars');
           icon.classList.remove('fa-times');
       });
   });
   // Sticky Navigation
   const navbar = document.getElementById('navbar');
   window.addEventListener('scroll', () => {
       if (window.scrollY > 100) {
           navbar.classList.add('scrolled');
       } else {
           navbar.classList.remove('scrolled');
       }
   });
   // Parallax Effect for Hero
   const heroBg = document.getElementById('heroBg');
   const skillsBg = document.getElementById('skillsBg');
   
   window.addEventListener('scroll', () => {
       const scrolled = window.pageYOffset;
       
       // Hero parallax
       if (heroBg) {
           heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
       }
       
       // Skills parallax
       if (skillsBg) {
           const skillsSection = document.querySelector('.skills');
           const skillsOffset = skillsSection.offsetTop;
           const skillsScroll = scrolled - skillsOffset;
           
           if (scrolled > skillsOffset - window.innerHeight) {
               skillsBg.style.transform = `translateY(${skillsScroll * 0.3}px)`;
           }
       }
   });
   // Smooth Scrolling
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function (e) {
           e.preventDefault();
           const target = document.querySelector(this.getAttribute('href'));
           if (target) {
               const offset = 80;
               const targetPosition = target.offsetTop - offset;
               window.scrollTo({
                   top: targetPosition,
                   behavior: 'smooth'
               });
           }
       });
   });
   // Intersection Observer for Animations
   const observerOptions = {
       threshold: 0.1,
       rootMargin: '0px 0px -100px 0px'
   };
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateY(0)';
           }
       });
   }, observerOptions);
   // Animate elements on scroll
   document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-box').forEach(el => {
       el.style.opacity = '0';
       el.style.transform = 'translateY(30px)';
       el.style.transition = 'all 0.6s ease';
       observer.observe(el);
   });
   // Active Navigation Link
   const sections = document.querySelectorAll('section[id]');
   
   window.addEventListener('scroll', () => {
       let current = '';
       sections.forEach(section => {
           const sectionTop = section.offsetTop;
           const sectionHeight = section.clientHeight;
           if (pageYOffset >= (sectionTop - 200)) {
               current = section.getAttribute('id');
           }
       });
       document.querySelectorAll('.nav-links a').forEach(link => {
           link.classList.remove('active');
           if (link.getAttribute('href') === `#${current}`) {
               link.classList.add('active');
           }
       });
   });
   // Form Submission Handler (for better UX)
   const contactForm = document.querySelector('.contact-form');
   if (contactForm) {
       contactForm.addEventListener('submit', (e) => {
           // Allow default mailto: action
           alert('Opening your email client...');
       });
   }
   // Typing Effect for Hero (Optional Enhancement)
   const heroText = document.querySelector('.hero p');
   const roles = ['Business Analyst', 'Frontend Developer', 'Project Manager', 'Problem Solver'];
   let roleIndex = 0;
   let charIndex = 0;
   let isDeleting = false;
   
   function typeRole() {
       const currentRole = roles[roleIndex];
       
       if (isDeleting) {
           heroText.textContent = currentRole.substring(0, charIndex - 1);
           charIndex--;
       } else {
           heroText.textContent = currentRole.substring(0, charIndex + 1);
           charIndex++;
       }
       
       if (!isDeleting && charIndex === currentRole.length) {
           setTimeout(() => isDeleting = true, 2000);
       } else if (isDeleting && charIndex === 0) {
           isDeleting = false;
           roleIndex = (roleIndex + 1) % roles.length;
       }
       
       const typingSpeed = isDeleting ? 50 : 100;
       setTimeout(typeRole, typingSpeed);
   }
   
   // Start typing effect after 2 seconds
   setTimeout(typeRole, 2000);
   // Add loading animation
   window.addEventListener('load', () => {
       document.body.style.opacity = '0';
       document.body.style.transition = 'opacity 0.5s';
       setTimeout(() => {
           document.body.style.opacity = '1';
       }, 100);
   });

   //For email contact
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const popupNotification = document.getElementById('popupNotification');
    const popupIcon = document.getElementById('popupIcon');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');

    function showPopup(type, title, message) {
      popupNotification.className = `popup-notification ${type}`;
      popupIcon.className = `popup-icon ${type}`;
      popupIcon.textContent = type === 'success' ? '✓' : '✕';
      popupTitle.textContent = title;
      popupMessage.textContent = message;
      
      setTimeout(() => {
        popupNotification.classList.add('show');
      }, 100);

      setTimeout(() => {
        popupNotification.classList.remove('show');
      }, 4000);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusMessage.style.display = 'none';
      statusMessage.className = 'status-message';

      const formData = new FormData(form);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          form.reset();
          showPopup('success', 'Message Sent!', 'Thank you for reaching out. I\'ll get back to you soon!');
        } else {
          throw new Error(data.message || 'Something went wrong');
        }
      } catch (error) {
        showPopup('error', 'Failed to Send', 'Something went wrong. Please try again later.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });