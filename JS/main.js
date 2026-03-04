/* ===========================================
   KNOT & KEY — main.js

   Modules:
   1. Custom cursor
   2. Scroll reveal animaties
=========================================== */


/* ===========================================
   1. CUSTOM CURSOR

   - .cur  : kleine bol volgt muis direct
   - .ring : grote ring loopt achter via lerp
   - Beide krijgen class .b bij hover op
     klikbare elementen
=========================================== */

const curEl  = document.getElementById('cur');
const ringEl = document.getElementById('ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    curEl.style.left = mouseX + 'px';
    curEl.style.top  = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ringEl.style.left = ringX + 'px';
    ringEl.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}

animateRing();

// Vergroot cursor bij hover op interactieve elementen
document.querySelectorAll('a, button, .pcard, .hpcard, .prc, .cd, .mat-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        curEl.classList.add('b');
        ringEl.classList.add('b');
    });
    el.addEventListener('mouseleave', () => {
        curEl.classList.remove('b');
        ringEl.classList.remove('b');
    });
});


/* ===========================================
   2. SCROLL REVEAL ANIMATIES

   Elementen met class .rev starten onzichtbaar.
   IntersectionObserver voegt .in toe zodra ze
   in het viewport komen — CSS doet de rest.
=========================================== */

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.rev').forEach((el) => {
    revealObserver.observe(el);
});