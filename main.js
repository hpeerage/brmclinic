document.addEventListener('DOMContentLoaded', () => {
    // 1. Before & After Slider Logic
    const baSlider = document.getElementById('ba-slider');
    const baHandle = document.getElementById('ba-handle');
    const imgAfter = document.querySelector('.img-after');
    const baDivider = document.querySelector('.ba-divider');

    if (baHandle) {
        baHandle.addEventListener('input', (e) => {
            const val = e.target.value;
            imgAfter.style.clipPath = `inset(0 0 0 ${val}%)`;
            baDivider.style.left = `${val}%`;
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(255, 255, 255, 0.7)';
        }
    });

    // 3. Dynamic Program Rendering & Reveal Animation
    const programGrid = document.querySelector('.program-grid');
    if (programGrid) {
        const data = getClinicData();
        programGrid.innerHTML = data.programs.map(prog => `
            <div class="program-card reveal">
                <div class="program-image" style="background-image: url('${prog.img}');"></div>
                <div class="program-content">
                    <div class="card-icon"><i data-feather="${prog.icon}"></i></div>
                    <h3>${prog.title}</h3>
                    <p>${prog.desc}</p>
                    <a href="https://booking.naver.com/booking/13/bizes/551528" target="_blank" class="card-link">예약하기 →</a>
                </div>
            </div>
        `).join('');
        feather.replace();
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    setTimeout(() => {
        document.querySelectorAll('.reveal, .stat-item, .blog-card, .section-header').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }, 100);

    // 4. Naver Reservation Bridge Simulation
    const reservationLinks = document.querySelectorAll('a[href*="booking.naver.com"]');
    reservationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Here we could implement the "Bridge Page" overlay
            // For now, let's just log it
            console.log('Redirecting to Naver Reservation with premium transition...');
        });
    });
});
