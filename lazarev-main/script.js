// Enhanced JavaScript with modern animations and interactivity

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    initPreloader();
    initLocomotiveScroll();
    initCustomCursor();
    initMobileMenu();
    initNavAnimation();
    initHeroAnimations();
    initParticles();
    initPage2Animation();
    initPage3VideoAnimation();
    initServicesInteraction();
    initSplitText();
    initScrollAnimations();
});

// Preloader animation
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    
    // Animate loading bar
    gsap.to(preloaderBar, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    // Hide preloader after content is loaded
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }
        });
    });
    
    // Fallback if load event doesn't trigger
    setTimeout(() => {
        if (preloader.style.opacity !== '0') {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                }
            });
        }
    }, 3500);
}

// Locomotive Scroll initialization and configuration
function initLocomotiveScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        multiplier: 1,
        lerp: 0.05,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });
    
    // Update ScrollTrigger when scroll updates
    locoScroll.on("scroll", ScrollTrigger.update);

    // Set up ScrollTrigger proxy
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger and update LocomotiveScroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    
    // Update scroll position on page refresh
    window.addEventListener('load', () => {
        locoScroll.update();
    });
    
    // Make locoScroll globally accessible
    window.locoScroll = locoScroll;
}

// Custom cursor effects
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorText = document.querySelector('.cursor-text');
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
        
        gsap.to(cursorOutline, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        gsap.to(cursorText, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Cursor hover effects for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .nav-elem, .page5-elem, summary');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Custom cursor text for elements with data-cursor-text
    const textElements = document.querySelectorAll('[data-cursor-text]');
    
    textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('text');
            cursorText.textContent = element.getAttribute('data-cursor-text');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('text');
            cursorText.textContent = '';
        });
    });
    
    // Custom cursor class for elements with data-cursor-class
    const classElements = document.querySelectorAll('[data-cursor-class]');
    
    classElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const cursorClass = element.getAttribute('data-cursor-class');
            cursor.classList.add(cursorClass);
        });
        
        element.addEventListener('mouseleave', () => {
            const cursorClass = element.getAttribute('data-cursor-class');
            cursor.classList.remove(cursorClass);
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const body = document.body;
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu-item');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Navigation animations
function initNavAnimation() {
    const nav = document.querySelector('nav');
    
    // Change nav style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Dropdown animation
    const navElems = document.querySelectorAll('.nav-elem');
    
    navElems.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            const dropdownContent = elem.querySelector('.dropdown-content');
            if (dropdownContent) {
                gsap.to(dropdownContent, {
                    opacity: 1,
                    y: 0,
                    visibility: 'visible',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        elem.addEventListener('mouseleave', () => {
            const dropdownContent = elem.querySelector('.dropdown-content');
            if (dropdownContent) {
                gsap.to(dropdownContent, {
                    opacity: 0,
                    y: 10,
                    visibility: 'hidden',
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    // Animate gradient sphere
    gsap.to('.gradient-sphere', {
        scale: 1.2,
        opacity: 0.5,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Animate scroll indicator
    gsap.to('.scroll-line::after', {
        y: '100%',
        duration: 1.5,
        repeat: -1,
        ease: 'power2.inOut'
    });
}

// Particle effect for hero background
function initParticles() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') return;
    
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    particlesContainer.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x0BA34E,
        transparent: true,
        opacity: 0.5
    });
    
    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Page 2 article hover animations
function initPage2Animation() {
    const rightElems = document.querySelectorAll('.right-elem');
    
    rightElems.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            gsap.to(elem.querySelector('img'), {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        elem.addEventListener('mouseleave', () => {
            gsap.to(elem.querySelector('img'), {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                ease: 'power2.in'
            });
        });
        
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(elem.querySelector('img'), {
                x: x - 90,
                y: y - 90,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Page 3 video animation
function initPage3VideoAnimation() {
    const page3Center = document.querySelector('.page3-center');
    const video = document.querySelector('#page3 video');
    
    if (!page3Center || !video) return;
    
    page3Center.addEventListener('click', () => {
        video.play();
        gsap.to(video, {
            transform: 'scaleX(1) scaleY(1)',
            opacity: 1,
            borderRadius: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    video.addEventListener('click', () => {
        video.pause();
        gsap.to(video, {
            transform: 'scaleX(0.7) scaleY(0)',
            opacity: 0,
            borderRadius: '30px',
            duration: 0.5,
            ease: 'power2.in'
        });
    });
    
    // Case study videos
    const sections = document.querySelectorAll('.sec-right');
    
    sections.forEach(elem => {
        const video = elem.querySelector('video');
        if (!video) return;
        
        elem.addEventListener('mouseenter', () => {
            video.style.opacity = 1;
            video.play();
        });
        
        elem.addEventListener('mouseleave', () => {
            video.style.opacity = 0;
            video.pause();
            video.currentTime = 0;
        });
    });
}

// Services section interactions
function initServicesInteraction() {
    const details = document.querySelectorAll('details');
    
    details.forEach(detail => {
        const summary = detail.querySelector('summary');
        const content = detail.querySelector('#page-container');
        
        summary.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle details
            if (detail.open) {
                gsap.to(content, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        detail.open = false;
                    }
                });
            } else {
                detail.open = true;
                gsap.from(content, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Split text animation
function initSplitText() {
    // Check if SplitType is loaded
    if (typeof SplitType === 'undefined') return;
    
    // Split hero headings
    const splitHeadings = new SplitType('.split-text', { types: 'chars' });
    
    // Animate characters
    gsap.to(splitHeadings.chars, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.5
    });
    
    // Animate paragraph text
    gsap.to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1.2
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                scroller: '#main',
                start: 'top 80%',
                end: 'bottom 70%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Page 2 left content animation
    gsap.from('#page2-left', {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#page2',
            scroller: '#main',
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none none'
        }
    });
    
    // Page 2 right elements animation
    gsap.utils.toArray('.right-elem').forEach((elem, i) => {
        gsap.from(elem, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: '#page2-right',
                scroller: '#main',
                start: 'top 70%',
                end: 'bottom 50%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Case studies animation
    gsap.utils.toArray('.section').forEach(section => {
        // Left content
        gsap.from(section.querySelector('.sec-left'), {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                scroller: '#main',
                start: 'top 70%',
                end: 'top 30%',
                toggleActions: 'play none none none'
            }
        });
        
        // Right content
        gsap.from(section.querySelector('.sec-right'), {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                scroller: '#main',
                start: 'top 70%',
                end: 'top 30%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Services section animation
    gsap.from('#page5-right > p', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#page5',
            scroller: '#main',
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none none'
        }
    });
    
    // Footer animation
    gsap.from('.footer-left', {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: 'footer',
            scroller: '#main',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.footer-right', {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: 'footer',
            scroller: '#main',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none'
        }
    });
}
