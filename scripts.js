'use strict';

// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('up', window.scrollY > 20), { passive: true });

// Hamburger
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  drawer.setAttribute('aria-hidden', !open);
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  drawer.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
}));

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('on'));
      const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (match) match.classList.add('on');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObs.observe(s));

// Scroll reveal — observer propre, un observe() par élément
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.rev').forEach(el => revObs.observe(el));

// Contact form — Formspree AJAX
const form   = document.getElementById('cform');
const fmsg   = document.getElementById('fmsg');
const fsubtn = document.getElementById('fsub');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    fsubtn.disabled = true;
    fsubtn.textContent = 'Envoi en cours…';
    fmsg.className = 'fmsg';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        fmsg.className = 'fmsg ok';
        fmsg.textContent = '✓ Message envoyé ! Nous vous répondrons rapidement.';
        form.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      fmsg.className = 'fmsg err';
      fmsg.textContent = '✗ Erreur d\'envoi. Appelez-nous au 027 322 00 92.';
    }
    fsubtn.disabled = false;
    fsubtn.textContent = 'Envoyer le message';
  });
}

// Back to top
const backTop = document.getElementById('back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Legal TOC active highlight
const tocLinks = document.querySelectorAll('.legal-toc-list a');
if (tocLinks.length) {
  const legalObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.legal-toc-list a[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('.legal-article[id]').forEach(s => legalObs.observe(s));
}

// ----------------------------------------------------------------
// SERVICE MODAL
// ----------------------------------------------------------------
const CDN = 'https://le-de.cdn-website.com/c7655ccd21fa48e39d5a322607a67e62/dms3rep/multi/opt/';
const svcData = {
  'Cordonnerie': {
    badge: 'Service principal', badgeMod: '',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-5-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-6-1920w.jpg'],
    desc: '<p>La réparation de chaussures est notre cœur de métier depuis 2004. Tiges, talons, semelles extérieures et intérieures, fermetures éclairs, boucles — notre atelier maîtrise toutes les techniques de cordonnerie traditionnelle.</p><p>Nous intervenons sur tous types de chaussures : de ville, sport, randonnée, bottines et bottes. Des petites réparations express aux restaurations complètes, chaque paire est traitée avec le soin d\'un véritable artisan.</p><p>Nous réparons également les coutures de vestes, pantalons, sacs et autres articles en tissu ou en cuir.</p>',
    features: ['Réparation semelles et talons', 'Remplacement de fermetures éclairs', 'Coutures et retouches vestes & sacs', 'Tous types de chaussures traités']
  },
  'Clés & Accès': {
    badge: 'Duplication rapide', badgeMod: '',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-7-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-8-1920w.jpg'],
    desc: '<p>Du simple double de clé à la clé transpondeur la plus sophistiquée, nous maîtrisons toute la gamme. Cylindres simples, clés protégées haute sécurité, clés de caves et chambres — la duplication se fait en quelques minutes.</p><p>Nous prenons également en charge les transpondeurs de voitures (la plupart des marques), les télécommandes de garages et portails, ainsi que les clés et combinaisons de coffres-forts.</p>',
    features: ['Cylindres simples et clés protégées', 'Transpondeurs voiture toutes marques', 'Télécommandes garages & portails', 'Coffres-forts et clés spéciales']
  },
  'Maroquinerie italienne': {
    badge: 'Italie · Premium', badgeMod: '--r',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-9-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-10-1920w.jpg'],
    desc: '<p>Nous sélectionnons pour vous les meilleures maroquineries artisanales d\'Italie : ceintures en cuir pleine fleur, sacs Old Tuscani (Chiarugi), porte-monnaies et porte-clés de qualité supérieure.</p><p>Notre sélection inclut également les porte-cartes sécurisés Secrid, dotés d\'une protection RFID contre les paiements sans contact non désirés. Un arrivage fréquent de nouvelles pièces renouvelle régulièrement notre vitrine.</p>',
    features: ['Ceintures cuir pleine fleur', 'Sacs Old Tuscani (Chiarugi)', 'Porte-cartes sécurisés Secrid RFID', 'Porte-monnaies et petite maroquinerie']
  },
  'Gravures': {
    badge: 'Sur mesure', badgeMod: '--r',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-11-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-12-1920w.jpg'],
    desc: '<p>Personnalisez vos objets avec notre service de gravure de précision. Plaques commerciales et boîtes aux lettres, bijoux (alliances, bagues, bracelets, pendentifs), couteaux et couverts, stylos et objets personnels.</p><p>Nous confectionnons également des tampons Colop et Trodat dans tous les formats : choix de typographie, taille et couleur d\'encre personnalisés. Un service apprécié aussi bien par les particuliers que les entreprises.</p>',
    features: ['Boîtes aux lettres & plaques commerciales', 'Bijoux, alliances et montres', 'Couteaux, stylos et objets personnels', 'Tampons Colop & Trodat sur mesure']
  },
  'Coutellerie': {
    badge: 'Victorinox + grandes marques', badgeMod: '--r',
    imgs: [CDN+'victorinox-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-13-1920w.jpg'],
    desc: '<p>Partenaires officiels Victorinox, nous proposons 99 % du catalogue de la marque suisse emblématique : couteaux suisses, couteaux de poche, outils de cuisine, accessoires de voyage. Conseil expert pour choisir le modèle adapté à votre usage.</p><p>En complément, nous vendons Laguiole, Opinel, Thiers, Buck, Old Bear, CRK et Spyderco pour les amateurs de coutellerie fine et de collection.</p>',
    features: ['99 % du catalogue Victorinox', 'Laguiole, Opinel, Thiers, Opinel', 'Buck, Old Bear, CRK, Spyderco', 'Conseil personnalisé sur chaque couteau']
  },
  'Aiguisage': {
    badge: 'Professionnel', badgeMod: '',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-14-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-15-1920w.jpg'],
    desc: '<p>Un couteau bien aiguisé est un outil sûr et efficace. Notre service d\'affûtage professionnel redonné vie à vos lames émoussées avec un résultat digne d\'un coutelier.</p><p>Nous affûtons couteaux de cuisine (toutes tailles), couteaux de poche, ciseaux de coiffure, ciseaux de jardinage et sécateurs. Travail réalisé sur place, résultat en quelques minutes pour les petites pièces.</p>',
    features: ['Couteaux de cuisine toutes tailles', 'Ciseaux de coiffure et de jardinage', 'Sécateurs et outils de jardin', 'Résultat professionnel garanti']
  },
  'Entretien du cuir': {
    badge: 'Saphir · Famaco · Prestige', badgeMod: '',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-16-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-17-1920w.jpg'],
    desc: '<p>Le cuir bien entretenu dure des décennies. Nous proposons une sélection complète de produits des meilleures marques : Saphir, Famaco Paris, Prestige, Ringelspitz — crèmes, cirages, imperméabilisants et protecteurs pour tous types de cuir.</p><p>Également disponibles : semelles intérieures sur mesure, lacets de toutes longueurs et couleurs, embauchoirs en bois, tendeurs de bottes et tire-bottes. Et pour offrir : coffrets cadeaux Famaco Paris.</p>',
    features: ['Produits Saphir, Famaco Paris, Prestige', 'Semelles intérieures sur mesure', 'Lacets, embauchoirs et accessoires', 'Coffrets cadeaux Famaco Paris']
  },
  'Montres & petits services': {
    badge: 'HIRSCH · Toutes marques', badgeMod: '',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-18-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-5-1920w.jpg'],
    desc: '<p>Nous remplaçons les piles de montre sur place en quelques minutes, pour toutes marques sans exception. Service rapide sans rendez-vous, vous repartez immédiatement.</p><p>Nous proposons également un large choix de bracelets de montre HIRSCH — cuir, caoutchouc, tissu et métal — dans de nombreux modèles et coloris pour redonner un coup de jeune à votre montre préférée.</p>',
    features: ['Remplacement de piles toutes marques', 'Bracelets HIRSCH en cuir & caoutchouc', 'Large choix de modèles et coloris', 'Service express sans rendez-vous']
  },
  'Conseil en 6 langues': {
    badge: 'Accueil personnalisé', badgeMod: '--r',
    imgs: [CDN+'Cordonnerie-Multi-Services-Sarl-6-1920w.jpg', CDN+'Cordonnerie-Multi-Services-Sarl-7-1920w.jpg'],
    desc: '<p>Notre équipe vous accueille et vous conseille en français, allemand, anglais, albanais, serbe et croate. Un atout rare et précieux en Valais, particulièrement apprécié de notre clientèle internationale et frontalière.</p><p>Chaque client est guidé dans sa langue pour une expérience de service optimale. Nous prenons le temps d\'écouter votre besoin et de vous proposer la solution la mieux adaptée, quel que soit le service demandé.</p>',
    features: ['Conseil en français et allemand', 'Conseil en anglais et albanais', 'Conseil en serbe et croate', 'Accueil chaleureux pour tous les clients']
  }
};

(function initSvcModal() {
  const modal   = document.getElementById('svc-modal');
  const overlay = document.getElementById('svc-modal-overlay');
  const closeBtn = document.getElementById('svc-modal-close');
  const imgsEl  = document.getElementById('svc-modal-imgs');
  const badgeEl = document.getElementById('svc-modal-badge');
  const titleEl = document.getElementById('svc-modal-title');
  const descEl  = document.getElementById('svc-modal-desc');
  const featEl  = document.getElementById('svc-modal-features');

  function openModal(svc) {
    const d = svcData[svc];
    if (!d) return;

    badgeEl.textContent = d.badge;
    badgeEl.className = 'svc-modal-badge' + (d.badgeMod ? ' svc-modal-badge' + d.badgeMod : '');
    titleEl.textContent = svc;
    descEl.innerHTML = d.desc;
    featEl.innerHTML = d.features.map(f => `<li>${f}</li>`).join('');
    imgsEl.innerHTML = d.imgs.map((src, i) =>
      `<img src="${src}" alt="${svc} — photo ${i+1}" loading="lazy">`
    ).join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('.svc-card').forEach(card => {
    const h3 = card.querySelector('.svc-h3');
    if (!h3) return;
    const svcName = h3.textContent.replace(/&amp;/g, '&').trim();
    if (!svcData[svcName]) return;

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Voir les détails : ${svcName}`);

    const btn = document.createElement('button');
    btn.className = 'svc-more';
    btn.setAttribute('aria-hidden', 'true');
    btn.tabIndex = -1;
    btn.innerHTML = 'En savoir plus <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    card.appendChild(btn);

    card.addEventListener('click', () => openModal(svcName));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(svcName); }
    });
  });
})();

// Cookie banner RGPD (bannière custom — remplacée par Cookiebot une fois le CBID configuré)
const cookie = document.getElementById('cookie');
if (cookie) {
  if (!localStorage.getItem('ck')) {
    setTimeout(() => cookie.classList.add('show'), 1000);
  }
  document.getElementById('ck-yes')?.addEventListener('click', () => {
    localStorage.setItem('ck', 'yes'); cookie.classList.remove('show');
  });
  document.getElementById('ck-no')?.addEventListener('click', () => {
    localStorage.setItem('ck', 'no'); cookie.classList.remove('show');
  });
}
