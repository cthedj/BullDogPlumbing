(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      menu.dataset.open = String(!isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
        menu.dataset.open = 'false';
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.querySelectorAll('[data-whatsapp-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const area = String(data.get('area') || '').trim();
      const service = String(data.get('service') || '').trim();
      const message = String(data.get('message') || '').trim();
      const lines = [
        'Hi Bulldog Plumbing, I would like a free quote.',
        name && `Name: ${name}`,
        area && `Area: ${area}`,
        service && `Service: ${service}`,
        message && `Details: ${message}`
      ].filter(Boolean);
      const url = `https://wa.me/27724558877?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const toggle = carousel.querySelector('[data-carousel-toggle]');
    const status = carousel.querySelector('[data-carousel-status]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const interval = Number.parseInt(carousel.dataset.interval || '7000', 10);
    let activeIndex = 0;
    let timer;
    let userPaused = reducedMotion.matches;
    let interactionPaused = false;

    if (slides.length < 2) return;

    const stopTimer = () => {
      window.clearTimeout(timer);
      timer = undefined;
    };

    const schedule = () => {
      stopTimer();
      if (userPaused || interactionPaused || document.hidden) return;
      timer = window.setTimeout(() => {
        showSlide(activeIndex + 1);
        schedule();
      }, interval);
    };

    const updateToggle = () => {
      if (!toggle) return;
      const isPaused = userPaused;
      toggle.textContent = isPaused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-label', isPaused ? 'Play slideshow' : 'Pause slideshow');
    };

    function showSlide(requestedIndex, announce = false) {
      activeIndex = (requestedIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === activeIndex)));
      if (status) {
        const title = slides[activeIndex].getAttribute('aria-label')?.split(': ').slice(1).join(': ') || 'Project photograph';
        status.textContent = `Showing ${activeIndex + 1} of ${slides.length}: ${title}`;
        status.setAttribute('aria-live', announce ? 'polite' : 'off');
      }
    }

    const selectSlide = (index) => {
      showSlide(index, true);
      schedule();
    };

    previous?.addEventListener('click', () => selectSlide(activeIndex - 1));
    next?.addEventListener('click', () => selectSlide(activeIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => selectSlide(index)));

    toggle?.addEventListener('click', () => {
      userPaused = !userPaused;
      updateToggle();
      schedule();
    });

    carousel.addEventListener('pointerenter', () => {
      interactionPaused = true;
      stopTimer();
    });
    carousel.addEventListener('pointerleave', () => {
      interactionPaused = false;
      schedule();
    });
    carousel.addEventListener('focusin', () => {
      interactionPaused = true;
      stopTimer();
    });
    carousel.addEventListener('focusout', (event) => {
      if (carousel.contains(event.relatedTarget)) return;
      interactionPaused = false;
      schedule();
    });

    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', (event) => {
      userPaused = event.matches;
      updateToggle();
      schedule();
    });

    showSlide(0);
    updateToggle();
    schedule();
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
