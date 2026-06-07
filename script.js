/* ========================================
   DEVENDRA PORTFOLIO — script.js (v3 final)
======================================== */

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    }
  });
});

/* ---- FADE IN ON SCROLL ---- */
const fadeEls = document.querySelectorAll(
  '.build-card, .project-card, .skill-group, .timeline-item, .contact-card, .about-grid, .dev-os-body'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Slight stagger for sibling elements
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ========================================
   PROJECT DATA
======================================== */
const projectData = {
  onboarding: {
    num: '01',
    title: 'Client Onboarding Automation',
    subtitle: 'Automated client onboarding and structured document organization system.',
    problem: 'Manual onboarding created repetitive setup work and inconsistent organization across clients.',
    solution: 'Built an automated system to organize client onboarding, create structured folders, and prepare required documents — eliminating manual overhead entirely.',
    tools: ['n8n', 'Google Drive', 'Google Sheets', 'Webhooks'],
    images: [
      { src: 'assets/client onboarding/form.png', label: 'Onboarding Form' },
      { src: 'assets/client onboarding/clients detail.png', label: 'Client Sheet' },
      { src: 'assets/client onboarding/year folder.png', label: 'Year Folder' },
      { src: 'assets/client onboarding/gmail foler.png', label: 'Gmail Organization' },
      { src: 'assets/client onboarding/invoice & doc.png', label: 'Invoice & Docs' },
      { src: 'assets/client onboarding/VERSTY_Invoice_Template.png', label: 'Invoice Template' },
      { src: 'assets/client onboarding/VERSTY Authorization letter Template.png', label: 'Auth Letter' },
    ],
    workflow: [
      'Client Details Submission',
      'Year-Based Folder Creation',
      'Unique Client Folder Setup',
      'Document Organization',
      'Invoice Generation',
      'Authorization Letter Creation',
    ]
  },
  dentist: {
    num: '02',
    title: 'Dentist Appointment Workflow',
    subtitle: 'WhatsApp-based appointment booking automation for dental clinic inquiries.',
    problem: 'Manual appointment handling and inconsistent communication made scheduling error-prone and slow.',
    solution: 'Built a conversational appointment booking workflow with structured selection and automated confirmation — reducing back-and-forth to zero.',
    tools: ['WhatsApp', 'Automation Logic', 'Structured Workflow Design'],
    images: [
      { src: 'assets/dentist appointment/appointment chat 1.png', label: 'Chat Flow 1' },
      { src: 'assets/dentist appointment/appointment chat 2.png', label: 'Chat Flow 2' },
      { src: 'assets/dentist appointment/appointment chat 3.png', label: 'Chat Flow 3' },
    ]
  },
  invoice: {
    num: '03',
    title: 'Invoice Generator System',
    subtitle: 'Automated invoice generation and structured invoice tracking system.',
    problem: 'Manual invoice creation and repetitive tracking consumed significant time and introduced errors.',
    solution: 'Built a structured system for invoice generation and management — invoices are created, tracked, and organized automatically.',
    tools: ['Automation', 'Google Sheets', 'Document Generation'],
    images: [
      { src: 'assets/invoice generator/invoice form.png', label: 'Invoice Form' },
      { src: 'assets/invoice generator/invoice data.png', label: 'Invoice Tracker' },
      { src: 'assets/invoice generator/invoice data 2.png', label: 'Data View' },
    ]
  },
  payment: {
    num: '04',
    title: 'Payment Reminder Workflow',
    subtitle: 'Automated reminder workflow for overdue payments.',
    problem: 'Inconsistent payment follow-up and missed reminders led to delayed collections and manual outreach.',
    solution: 'Built a structured payment reminder system with tracking and automated communication — reminders go out on schedule without manual intervention.',
    tools: ['Automation', 'Email', 'Tracking Systems'],
    images: [
      { src: 'assets/payment reminder/reminder mail.png', label: 'Reminder Email' },
    ]
  },
  whatsapp: {
    num: '05',
    title: 'WhatsApp Follow-up Handler',
    subtitle: 'Structured WhatsApp follow-up handling system.',
    problem: 'Manual repetitive client follow-up consumed time and often fell through the cracks.',
    solution: 'Built workflow logic for organized and consistent communication — follow-ups are triggered automatically based on client status.',
    tools: ['WhatsApp', 'Workflow Logic', 'Communication Automation'],
    images: []
  }
};

/* ========================================
   MODAL
======================================== */
let currentImages = [];

function buildModalContent(data) {
  const toolsHTML = data.tools.map(t => `<span class="tag">${t}</span>`).join('');

  let galleryHTML = '';
  if (data.images && data.images.length > 0) {
    const imgs = data.images.map((img, i) =>
      `<div class="modal-gallery-item" data-index="${i}" role="button" tabindex="0" aria-label="View ${img.label}">
        <img src="${img.src}" alt="${img.label}" loading="lazy"
             draggable="false"
             onerror="this.parentElement.style.display='none'" />
      </div>`
    ).join('');
    galleryHTML = `
      <p class="modal-section-title">Gallery</p>
      <p class="modal-gallery-hint">Click any image to view full size</p>
      <div class="modal-gallery" id="modal-gallery">${imgs}</div>
    `;
  }

  let workflowHTML = '';
  if (data.workflow && data.workflow.length > 0) {
    const steps = data.workflow.map((step, i) => {
      const arrow = i < data.workflow.length - 1 ? '<div class="workflow-arrow">↓</div>' : '';
      return `<div class="workflow-step"><div class="workflow-step-box">${step}</div>${arrow}</div>`;
    }).join('');
    workflowHTML = `
      <p class="modal-section-title">Workflow Pathway</p>
      <div class="workflow-diagram">${steps}</div>
    `;
  }

  return `
    <div class="modal-tag">Project ${data.num}</div>
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-subtitle">${data.subtitle}</p>
    <div class="modal-divider"></div>
    <p class="modal-section-title">Problem</p>
    <p class="modal-text">${data.problem}</p>
    <p class="modal-section-title">Solution</p>
    <p class="modal-text">${data.solution}</p>
    <p class="modal-section-title">Tools Used</p>
    <div class="modal-tools">${toolsHTML}</div>
    ${galleryHTML}
    ${workflowHTML}
  `;
}

const modalOverlay = document.getElementById('modal-overlay');
const modalInner   = document.getElementById('modal-inner');
const modalClose   = document.getElementById('modal-close');

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const data = projectData[card.getAttribute('data-project')];
    if (!data) return;

    currentImages = data.images || [];
    modalInner.innerHTML = buildModalContent(data);
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Bind gallery click → image viewer
    const gallery = document.getElementById('modal-gallery');
    if (gallery) {
      gallery.querySelectorAll('.modal-gallery-item').forEach(item => {
        const open = () => openImgView(parseInt(item.dataset.index, 10));
        item.addEventListener('click', open);
        item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      });
    }
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { modalInner.innerHTML = ''; }, 400);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

document.addEventListener('keydown', e => {
  if (imgViewOverlay.classList.contains('open')) return; // let imgview handle
  if (e.key === 'Escape') closeModal();
});

/* ========================================
   IMAGE VIEWER (read-only, no zoom/expand)
======================================== */
const imgViewOverlay = document.getElementById('imgview-overlay');
const imgViewImg     = document.getElementById('imgview-img');
const imgViewLabel   = document.getElementById('imgview-label');
const imgViewCounter = document.getElementById('imgview-counter');
const imgViewPrev    = document.getElementById('imgview-prev');
const imgViewNext    = document.getElementById('imgview-next');

let ivIndex = 0;

function updateImgViewNav() {
  imgViewPrev.classList.toggle('hidden', ivIndex === 0);
  imgViewNext.classList.toggle('hidden', ivIndex >= currentImages.length - 1);
  imgViewCounter.textContent = currentImages.length > 1 ? `${ivIndex + 1} / ${currentImages.length}` : '';
}

function setImgViewImage(index) {
  ivIndex = index;
  imgViewImg.classList.remove('loaded');
  imgViewImg.src = currentImages[ivIndex].src;
  imgViewImg.alt = currentImages[ivIndex].label || '';
  imgViewLabel.textContent = currentImages[ivIndex].label || '';
  imgViewImg.onload  = () => imgViewImg.classList.add('loaded');
  imgViewImg.onerror = () => imgViewImg.classList.add('loaded');
  updateImgViewNav();
}

function openImgView(index) {
  if (!currentImages || currentImages.length === 0) return;
  imgViewOverlay.classList.add('open');
  setImgViewImage(index);
}

function closeImgView() {
  imgViewOverlay.classList.remove('open');
  imgViewImg.src = '';
  imgViewImg.classList.remove('loaded');
}

document.getElementById('imgview-close').addEventListener('click', closeImgView);
imgViewPrev.addEventListener('click', () => { if (ivIndex > 0) setImgViewImage(ivIndex - 1); });
imgViewNext.addEventListener('click', () => { if (ivIndex < currentImages.length - 1) setImgViewImage(ivIndex + 1); });

imgViewOverlay.addEventListener('click', e => {
  if (e.target === imgViewOverlay) closeImgView();
});

document.addEventListener('keydown', e => {
  if (!imgViewOverlay.classList.contains('open')) return;
  if (e.key === 'Escape')     closeImgView();
  if (e.key === 'ArrowLeft')  { if (ivIndex > 0) setImgViewImage(ivIndex - 1); }
  if (e.key === 'ArrowRight') { if (ivIndex < currentImages.length - 1) setImgViewImage(ivIndex + 1); }
});

// Touch swipe for mobile
let touchStartX = 0;
imgViewOverlay.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
imgViewOverlay.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx < 0 && ivIndex < currentImages.length - 1) setImgViewImage(ivIndex + 1);
    if (dx > 0 && ivIndex > 0) setImgViewImage(ivIndex - 1);
  }
}, { passive: true });
