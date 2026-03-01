// Scroll Reveal Animations
function reveal() {
  const reveals = document.querySelectorAll('.animate-fade-up');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('reveal');
      reveals[i].style.opacity = '1';
      reveals[i].style.transform = 'translateY(0)';
    }
  }
}

// Initial state for reveal-ready elements
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.animate-fade-up');
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    reveal(); // Initial call
    
    // Counter animations logic (as mentioned in README and index.html)
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        }
        
        // Simple Intersection Observer to start counter
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
});

window.addEventListener('scroll', reveal);
