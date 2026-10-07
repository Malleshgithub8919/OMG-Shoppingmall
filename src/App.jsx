import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  Baby,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
  Gem,
  Globe,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Phone,
  PlayCircle,
  Rss,
  Send,
  Share2,
  ShieldCheck,

  Shirt,
  Sparkles,
  Star,
  ThumbsUp,
  Truck,
  Users,
  Video,
  X,
} from 'lucide-react';

/* ============================================================
   DATA — OMG SHOPPING MALL, PALAKOLLU
   ============================================================ */
const NAV_ITEMS = ['Home', 'About', 'Services', 'Gallery', 'Reviews', 'Contact'];

const STATS = [
  { value: 500, suffix: '+', label: 'Happy Customers' },
  { value: 6, suffix: '', label: 'Fashion Categories' },
  { value: 10, suffix: '+', label: 'Years of Style' },
  { value: 1, suffix: '', label: 'City, Palakollu', display: '❤️' },
];

const ASSETS = {
  logo: '/images/omg-logo.png',
  hero: '/images/omg-mall-building.jpg',
  about: '/images/mall-atrium.jpg',
  womens: '/images/women-collection.jpg',
  mens: '/images/clothes-rack.jpg',
  kids: '/images/kids-fashion.jpg',
  ethnic: '/images/saree-wall.jpg',
  party: '/images/clothes-rack.jpg',
  saree: '/images/saree-collection.jpg',
  accessories: '/images/fashion-store.jpg',
  shopping: '/images/mall-atrium.jpg',
  trends: '/images/women-collection-2.jpg',
};

const HERO_SLIDES = [
  ASSETS.hero,
  ASSETS.about,
  '/images/showroom-display.jpg',
  ASSETS.womens,
  ASSETS.ethnic,
  ASSETS.saree,
];

const SERVICE_CARDS = [
  {
    title: "Women's Wear",
    description: 'Explore our stunning collection of ethnic kurtas, sarees, western tops, and elegant party dresses for every occasion.',
    image: ASSETS.womens,
    icon: Sparkles,
  },
  {
    title: "Men's Collection",
    description: "From crisp formals to casual daily wear, discover premium shirts, trousers, kurtas and traditional Indian wear.",
    image: ASSETS.mens,
    icon: Shirt,
  },
  {
    title: "Kids' Fashion",
    description: 'Adorable, comfortable and trendy clothing for children of all ages — from newborns to teens.',
    image: ASSETS.kids,
    icon: Baby,
  },
  {
    title: 'Ethnic & Traditional',
    description: 'Celebrate every festival and special occasion with our rich collection of sarees, lehengas, sherwanis and more.',
    image: ASSETS.ethnic,
    icon: Gem,
  },
  {
    title: 'Party & Occasion Wear',
    description: 'Make every event memorable with our exclusive range of party wear, designer outfits and premium accessories.',
    image: ASSETS.party,
    icon: BadgeCheck,
  },
  {
    title: 'Sarees Collection',
    description: 'Silk, cotton, georgette, and designer sarees for every budget — timeless elegance for the modern woman.',
    image: ASSETS.saree,
    icon: Heart,
  },
];

const GALLERY_IMAGES = [
  { title: 'Fashion Collection', image: ASSETS.womens },
  { title: "Women's Wear", image: ASSETS.womens },
  { title: 'Saree Collection', image: ASSETS.saree },
  { title: "Men's Wear", image: ASSETS.mens },
  { title: 'Party Wear', image: ASSETS.party },
  { title: "Kids' Fashion", image: ASSETS.kids },
  { title: 'Ethnic Collection', image: ASSETS.ethnic },
  { title: 'Accessories', image: ASSETS.accessories },
  { title: 'Shopping Experience', image: ASSETS.shopping },
  { title: 'Latest Trends', image: ASSETS.trends },
];

const REVIEWS = [
  {
    name: 'Priya',
    initials: 'P',
    stars: 4,
    date: 'Recently',
    review: 'A great place for the whole family! Loved the variety of clothing, quality, and the friendly service. Definitely coming back again.',
    gradient: 'from-sky-500 to-cyan-400',
  },
  {
    name: 'Sneha',
    initials: 'S',
    stars: 5,
    date: 'Recently',
    review: 'I found everything I was looking for under one roof. From women\'s wear to traditional collections, the choices were amazing and the quality was excellent.',
    gradient: 'from-blue-500 to-sky-400',
  },
  {
    name: 'Sai',
    initials: 'S',
    stars: 4.5,
    date: 'Recently',
    review: 'One of the best places for shopping in Palakollu. Great collection for men, women and kids, with plenty of options to choose from.',
    gradient: 'from-orange-400 to-amber-400',
  },
];

const WHY_SHOP = [
  { icon: ShieldCheck, title: 'Quality Guaranteed', desc: 'Every product is hand-picked for quality and style so you always get the best.' },
  { icon: BadgeCheck, title: 'Wide Variety', desc: 'From casual to ethnic, party wear to kidswear — all under one comfortable roof.' },
  { icon: Users, title: 'Family-Friendly', desc: 'Clothing for every member of the family — men, women, children and elders.' },
  { icon: Heart, title: 'Best Value', desc: 'Premium quality fashion at affordable prices that fits every budget.' },
  { icon: Sparkles, title: 'Latest Trends', desc: 'We constantly update our collection with the latest fashion trends and seasonal styles.' },
  { icon: Truck, title: 'Easy Shopping', desc: 'Convenient location in the heart of Palakollu with a pleasant shopping atmosphere.' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://omgshoppingmall.com/', icon: Globe },
  { label: 'Instagram', href: 'https://omgshoppingmall.com/', icon: AtSign },
  { label: 'YouTube', href: 'https://omgshoppingmall.com/', icon: PlayCircle },
];

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
];

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ============================================================
   STAR DISPLAY (supports half-stars)
   ============================================================ */
function StarDisplay({ rating, size = 14 }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= rating;
        const half = !filled && i + 0.5 <= rating;
        return (
          <span key={i} style={{ position: 'relative', display: 'inline-flex' }}>
            <Star size={size} fill="none" color="#e2e8f0" strokeWidth={1.5} />
            {(filled || half) && (
              <span style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                width: half ? '50%' : '100%',
              }}>
                <Star size={size} fill="#ffbf2a" color="#ffbf2a" strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
function AnimatedCounter({ value, suffix = '', display }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (display) return; // skip if using emoji/text display
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        setTriggered(true);
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.ceil(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, triggered, display]);

  return (
    <span ref={ref} className="stat-number">
      {display ? display : `${count.toLocaleString()}${suffix}`}
    </span>
  );
}

/* ============================================================
   SECTION HEADER
   ============================================================ */
function SectionHeader({ tag, title }) {
  return (
    <motion.div
      className="section-header"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
    >
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
    </motion.div>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ activeNav, onNavClick, mobileOpen, setMobileOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`topbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-wrap">
        {/* Brand */}
        <a href="#home" className="brand" onClick={() => onNavClick('Home')} aria-label="OMG Shopping Mall home">
          <img src={ASSETS.logo} alt="OMG Shopping Mall Logo" className="brand-logo" />
        </a>

        {/* Desktop Nav */}
        <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={activeNav === item ? 'active' : ''}
              onClick={() => onNavClick(item)}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.3, duration: 0.4 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Call Us CTA */}
        <motion.a
          href="tel:+919666679988"
          className="nav-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          aria-label="Call OMG Shopping Mall"
        >
          <Phone size={14} /> Call Us
        </motion.a>

        {/* Hamburger */}
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </motion.header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onNavClick }) {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const smoothImgY = useSpring(imgY, { stiffness: 80, damping: 20 });
  const smoothTextY = useSpring(textY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 6,
    });
  }, [isMobile]);

  const heroVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };

  const lineVariant = {
    hidden: { opacity: 0, y: 34 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <AnimatePresence initial={false}>
        <motion.div
          key={HERO_SLIDES[activeSlide]}
          className="hero-image"
          style={{
            backgroundImage: `url('${HERO_SLIDES[activeSlide]}')`,
            y: smoothImgY,
            x: mousePos.x * 0.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </AnimatePresence>
      <div className="hero-overlay" />
      <div className="hero-overlay-bottom" />

      <motion.div className="hero-inner" style={{ y: smoothTextY, x: mousePos.x * 0.3 }}>
        <motion.div className="hero-copy" variants={heroVariants} initial="hidden" animate="visible">

          <motion.span variants={lineVariant} className="eyebrow">
            Welcome to
          </motion.span>

          <motion.h1 variants={lineVariant}>
            <span className="gold-text">OMG Shopping</span>
            <br />
            <span style={{ color: 'white' }}>Mall</span>
          </motion.h1>

          <motion.p variants={lineVariant} className="hero-tagline">
            Clothing for Every Occasion — Men • Women • Kids
          </motion.p>

          <motion.p variants={lineVariant} className="hero-description">
            Discover stylish clothing for every occasion, from everyday comfort to elegant traditional
            and party wear. Visit OMG Shopping Mall in Palakollu for quality fashion for the whole family.
          </motion.p>

          <motion.div variants={lineVariant} className="cta-row">
            <motion.a
              href="tel:+919666679988"
              className="primary-btn"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={16} /> Call Us
            </motion.a>
            <motion.a
              href="#about"
              className="secondary-btn"
              onClick={() => onNavClick('About')}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Collections <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator" aria-label="Scroll to content">
        <span />
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">

        {/* Image */}
        <motion.div
          className="about-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeLeft}
        >
          <img
            src={ASSETS.about}
            alt="OMG Shopping Mall — clothing store in Palakollu"
            loading="lazy"
          />
          <span className="floating-badge">✦ Fashion Destination, Palakollu</span>
        </motion.div>

        {/* Copy */}
        <motion.div
          className="about-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeRight}
        >
          <div>
            <span className="section-tag">About OMG Shopping Mall</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Style Meets Quality.<br />Every Collection, Every Day.
            </h2>
          </div>

          <p className="about-copy-text">
            Step into a world of fashion where style meets quality and every collection is chosen
            with care. At OMG Shopping Mall, we make everyday shopping feel stylish, convenient, and enjoyable.
          </p>
          <p className="about-copy-text" style={{ marginTop: -8 }}>
            OMG Shopping Mall is your destination for quality fashion in Palakollu, Andhra Pradesh.
            We offer stylish clothing for men, women, and children, along with elegant ethnic wear,
            casual outfits, party wear, and sarees — for every occasion.
          </p>

          {/* Stats */}
          <motion.div
            className="stats-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} className="stat-card" variants={fadeUp}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} display={stat.display} />
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#services"
            className="primary-btn"
            style={{ width: 'fit-content' }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Collections <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES / COLLECTIONS
   ============================================================ */
function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <SectionHeader tag="Our Collections" title="Quality Fashion for the Whole Family" />

        <motion.div
          className="service-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICE_CARDS.map(({ icon: Icon, ...item }, index) => (
            <motion.article
              key={item.title}
              className="service-card"
              variants={fadeUp}
              custom={index * 0.05}
            >
              <div className="service-image-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="service-icon">
                  <Icon size={20} />
                </span>
              </div>
              <div className="service-accent" />
              <div className="service-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="view-more-row">
          <a href="tel:+919666679988" className="inline-link">
            Call to Enquire <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY SHOP WITH OMG
   ============================================================ */
function WhyShop() {
  return (
    <section className="section why-section">
      <div className="container">
        <SectionHeader tag="Why Shop With OMG?" title="Quality, Variety & Value Under One Roof" />

        <motion.div
          className="infrastructure-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {WHY_SHOP.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              className="infra-card"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <span className="infra-icon"><Icon size={24} /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY
   ============================================================ */
function Gallery({ onOpen }) {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="section-tag">Our Gallery</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Fashion for Every Occasion</h2>
          </motion.div>
          <motion.a
            href="#contact"
            className="inline-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Visit Us <ArrowRight size={16} />
          </motion.a>
        </div>

        <motion.div
          className="gallery-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {GALLERY_IMAGES.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              className="gallery-item"
              onClick={() => onOpen(index)}
              aria-label={`View photo: ${item.title}`}
              variants={{
                hidden: { opacity: 0, scale: 0.93 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
                },
              }}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="gallery-overlay">
                <span className="gallery-overlay-title">{item.title}</span>
                <span className="gallery-view-icon">
                  <Eye size={13} /> View
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   REVIEWS
   ============================================================ */
function Reviews() {
  const [form, setForm] = useState({ name: '', rating: 0, review: '' });
  const [hovered, setHovered] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Please enter your name.'); return; }
    if (!form.rating) { setError('Please select a rating.'); return; }
    if (!form.review.trim()) { setError('Please share your experience.'); return; }
    setSuccess('Thank you for your review! We truly appreciate your feedback. 🙏');
    setError('');
    setForm({ name: '', rating: 0, review: '' });
    setHovered(0);
  };

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container reviews-layout">
        {/* Review Cards */}
        <div className="review-cards-wrap">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-tag">Our Clients Speak!</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>What Our Shoppers Say</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: 12, maxWidth: 460 }}>
              Hear what our customers have to say about their shopping experience, quality, variety,
              and service at OMG Shopping Mall.
            </p>
          </motion.div>

          <motion.div
            className="review-grid"
            style={{ marginTop: 28 }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {REVIEWS.map((review) => (
              <motion.article key={review.name + review.review} className="review-card" variants={fadeUp}>
                <div className="review-head">
                  <motion.div
                    className="avatar"
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  >
                    {review.initials}
                  </motion.div>
                  <div>
                    <p className="review-name">{review.name}</p>
                    <div className="review-meta">
                      <StarDisplay rating={review.stars} size={13} />
                      <span className="review-date">Rated {review.stars} out of 5</span>
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.review}"</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Review Form */}
        <motion.div
          className="review-form-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeRight}
        >
          <span className="section-tag">Share Your Experience</span>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: 'var(--dark)', marginTop: 12, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Write a Review
          </h3>

          <form onSubmit={handleSubmit} className="review-form" noValidate>
            <label className="form-label">
              <span className="form-label-text">Your Name</span>
              <input
                type="text"
                className="form-input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Enter your name"
              />
            </label>

            <label className="form-label">
              <span className="form-label-text">Your Rating</span>
              <div className="star-selection">
                {Array.from({ length: 5 }).map((_, i) => {
                  const val = i + 1;
                  return (
                    <button
                      key={val}
                      type="button"
                      className={`star-btn ${val <= (hovered || form.rating) ? 'active' : ''}`}
                      onMouseEnter={() => setHovered(val)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setForm((f) => ({ ...f, rating: val }))}
                      aria-label={`Rate ${val} star${val > 1 ? 's' : ''}`}
                    >
                      <Star size={24} fill="currentColor" strokeWidth={1.5} />
                    </button>
                  );
                })}
              </div>
            </label>

            <label className="form-label">
              <span className="form-label-text">Your Review</span>
              <textarea
                className="form-textarea"
                value={form.review}
                onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
                placeholder="Tell us about your shopping experience..."
                rows={5}
              />
            </label>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  className="form-message error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  key="error"
                >{error}</motion.p>
              )}
              {success && (
                <motion.p
                  className="form-message success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  key="success"
                >{success}</motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="primary-btn"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Submit Review <Send size={16} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   CALL TO ACTION BANNER
   ============================================================ */
function CallBanner() {
  return (
    <section className="section cta-banner-section">
      <div className="container">
        <motion.div
          className="cta-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="cta-banner-bg" />
          <div className="cta-banner-content">
            <span className="section-tag" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Call Us for Enquiries &amp; Assistance
            </span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.04em', margin: '12px 0 8px' }}>
              We're Here to Make Your Shopping<br />Experience Special
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.8 }}>
              Looking for the latest styles, traditional collections, and quality clothing for the whole family?
              Visit OMG Shopping Mall, Palakollu, and explore our wide range of collections under one roof.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <motion.a
                href="tel:+919666679988"
                className="primary-btn"
                style={{ background: 'white', color: 'var(--primary-strong)', boxShadow: '0 14px 30px rgba(255,255,255,0.2)' }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={16} /> Call Us
              </motion.a>
              <motion.a
                href="#contact"
                className="secondary-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Directions <MapPin size={16} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader tag="Contact Us" title="Find Us in the Heart of Palakollu" />

        <div className="contact-grid">
          {/* Google Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeLeft}
          >
            <div className="map-shell">
              <iframe
                title="OMG Shopping Mall location on Google Maps"
                src="https://maps.google.com/maps?q=OMG%20Shopping%20Mall%20Karumuri%20Vari%20St%20Palakollu%20Andhra%20Pradesh%20534260&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <button
              type="button"
              className="map-action"
              onClick={() => window.open(
                'https://maps.google.com/?q=Near+ksheera+Ramalingeswara+Swamy+Temple+Karumuri+Vari+St+Palakollu+Andhra+Pradesh+534260',
                '_blank'
              )}
            >
              <MapPin size={16} /> Get Directions on Google Maps
            </button>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="contact-details"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeRight}
          >
            <div className="mini-block">
              <h3>Our Address</h3>
              <ul>
                <li><MapPin size={15} /> Near Ksheera Ramalingeswara Swamy Temple</li>
                <li><MapPin size={15} /> Karumuri Vari St, Near Peddagopuram</li>
                <li><MapPin size={15} /> Palakollu, Andhra Pradesh — 534260</li>
              </ul>
            </div>

            <div className="mini-block">
              <h3>Contact Details</h3>
              <ul>
                <li><Phone size={15} /> <a href="tel:+919666679988" style={{ color: 'inherit' }}>Call Us</a></li>
                <li><Mail size={15} /> <a href="mailto:omgshoppingmallpalakollu@gmail.com" style={{ color: 'inherit' }}>omgshoppingmallpalakollu@gmail.com</a></li>
                <li><Globe size={15} /> <a href="https://omgshoppingmall.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>omgshoppingmall.com</a></li>
              </ul>
            </div>

            <div className="mini-block">
              <h3>Follow Us</h3>
              <ul className="social-list">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} aria-label={`Follow on ${label}`} target="_blank" rel="noreferrer">
                      <Icon size={15} /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-actions-row">
              <a href="tel:+919666679988" className="action-button">
                <Phone size={15} /> Call Now
              </a>
              <a
                href="https://wa.me/919666679988"
                target="_blank"
                rel="noreferrer"
                className="action-button"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href="mailto:omgshoppingmallpalakollu@gmail.com"
                className="action-button"
              >
                <Mail size={15} /> Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FLOATING ACTION BAR
   ============================================================ */
function FloatingActions() {
  const [liked, setLiked] = useState(false);

  const handleShare = async () => {
    const shareData = { title: document.title, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          window.alert('Unable to share this page.');
        }
      }
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        window.alert('Page link copied.');
      } catch {
        window.alert('Unable to copy the page link.');
      }
      return;
    }

    window.alert('Sharing is not available in this browser.');
  };

  return (
    <motion.aside
      className="floating-actions"
      aria-label="Quick actions"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className={`float-btn float-btn--like${liked ? ' is-active' : ''}`}
        aria-label={liked ? 'Unlike' : 'Like'}
        aria-pressed={liked}
        onClick={() => setLiked((current) => !current)}
      >
        <ThumbsUp size={17} />
        Like
      </button>
      <button type="button" className="float-btn float-btn--share" aria-label="Share" onClick={handleShare}>
        <Share2 size={17} />
        Share
      </button>
      <a href="#reviews" className="float-btn float-btn--review" aria-label="Write a review">
        <MessageSquare size={17} />
        Review
      </a>
      <a href="tel:+919666679988" className="float-btn float-btn--call" aria-label="Call us">
        <Phone size={17} />
        Call
      </a>
      <a
        href="https://wa.me/919666679988"
        target="_blank"
        rel="noreferrer"
        className="float-btn float-btn--whatsapp"
        aria-label="WhatsApp"
      >
        <MessageCircle size={17} />
        WhatsApp
      </a>
    </motion.aside>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <motion.div
          className="footer-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand */}
          <motion.div className="footer-brand" variants={fadeUp}>
            <div className="footer-brand-logo">
              <img src={ASSETS.logo} alt="OMG Shopping Mall Logo" className="footer-logo" />
            </div>
            <p>
              Your destination for quality fashion in Palakollu, Andhra Pradesh. Stylish clothing for
              men, women, and children — ethnic wear, casual, party wear and sarees under one roof.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-col" variants={fadeUp}>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="footer-col" variants={fadeUp}>
            <h4>Contact Details</h4>
            <ul className="footer-links">
              <li><a href="tel:+919666679988">Call Us</a></li>
              <li>omgshoppingmallpalakollu@gmail.com</li>
              <li>Karumuri Vari St, Palakollu</li>
              <li>Andhra Pradesh — 534260</li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div className="footer-col" variants={fadeUp}>
            <h4>Follow Us</h4>
            <ul className="footer-links">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>
              ))}
            </ul>
            <div style={{ marginTop: 20 }}>
              <h4 style={{ marginBottom: 10 }}>Opening Hours</h4>
              <ul className="footer-links">
                <li>Mon – Sat: 9:00 AM – 9:00 PM</li>
                <li>Sunday: 10:00 AM – 8:00 PM</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <div className="footer-bottom">
          <span className="footer-bottom-text">© 2026 OMG Shopping Mall, Palakollu. All Rights Reserved.</span>
          <div className="powered-by">
            <span>Powered by</span>
            <strong>G-Pages</strong>
            <span style={{ color: 'rgba(255,255,255,0.28)' }}>•</span>
            <span>Create Your Business Website</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   LIGHTBOX MODAL
   ============================================================ */
function LightboxModal({ image, onClose, onPrev, onNext }) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-modal" onClick={onClose} aria-label="Close image">
          <X size={18} />
        </button>
        <button type="button" className="nav-arrow left" onClick={onPrev} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <img src={image.image} alt={image.title} />
        <button type="button" className="nav-arrow right" onClick={onNext} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
        <div className="lightbox-caption">{image.title}</div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % GALLERY_IMAGES.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const visibleImage = useMemo(
    () => (lightboxIndex !== null ? GALLERY_IMAGES[lightboxIndex] : null),
    [lightboxIndex]
  );

  const handleNavClick = (item) => {
    setActiveNav(item);
    setMobileOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="splash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            aria-label="OMG Shopping Mall loading"
          >
            <motion.img
              src={ASSETS.logo}
              alt="OMG Shopping Mall"
              className="splash-logo"
              initial={{ opacity: 0, scale: 0.65, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="splash-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              OMG Shopping Mall
            </motion.p>
            <motion.span
              className="splash-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Palakollu
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`page-shell ${isLoaded ? 'is-ready' : ''}`}>
        <Navbar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main>
          <Hero onNavClick={handleNavClick} />
          <About />
          <Services />
          <WhyShop />
          <Gallery onOpen={setLightboxIndex} />
          <Reviews />
          <CallBanner />
          <Contact />
        </main>

        <FloatingActions />
        <a
          href="https://wa.me/919666679988"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-float"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
        <Footer />

        <AnimatePresence>
          {visibleImage && (
            <LightboxModal
              key="lightbox"
              image={visibleImage}
              onClose={() => setLightboxIndex(null)}
              onPrev={() => setLightboxIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
              onNext={() => setLightboxIndex((i) => (i + 1) % GALLERY_IMAGES.length)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
