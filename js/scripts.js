(() => {
  'use strict';

  const products = [
    {
      title: 'Demon Slayer collector figurine',
      category: 'figurines',
      price: 'R650',
      tags: ['Figurine', 'Action', 'Limited stock'],
      description: 'A detailed collectible figure for display shelves and fan collections.'
    },
    {
      title: 'Jujutsu Kaisen manga volume set',
      category: 'manga',
      price: 'R540',
      tags: ['Manga', 'Box set', 'Popular'],
      description: 'A curated set of popular manga volumes for readers building a shelf collection.'
    },
    {
      title: 'One Piece collector poster',
      category: 'posters',
      price: 'R180',
      tags: ['Poster', 'Wall art', 'A2 size'],
      description: 'High-quality printed poster artwork suitable for bedrooms, offices and study spaces.'
    },
    {
      title: 'Naruto display figurine',
      category: 'figurines',
      price: 'R720',
      tags: ['Figurine', 'Display', 'Premium'],
      description: 'A premium display piece with careful packaging and availability confirmation.'
    },
    {
      title: 'Berserk deluxe manga volume',
      category: 'manga',
      price: 'R320',
      tags: ['Manga', 'Deluxe', 'Collector'],
      description: 'A deluxe manga volume request option for customers seeking specific editions.'
    },
    {
      title: 'Attack on Titan poster pack',
      category: 'posters',
      price: 'R300',
      tags: ['Poster', 'Pack', 'Wall art'],
      description: 'A multi-poster pack for fans who want a coordinated display theme.'
    },
    {
      title: 'Special order research',
      category: 'support',
      price: 'Free quote',
      tags: ['Support', 'Special order', 'Quote'],
      description: 'Submit a product enquiry and the team will research availability and pricing.'
    },
    {
      title: 'Product care advice',
      category: 'support',
      price: 'Free support',
      tags: ['Support', 'Care', 'Advice'],
      description: 'Get guidance on cleaning, displaying and protecting collectible merchandise.'
    }
  ];

  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('primary-menu');

    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initProductCatalogue() {
    const grid = document.getElementById('service-grid');
    const search = document.getElementById('service-search');
    const filter = document.getElementById('category-filter');
    const reset = document.getElementById('reset-filters');
    const count = document.getElementById('result-count');

    if (!grid || !search || !filter) {
      return;
    }

    function renderProducts() {
      const term = search.value.trim().toLowerCase();
      const category = filter.value;
      const filtered = products.filter((product) => {
        const matchesSearch = [product.title, product.description, product.category, ...product.tags]
          .join(' ')
          .toLowerCase()
          .includes(term);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesCategory;
      });

      count.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'} shown.`;

      if (filtered.length === 0) {
        grid.innerHTML = '<p class="notice">No products match your search. Try a different keyword or category.</p>';
        return;
      }

      grid.innerHTML = filtered.map((product) => `
        <article class="product-card">
          <h3>${escapeHTML(product.title)}</h3>
          <p>${escapeHTML(product.description)}</p>
          <div class="product-meta">
            ${product.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}
          </div>
          <p class="product-price">${escapeHTML(product.price)}</p>
          <a href="enquiry.html">Enquire about this product</a>
        </article>
      `).join('');
    }

    search.addEventListener('input', renderProducts);
    filter.addEventListener('change', renderProducts);

    if (reset) {
      reset.addEventListener('click', () => {
        search.value = '';
        filter.value = 'all';
        renderProducts();
        search.focus();
      });
    }

    renderProducts();
  }

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((tabs) => {
      const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
      const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.getAttribute('aria-controls');

          buttons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-selected', String(isActive));
          });

          panels.forEach((panel) => {
            panel.hidden = panel.id !== target;
            panel.classList.toggle('active', panel.id === target);
          });
        });
      });
    });
  }

  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
      accordion.querySelectorAll('.accordion-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const panel = document.getElementById(trigger.getAttribute('aria-controls'));
          const expanded = trigger.getAttribute('aria-expanded') === 'true';

          trigger.setAttribute('aria-expanded', String(!expanded));
          if (panel) {
            panel.hidden = expanded;
          }
        });
      });
    });
  }

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const caption = document.getElementById('lightbox-caption');
    const close = document.querySelector('.lightbox-close');

    if (!lightbox || !image || !title || !caption || !close) {
      return;
    }

    function openLightbox(button) {
      image.src = button.dataset.full;
      image.alt = button.dataset.title || 'Enlarged gallery image';
      title.textContent = button.dataset.title || 'Gallery image';
      caption.textContent = button.dataset.caption || '';
      lightbox.hidden = false;
      close.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      image.removeAttribute('src');
      image.alt = '';
    }

    document.querySelectorAll('.gallery-item').forEach((button) => {
      button.addEventListener('click', () => openLightbox(button));
    });

    close.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  function getErrorElement(field) {
    return document.getElementById(`${field.id}-error`);
  }

  function clearFieldError(field) {
    const error = getErrorElement(field);
    field.removeAttribute('aria-invalid');
    if (error) {
      error.textContent = '';
    }
  }

  function validateField(field) {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const error = getErrorElement(field);
    let message = '';

    if (field.required && !value) {
      message = 'This field is required.';
    } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Enter a valid email address.';
    } else if (field.minLength > 0 && value && value.length < field.minLength) {
      message = `Enter at least ${field.minLength} characters.`;
    } else if (field.pattern && value && !new RegExp(field.getAttribute('pattern')).test(value)) {
      message = 'Enter the value in the correct format.';
    }

    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }

    if (error) {
      error.textContent = message;
    }

    return !message;
  }

  function initForm(form, successCallback) {
    if (!form) {
      return;
    }

    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    const response = form.querySelector('.form-response');

    fields.forEach((field) => {
      const eventName = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(eventName, () => validateField(field));
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const valid = fields.map(validateField).every(Boolean);

      if (!valid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (response) {
          response.textContent = 'Please correct the highlighted fields before submitting.';
        }
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      successCallback(form, fields);
      form.reset();
      fields.forEach(clearFieldError);
    });
  }

  function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    const response = document.getElementById('enquiry-response');

    initForm(form, (submittedForm) => {
      const data = new FormData(submittedForm);
      const date = data.get('preferredDate');
      const type = data.get('enquiryType');

      if (response) {
        response.textContent = `Thank you. Your ${type.toLowerCase()} has been received. A quote or availability update will be emailed within 24 hours of ${date}.`;
      }
    });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const response = document.getElementById('contact-response');
    const preview = document.getElementById('email-preview');

    initForm(form, (submittedForm) => {
      const data = new FormData(submittedForm);
      const email = [
        'To: animehaven@gmail.com',
        `From: ${data.get('name')} <${data.get('email')}>`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Subject: ${data.get('messageType')}`,
        '',
        data.get('message')
      ].join('\n');

      if (response) {
        response.textContent = 'Your message has been prepared. Review the email preview below before sending it through your email client.';
      }

      if (preview) {
        preview.hidden = false;
        preview.textContent = email;
      }
    });
  }

  function initMap() {
    const mapElement = document.getElementById('map');
    const fallback = document.getElementById('map-fallback');

    if (!mapElement || !window.L) {
      if (fallback) {
        fallback.hidden = false;
      }
      return;
    }

    const map = window.L.map(mapElement, { scrollWheelZoom: false }).setView([-30.5595, 22.9375], 5);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    window.L.marker([-26.2041, 28.0473]).addTo(map)
      .bindPopup('Anime Haven service region: South Africa')
      .openPopup();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProductCatalogue();
    initTabs();
    initAccordions();
    initLightbox();
    initEnquiryForm();
    initContactForm();
    initMap();
  });
})();
