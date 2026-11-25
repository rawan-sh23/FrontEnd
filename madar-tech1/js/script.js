/* ============================================================
   1) تأثير Navbar عند التمرير (تصغير + ظل)
============================================================ */
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ============================================================
   2) قائمة الموبايل - إغلاق تلقائي عند اختيار رابط
============================================================ */
const navbarNav = document.getElementById('navbarNav');
if (navbarNav) {
  const navLinks = navbarNav.querySelectorAll('.nav-link, .btn-book');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarNav.classList.contains('show') && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(navbarNav, { toggle: false });
        bsCollapse.hide();
      }
    });
  });
}

/* ============================================================
   3) تمييز رابط التنقل النشط أثناء التمرير (Scroll Spy بسيط)
============================================================ */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    const link = document.querySelector('.navbar-nav .nav-link[href="#' + id + '"]');
    if (!link) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

/* ============================================================
   4) نموذج التواصل - إرسال البيانات على واتساب
============================================================ */
const contactForm = document.getElementById('contactForm');
const WHATSAPP_NUMBER = '972598202765'; 

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
      alert('الرجاء تعبئة جميع الحقول.');
      return;
    }

    const text =` مرحباً مدار تك
الاسم: ${name}
البريد: ${email}
الهاتف: ${phone}
الرسالة: ${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');

    contactForm.reset();
  });
}

/* ============================================================
   5) زر "اعرف المزيد" للبرامج التدريبية
============================================================ */
document.querySelectorAll('.btn-program').forEach(btn => {
  btn.addEventListener('click', () => {
    const programName = btn.dataset.program;
    const msg =` أرغب بمعرفة تفاصيل برنامج: ${programName}`;
    
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  });
});

/* ============================================================
   6) سنة الحقوق تلقائياً في الفوتر
============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   7) ظهور الأقسام بحركة Fade-in عند التمرير (IntersectionObserver)
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('section .row, .section-title, .info-card, .service-card, .program-card, .why-card').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(el);
});