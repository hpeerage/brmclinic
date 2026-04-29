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

    // 1. Dynamic Content Rendering
    const data = getClinicData();
    
    // Hero
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    const heroSection = document.getElementById('home');
    if (heroTitle && data.hero) {
        heroTitle.innerText = data.hero.title;
        heroSubtitle.innerText = data.hero.subtitle;
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${data.hero.bgImg}')`;
    }

    // Director
    const directorName = document.querySelector('.director-text h2 strong');
    const directorTitle = document.querySelector('.director-text h3');
    const directorPhil = document.querySelector('.director-philosophy');
    const directorImg = document.querySelector('.director-image img');
    if (directorName && data.director) {
        directorName.innerText = data.director.name;
        directorTitle.innerText = data.director.title;
        directorPhil.innerText = data.director.philosophy;
        if (directorImg) directorImg.src = data.director.profileImg;
    }

    // Programs
    const programGrid = document.querySelector('.program-grid');
    if (programGrid) {
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

    // Cases (B/A)
    const casesGrid = document.querySelector('.cases-grid');
    if (casesGrid && data.cases) {
        casesGrid.innerHTML = data.cases.map(c => `
            <div class="case-card reveal">
                <div class="case-images">
                    <div class="case-before">
                        <img src="${c.before}" alt="Before">
                        <span>BEFORE</span>
                    </div>
                    <div class="case-after">
                        <img src="${c.after}" alt="After">
                        <span>AFTER</span>
                    </div>
                </div>
                <div class="case-info">
                    <h4>${c.title}</h4>
                </div>
            </div>
        `).join('');
    }

    // Gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid && data.gallery) {
        galleryGrid.innerHTML = data.gallery.map(g => `
            <div class="gallery-item reveal">
                <img src="${g.img}" alt="Gallery">
            </div>
        `).join('');
    }

    // Footer
    const footerAddress = document.querySelector('.footer-info p:nth-child(1)');
    const footerPhone = document.querySelector('.footer-info p:nth-child(2)');
    const footerHours = document.querySelector('.footer-info p:nth-child(3)');
    if (footerAddress && data.footer) {
        footerAddress.innerHTML = `주소: ${data.footer.address}`;
        footerPhone.innerHTML = `전화: ${data.footer.phone}`;
        footerHours.innerHTML = `영업시간: ${data.footer.hours}`;
    }

    // Partners
    const partnersGrid = document.getElementById('footer-partners-grid');
    if (partnersGrid && data.partners) {
        partnersGrid.innerHTML = data.partners.map(p => `
            <img src="${p.img}" alt="${p.name}" class="partner-logo">
        `).join('');
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
