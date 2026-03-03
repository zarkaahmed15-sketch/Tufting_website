/* ===========================================
   KNOT & KEY — main.js

   Modules:
   1. Custom cursor
   2. Scroll tilt card
   3. Card spotlight effect
   4. Scroll reveal animaties
=========================================== */


/* ===========================================
   1. CUSTOM CURSOR

   - .cur  : kleine bol die direct de muis volgt
   - .ring : grote ring die achterloopt via lerp
   - Beide krijgen class .b bij hover op
     interactieve elementen
=========================================== */

const curEl  = document.getElementById('cur');
const ringEl = document.getElementById('ring');

// Huidige muis positie
let mouseX = 0;
let mouseY = 0;

// Ring positie (loopt achter via lineaire interpolatie)
let ringX = 0;
let ringY = 0;

// Muis positie bijhouden
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Kleine cursor volgt direct
    curEl.style.left = mouseX + 'px';
    curEl.style.top  = mouseY + 'px';
});

// Ring animeert met lerp (easing inhalen)
function animateRing() {
    // Lerp factor: hoe hoger, hoe sneller de ring inhaalt
    const lerpFactor = 0.1;

    ringX += (mouseX - ringX) * lerpFactor;
    ringY += (mouseY - ringY) * lerpFactor;

    ringEl.style.left = ringX + 'px';
    ringEl.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
}

animateRing();

// Vergroot cursor bij hover op interactieve elementen
const interactiveEls = document.querySelectorAll(
    'a, button, .pcard, .fc, .prc, .td, .pbtn'
);

interactiveEls.forEach((el) => {
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
   2. SCROLL TILT CARD

   De collectie-kaart begint met rotateX(16deg)
   (lichtjes achterover gekanteld). Zodra de kaart
   hoog genoeg in beeld is, wordt .flat toegevoegd
   wat de kaart recht zet via CSS transition.
=========================================== */

const cardWrap = document.getElementById('cwrap');

function handleTiltOnScroll() {
    const rect      = cardWrap.getBoundingClientRect();
    const threshold = window.innerHeight * 0.65;

    if (rect.top < threshold) {
        cardWrap.classList.add('flat');
    } else {
        cardWrap.classList.remove('flat');
    }
}

window.addEventListener('scroll', handleTiltOnScroll, { passive: true });

// Ook direct checken bij laden (als pagina al gescrolld is)
handleTiltOnScroll();


/* ===========================================
   3. CARD SPOTLIGHT EFFECT

   Volgt de muispositie binnen de kaart en
   update de CSS custom properties --mx en --my.
   De .cspot overlay gebruikt deze waarden voor
   een radial-gradient spotlight effect.
=========================================== */

const bigCard    = document.getElementById('bcard');
const spotEl     = document.getElementById('cspot');

bigCard.addEventListener('mousemove', (e) => {
    const rect = bigCard.getBoundingClientRect();

    // Bereken positie als percentage van de kaart
    const xPercent = ((e.clientX - rect.left) / rect.width)  * 100;
    const yPercent = ((e.clientY - rect.top)  / rect.height) * 100;

    spotEl.style.setProperty('--mx', xPercent + '%');
    spotEl.style.setProperty('--my', yPercent + '%');
});


/* ===========================================
   4. SCROLL REVEAL ANIMATIES

   Elementen met class .rev starten onzichtbaar
   (opacity: 0, translateY: 26px via CSS).
   IntersectionObserver voegt .in toe zodra een
   element in het viewport komt, wat de CSS
   transition triggert.
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

// Observeer alle elementen met .rev class
document.querySelectorAll('.rev').forEach((el) => {
    revealObserver.observe(el);
});