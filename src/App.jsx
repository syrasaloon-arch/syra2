import { useState, useMemo, useEffect } from "react";

const SALON = {
  name: "SyraSalon",
  tagline: "Thread. Wax. Glow. Style. All in One Place",
  locationLine1: "1633 Robson Ranch Road, Ste.100",
  locationLine2: "Northlake, TX 76226",
  hoursLine1: "Monday — Saturday",
  hoursLine2: "10:00 am — 6:30 pm",
  phone: "940-271-0130",
};

const services = [
  { title: "Threading", description: "Precise brow shaping and facial threading for a clean, balanced finish.", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80" },
  { title: "Waxing", description: "Smooth, comfortable waxing services delivered with care and attention.", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80" },
  { title: "Hair Color", description: "Dimensional color, root touch-ups, glossing, and refreshed tones.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80" },
  { title: "Facial", description: "Relaxing skincare treatments designed to brighten, hydrate, and renew.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80" },
  { title: "Hair Styling", description: "Everyday styling, polished blowouts, and occasion-ready finishes.", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80" },
  { title: "Hair Cut", description: "Clean cuts, trims, layers, and shape refreshes tailored to your look.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80" },
  { title: "Mehendi", description: "Elegant henna artistry for celebrations, gatherings, and special moments.", image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80" },
];

const priceMenu = [
  { category: "Threading", note: "Quick precision shaping", items: [{ name: "Eyebrows", price: 12 }, { name: "Upper Lip", price: 8 }, { name: "Chin", price: 8 }, { name: "Forehead", price: 8 }, { name: "Full Face", price: 38 }, { name: "Eyebrows + Upper Lip", price: 18 }] },
  { category: "Waxing", note: "Smooth finish with gentle care", items: [{ name: "Underarms", price: 18 }, { name: "Half Arms", price: 30 }, { name: "Full Arms", price: 45 }, { name: "Half Legs", price: 40 }, { name: "Full Legs", price: 70 }, { name: "Full Face Wax", price: 42 }] },
  { category: "Facial", note: "Hydrating and glow-focused skincare", items: [{ name: "Mini Facial", price: 45 }, { name: "Classic Facial", price: 65 }, { name: "Glow Facial", price: 85 }, { name: "Deep Cleansing Facial", price: 95 }] },
  { category: "Hair Cut", note: "Clean trims and shape refreshes", items: [{ name: "Kids Cut", price: 25 }, { name: "Men's Cut", price: 30 }, { name: "Women's Trim", price: 40 }, { name: "Layered Cut", price: 55 }] },
  { category: "Hair Styling", note: "Everyday polish and special events", items: [{ name: "Blowout", price: 45 }, { name: "Iron Styling", price: 35 }, { name: "Updo / Event Styling", price: 75 }] },
  { category: "Hair Color", note: "Color consultation recommended", items: [{ name: "Root Touch-Up", price: 65 }, { name: "All Over Color", price: 95 }, { name: "Partial Highlights", price: 120 }, { name: "Full Highlights", price: 180 }] },
  { category: "Mehendi", note: "Elegant henna artistry", items: [{ name: "Simple Design", price: 15 }, { name: "One Hand Design", price: 35 }, { name: "Both Hands", price: 65 }, { name: "Bridal Mehendi", price: 250 }] },
];

const C = {
  cream: "#fbf6ef",
  peach: "#f5ede2",
  dark: "#1c1917",
  mid: "#78716c",
  light: "#e7e5e4",
  white: "#ffffff",
  border: "#d6d3d1",
};

// touch-action: manipulation on every interactive element stops the
// 300ms double-tap-to-zoom delay on iOS/Android without disabling scroll.
const TAP = { touchAction: "manipulation", WebkitTapHighlightColor: "transparent" };

const s = {
  page: { minHeight: "100vh", background: C.cream, color: C.dark, fontFamily: "'Georgia', 'Times New Roman', serif" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 20px" },

  // header
  header: { position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}`, background: `${C.cream}ee`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" },
  headerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px" },
  // logo tap target: min 44px tall via padding, but keep visual size
  logo: { display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "8px 0", minHeight: 44, ...TAP },
  logoMark: { width: 40, height: 40, borderRadius: "50%", background: C.dark, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 },
  logoName: { fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: C.dark },
  nav: { display: "flex", alignItems: "center", gap: 36 },
  // nav buttons: min 44px tap target via padding
  navBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 15, letterSpacing: "0.05em", color: C.mid, padding: "10px 4px", minHeight: 44, transition: "color 0.2s", ...TAP },
  navBtnActive: { color: C.dark },
  // hamburger: 44×44 minimum tap target
  hamburger: { borderRadius: 999, border: `1px solid ${C.border}`, padding: 10, background: "none", cursor: "pointer", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", ...TAP },

  // buttons — 48px tall for comfortable mobile tapping
  btnPrimary: { display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: C.dark, color: C.white, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, padding: "14px 28px", minHeight: 48, transition: "background 0.2s", letterSpacing: "0.01em", ...TAP },
  btnOutline: { display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: "transparent", color: C.dark, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 16, fontWeight: 500, padding: "14px 28px", minHeight: 48, transition: "background 0.2s", ...TAP },
  btnOutlineWhite: { display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: "transparent", color: C.white, border: `1px solid rgba(255,255,255,0.2)`, cursor: "pointer", fontSize: 16, fontWeight: 500, padding: "14px 28px", minHeight: 48, transition: "background 0.2s", ...TAP },

  // hero
  hero: { position: "relative", overflow: "hidden", background: C.cream },
  badge: { display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.7)", padding: "10px 18px", fontSize: 14, color: C.mid, marginBottom: 24 },
  h1: { fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.dark, margin: "0 0 24px 0" },
  // body text: 16px minimum — below this iOS Safari zooms on input focus
  heroP: { fontSize: 16, lineHeight: 1.75, color: C.mid, maxWidth: 480, margin: "0 0 32px 0" },
  heroBtns: { display: "flex", gap: 12, flexWrap: "wrap" },
  heroImg: { width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 32, boxShadow: "0 25px 60px rgba(0,0,0,0.18)", maxWidth: "100%" },
  // hero card: shifted inward on mobile so it never clips off-screen
  heroCard: { position: "absolute", bottom: 12, left: 12, right: 12, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 18, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" },
  heroCardH: { fontSize: 18, fontWeight: 400, color: C.dark, margin: "0 0 6px 0" },
  heroCardP: { fontSize: 14, lineHeight: 1.6, color: C.mid, margin: 0 },

  // sections — tighter padding on mobile via clamp
  sectionWhite: { background: C.white, padding: "clamp(48px, 8vw, 80px) 20px" },
  sectionPeach: { background: C.peach, padding: "clamp(48px, 8vw, 80px) 20px" },
  sectionCream: { background: C.cream, padding: "clamp(48px, 8vw, 80px) 20px" },
  sectionLabel: { fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: C.mid, marginBottom: 12 },
  h2: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: C.dark, margin: "0 0 16px 0", letterSpacing: "-0.02em" },
  sectionRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 40, flexWrap: "wrap" },

  // service cards
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 },
  serviceCard: { borderRadius: 28, border: `1px solid ${C.border}`, background: C.white, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
  serviceImg: { width: "100%", height: 220, objectFit: "cover", display: "block", transition: "transform 0.5s" },
  serviceBody: { padding: "24px" },
  serviceTitle: { fontSize: 22, fontWeight: 400, color: C.dark, margin: "0 0 10px 0" },
  // body copy: 16px minimum
  serviceDesc: { fontSize: 16, lineHeight: 1.7, color: C.mid, margin: "0 0 20px 0" },

  // contact block
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 },
  contactCard: { borderRadius: 16, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.65)", padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  contactIcon: { fontSize: 18, marginBottom: 14, color: C.mid },
  contactTitle: { fontSize: 18, fontWeight: 400, color: C.dark, margin: "0 0 8px 0" },
  contactText: { fontSize: 16, lineHeight: 1.75, color: C.mid, margin: 0 },

  // price cards
  priceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  priceCard: { borderRadius: 28, border: `1px solid ${C.border}`, background: C.white, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  priceCardHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  priceCardTitle: { fontSize: 22, fontWeight: 400, color: C.dark, margin: "0 0 4px 0" },
  priceCardNote: { fontSize: 14, color: C.mid },
  priceCount: { borderRadius: 999, background: C.cream, padding: "4px 12px", fontSize: 12, fontWeight: 500, color: C.mid },
  // price rows: min 48px tall for easy tapping on mobile
  priceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 48, padding: "12px 8px", borderTop: `1px solid ${C.light}`, cursor: "pointer", transition: "transform 0.15s", width: "100%", border: "none", background: "transparent", borderRadius: 8, ...TAP },
  priceRowName: { fontSize: 16, fontWeight: 500, color: C.dark, margin: 0 },
  priceRowPrice: { fontSize: 16, fontWeight: 700, color: C.dark },

  // booking
  bookLabel: { fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: C.mid, marginBottom: 12 },
  bookTitle: { fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 400, color: C.dark, margin: "0 0 20px 0", letterSpacing: "-0.03em" },
  bookDesc: { fontSize: 16, lineHeight: 1.75, color: C.mid, marginBottom: 32 },
  selectedCard: { borderRadius: 32, border: `1px solid ${C.border}`, background: C.white, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
  selectedInner: { borderRadius: 24, background: C.cream, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 16, flexWrap: "wrap" },
  priceBadge: { borderRadius: 999, background: C.dark, color: C.white, padding: "12px 24px", fontSize: 22, fontWeight: 700 },
  formCard: { borderRadius: 32, border: `1px solid ${C.border}`, background: C.white, padding: 28, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" },
  formField: { display: "grid", gap: 8, marginBottom: 20 },
  formLabel: { fontSize: 15, fontWeight: 500, color: "#57534e" },
  // font-size 16px on inputs prevents iOS Safari from zooming on focus
  formInput: { borderRadius: 16, border: `1px solid ${C.border}`, padding: "14px 18px", fontSize: 16, outline: "none", transition: "border-color 0.2s", fontFamily: "inherit", background: C.white, minHeight: 52, WebkitAppearance: "none" },
  textarea: { borderRadius: 16, border: `1px solid ${C.border}`, padding: "14px 18px", fontSize: 16, outline: "none", minHeight: 120, resize: "vertical", fontFamily: "inherit", background: C.white, WebkitAppearance: "none" },
  select: { borderRadius: 16, border: `1px solid ${C.border}`, padding: "14px 18px", fontSize: 16, outline: "none", fontFamily: "inherit", background: C.white, width: "100%", cursor: "pointer", minHeight: 52, WebkitAppearance: "none", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378716c' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 44, ...TAP },

  // footer
  footer: { background: C.dark, color: C.white, padding: "48px 20px", borderTop: `1px solid ${C.border}` },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" },
  footerName: { fontSize: 28, fontWeight: 400, margin: "0 0 8px 0" },
  footerDesc: { fontSize: 15, lineHeight: 1.7, color: "#a8a29e", maxWidth: 360, margin: 0 },
  footerBtns: { display: "flex", gap: 12, flexWrap: "wrap" },

  // mobile menu
  mobileMenu: { borderTop: `1px solid ${C.border}`, background: C.cream, padding: "20px" },
  mobileMenuInner: { display: "flex", flexDirection: "column", gap: 4 },
  // mobile nav items: 52px tall for large tap targets
  mobileNavBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.dark, textAlign: "left", padding: "14px 0", minHeight: 52, display: "flex", alignItems: "center", ...TAP },
};

// Icons
const MapPinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ClockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14 19.79 19.79 0 0 1 1.61 5.39a2 2 0 0 1 1.97-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.57a16 16 0 0 0 6 6l1.41-1.41a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const SparklesIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/><path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75z"/></svg>;
const ArrowRightIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const CalendarIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const MenuIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const XIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const BagIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function ContactBlock() {
  return (
    <div style={s.contactGrid}>
      {[
        { icon: <MapPinIcon />, title: "Location", text: <>{SALON.locationLine1}<br />{SALON.locationLine2}</> },
        { icon: <ClockIcon />, title: "Hours", text: <>{SALON.hoursLine1}<br />{SALON.hoursLine2}</> },
        { icon: <PhoneIcon />, title: "Contact", text: SALON.phone },
      ].map(({ icon, title, text }) => (
        <div key={title} style={s.contactCard}>
          <div style={s.contactIcon}>{icon}</div>
          <h3 style={s.contactTitle}>{title}</h3>
          <p style={s.contactText}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function Header({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const navItems = [{ label: "Home", value: "home" }, { label: "Services", value: "services" }];

  const goTo = (v) => {
    setPage(v);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // close menu when switching to desktop
  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  return (
    <header style={s.header}>
      <div style={s.headerInner}>
        <button style={s.logo} onClick={() => goTo("home")}>
          <span style={s.logoMark}>S</span>
          <span style={s.logoName}>{SALON.name}</span>
        </button>

        {!isMobile ? (
          <nav style={s.nav}>
            {navItems.map(item => (
              <button key={item.value} onClick={() => goTo(item.value)}
                style={{ ...s.navBtn, ...(page === item.value ? s.navBtnActive : {}) }}>
                {item.label}
              </button>
            ))}
            <button style={{ ...s.navBtn, display: "flex", alignItems: "center", gap: 6 }}>
              <BagIcon /> Cart (0)
            </button>
            <button style={s.btnPrimary} onClick={() => goTo("book")}>Book now</button>
          </nav>
        ) : (
          <button style={s.hamburger} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        )}
      </div>

      {open && isMobile && (
        <div style={s.mobileMenu}>
          <div style={s.mobileMenuInner}>
            {navItems.map(item => (
              <button key={item.value} style={s.mobileNavBtn} onClick={() => goTo(item.value)}>{item.label}</button>
            ))}
            <button style={{ ...s.mobileNavBtn, gap: 10 }}><BagIcon /> Cart (0)</button>
            <button style={{ ...s.btnPrimary, marginTop: 12, width: "100%", justifyContent: "center" }} onClick={() => goTo("book")}>
              Book now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Home({ setPage }) {
  const [hoveredService, setHoveredService] = useState(null);
  return (
    <main>
      {/* Hero */}
      <section style={s.hero}>
        <div style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)", width: 280, height: 280, borderRadius: "50%", background: "rgba(251,191,36,0.18)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <style>{`@media(min-width:860px){.hero-inner-grid{grid-template-columns:1.05fr 0.95fr!important}}`}</style>
          <div className="hero-inner-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center", padding: "clamp(48px,8vw,80px) 20px" }}>
            <div style={{ position: "relative", zIndex: 10 }}>
              <div style={s.badge}><SparklesIcon /> Beauty, care, and everyday confidence</div>
              <h1 style={s.h1}>{SALON.tagline}</h1>
              <p style={s.heroP}>Welcome to {SALON.name}, a refined neighborhood salon for threading, waxing, glowing skin, elegant hair, and special-occasion artistry.</p>
              <div style={s.heroBtns}>
                <button style={{ ...s.btnPrimary, gap: 8 }} onClick={() => setPage("book")}>
                  Book now <ArrowRightIcon />
                </button>
                <button style={s.btnOutline} onClick={() => setPage("services")}>
                  View services
                </button>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              {/* max-width: 100% prevents horizontal scroll on narrow screens */}
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85"
                alt="Warm salon interior"
                style={s.heroImg}
                loading="eager"
              />
              <div style={s.heroCard}>
                <p style={s.heroCardH}>Soft, polished, personal.</p>
                <p style={s.heroCardP}>A calm salon experience made for everyday rituals and important moments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section style={s.sectionWhite}>
        <div style={s.container}>
          <div style={s.sectionRow}>
            <div>
              <p style={s.sectionLabel}>Featured services</p>
              <h2 style={s.h2}>Beauty essentials, all in one place.</h2>
            </div>
            <button style={s.btnOutline} onClick={() => setPage("services")}>Explore all</button>
          </div>
          <div style={s.servicesGrid}>
            {services.slice(0, 3).map((svc) => (
              <div key={svc.title} style={s.serviceCard}
                onMouseEnter={() => setHoveredService(svc.title)}
                onMouseLeave={() => setHoveredService(null)}>
                <div style={{ overflow: "hidden", height: 240 }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    style={{ ...s.serviceImg, height: 240, transform: hoveredService === svc.title ? "scale(1.05)" : "scale(1)" }}
                  />
                </div>
                <div style={s.serviceBody}>
                  <h3 style={s.serviceTitle}>{svc.title}</h3>
                  <p style={{ ...s.serviceDesc, marginBottom: 0 }}>{svc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={s.sectionPeach}>
        <div style={s.container}><ContactBlock /></div>
      </section>
    </main>
  );
}

function Services({ setPage }) {
  const [hovered, setHovered] = useState(null);
  return (
    <main style={{ background: C.cream }}>
      <section style={{ ...s.sectionCream, paddingTop: "clamp(40px,6vw,64px)", paddingBottom: "clamp(48px,8vw,80px)" }}>
        <div style={s.container}>
          <div style={{ maxWidth: 680, marginBottom: 48 }}>
            <p style={s.sectionLabel}>Our services</p>
            <h1 style={{ ...s.h1, fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>Natural elegance, thoughtful care.</h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: C.mid, margin: 0 }}>Our beauty professionals bring precision, calm, and artistry to each appointment, from quick refreshes to full-service transformations.</p>
          </div>
          <div style={s.servicesGrid}>
            {services.map((svc) => (
              <article key={svc.title}
                style={{ ...s.serviceCard, transition: "box-shadow 0.3s", boxShadow: hovered === svc.title ? "0 8px 32px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.05)" }}
                onMouseEnter={() => setHovered(svc.title)}
                onMouseLeave={() => setHovered(null)}>
                <div style={{ overflow: "hidden", height: 220 }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    style={{ ...s.serviceImg, height: 220, transform: hovered === svc.title ? "scale(1.05)" : "scale(1)" }}
                  />
                </div>
                <div style={s.serviceBody}>
                  <h2 style={s.serviceTitle}>{svc.title}</h2>
                  <p style={s.serviceDesc}>{svc.description}</p>
                  <button style={s.btnOutline} onClick={() => setPage("book")}>Book {svc.title}</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section style={s.sectionWhite}>
        <div style={s.container}><ContactBlock /></div>
      </section>
    </main>
  );
}

function BookingPage({ setPage }) {
  const bookingOptions = useMemo(() => priceMenu.flatMap(g => g.items.map(item => ({ ...item, category: g.category }))), []);
  const [selected, setSelected] = useState(`${bookingOptions[0].category} — ${bookingOptions[0].name}`);
  const selectedService = bookingOptions.find(item => `${item.category} — ${item.name}` === selected) || bookingOptions[0];
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  if (submitted) {
    return (
      <main style={{ minHeight: "70vh", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 52, marginBottom: 24 }}>✨</div>
          <h2 style={{ ...s.h2, marginBottom: 16 }}>Request received!</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: C.mid, marginBottom: 32 }}>We'll reach out shortly to confirm your appointment. See you soon at {SALON.name}!</p>
          <button style={s.btnPrimary} onClick={() => { setSubmitted(false); setPage("home"); }}>Back to home</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "70vh", background: C.cream, padding: "clamp(40px,6vw,64px) 20px clamp(48px,8vw,80px)" }}>
      <div style={s.container}>
        <style>{`@media(min-width:900px){.book-grid{grid-template-columns:0.85fr 1.15fr!important}.form-grid-2{grid-template-columns:1fr 1fr!important}}`}</style>
        <div className="book-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, marginBottom: 64 }}>
          {/* Left: info + selected service */}
          <div>
            <p style={s.bookLabel}>Book now</p>
            <h1 style={s.bookTitle}>Reserve your {SALON.name} visit.</h1>
            <p style={s.bookDesc}>Choose a service, review the price, and share your preferred time. We'll confirm your appointment shortly.</p>
            <div style={s.selectedCard}>
              <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: C.mid, margin: 0 }}>Selected service</p>
              <div style={s.selectedInner}>
                <div>
                  <p style={{ fontSize: 14, color: C.mid, margin: "0 0 4px 0" }}>{selectedService.category}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 400, color: C.dark, margin: 0 }}>{selectedService.name}</h2>
                </div>
                <div style={s.priceBadge}>${selectedService.price}</div>
              </div>
              <p style={{ fontSize: 13, color: C.mid, marginTop: 16, marginBottom: 0, lineHeight: 1.6 }}>Final pricing may vary for hair color, bridal mehendi, length, product usage, or custom requests.</p>
            </div>
          </div>

          {/* Right: form */}
          <div style={s.formCard}>
            <div style={s.formField}>
              <label style={s.formLabel}>Full name</label>
              {/* autocomplete helps mobile autofill */}
              <input style={s.formInput} placeholder="Your name" autoComplete="name" />
            </div>
            <div style={s.formField}>
              <label style={s.formLabel}>Phone or email</label>
              {/* inputMode="email" raises correct keyboard; autocomplete speeds entry */}
              <input style={s.formInput} placeholder="How should we contact you?" inputMode="email" autoComplete="email" />
            </div>
            <div style={s.formField}>
              <label style={s.formLabel}>Service and price</label>
              <select value={selected} onChange={e => setSelected(e.target.value)} style={s.select}>
                {priceMenu.map(group => (
                  <optgroup key={group.category} label={group.category}>
                    {group.items.map(item => (
                      <option key={`${group.category}-${item.name}`} value={`${group.category} — ${item.name}`}>
                        {item.name} — ${item.price}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ ...s.formField, marginBottom: 0 }}>
                <label style={s.formLabel}>Preferred date</label>
                <input type="date" style={s.formInput} />
              </div>
              <div style={{ ...s.formField, marginBottom: 0 }}>
                <label style={s.formLabel}>Preferred time</label>
                <input type="time" style={s.formInput} />
              </div>
            </div>
            <div style={s.formField}>
              <label style={s.formLabel}>Notes</label>
              <textarea style={s.textarea} placeholder="Tell us anything helpful before your appointment." />
            </div>
            <button
              style={{ ...s.btnPrimary, width: "100%", padding: "16px 24px", fontSize: 16, gap: 8, justifyContent: "center" }}
              onClick={() => setSubmitted(true)}>
              <CalendarIcon /> Request appointment — ${selectedService.price}
            </button>
            <button
              onClick={() => setPage("home")}
              style={{ display: "block", width: "100%", textAlign: "center", marginTop: 16, fontSize: 15, color: C.mid, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", minHeight: 44, ...TAP }}>
              Back to home
            </button>
          </div>
        </div>

        {/* Price menu */}
        <div style={{ marginTop: 32 }}>
          <div style={{ ...s.sectionRow, marginBottom: 32 }}>
            <div>
              <p style={s.sectionLabel}>Service menu</p>
              <h2 style={s.h2}>{SALON.name} pricing</h2>
            </div>
            <p style={{ maxWidth: 400, fontSize: 15, color: C.mid, lineHeight: 1.7, margin: 0 }}>Tap any service to select it in the booking form above.</p>
          </div>
          <div style={s.priceGrid}>
            {priceMenu.map(group => (
              <article key={group.category} style={s.priceCard}>
                <div style={s.priceCardHead}>
                  <div>
                    <h3 style={s.priceCardTitle}>{group.category}</h3>
                    <p style={s.priceCardNote}>{group.note}</p>
                  </div>
                  <span style={s.priceCount}>{group.items.length} options</span>
                </div>
                {group.items.map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => { setSelected(`${group.category} — ${item.name}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    onMouseEnter={() => setHoveredRow(`${group.category}-${item.name}`)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      ...s.priceRow,
                      borderTop: `1px solid ${C.light}`,
                      transform: hoveredRow === `${group.category}-${item.name}` ? "translateX(4px)" : "translateX(0)",
                      background: selected === `${group.category} — ${item.name}` ? C.cream : "transparent",
                    }}>
                    <span style={s.priceRowName}>{item.name}</span>
                    <span style={s.priceRowPrice}>${item.price}</span>
                  </button>
                ))}
              </article>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56 }}><ContactBlock /></div>
      </div>
    </main>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={s.footer}>
      <div style={s.footerInner}>
        <div>
          <p style={s.footerName}>{SALON.name}</p>
          <p style={s.footerDesc}>Threading, waxing, skincare, hair, and mehendi services in a warm salon setting.</p>
        </div>
        <div style={s.footerBtns}>
          <button style={s.btnOutlineWhite} onClick={() => setPage("home")}>Home</button>
          <button style={s.btnOutlineWhite} onClick={() => setPage("services")}>Services</button>
          <button style={{ ...s.btnPrimary, background: C.white, color: C.dark }} onClick={() => setPage("book")}>Book now</button>
        </div>
      </div>
    </footer>
  );
}

export default function SyraSalonWebsite() {
  const [page, setPage] = useState("home");
  return (
    <div style={s.page}>
      <Header page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "services" && <Services setPage={setPage} />}
      {page === "book" && <BookingPage setPage={setPage} />}
      <Footer setPage={setPage} />
    </div>
  );
}
