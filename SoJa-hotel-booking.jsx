import { useState } from "react";

// ── Design Tokens ─────────────────────────────────────────────
// Palette: deep midnight indigo, soft moonlight, warm amber, pale lavender mist
// Signature: animated crescent moon + stars in hero, "So Ja chain se" tagline
const C = {
  midnight: "#0D0D1A",
  indigo: "#13132B",
  indigoDark: "#0A0A18",
  indigoCard: "#1A1A35",
  moonGold: "#F5C842",
  moonGoldLight: "#FFE080",
  lavender: "#A78BFA",
  lavenderSoft: "#EDE9FE",
  starWhite: "#F0EFF8",
  mist: "rgba(240,239,248,0.55)",
  grey: "#6B7280",
  greyLight: "#1E1E38",
  green: "#34D399",
  red: "#F87171",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background: ${C.midnight};
    color: ${C.starWhite};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── STARS BACKGROUND ── */
  .stars-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(1px 1px at 10% 15%, rgba(245,200,66,0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 25% 40%, rgba(240,239,248,0.5) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 50% 10%, rgba(240,239,248,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 25%, rgba(245,200,66,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 85% 8%, rgba(240,239,248,0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 40% 60%, rgba(167,139,250,0.4) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 90% 50%, rgba(240,239,248,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 15% 80%, rgba(245,200,66,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 90%, rgba(240,239,248,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 33% 70%, rgba(167,139,250,0.5) 0%, transparent 100%);
  }

  /* ── NAVBAR ── */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(13,13,26,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(245,200,66,0.1);
    padding: 0 2rem;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: ${C.starWhite};
  }
  .logo-moon { font-size: 1.6rem; animation: moonFloat 3s ease-in-out infinite; }
  @keyframes moonFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  .logo em { color: ${C.moonGold}; font-style: normal; }
  .logo-dot { color: ${C.lavender}; }
  .nav-links { display: flex; gap: 1.8rem; align-items: center; }
  .nav-links a {
    color: ${C.mist};
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: ${C.moonGold}; }
  .nav-btn {
    background: ${C.moonGold};
    color: ${C.midnight};
    border: none;
    border-radius: 8px;
    padding: 0.4rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  .nav-btn:hover { background: ${C.moonGoldLight}; }

  /* ── HERO ── */
  .hero {
    position: relative;
    z-index: 1;
    min-height: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 1.5rem 7rem;
    text-align: center;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(167,139,250,0.08) 0%, transparent 70%);
  }
  .hero-moon {
    font-size: 5rem;
    margin-bottom: 1.2rem;
    filter: drop-shadow(0 0 30px rgba(245,200,66,0.4));
    animation: moonFloat 4s ease-in-out infinite;
  }
  .hero-eyebrow {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${C.lavender};
    margin-bottom: 1rem;
  }
  .hero-title {
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    color: ${C.starWhite};
    margin-bottom: 0.6rem;
    letter-spacing: -0.02em;
  }
  .hero-title em { color: ${C.moonGold}; font-style: normal; }
  .hero-tagline {
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    color: ${C.mist};
    margin-bottom: 0.5rem;
    font-weight: 300;
    font-family: 'Noto Sans Devanagari', sans-serif;
    letter-spacing: 0.02em;
  }
  .hero-sub {
    color: rgba(240,239,248,0.45);
    font-size: 0.88rem;
    margin-bottom: 3.5rem;
  }

  /* ── SEARCH CARD ── */
  .search-card {
    background: rgba(26,26,53,0.95);
    border: 1px solid rgba(245,200,66,0.18);
    border-radius: 20px;
    padding: 2rem;
    width: min(900px, 95vw);
    box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.08);
    position: relative;
    z-index: 10;
    backdrop-filter: blur(20px);
  }
  .search-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    gap: 1rem;
    align-items: end;
  }
  .field label {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${C.lavender};
    margin-bottom: 0.5rem;
  }
  .field input, .field select {
    width: 100%;
    background: rgba(13,13,26,0.8);
    border: 1.5px solid rgba(167,139,250,0.2);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    font-size: 0.92rem;
    font-family: 'Poppins', sans-serif;
    color: ${C.starWhite};
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field input::placeholder { color: rgba(240,239,248,0.3); }
  .field input:focus, .field select:focus {
    border-color: ${C.moonGold};
    box-shadow: 0 0 0 3px rgba(245,200,66,0.12);
  }
  .field select option { background: ${C.indigo}; }
  .btn-search {
    background: linear-gradient(135deg, ${C.moonGold}, ${C.moonGoldLight});
    color: ${C.midnight};
    border: none;
    border-radius: 10px;
    padding: 0.78rem 1.6rem;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    letter-spacing: 0.04em;
    transition: transform 0.15s, box-shadow 0.2s;
    height: 48px;
    box-shadow: 0 4px 20px rgba(245,200,66,0.3);
  }
  .btn-search:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,200,66,0.4); }
  .btn-search:disabled { opacity: 0.5; transform: none; cursor: not-allowed; }

  /* ── RESULTS ── */
  .results-section {
    max-width: 1120px;
    margin: 4rem auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;
  }
  .results-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .results-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${C.starWhite};
  }
  .results-meta {
    font-size: 0.82rem;
    color: ${C.mist};
  }

  /* ── HOTEL GRID ── */
  .hotel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 1.4rem;
  }
  .hotel-card {
    background: ${C.indigoCard};
    border: 1px solid rgba(167,139,250,0.1);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .hotel-card:hover {
    transform: translateY(-5px);
    border-color: rgba(245,200,66,0.3);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
  }
  .hotel-thumb {
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    background: linear-gradient(135deg, rgba(13,13,26,0.9), rgba(26,26,53,0.9));
    border-bottom: 1px solid rgba(167,139,250,0.08);
    position: relative;
    overflow: hidden;
  }
  .hotel-thumb::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(245,200,66,0.06) 0%, transparent 70%);
  }
  .hotel-body { padding: 1.2rem; }
  .hotel-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: ${C.starWhite};
    margin-bottom: 0.3rem;
    line-height: 1.3;
  }
  .hotel-loc {
    font-size: 0.76rem;
    color: ${C.lavender};
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .hotel-stars { color: ${C.moonGold}; font-size: 0.78rem; margin-bottom: 0.7rem; letter-spacing: 0.05em; }
  .amenity-chips { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 1rem; }
  .chip {
    background: rgba(167,139,250,0.1);
    color: ${C.lavender};
    border-radius: 5px;
    padding: 0.18rem 0.55rem;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.03em;
  }
  .hotel-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.9rem;
    border-top: 1px solid rgba(167,139,250,0.1);
  }
  .hotel-price { font-size: 1.35rem; font-weight: 800; color: ${C.moonGold}; }
  .hotel-price span { font-size: 0.72rem; color: ${C.mist}; font-weight: 400; }
  .btn-book {
    background: rgba(245,200,66,0.12);
    color: ${C.moonGold};
    border: 1px solid rgba(245,200,66,0.3);
    border-radius: 8px;
    padding: 0.42rem 1rem;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    letter-spacing: 0.03em;
  }
  .btn-book:hover {
    background: ${C.moonGold};
    color: ${C.midnight};
  }

  /* ── STATES ── */
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 5rem;
    color: ${C.mist};
    font-size: 0.9rem;
  }
  .spinner {
    width: 24px; height: 24px;
    border: 3px solid rgba(245,200,66,0.15);
    border-top-color: ${C.moonGold};
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .empty {
    text-align: center;
    padding: 5rem 2rem;
    color: ${C.mist};
  }
  .empty-icon { font-size: 3.5rem; margin-bottom: 1rem; }
  .empty-title { font-size: 1.1rem; font-weight: 600; color: ${C.starWhite}; margin-bottom: 0.4rem; }

  .error-bar {
    background: rgba(248,113,113,0.1);
    border: 1px solid rgba(248,113,113,0.3);
    color: ${C.red};
    border-radius: 10px;
    padding: 0.75rem 1rem;
    font-size: 0.84rem;
    margin-bottom: 1rem;
  }
  .demo-bar {
    background: rgba(245,200,66,0.07);
    border: 1px solid rgba(245,200,66,0.2);
    color: rgba(245,200,66,0.85);
    border-radius: 10px;
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  /* ── FEATURES ── */
  .features {
    border-top: 1px solid rgba(167,139,250,0.1);
    border-bottom: 1px solid rgba(167,139,250,0.1);
    background: rgba(26,26,53,0.4);
    padding: 4rem 1.5rem;
    position: relative;
    z-index: 1;
  }
  .features-inner { max-width: 1120px; margin: 0 auto; }
  .features-title {
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
    color: ${C.starWhite};
    margin-bottom: 2.5rem;
  }
  .features-title span { color: ${C.moonGold}; }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  .feat { text-align: center; }
  .feat-icon { font-size: 2rem; margin-bottom: 0.7rem; }
  .feat-name { font-weight: 700; color: ${C.starWhite}; margin-bottom: 0.3rem; font-size: 0.95rem; }
  .feat-desc { color: rgba(240,239,248,0.45); font-size: 0.8rem; line-height: 1.65; }

  /* ── FOOTER ── */
  .footer {
    background: ${C.indigoDark};
    border-top: 1px solid rgba(167,139,250,0.08);
    text-align: center;
    padding: 2rem;
    font-size: 0.78rem;
    color: rgba(240,239,248,0.3);
    position: relative;
    z-index: 1;
  }
  .footer em { color: ${C.moonGold}; font-style: normal; }

  /* ── MODAL ── */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,5,15,0.85);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .modal {
    background: ${C.indigo};
    border: 1px solid rgba(245,200,66,0.15);
    border-radius: 22px;
    width: min(620px, 98vw);
    max-height: 90vh;
    overflow-y: auto;
    padding: 2.5rem;
    position: relative;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
  }
  .modal-close {
    position: absolute;
    top: 1.2rem; right: 1.2rem;
    background: rgba(167,139,250,0.1);
    border: none;
    border-radius: 50%;
    width: 36px; height: 36px;
    color: ${C.mist};
    font-size: 1rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .modal-close:hover { background: rgba(167,139,250,0.2); }
  .modal-name {
    font-size: 1.6rem;
    font-weight: 800;
    color: ${C.starWhite};
    margin-bottom: 0.3rem;
    line-height: 1.2;
  }
  .modal-loc { color: ${C.lavender}; font-size: 0.82rem; margin-bottom: 1.2rem; }
  .modal-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.5rem; }

  .section-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${C.lavender};
    margin-bottom: 0.8rem;
  }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .f-field { display: flex; flex-direction: column; gap: 0.35rem; }
  .f-field label { font-size: 0.78rem; font-weight: 500; color: ${C.mist}; }
  .f-field input {
    background: rgba(13,13,26,0.7);
    border: 1.5px solid rgba(167,139,250,0.2);
    border-radius: 9px;
    padding: 0.65rem 0.9rem;
    font-size: 0.88rem;
    font-family: 'Poppins', sans-serif;
    color: ${C.starWhite};
    outline: none;
    transition: border-color 0.2s;
  }
  .f-field input::placeholder { color: rgba(240,239,248,0.25); }
  .f-field input:focus { border-color: ${C.moonGold}; }

  .price-box {
    background: rgba(13,13,26,0.6);
    border: 1px solid rgba(167,139,250,0.12);
    border-radius: 12px;
    padding: 1.2rem;
    margin: 1.5rem 0;
  }
  .p-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.84rem;
    color: ${C.mist};
    margin-bottom: 0.5rem;
  }
  .p-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.05rem;
    font-weight: 700;
    color: ${C.moonGold};
    border-top: 1px solid rgba(167,139,250,0.15);
    padding-top: 0.8rem;
    margin-top: 0.5rem;
  }
  .btn-confirm {
    width: 100%;
    background: linear-gradient(135deg, ${C.moonGold}, ${C.moonGoldLight});
    color: ${C.midnight};
    border: none;
    border-radius: 12px;
    padding: 1rem;
    font-size: 0.98rem;
    font-weight: 800;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(245,200,66,0.3);
  }
  .btn-confirm:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,200,66,0.4); }
  .btn-confirm:disabled { opacity: 0.5; transform: none; cursor: not-allowed; }

  /* ── SUCCESS ── */
  .success {
    text-align: center;
    padding: 1.5rem 0;
  }
  .success-icon { font-size: 4rem; margin-bottom: 1rem; }
  .success-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${C.starWhite};
    margin-bottom: 0.5rem;
  }
  .success-sub { color: ${C.mist}; font-size: 0.88rem; line-height: 1.7; }
  .ref-box {
    background: rgba(245,200,66,0.08);
    border: 1px solid rgba(245,200,66,0.25);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: ${C.moonGold};
    letter-spacing: 0.15em;
    margin: 1.2rem 0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 680px) {
    .search-grid { grid-template-columns: 1fr 1fr; }
    .btn-search { grid-column: span 2; height: 44px; }
    .form-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
`;

// ── Data ──────────────────────────────────────────────────────
const EMOJIS = ["🏨","🏰","🌆","🏙️","🌃","🏩","🌴","🗼"];
const ALL_AMENITIES = ["Free WiFi","Pool","Spa","Gym","Restaurant","Parking","Bar","Room Service","AC","Laundry"];

function randAmenities() {
  return [...ALL_AMENITIES].sort(() => Math.random()-0.5).slice(0, Math.floor(Math.random()*4)+3);
}

const DEMO_HOTELS = (city) => [
  { id:"1", name:"The Grand Raat Palace", loc: city, rating:5, price:9200, emoji:"🏰", amenities:["Free WiFi","Pool","Spa","Restaurant","Gym","Bar","Room Service"] },
  { id:"2", name:"Neend Inn City Center", loc: city, rating:3, price:1850, emoji:"🏨", amenities:["Free WiFi","Parking","AC","Restaurant"] },
  { id:"3", name:"Moonlight Suites", loc: city, rating:5, price:14500, emoji:"🌃", amenities:["Free WiFi","Pool","Spa","Gym","Bar","Restaurant","Parking","Laundry"] },
  { id:"4", name:"Sukoon Heritage Resort", loc: city, rating:4, price:6100, emoji:"🌴", amenities:["Free WiFi","Pool","Restaurant","Parking","Spa","AC"] },
  { id:"5", name:"Budget Basera Express", loc: city, rating:2, price:850, emoji:"🏩", amenities:["Free WiFi","Parking","AC"] },
  { id:"6", name:"Sapno Ka Hotel", loc: city, rating:4, price:5400, emoji:"🌆", amenities:["Free WiFi","Gym","Restaurant","Room Service","Bar","AC"] },
  { id:"7", name:"Araam Residency", loc: city, rating:3, price:2900, emoji:"🗼", amenities:["Free WiFi","AC","Laundry","Restaurant"] },
  { id:"8", name:"Star Nights Premium", loc: city, rating:5, price:11800, emoji:"🏙️", amenities:["Free WiFi","Pool","Spa","Bar","Gym","Restaurant","Room Service"] },
];

const fmt = n => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
const nights = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));
const stars = n => "★".repeat(n) + "☆".repeat(Math.max(0, 5-n));
const genRef = () => "SJ" + Math.random().toString(36).slice(2,8).toUpperCase();

// ── App ──────────────────────────────────────────────────────
export default function App() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", phone:"" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [bookingError, setBookingError] = useState("");

  const nightCount = nights(checkIn, checkOut);

  async function handleSearch() {
    if (!city.trim()) { setError("Shehar ka naam likho yaar 😄"); return; }
    setLoading(true); setError(""); setHotels([]); setSearched(false);
    await new Promise(r => setTimeout(r, 1000));
    setHotels(DEMO_HOTELS(city.trim()));
    setSearched(true);
    setLoading(false);
  }

  async function handleBook() {
    if (!form.name || !form.email || !form.phone) {
      setBookingError("Sabhi details bharo bhai 😄"); return;
    }
    setBookingLoading(true); setBookingError("");
    await new Promise(r => setTimeout(r, 1600));
    setConfirmed({ ref: genRef(), hotel: selected, guest: form.name });
    setBookingLoading(false);
  }

  function closeModal() {
    setSelected(null);
    setForm({ name:"", email:"", phone:"" });
    setConfirmed(null);
    setBookingError("");
  }

  const totalPrice = selected ? selected.price * nightCount * 1.18 + 79 : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="stars-bg" />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-moon">🌙</span>
          <span>So<em>Ja</em><span className="logo-dot">.</span>in</span>
        </div>
        <div className="nav-links">
          <a>Hotels</a>
          <a>Deals</a>
          <a>Meri Bookings</a>
          <button className="nav-btn">Login</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-moon">🌙</div>
        <p className="hero-eyebrow">India Ka Sabse Aaram-deh Hotel Platform</p>
        <h1 className="hero-title">So<em>Ja</em>.in</h1>
        <p className="hero-tagline">चैन से सो जा — होटल हम ढूंढते हैं</p>
        <p className="hero-sub">Lakhon hotels · Koi registration nahi · Seedha booking</p>

        {/* SEARCH */}
        <div className="search-card">
          {error && <div className="error-bar">⚠️ {error}</div>}
          <div className="demo-bar">
            🔑 Demo mode mein chal raha hai — Real hotels ke liye Amadeus API key lagao. Abhi sample hotels dikhenge.
          </div>
          <div className="search-grid">
            <div className="field">
              <label>📍 Kahan jaana hai?</label>
              <input
                placeholder="Delhi, Goa, Mumbai, Jaipur..."
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="field">
              <label>🌙 Check-in</label>
              <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="field">
              <label>☀️ Check-out</label>
              <input type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <div className="field">
              <label>👤 Guests</label>
              <select value={guests} onChange={e => setGuests(Number(e.target.value))}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
              </select>
            </div>
            <button className="btn-search" onClick={handleSearch} disabled={loading}>
              {loading ? "⏳" : "🔍 Search"}
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <div className="results-section">
        {loading && (
          <div className="loader">
            <div className="spinner" />
            Hotels dhundhe ja rahe hain... 🌙
          </div>
        )}

        {!loading && searched && hotels.length === 0 && (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Koi hotel nahi mila</div>
            <p>Dusra shehar try karo</p>
          </div>
        )}

        {!loading && hotels.length > 0 && (
          <>
            <div className="results-header">
              <div className="results-title">✨ {hotels.length} Hotels Mile</div>
              <div className="results-meta">{city} · {nightCount} raat · {guests} guest{guests>1?"s":""}</div>
            </div>
            <div className="hotel-grid">
              {hotels.map(h => (
                <div key={h.id} className="hotel-card" onClick={() => setSelected(h)}>
                  <div className="hotel-thumb">{h.emoji}</div>
                  <div className="hotel-body">
                    <div className="hotel-name">{h.name}</div>
                    <div className="hotel-loc">📍 {h.loc}</div>
                    <div className="hotel-stars">{stars(h.rating)}</div>
                    <div className="amenity-chips">
                      {h.amenities.slice(0,3).map(a => <span key={a} className="chip">{a}</span>)}
                    </div>
                    <div className="hotel-footer">
                      <div className="hotel-price">{fmt(h.price)}<span>/raat</span></div>
                      <button className="btn-book" onClick={e => { e.stopPropagation(); setSelected(h); }}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!searched && !loading && (
          <div className="empty">
            <div className="empty-icon">🌙</div>
            <div className="empty-title">Kahan rukna chahte ho?</div>
            <p>Upar shehar likhkar search karo</p>
          </div>
        )}
      </div>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <h2 className="features-title">Kyun <span>SoJa.in</span>?</h2>
          <div className="features-grid">
            {[
              ["🌏","Sab Jagah Hotels","India ke kone kone mein — bina registration wale bhi"],
              ["💸","Sabse Sasta Rate","No hidden charges, GST included"],
              ["⚡","2 Minute Booking","Search karo, book karo, so jao 🌙"],
              ["🔒","100% Secure","Razorpay se safe payment"],
            ].map(([icon,name,desc]) => (
              <div key={name} className="feat">
                <div className="feat-icon">{icon}</div>
                <div className="feat-name">{name}</div>
                <div className="feat-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 <em>SoJa.in</em> — Chain se so jao, baaki hum dekh lenge 🌙
      </footer>

      {/* BOOKING MODAL */}
      {selected && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <button className="modal-close" onClick={closeModal}>✕</button>

            {!confirmed ? (
              <>
                <div style={{fontSize:"2.5rem", marginBottom:"0.5rem"}}>{selected.emoji}</div>
                <div className="modal-name">{selected.name}</div>
                <div className="modal-loc">📍 {selected.loc} · {stars(selected.rating)}</div>
                <div className="modal-chips">
                  {selected.amenities.map(a => <span key={a} className="chip">{a}</span>)}
                </div>

                {bookingError && <div className="error-bar">⚠️ {bookingError}</div>}

                <div className="section-label">Aapki Details</div>
                <div className="form-grid">
                  <div className="f-field">
                    <label>Poora Naam</label>
                    <input placeholder="Ramesh Kumar" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
                  </div>
                  <div className="f-field">
                    <label>Mobile Number</label>
                    <input placeholder="98XXXXXXXX" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} />
                  </div>
                </div>
                <div className="f-field" style={{marginBottom:"0.5rem"}}>
                  <label>Email Address</label>
                  <input placeholder="aap@gmail.com" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} />
                </div>

                <div className="price-box">
                  <div className="p-row"><span>Kiraya ({nightCount} raat × {fmt(selected.price)})</span><span>{fmt(selected.price * nightCount)}</span></div>
                  <div className="p-row"><span>GST (18%)</span><span>{fmt(selected.price * nightCount * 0.18)}</span></div>
                  <div className="p-row"><span>SoJa.in Fee</span><span>{fmt(79)}</span></div>
                  <div className="p-total"><span>Total</span><span>{fmt(totalPrice)}</span></div>
                </div>

                <button className="btn-confirm" onClick={handleBook} disabled={bookingLoading}>
                  {bookingLoading ? "🌙 Booking Ho Rahi Hai..." : `🌙 Confirm Karo — ${fmt(totalPrice)}`}
                </button>
              </>
            ) : (
              <div className="success">
                <div className="success-icon">✅</div>
                <div className="success-title">Ho Gayi Booking!</div>
                <p className="success-sub">
                  Badhai ho <strong>{confirmed.guest}</strong>!<br />
                  Ab chain se so jao 🌙<br />
                  Confirmation aapke email par bhej di gayi.
                </p>
                <div className="ref-box">{confirmed.ref}</div>
                <p className="success-sub" style={{fontSize:"0.78rem"}}>Yeh reference number screenshot le lo.</p>
                <br />
                <button className="btn-confirm" onClick={closeModal}>Aur Book Karo</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
