import { useCallback, useEffect, useRef, useState } from 'react';
import brandLogo from './assets/mangdae-logo.svg';
import menuMark from './assets/menu-mark.svg';
import heroImage from './assets/hero.jpg';
import morphImage from './assets/morph.jpg';
import lucidImage from './assets/lucid.jpg';
import hazeImage from './assets/haze.jpg';
import { CONTACT_EMAIL, COPYRIGHT } from './siteConfig.js';

const collections = [
  { id: 'morph', name: 'MORPH', image: morphImage },
  { id: 'lucid', name: 'LUCID', image: lucidImage },
  { id: 'haze', name: 'HAZE', image: hazeImage },
];

const navigation = [
  { label: 'ABOUT US', id: 'about-us' },
  { label: 'NEW IN', id: 'new-in' },
  { label: 'PRODUCTS', id: 'products' },
  { label: 'ONLINE SHOP', id: 'online-shop' },
  { label: 'CONTACT US', id: 'contact-us' },
];

function initialRoute() {
  return decodeURIComponent(window.location.hash.slice(1)).toLowerCase();
}

function CollectionCard({ collection, onSelect }) {
  return (
    <button
      type="button"
      className={`collection-pill collection-pill--${collection.id}`}
      onClick={() => onSelect(collection.id)}
      aria-label={`View ${collection.name} eyewear collection`}
    >
      <span className="collection-pill__picture" aria-hidden="true">
        <img src={collection.image} alt="" draggable="false" />
      </span>
      <span className="collection-pill__veil" aria-hidden="true" />
      <span className="collection-pill__inner">
        <span className="collection-pill__name">{collection.name}</span>
        <span className="collection-pill__arrow" aria-hidden="true" />
      </span>
    </button>
  );
}

function SectionContent({ route, onCollection }) {
  const selection = collections.find((collection) => collection.id === route);

  if (selection) {
    return (
      <div className="detail-layout">
        <div className="detail-layout__photo">
          <img src={selection.image} alt={`${selection.name} eyewear collection`} />
        </div>
        <div className="detail-layout__text">
          <span className="eyebrow">THE COLLECTION</span>
          <h2>{selection.name}</h2>
          <p>More than eyewear.</p>
          <button className="outline-link" onClick={() => onCollection(null)} type="button">
            <span>ALL COLLECTIONS</span><span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    );
  }

  if (route === 'about-us') {
    return (
      <div className="editorial-content">
        <span className="eyebrow">ABOUT US</span>
        <h2>MORE THAN<br />EYEWEAR.</h2>
        <p>Welcome to MANGDAE. Discover a new perspective through our eyewear collections.</p>
      </div>
    );
  }

  if (route === 'new-in' || route === 'products' || route === 'online-shop') {
    const title = { 'new-in': 'NEW IN', products: 'PRODUCTS', 'online-shop': 'ONLINE SHOP' }[route];
    return (
      <div className="editorial-content editorial-content--wide">
        <span className="eyebrow">MANGDAE / EXPLORE</span>
        <h2>{title}</h2>
        <p>{route === 'online-shop' ? 'Browse the collections. Checkout is not part of this frontend-only preview.' : 'Explore the featured collections.'}</p>
        <div className="showcase-grid">
          {collections.map((collection) => (
            <button key={collection.id} className="showcase-card" type="button" onClick={() => onCollection(collection.id)}>
              <img src={collection.image} alt="" />
              <span>{collection.name}<span aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (route === 'contact-us') {
    return (
      <div className="editorial-content">
        <span className="eyebrow">GET IN TOUCH</span>
        <h2>CONTACT<br />US.</h2>
        <p>Have a question about the collections? Start a message in your email application.</p>
        <a className="outline-link" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('MANGDAE inquiry')}`}>
          <span>WRITE AN EMAIL</span><span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }
  return null;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState(initialRoute);
  const [email, setEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const menuButtonRef = useRef(null);
  const overlayCloseRef = useRef(null);
  const modalOpen = Boolean(route);

  const navigate = useCallback((nextRoute) => {
    const normalized = nextRoute || '';
    setRoute(normalized);
    setMenuOpen(false);
    setFormMessage('');
    const nextHash = normalized ? `#${encodeURIComponent(normalized)}` : window.location.pathname + window.location.search;
    window.history.pushState(null, '', nextHash);
  }, []);

  useEffect(() => {
    const sync = () => setRoute(initialRoute());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key !== 'Escape') return;
      if (modalOpen) navigate('');
      else setMenuOpen(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [modalOpen, navigate]);

  useEffect(() => {
    if (modalOpen) overlayCloseRef.current?.focus();
  }, [modalOpen]);

  const toggleMenu = () => {
    setMenuOpen((wasOpen) => !wasOpen);
    setFormMessage('');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  };

  const submitEmail = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    if (!CONTACT_EMAIL) {
      setFormMessage('Set your contact address in src/siteConfig.js to enable SEND.');
      return;
    }
    const subject = encodeURIComponent('MANGDAE contact request');
    const body = encodeURIComponent(`Please contact me at: ${email.trim()}\n\n`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormMessage('Your email app should open a draft. No details were stored here.');
  };

  return (
    <main className={`site ${menuOpen ? 'site--menu-open' : ''} ${modalOpen ? 'site--modal-open' : ''}`}>
      <div className="hero">
        <img className="hero__image" src={heroImage} alt="" draggable="false" aria-hidden="true" />
        <div className="hero__wash" />

        <header className="brand-header">
          <a href="#" className="brand-header__logo" aria-label="MANGDAE home" onClick={(event) => { event.preventDefault(); navigate(''); }}>
            <img src={brandLogo} alt="MANGDAE" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="brand-header__menu"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            disabled={modalOpen}
          >
            <span className="brand-header__menu-caret" aria-hidden="true" />
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </header>

        {menuOpen && (
          <button
            type="button"
            className="menu-dismiss"
            onClick={closeMenu}
            tabIndex={-1}
            aria-label="Dismiss menu"
          />
        )}

        <div className="menu-shell" aria-hidden={!menuOpen}>
          <img className="menu-shell__shape" src={menuMark} alt="" aria-hidden="true" />
          <button
            type="button"
            className="menu-shell__close"
            onClick={closeMenu}
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
          >×</button>
          <nav id="site-navigation" className="menu-shell__navigation" aria-label="Main navigation" inert={!menuOpen}>
            {navigation.map((item) => (
              <button type="button" key={item.id} onClick={() => navigate(item.id)}>
                {item.label}
              </button>
            ))}
            <form className="menu-shell__form" onSubmit={submitEmail}>
              <label htmlFor="contact-email" className="sr-only">Your email address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setFormMessage(''); }}
                placeholder="EMAIL"
                autoComplete="email"
                aria-label="Your email address"
                required
              />
              <button type="submit" className="menu-shell__send">
                <span>SEND</span><span className="menu-shell__send-arrow" aria-hidden="true" />
              </button>
              {formMessage && <p className="menu-shell__feedback" role="status">{formMessage}</p>}
            </form>
          </nav>
        </div>

        <section className="collections" aria-label="Featured eyewear collections">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} onSelect={navigate} />
          ))}
        </section>
      </div>
      <footer className="site-footer">{COPYRIGHT}</footer>

      {modalOpen && (
        <div className="detail-overlay" role="dialog" aria-modal="true" aria-label="MANGDAE section">
          <div className="detail-overlay__backdrop" onClick={() => navigate('')} aria-hidden="true" />
          <div className="detail-overlay__panel">
            <div className="detail-overlay__top">
              <span>MANGDAE / {route.replaceAll('-', ' ').toUpperCase()}</span>
              <button ref={overlayCloseRef} className="detail-overlay__close" type="button" onClick={() => navigate('')} aria-label="Return to home">×</button>
            </div>
            <SectionContent route={route} onCollection={navigate} />
            <div className="detail-overlay__bottom">
              <button type="button" onClick={() => navigate('')}><span aria-hidden="true">←</span> BACK TO HOME</button>
              <span>MORE THAN EYEWEAR.</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
