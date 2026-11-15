// work section gradient
document.addEventListener('DOMContentLoaded', function() {
    // Get the work section element
    const workSection = document.querySelector('.work-section');
    if (!workSection) return; // only on the home page

    // Create two gradient elements for cross-fade effect
    const gradient1 = document.createElement('div');
    gradient1.classList.add('cursor-gradient', 'gradient-default');
    workSection.appendChild(gradient1);
    
    const gradient2 = document.createElement('div');
    gradient2.classList.add('cursor-gradient');
    gradient2.style.opacity = '0'; // Initially hidden
    workSection.appendChild(gradient2);
    
    // Track which gradient is active
    let activeGradient = 1;
    let currentClass = 'gradient-default';
    
    // Get all work items
    const workItems = document.querySelectorAll('.work-item');
    
    // Set initial position to center of work section
    const rect = workSection.getBoundingClientRect();
    let currentX = rect.width / 2;
    let currentY = rect.height / 2;
    let targetX = currentX;
    let targetY = currentY;
    
    // Set initial opacity to a low value for ambient effect
    gradient1.style.opacity = '0.3'; // Ambient gradient
    
    // Function to update gradient position with delay
    function updateGradientPosition(e) {
        const rect = workSection.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    }
    
    // Function to switch gradients with crossfade
    function changeGradient(newClass) {
        if (newClass === currentClass) return; // No change needed
        
        currentClass = newClass;
        
        // Determine which gradient to fade in/out
        const fadeIn = activeGradient === 1 ? gradient2 : gradient1;
        const fadeOut = activeGradient === 1 ? gradient1 : gradient2;
        
        // Set the new gradient class
        fadeIn.className = 'cursor-gradient ' + newClass;
        
        // Position the new gradient at the same location as current
        fadeIn.style.left = currentX + 'px';
        fadeIn.style.top = currentY + 'px';
        
        // Perform crossfade
        fadeIn.style.opacity = '1';
        fadeOut.style.opacity = '0';
        
        // Toggle active gradient
        activeGradient = activeGradient === 1 ? 2 : 1;
    }
    
    // Animation loop for smooth movement
    function animateGradient() {
        // Calculate distance to target
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Move current position closer to target (easing)
        currentX += dx * 0.04; // Lower value = more delay
        currentY += dy * 0.04; // Lower value = more delay
        
        // Update both gradients' positions for smooth transitions
        gradient1.style.left = currentX + 'px';
        gradient1.style.top = currentY + 'px';
        gradient2.style.left = currentX + 'px';
        gradient2.style.top = currentY + 'px';
        
        // Continue animation loop
        requestAnimationFrame(animateGradient);
    }
    
    // Start animation loop
    animateGradient();
    
    // Add event listeners to work section for default behavior
    workSection.addEventListener('mouseenter', function(e) {
        if (!e.target.closest('.work-item')) {
            // Reset to default gradient if not hovering a work item
            changeGradient('gradient-default');
            
            // Initialize position to prevent jump
            const rect = workSection.getBoundingClientRect();
            currentX = targetX = e.clientX - rect.left;
            currentY = targetY = e.clientY - rect.top;
        }
    });
    
    workSection.addEventListener('mousemove', function(e) {
        if (!e.target.closest('.work-item')) {
            updateGradientPosition(e);
        }
    });
    
    workSection.addEventListener('mouseleave', function() {
        // Set both gradients to ambient effect when mouse leaves
        const activeElement = activeGradient === 1 ? gradient1 : gradient2;
        const inactiveElement = activeGradient === 1 ? gradient2 : gradient1;
        activeElement.style.opacity = '0.3'; 
        inactiveElement.style.opacity = '0';
    });
    
    // Add event listeners to each work item
    workItems.forEach((item, index) => {
        // Add event listeners to each work item for unique gradients
        item.addEventListener('mouseenter', function(e) {
            // Change gradient based on index
            changeGradient('gradient-' + (index + 1));
            
            // Initialize position to prevent jump
            const rect = workSection.getBoundingClientRect();
            currentX = targetX = e.clientX - rect.left;
            currentY = targetY = e.clientY - rect.top;
            
            e.stopPropagation(); // Prevent triggering the section's event
        });
        
        item.addEventListener('mousemove', function(e) {
            updateGradientPosition(e);
            e.stopPropagation(); // Prevent triggering the section's event
        });
        
        // Add floating effect for images with mouse interaction
        const workImage = item.querySelector('.work-image');
        if (workImage) {
            item.addEventListener('mousemove', function(e) {
                const rect = item.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                // Create subtle tilt based on mouse position
                const rotateX = (mouseY / rect.height - 0.5) * 8;
                const rotateY = (mouseX / rect.width - 0.5) * -8;
                const translateX = (mouseX / rect.width - 0.5) * 15;
                
                workImage.style.transform = `
                    translateY(-10px) 
                    translateX(${translateX}px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            });
            
            item.addEventListener('mouseleave', function() {
                // Reset transform to let CSS animation take over
                workImage.style.transform = '';
            });
        }
    });
});
// floeating images
document.addEventListener('DOMContentLoaded', function() {
    // Get all work items
    const workItems = document.querySelectorAll('.work-item');
    
    // Add mouse move event listener to each work item to enhance the floating effect
    workItems.forEach(item => {
        const workImage = item.querySelector('.work-image');
        
        // Mouse move effect for a more interactive floating sensation
        item.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to the work item
            const rect = item.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate the rotation and movement based on mouse position
            // The item will tilt slightly in the direction of the mouse
            const rotateX = (mouseY / rect.height - 0.5) * 8; // Rotate around X-axis (up/down)
            const rotateY = (mouseX / rect.width - 0.5) * -8; // Rotate around Y-axis (left/right)
            const translateX = (mouseX / rect.width - 0.5) * 15; // Move horizontally slightly
            
            // Apply the transform
            workImage.style.transform = `
                translateY(-10px) 
                translateX(${translateX}px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
        
        // Reset transform when mouse leaves
        item.addEventListener('mouseleave', function() {
            // Return to the regular floating animation
            workImage.style.transform = '';
        });
    });
});

// footer gradient
        document.addEventListener('DOMContentLoaded', function() {
    // Get the footer section element
    const footerSection = document.querySelector('.footer-links-container');
    if (!footerSection) return;

    // Create the gradient element for the footer
    const footerGradient = document.createElement('div');
    footerGradient.classList.add('cursor-gradient');
    footerSection.appendChild(footerGradient);
    
    // Variables for smooth tracking
    let footerCurrentX = 0;
    let footerCurrentY = 0;
    let footerTargetX = 0;
    let footerTargetY = 0;
    
    // Function to update gradient position with delay
    function updateFooterGradientPosition(e) {
        const rect = footerSection.getBoundingClientRect();
        footerTargetX = e.clientX - rect.left;
        footerTargetY = e.clientY - rect.top;
    }
    
    // Animation loop for smooth movement
    function animateFooterGradient() {
        // Calculate distance to target
        const dx = footerTargetX - footerCurrentX;
        const dy = footerTargetY - footerCurrentY;
        
        // Move current position closer to target (easing)
        footerCurrentX += dx * 0.04; // Lower value = more delay
        footerCurrentY += dy * 0.04; // Lower value = more delay
        
        // Update gradient position
        footerGradient.style.left = footerCurrentX + 'px';
        footerGradient.style.top = footerCurrentY + 'px';
        
        // Continue animation loop
        requestAnimationFrame(animateFooterGradient);
    }
    
    // Start animation loop
    animateFooterGradient();
    
    // Add event listeners
    footerSection.addEventListener('mouseenter', function(e) {
        footerGradient.style.opacity = '1';
        // Initialize position to prevent jump
        const rect = footerSection.getBoundingClientRect();
        footerCurrentX = footerTargetX = e.clientX - rect.left;
        footerCurrentY = footerTargetY = e.clientY - rect.top;
    });
    
    footerSection.addEventListener('mousemove', updateFooterGradientPosition);
    
    footerSection.addEventListener('mouseleave', function() {
        footerGradient.style.opacity = '0';
    });
});
        


// for the navbar transparency
    document.addEventListener('DOMContentLoaded', function() {
    // Get the nav element
    const nav = document.querySelector('nav');
    
    // Function to toggle nav transparency based on scroll position
    function toggleNavTransparency() {
        // Colours and blur live in styles.css (.transparent-nav) so they follow the theme
        nav.classList.toggle('transparent-nav', window.scrollY > 50);
    }
    
    // Add scroll event listener for nav transparency
    window.addEventListener('scroll', toggleNavTransparency);
    
    // Initialize nav transparency on page load
    toggleNavTransparency();
    
    // Make sure all sections have proper IDs
    const sections = {
        'about': document.querySelector('section'), // First section is about
        'work': document.querySelector('.work-section'),
        'contact': document.querySelector('footer')
    };
    
    // Ensure all sections have their IDs
    Object.keys(sections).forEach(id => {
        if (sections[id]) {
            sections[id].id = id;
        }
    });
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Custom smooth scroll function with slower speed
    function smoothScrollTo(targetY, duration = 4500) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step() {
            const currentTime = performance.now();
            const timeElapsed = currentTime - startTime;
            
            // Easing function: easeInOutQuad
            let progress;
            if (timeElapsed < duration / 2) {
                progress = 2 * Math.pow(timeElapsed / duration, 2);
            } else {
                progress = 1 - Math.pow(-2 * timeElapsed / duration + 2, 2) / 2;
            }
            
            window.scrollTo(0, startY + difference * progress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Add click event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            if (href.charAt(0) !== '#') return; // normal links (e.g. ← Back) navigate as usual
            e.preventDefault();

            // Get the href attribute and remove the # to get the target id
            const targetId = href.substring(1);
            
            // Special case for 'about' - scroll to top of page
            if (targetId === 'about') {
                smoothScrollTo(0);
            } else {
                const targetSection = document.getElementById(targetId);
                
                // If target section exists, scroll to it smoothly
                if (targetSection) {
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    smoothScrollTo(targetPosition);
                }
            }
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Update active link based on scroll position (home page only:
    // case-study pages have no work section and only a Back link)
    const workSectionEl = document.getElementById('work');
    const contactSectionEl = document.getElementById('contact');
    if (!workSectionEl || !contactSectionEl) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Get positions of each section
        const workPos = workSectionEl.offsetTop;
        const contactPos = contactSectionEl.offsetTop;
        
        // Determine which section is currently in view
        // Add some offset to make transitions smoother
        const offset = 200;
        
        if (scrollPosition < workPos - offset) {
            // About section is active
            setActiveLink('about');
        } else if (scrollPosition < contactPos - offset) {
            // Work section is active
            setActiveLink('work');
        } else {
            // Contact section is active
            setActiveLink('contact');
        }
    });
    
    // Helper function to set active link
    function setActiveLink(id) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});



// for the  Hero text animation
    document.addEventListener('DOMContentLoaded', function() {
    // Get the main heading element
    const mainHeading = document.querySelector('.main-heading');
    if (!mainHeading) return; // only on the home page
    
    // Array of sentences to cycle through
    const sentences = [
        "Design-driven change",
        "Problem discovery and validation",
        "Delightful UI",
        "Empathy and curiosity",
        "Actionable insights"
    ];
    
    // Index to keep track of current sentence
    let currentIndex = 0;
    const FADE_MS = 600;   // fade out, then fade in
    const HOLD_MS = 3500;  // how long each phrase stays visible

    // Reserve the height of the tallest phrase so the page below doesn't jump
    // when phrases wrap to a different number of lines.
    function reserveHeight() {
        const current = mainHeading.textContent;
        mainHeading.style.minHeight = '';
        let tallest = 0;
        sentences.forEach(function(text) {
            mainHeading.textContent = text;
            tallest = Math.max(tallest, mainHeading.getBoundingClientRect().height);
        });
        mainHeading.textContent = current;
        mainHeading.style.minHeight = Math.ceil(tallest) + 'px';
    }

    reserveHeight();
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(reserveHeight, 150);
    });
    // Web font loading changes text widths, so measure again once fonts are ready
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(reserveHeight);
    }

    // Fade out fully, swap the text while invisible, then fade back in
    function updateText() {
        mainHeading.style.opacity = 0;

        setTimeout(function() {
            currentIndex = (currentIndex + 1) % sentences.length;
            mainHeading.textContent = sentences[currentIndex];
            mainHeading.style.opacity = 1;

            setTimeout(updateText, FADE_MS + HOLD_MS);
        }, FADE_MS);
    }

    mainHeading.style.transition = 'opacity ' + FADE_MS + 'ms ease';

    // Start the animation after initial delay
    setTimeout(updateText, 2000);
});


       
// for the pw modal

document.addEventListener('DOMContentLoaded', function() {
    // Create the modal HTML
    const modalHTML = `
        <div id="password-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Protected Content</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Please enter the password to view.</p>
                    <form id="password-form">
                        <input type="password" id="password-input" placeholder="Enter password">
                        <p id="password-error" class="error-message"></p>
                        <button type="submit" class="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('password-modal');
    const closeBtn = document.querySelector('.close-modal');
    const passwordForm = document.getElementById('password-form');
    const passwordError = document.getElementById('password-error');
    
    // Password configuration
    const protectedPages = [
        'printify1.html',
        'printify2.html'
    ];
    
    // Single password for all protected pages
    const singlePassword = '1619';
    let requestedUrl = '';
    
    // Cookie functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
    
    // Check if password is already saved
    function isAuthenticated() {
        return getCookie("printify_auth") === "true";
    }
    
    // Add click event listeners to protected links
    document.querySelectorAll('.work-item a').forEach(link => {
        const href = link.getAttribute('href');
        if (protectedPages.includes(href)) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                requestedUrl = href;
                
                // Check if already authenticated
                if (isAuthenticated()) {
                    // Already authenticated, navigate directly
                    window.location.href = href;
                } else {
                    // Not authenticated, show modal
                    modal.style.display = 'block';
                }
            });
        }
    });
    
    // Close modal when clicking on X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        passwordForm.reset();
        passwordError.textContent = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            passwordForm.reset();
            passwordError.textContent = '';
        }
    });
    
    // Handle form submission
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password-input').value;
        
        if (password === singlePassword) {
            // Password correct - save authentication in cookie for 10 days
            setCookie("printify_auth", "true", 10);
            
            // Navigate to page
            window.location.href = requestedUrl;
        } else {
            // Password incorrect, show error
            passwordError.textContent = 'Incorrect password. Please try again.';
        }
    });
});




// to download CV

document.addEventListener('DOMContentLoaded', function() {
    // Get the download resume button
    const downloadResumeBtn = document.querySelector('.download-btn');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a function to handle the download
            function downloadResume() {
                // Create an anchor element
                const link = document.createElement('a');
                
                // Set the file path - update this to the actual path where your PDF is stored
                link.href = 'assets/resume-KJ.pdf';
                
                // Set the download attribute with the filename
                link.download = 'resume-KJ.pdf';
                
                // Append to the body
                document.body.appendChild(link);
                
                // Trigger the click event
                link.click();
                
                // Clean up
                document.body.removeChild(link);
            }
            
            // Call the function to start the download
            downloadResume();
        });
    }
});


// Light/dark mode toggle. The initial theme is set by an inline script in each page's <head>.
document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const toggles = document.querySelectorAll('.theme-toggle');

    function syncLabels() {
        const isDark = root.getAttribute('data-theme') === 'dark';
        toggles.forEach(function(btn) {
            btn.setAttribute('aria-checked', String(isDark));
            btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    toggles.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncLabels();
        });
    });

    // Follow live system changes, unless the visitor has picked a theme with the switch
    const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (media) {
        const onSystemChange = function(e) {
            let saved = null;
            try { saved = localStorage.getItem('theme'); } catch (err) {}
            if (saved === 'light' || saved === 'dark') return;
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            syncLabels();
        };
        if (media.addEventListener) media.addEventListener('change', onSystemChange);
        else if (media.addListener) media.addListener(onSystemChange);
    }

    syncLabels();
});


// Dark mode page glow: rests near the top-left and eases after the cursor,
// like the work section gradient. Hidden in light mode via CSS.
document.addEventListener('DOMContentLoaded', function() {
    const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover) return;

    // Paint the glow once into a canvas: a smooth bell-shaped falloff with light
    // dithering, so it looks blurred without a live CSS blur filter (which made
    // the fading hero heading ghost in some browsers).
    const glow = document.createElement('canvas');
    glow.className = 'page-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    // Painting takes ~100ms, so do it once the page is idle rather than during load
    const schedule = window.requestIdleCallback || function(fn) { return setTimeout(fn, 300); };
    schedule(function() { paintGlow(glow); });

    function paintGlow(canvas) {
        // Drawn at full size and blended against the dark page background
        // (--main-bg-color in dark mode, #121212), with dithering on each colour
        // channel. Blending ourselves avoids the 8-bit alpha steps that show up as
        // rings in a faint gradient on a dark background.
        const size = 1200;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const img = ctx.createImageData(size, size);
        const d = img.data;
        const c = size / 2;
        const bg = [18, 18, 18];
        const inner = [130, 40, 95];   // soft magenta, as in the work section
        const outer = [100, 50, 170];  // soft violet
        const peak = 0.18;             // max strength at the centre
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const t = Math.min(1, Math.hypot(x - c + 0.5, y - c + 0.5) / c);
                // Gaussian falloff, eased to exactly zero at the edge
                const a = peak * Math.exp(-3.5 * t * t) * (1 - t * t);
                const i = (y * size + x) * 4;
                for (let k = 0; k < 3; k++) {
                    const glowColour = inner[k] + (outer[k] - inner[k]) * t;
                    const v = bg[k] + (glowColour - bg[k]) * a;
                    // Triangular dither (about ±1 level) hides the remaining steps;
                    // faded out at the rim so the square canvas edge matches the flat page
                    const n = (Math.random() - Math.random()) * Math.min(1, a / 0.01);
                    d[i + k] = Math.max(0, Math.min(255, Math.round(v + n)));
                }
                d[i + 3] = 255;
            }
        }
        ctx.putImageData(img, 0, 0);
    }

    function restPoint() {
        return { x: window.innerWidth * 0.08, y: window.innerHeight * 0.05 };
    }

    let rest = restPoint();
    let currentX = rest.x, currentY = rest.y;
    let targetX = rest.x, targetY = rest.y;
    let running = false;

    function place() {
        glow.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
    }

    function tick() {
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        currentX += dx * 0.04;
        currentY += dy * 0.04;
        place();
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            requestAnimationFrame(tick);
        } else {
            running = false;
        }
    }

    function moveTo(x, y) {
        targetX = x;
        targetY = y;
        if (reduceMotion) {
            currentX = x; currentY = y; place();
            return;
        }
        if (!running) {
            running = true;
            requestAnimationFrame(tick);
        }
    }

    place();

    if (reduceMotion) return; // keep the glow resting at the top-left

    document.addEventListener('mousemove', function(e) {
        moveTo(e.clientX, e.clientY);
    });

    // Drift back to the top-left when the cursor leaves the window
    document.documentElement.addEventListener('mouseleave', function() {
        rest = restPoint();
        moveTo(rest.x, rest.y);
    });

    window.addEventListener('resize', function() {
        rest = restPoint();
    });
});
